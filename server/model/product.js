const mongoose = require("mongoose");
const BadRequest = require("../errors/bad-request");
const ObjectId = mongoose.Schema.Types.ObjectId;
const NotFound = require("../errors/not-found");
const Brand = require("./brands");
const Category = require("./category");
const SKU = require("./sku");
const Index = require("./sku-index");

// schemas
const reviewSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		ref: "user",
	},
	content: String,
	rating: Number,
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
	colors: {
		type:Object
	},
	images: {
		type: Object,
	},
	skus: [
		{
			type: ObjectId,
			ref: "sku",
			required: true,
		},
	],
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
productSchema.methods.addProduct = async function () {
	const stock = this.colors;

	try {
		// checking if the brand or category exist
		const cat = await Category.findOne({ _id: this.category }).select("abrv");
		//passing the abrv to the next middleware
		this.abrv=cat.abrv
		const brd = await Brand.exists({ _id: this.brand });
		let errMsg = "";
		if (cat.length === 0) errMsg += "category doesn't exist";
		if (!brd)
			errMsg += errMsg ? " and brand doesn't exist" : "brand doesn't exist";
		if (errMsg) throw new BadRequest(errMsg)


		const session = await mongoose.startSession()
		await session.withTransaction(async () => {






			
			let index = await Index.autoIncrement();
			const skus = [];
			for (let ele in stock) {
				const sku = new SKU({
					sku: `${this.abrv}-${ele.substring(1)}-`,
					sizes: stock[ele],
					images: this.images[ele],
					price:this.price,
					productId: this._id,
				});
				await sku.save();
				skus.push(sku._id);
				index += 1;
			}
			Index.updateOne(
				{ ref: "sku" },
				{
					$set: {
						index: index,
					},
				}
			).exec();
			this.images = undefined;
			this.stock = undefined;
			this.colors=undefined
			this.abrv=undefined
			this.skus = skus;
	
			this.save()
		})
		await session.endSession()
		return {
			saved:true
		}
	} catch (err) {
		return err
	}
}

//the Model

// middlewares
// productSchema.pre("save", async function (next) {
// 	// console.log(this, "preSave");
// 	try {
// 		// checking if the brand or category exist
// 		const cat = await Category.findOne({ _id: this.category }).select("abrv");
// 		//passing the abrv to the next middleware
// 		this.abrv=cat.abrv
// 		const brd = await Brand.exists({ _id: this.brand });
// 		let errMsg = "";
// 		if (cat.length === 0) errMsg += "category doesn't exist";
// 		if (!brd)
// 			errMsg += errMsg ? " and brand doesn't exist" : "brand doesn't exist";
// 		if (errMsg) return next(new BadRequest(errMsg));
// 	} catch (err) {
// 		next(err);
// 	}
// });

// //saving skus
// productSchema.pre("save", async function (next) {
// 	const stock = this.colors;
// 	try {
// 		let index = await Index.autoIncrement();
// 		const skus = [];
// 		for (ele in stock) {
// 			const sku = new SKU({
// 				sku: `${this.abrv}-${stock[ele].color.substr(1)}-`,
// 				sizes: stock[ele].sizes,
// 				images: this.images[stock[ele].color],
// 				price:this.price,
// 				productId: this._id,
// 			});
// 			await sku.save();
// 			skus.push(sku._id);
// 			index += 1;
// 		}
// 		Index.updateOne(
// 			{ ref: "sku" },
// 			{
// 				$set: {
// 					index: index,
// 				},
// 			}
// 		).exec();
// 		this.images = undefined;
// 		this.stock = undefined;
// 		this.colors=undefined
// 		this.abrv=undefined
// 		this.skus = skus;
// 		next();
// 	} catch (err) {
// 		next(err);
// 	}
// });




const Product = mongoose.model("product", productSchema);

module.exports = Product;
