const { default: mongoose } = require("mongoose");
const BadRequest = require("../errors/bad-request");
const Product = require("../model/product");
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.getProduct = async (req, res, next) => {
	//get all the product data
	const id = req.params.id;
	try {
		let query = Product.findOne()
			.where("_id")
			.equals(id)
			.populate("category", "title")
			.populate("brand", "title");

		const product = await query.exec();
		if (!product) {
			const err = new BadRequest("there is no product with that id");
			return next(err, req, res, next);
		}
		return res.status(200).json(product);
	} catch (err) {
		next(err, req, res, next);
	}
};

//?get all products data || get only the title,brice,id,discount, and images
exports.getProducts = async (req, res, next) => {
	const { title, brand, category, price, rating, sort, skip, limit } = req.body;

	const pipeline = [
		{ $limit: limit ? limit : 20 },
		{
			$project: {
				title: 1,
				price: 1,
				images: 1,
				rate: "$reviews.rating",
			},
		},
	];
	if (title)
		pipeline.unshift({
			$match: {
				title: {
					$regex: `.*${title}.*`,
				},
			},
		});

	if (price && (price.hasOwnProperty("gt") || price.hasOwnProperty("lt"))) {
		const compare = {};
		if (price.gt) compare.$gte = +price.gt;
		if (price.lt) compare.$lte = +price.lt;

		pipeline.unshift({
			$match: {
				price: compare,
			},
		});

		if (sort === -1) {
			pipeline.unshift({
				$sort: {
					price: -1,
				},
			});
		} else if (sort === 1) {
			pipeline.unshift({
				$sort: {
					price: 1,
				},
			});
		}
	}
	if (typeof rating !== "undefined") {
		console.log("hello");
		pipeline.unshift({
			$match: {
				"reviews.rating": {
					$gte: +rating,
				},
			},
		});
		if (sort === -1) {
			pipeline.unshift({
				$sort: {
					"reviews.rating": -1,
				},
			});
		} else if (sort === 1) {
			pipeline.unshift({
				$sort: {
					"reviews.rating": 1,
				},
			});
		}
	}
	if (!sort)
		pipeline.unshift({
			$sort: {
				_id: -1,
			},
		});
	if (skip)
		pipeline.unshift({
			$skip: skip,
		});

	if (brand)
		pipeline.unshift({
			$match: {
				brand: new ObjectId(brand),
			},
		});

	if (category)
		pipeline.unshift({
			$match: {
				category: new ObjectId(category),
			},
		});
	try {
		const products = await Product.aggregate(pipeline);
		res.send(products);
	} catch (err) {
		next(err, req, res, next);
	}
};
