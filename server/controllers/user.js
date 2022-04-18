const BadRequest = require("../errors/bad-request");
const User = require("../model/user");

exports.getUsers = async (req, res, next) => {
	const id = (req.query.id || req.body.id)?.trim();
	const status = (req.query.status || req.body.status)?.trim().toUpperCase();
	const search = (req.query.search || req.body.search)?.trim();
	const skip = req.query.skip || req.body.skip;
	const limit = req.query.limit || req.body.limit || 20;
	try {
		// if id search find user and return
		if (id) {
			const user = await User.findById(id)
				.populate({
          path: "orders",
          model: "order",
          populate: {
            path: "products.skuId",
            select: "images price title",
          }
        })
			if (user) {
				return res.status(200).json([user]);
			}
			throw new BadRequest("there is no user with that id");
		}

		console.log(typeof skip, typeof limit, "-->numbers????");

		const query = User.find().where("role").equals("USER");

		if (status) query.where({ status: status });

		if (search)
			query.or([
				{
					email: {
						$regex: `.*${search}.*`,
					},
				},
				{
					$and: [
						{
							"name.first": {
								$regex: `.*${search.split(/ |-/)[0]}.*`,
							},
						},
						{
							"name.last": {
								$regex: `.*${search.split(/ |-/)[1]}.*`,
							},
						},
					],
				},
			]);

		console.log(search.split(/ |-/)[1]);

		query.select("-password").populate("orders");

		if (skip) query.skip(skip);

		query.limit(limit);

		const users = await query;

		res.status(200).json(users);
	} catch (err) {
		next(err, req, res, next);
	}
};


exports.updateStatus =(status)=> async(req, res, next) => {
	const id = req.body.id || req.query.id || req.user.userId
	try {
		const result = await User.updateOne({ _id: id }, { status: status })
	
	res.send(result)
} catch (err) {
	next(err,req,res,next)
	}
}



