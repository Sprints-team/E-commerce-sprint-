const mongoose = require("mongoose");
const BadRequest = require("../errors/bad-request");
const ObjectId = mongoose.Schema.Types.ObjectId;
const NotFound = require("../errors/not-found");
const Brand = require("./brands");
const Category = require("./category");
const SKU = require("./sku");

// schemas


const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			enum: ["MALE", "FEMALE", "UNISEX"],
			required: true,
		},
		ageGroup: {
			type: String,
			enum: ["ADULT", "CHILD"],
		},
		//--
		colors: {
			type: Object,
		},
		//--
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
		category: {
			type: ObjectId,
			ref: "category",
		},
		brand: {
			type: ObjectId,
			ref: "brand",
		},
	},
	{ timestamps: true }
);

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
		const catPromise = Category.findOne({ _id: this.category }).select("title");
		//passing the abrv to the next middleware
		const brdPromise = Brand.findOne({ _id: this.brand }).select("title");
		const results = await Promise.all([catPromise, brdPromise]);
		const [cat, brd] = results;
		this.abrv = cat.abrv;
		let errMsg = "";
		if (!cat) errMsg += "category doesn't exist";
		if (!brd)
			errMsg += errMsg ? " and brand doesn't exist" : "brand doesn't exist";
		if (errMsg) throw new BadRequest(errMsg);

		const skus = [];
		const promises = [];
		for (let ele in stock) {
			console.log(ele)
			const sku = new SKU({
				title: this.title,
				sku: `${cat.title}-${brd.title}-${ele.substring(1)}-${this.gender[0]}-${this.ageGroup[0]}-`,
				color: ele,
				sizes: stock[ele],
				images: this.images[ele],
				price: this.price,
				discount: this.discount,
				productId: this._id,
				title: this.title,
			});
			// await sku.save();
			promises.push(sku.save());
			skus.push(sku._id);
		}
		this.images = undefined;
		this.stock = undefined;
		this.colors = undefined;
		this.abrv = undefined;
		this.skus = skus;
		const save = this.save();
		const result = await Promise.all([...promises, save]);

		return {
			saved: true,
		};
	} catch (err) {
		return err;
	}
};

//the Model

// middlewares
productSchema.pre("remove", async function (next) {
	try {
		await SKU.deleteMany({
			_id: {
				$in: [...this.skus],
			},
		});
		next();
	} catch (err) {
		next(err);
	}
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
