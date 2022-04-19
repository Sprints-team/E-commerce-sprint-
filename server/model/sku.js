const mongoose = require("mongoose");
const Index = require("./sku-index");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
	user: {
		userName: {
			first: {
				type: String,
			},
			last: {
				type: String,
			},
			id: String,
		},
		// will add image
	},
	content: String,
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
});

//sku: categoryCode-..size:s,m,l..||35-50-color:hexString- sequence:...

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		sku: {
			type: String,
			required: true,
			index: { unique: true },
    },
    color: {
      type:String
    },
		sizes: {},
		images: [String],
		price: {
			type: Number,
			required: true,
		},
		productId: {
			type: ObjectId,
			ref: "product",
		},
		soldItems: {
			type: Number,
			min: 0,
			default: 0,
		},
		reviews: {
			reviews: [reviewSchema],
			rating: {
				type: Number,
				default: 0,
			},
		},
		price: {
			type: Number,
			required: true,
			min: 1,
		},
		discount: {
			type: Number,
			default: 0,
			min: 0,
			max: 99,
		},
	},
	{ timestamps: true }
);

//static
schema.statics.updateStock = async function (stock,) {
  
}


// middleware
schema.pre("save", async function (next) {
	try {
		const index = await Index.autoIncrement();
		this.sku = `${this.sku}${index}`;
		next();
	} catch (err) {
		next(err);
	}
});

schema.pre("remove", function (next) {
	console.log(__dirname)
})

const SKU = mongoose.model("sku", schema);

module.exports = SKU;
