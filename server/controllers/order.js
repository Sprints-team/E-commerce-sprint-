const Order = require("../model/orders");

// products-->{sku:{,size,qty,price}}
exports.order = async (req, res, next) => {
	const { products, country, governerate, city, zipCode, adress } = req.body;
	const userId = req.user.userId;
	console.log(products);
	const order = new Order({
		userId,
		products,
		shippingAdress: {
			country,
			governerate,
			city,
			zipCode,
			adress,
		},
	});
	const response = await order.checkInventoryAndOrder();
	res.send(response);
};

exports.getOrders = async (req, res, next) => {
	const user = req.user;
	const query = Order.find();
	if (user.role === "ADMIN") {
		const userId = req.body.userId || req.query.userId;
		const status = req.body.status || req.query.status;

		if (userId) query.where("userId").equals(userId);

		if (status) query.where("status").equals(status);
	}
	try {
		const orders = await query
			.populate("products.skuId", ["images", "price"])
			.exec();
		res.send(orders);
	} catch (err) {
		next(err, req, res, next);
	}
};

exports.updateOrderStatus = async (req, res, next) => {
	const status = (req.body.status || req.query.status).toUpperCase();
	const carrier = req.body.carrier || req.query.carrier;
	const id = req.body.id || req.query.id;
	const message = req.body.message || req.query.message;

	const whereObject = {
		id: id,
		$nor: [
			{
				"status.currentStatus": status,
			},
			{
				"status.currentStatus": "CANCELED",
			},
		],
	};

	const updateObject = {
		$push: {
			"status.statusTimeStamp": [new Date(),status],
		},
		$set: {
			"status.currentStatus": status,
		},
	};

	if (message) updateObject.$set["status.message"] = message;
	if (carrier) updateObject.$set.carrier = carrier.toUpperCase();
	console.log(updateObject);
	try {
		console.log(id);
		const result = await Order.updateOne(whereObject, updateObject);
		if (result.modifiedCount === 0) {
			return res.status(400).json({
				error: 400,
				msg: "order was not updated maybe it already had this status or was cancelled",
			});
		}
		return res.status(200).json({msg:"order updated successfully"});
	} catch (err) {
		console.log(err);
		next(err, req, res, next);
	}
};


exports.cancelOrder = async(req, res, next) => {
	const id = req.body.id || req.query.id
	const userId = req.user.id
	
	try {
	const result = Order.updateOne({ _id: id, userId: userId,"status.currentStatus" :"PROCESSING"}, {
		$set: {
			"status.currentStatus": "CANCELED",
		},	$push: {
			"status.statusTimeStamp": [new Date(),"CANCELED"],
		}
	})
		
		Order.cancelOrder(id,userId)
	if(result.modifiedCount===0) return res.status(400).json({error:"400", msg:"order is not cancelled"})
		return res.status(200).json({msg:"order canceled successfully"});
		
	} catch (err) {
		next(err,req,res,next)
	}
	
}