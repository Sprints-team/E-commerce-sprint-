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
		ref: "user",
		required: true,
	},
	products: [
		{
			skuId: {
				type: ObjectId,
				ref: "sku",
				required: true,
			},
			qty: {
				type: Number,
				min: 1,
			},
			size: {
				type: String,
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
		currentStatus: {
			type: String,
			enum: [
				"PROCESSING",
				"WITH_CARRIER",
				"ON_THE_WAY",
				"DELIVERED",
				"CANCELED",
			],
			default: "PROCESSING",
		},
		message: {
			type: String,
			default:undefined
		},
		statusTimeStamp: [
			[]
		],
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
	totalPrice: {
		type: Number,
	},
});

//static methods
orderSchema.statics.cancelOrder = async function (id,userId) {
	try {
		const order = await this.findById(id)

		if (!order) return {
			status: 404,
			msg:"couldn't find your order"
		}

		if (order.status.currentStatus !== "PROCESSING") return {
			status: 403,
			msg:"can't cancel order after it got out with carrier"
		}
		const promises= []
		order.products.forEach(prod => {
			const updateField=`sizes.${prod.size}.qty`
			promises.push(SKU.updateOne(
				{ _id: _id },
				{
					$inc: {
						[updateField]: prod.qty,
					},
				}
			))
		})

		order.status.currentStatus = "CANCELED"
		order.status.statusTimeStamp = [...order.status.statusTimeStamp, [new Date(), "CANCELED"]]
		order.status.message = "user canceled order"
		

		const result = await Promise.all([...promises, order.save()])
		console.log(result)
		return {
			status: 200,
			msg:"order deleted successfully"
		}
	} catch (err) {
		return {
			status: 400,
			msg: err.message
		}
	}
}



// doc methods
/* 
{sku:}}
*/
//{sku:{size,qty,price}}
orderSchema.methods.checkInventoryAndOrder = async function () {
	const session = await mongoose.startSession();
	const or = [];
	console.log(this.products);
	const productObj = {};
	for (let ele of this.products) {
		or.push({ _id: ele.skuId });
		productObj[ele.skuId] = ele;
	}
	// console.log(productObj)

	try {
		let enoughStore = true;

		let totalPrice = 0;
		const skus = await SKU.find()
		.or(or)
		.select(["sku", "sizes", "price", "discount"]);
		
		skus.forEach((prod) => {
			if (
				productObj[prod._id].qty <= prod.sizes[productObj[prod._id].size].qty
				) {
					// this.products[prod.sku].price = prod.price
					totalPrice +=
					productObj[prod._id].qty * prod.price -
					productObj[prod._id].qty * prod.price * (prod.discount / 100);
					productObj[prod._id].sku = prod.sku;
					return;
				}
				enoughStore = false;
			});
			console.log(totalPrice, "totalPrice");
			// return
			if (enoughStore) {
				await session.withTransaction(async () => {
				let promises = [];
				for (let _id in productObj) {
					let updateField = `sizes.${productObj[_id].size}.qty`;
					promises.push(
						SKU.updateOne(
							{ _id: _id },
							{
								$inc: {
									[updateField]: -productObj[_id].qty,
								},
							}
						)
					);
				}
				this.totalPrice = totalPrice;
				this.status.statusTimeStamp=[new Date()]
				const results = await Promise.all([...promises,this.save()])
				console.log(results)
			});
			}
		// return totalPrice.toString()
		if (enoughStore)
			return {
				placed: true,
				message: "order placed successfully",
			};
		if (!enoughStore)
			return {
				placed: false,
				err: "there isn't enough items",
			};
	} catch (err) {
		return {
			placed: false,
			err: err.message,
		};
	} finally {
		await session.endSession();
	}
};

//model

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
