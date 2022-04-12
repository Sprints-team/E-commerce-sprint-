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
	products: {
		type:Object
	},
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
/* 
{sku:}}
*/
//{sku:{size,qty,price}}
orderSchema.methods.checkInventoryAndOrder = async function () {
	const session = await mongoose.startSession()
	const or = [];
	console.log(this.products)
	for (let sku in this.products) {
		or.push({ sku: sku});
	}
	try {
		let enoughStore = true;
		await session.withTransaction(async () => {
			const skus = await SKU.find().or(or).select(["sku", "sizes", "price"]);
			skus.forEach((prod) => {
				if (
					this.products[prod.sku].qty <= prod.sizes[this.products[prod.sku].size].qty
				) {
					this.products[prod.sku].price=prod.price
					return;
				}
				enoughStore = false;
			});
		
			if (enoughStore) {
				for (let sku in this.products) {
					let updateField=`sizes.${this.products[sku].size}.qty`
					await SKU.updateOne(
						{ sku: sku },
						{
							$inc: {
								[updateField] : -this.products[sku].qty,
							},
						}
					);
				}
				return await this.save();
			}
		})
		await session.endSession()
		if (enoughStore) return {
			placed:true
		}
		if (!enoughStore) return {
			placed: false,
			err:"there is no enough items"
		}
	} catch (err) {
		return {
			placed: false,
			err:err.message
		}
	}
};

//model

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
