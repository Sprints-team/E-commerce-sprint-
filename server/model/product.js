const mongoose = require("mongoose");
const BadRequest = require("../errors/bad-request");
const ObjectId = mongoose.Schema.Types.ObjectId;
const NotFound = require("../errors/not-found");
const Brand = require("./brands");
const Category = require("./category");

// schemas
const reviewSchema = new mongoose.Schema({
	userId: ObjectId,
	content: String,
	rating: Number,
});

const stockSchema = new mongoose.Schema({
	sizes: [
		{
			size: String,
			colors: [
				{
					hexColor: {
						type: String,
						required: true,
					},
					qty: {
						type: Number,
						required: true,
						min: 0,
					},
				},
			],
		},
	],
});

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ["MALE", "FEMALE"],
		required: true,
	},
	ageGroup: {
		type: String,
		enum: ["ADULT", "CHILD"],
	},
	stock: stockSchema,
	price: {
		type: Number,
		required: true,
		min: 1,
	},
	describtion: {
		type: String,
		required: true,
	},
	discount: {
		type: Number,
		default: 0,
		min: 0,
		max: 99,
	},
	reviews: {
		reviews: [reviewSchema],
		rating: {
			type: Number,
			default: 0,
		},
	},
	images: [String],
	category: {
		type: ObjectId,
		ref: "category",
	},
	brand: {
		type: ObjectId,
		ref: "brand",
	},
});

// static methods

productSchema.statics.addImages = async function (id, imgArr) {
	const product = await this.findOne({ _id: id });
	try {
		if (product) {
			product.images = [...product.images, ...imgArr];
			await product.save();
		} else {
			throw new NotFound("no user with that id");
		}
	} catch (err) {
		return err;
	}
};


// doc method

//the Model

// middlewares
productSchema.pre("save", async function (next) {
	const cat = await Category.find({ _id: this.category });
    const brd = await Brand.find({ _id: this.brand });
    let errMsg=""
	if (cat.length === 0) errMsg+="category doesn't exist"
    if (brd.length === 0) errMsg +=errMsg?" and brand doesn't exist":"brand doesn't exist"
    if(errMsg) return next(new BadRequest(errMsg)) 
	return next();
});


const Product = mongoose.model("product", productSchema);

module.exports = Product;
