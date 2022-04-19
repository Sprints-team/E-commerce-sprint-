const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		code: {
			type: String,
			index: { unique: true },
		},
		amount: {
			type: Number,
		},
		percentile: {
			type: Boolean,
		},
		expirationDate: {
			type: Date,
			index: { expireAfterSeconds: 60*60*24*10 },
		},
	},
	{ timestamps: true }
);

schema.index;

const Copoun = mongoose.model("copoun", schema);

module.exports = Copoun;
