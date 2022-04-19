const NotFound = require("../errors/not-found");
const User = require("../model/user");

exports.getUsers = async (req, res, next) => {
	const id = (req.query.id || req.body.id)?.trim();
	const status = (req.body.status)?.trim().toUpperCase();
	const search = (req.body.search)?.trim();
	const skip = req.body.skip;
	const limit =req.body.limit || 20;
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
			throw new NotFound("there is no user with that id");
		}


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
	let id;
	if (req.user.role === "ADMIN") {
		id=req.body.id
	} else {
		id=req.user.userId
	}
	try {
		const result = await User.updateOne({ _id: id }, { status: status })
	
	res.status(200).send({msg:"user status updated successfully"})
} catch (err) {
	next(err,req,res,next)
	}
}



