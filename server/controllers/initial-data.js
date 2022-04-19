const Brand = require("../model/brands");
const Category = require("../model/category");
const Order = require("../model/orders");
const User = require("../model/user");

exports.initialData = async (req, res, next) => {
	try {
		const result = await Promise.all([Brand.find(), Category.find()]);
		res.status(200).json({
			brands: result[0],
			categories: result[1],
		});
	} catch (err) {
		next(err, req, res, next);
	}
};

/*
- no of users(active/deactivated)
- no of orders(pending - in review - in progress- on the way -
delivered)
- total income last 7 days
- no of new customers last 7 days
- no of today orders */

exports.getStatistics = async (req, res, next) => {
	const userPipeLine = [
		{
			$group: {
				_id: "$status",
				count: { $sum: 1 },
			},
		},
	];
	const orderPipeLine = [
		{
			$group: {
				_id: "$status.currentStatus",
				count: { $sum: 1 },
			},
		},
	];

	const orderPipeLine2 = [
		{
			$match: {
				$and: [
					{
						updatedAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
					},
					{ "status.currentStatus": "DELIVERED" },
				],
			},
		},
		{
			$group: {
				_id: null,
				totalIncome: { $sum: "$totalPrice" },
			},
		},
	];

	const ordersToday = [
		{
			$match: {
				createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
			},
		},
		{
			$count: "orders today",
		},
	];

	const newCustommers = [
		{
			$match: {
				createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
			},
		},
		{
			$count: "users",
		},
	];
try{	const result = await Promise.all([
		Promise.resolve({ userStatus: await User.aggregate(userPipeLine) }),
		Promise.resolve({ orderStatus: await Order.aggregate(orderPipeLine) }),
		Promise.resolve({
			sevenTotalIncome: await Order.aggregate(orderPipeLine2),
		}),
		Promise.resolve({ newCustomersToday: await User.aggregate(newCustommers) }),
		Promise.resolve({ ordersToday: await Order.aggregate(ordersToday) }),
	]);
	res.status(200).send(result);
} catch(err) {
		next(err,req,res,next)
	}

};
