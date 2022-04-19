const Order = require("../model/orders");

// products-->{sku:{,size,qty,price}}
exports.order = async (req, res, next) => {
	const { products, country, governerate, city, zipCode, adress,copoun } = req.body;
	const userId = req.user.userId;
	console.log(copoun);
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
		copoun
	});
	const response = await order.checkInventoryAndOrder();
	res.send(response);
};

exports.getOrders = async (req, res, next) => {
	const { orderId, skip } = req.body
	const user=req.user
	const limit= req.body.limit||20
	const query = Order.find();

	if (orderId) query.where("_id").equals(orderId);


	const status = (req.body.status)?.toUpperCase();
	if (status) query.where("status.currentStatus").equals(status);

	if (user.role === "ADMIN") {
		const userId = req.body.userId || req.query.userId;

		if (userId) query.where("userId").equals(userId);
	}
	if (user.role === "USER") {
		const userId = user.userId;

		query.where("userId").equals(userId);
	}
	if (skip) query.skip(skip)
	query.limit(limit)

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
	const status = req.body.status.toUpperCase();
	const carrier = req.body.carrier;
	const id = req.body.id;
	const message = req.body.message;

	if (status === "CANCELED") {
		const response = await Order.cancelOrder(id, null, message);
		return res.status(response.status).json({ msg: response.msg });
	}
	const whereObject = {
		_id: id,
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
			"status.statusTimeStamp": [new Date(), status],
		},
		$set: {
			"status.currentStatus": status,
		},
	};

	if (message) updateObject.$set["status.message"] = message;
	if (carrier) updateObject.$set.carrier = carrier.toUpperCase();
	console.log(updateObject);
	try {
		const result = await Order.updateOne(whereObject, updateObject);
		if (result.modifiedCount === 0) {
			return res.status(400).json({
				error: 400,
				msg: "order was not updated maybe it already had this status or was cancelled",
			});
		}
		return res.status(200).json({ msg: "order updated successfully" });
	} catch (err) {
		next(err, req, res, next);
	}
};

exports.cancelOrder = async (req, res, next) => {
	const id = req.body.id || req.query.id;
	const user = req.user;

	try {
		const response = await Order.cancelOrder(id, user);

		// if(result.modifiedCount===0) return res.status(400).json({error:"400", msg:"order is not cancelled"})
		return res.status(response.status).json({ msg: response.msg });
	} catch (err) {
		next(err, req, res, next);
	}
};
