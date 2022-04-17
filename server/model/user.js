const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const validator = require("validator");
const bcrypt = require("bcryptjs");

//schemas
/* 
-->next step in line is to add a verification prop --> verification through email
*/
const userSchema = new mongoose.Schema({
	name: {
		first: {
			type: String,
			required: [true, "enter first name"],
			validate: [
				validator.default.isAlpha,
				{ field: "FIRST_NAME", msg: "first name must only containes letters" },
			],
		},
		last: {
			type: String,
			required: [true, "you must enter last name"],
			validate: [validator.default.isAlpha, "name must contain only letters"],
		},
	},
	email: {
		type: String,
		index: { unique: [true, "this email address is taken"] },
		required: [true, "you must enter an email"],
		validate: [validator.default.isEmail, "this is not a valid email"],
	},
	password: {
		type: String,
		required: [true, "you must enter a password"],
		validate: [
			validator.default.isStrongPassword,
			"this is not a strong password",
		],
	},
	role: {
		type: String,
		enum: ["USER", "ADMIN"],
		default: "USER",
	},
	status: {
		type: String,
		enum: ["ACTIVE", "INACTIVE_ACOUNT", "SUSPENDED"],
		default: "ACTIVE",
	},
	orders: [
		{
				type: ObjectId,
				ref: "order",
		},
	],
});

// middleware
//presave middleware to hash the password before saving --- prevent confirmPassword from being saved
userSchema.pre("save", async function (next) {
	console.log("here");
	(this.password = await bcrypt.hash(this.password, 12)),
		(this.confirmPassword = undefined);
	next();
});

//static methods

//document methods
userSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
// model

const User = mongoose.model("user", userSchema);

module.exports = User;
