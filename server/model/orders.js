const mongoose = require("mongoose");
const SKU = require("./sku");
const ObjectId = mongoose.Schema.Types.ObjectId;

//schemas
// const productInOrderSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required:true
//     },
//     imageUrl: {
//         type: String,
//         required: true,
//     },
//     price: {
//         itemPrice: { type: Number, required: true },
//         qty: {type:Number, required:true}
//     },
//     totalPrice: {
//         type: Number,
//         required:true
//     },
//     productId: {
//         type:ObjectId,
//         required:true
//     }

// },{_id:false})

const orderSchema = new mongoose.Schema({
	userId: {
		type: ObjectId,
		required: true,
	},
	products: [
		{
			sku: {
				type: String,
			},
			size: {
				type: String,
			},
			qty: {
				type: Number,
				min: 1,
			},
		},
	],
	shippingAdress: {
		country: {
			type: String,
			required: true,
		},
		governerate: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		zipCode: {
			type: Number,
			required: true,
		},
		adress: {
			type: String,
			required: true,
		},
	},
	carrier: {
		// admin when updating the status of the order from processing to with carrier will add the carrier name
		type: String,
	},
	status: {
		type: String,
		enum: ["PROCESSING", "WITH_CARRIER", "ON_THE_WAY", "DELIVERED", "CANCELED"],
		default: "PROCESSING",
	},
	deliveryTime: {
		expected: {
			type: Date,
			required: true,
			default: new Date(+Date.now() + 4 * 24 * 60 * 60 * 1000),
		},
		deliveredAt: {
			type: Date,
		},
	},
});

//static methods

// doc methods
orderSchema.methods.checkInventoryAndOrder = async function () {
	const or = [];
	const skuObj = {};
	for (let ind in this.products) {
		or.push({ sku: this.products[ind].sku });
		skuObj[this.products[ind].sku] = {
			qty: this.products[ind].qty,
			size: this.products[ind].size,
		};
	}
	const skus = await SKU.find().or(or).select(["sku", "sizes"]);
	let enoughStore = true;
	skus.forEach((sku) => {
		if (
			sku.sizes.find((ele) => ele.size === skuObj[sku.sku].size).qty >=
			skuObj[sku.sku].qty
		)
			return;
		enoughStore = false;
	});

	if (enoughStore) {
		for (let sku in skuObj) {
			await SKU.updateOne(
				{ sku: sku, "sizes.size": skuObj[sku].size },
				{
					$inc: {
						"sizes.$.qty": -skuObj[sku].qty,
					},
				}
			);
		}
	}

	const save=await this.save();
	return save;
};

//model

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
