const { default: mongoose } = require("mongoose");
const BadRequest = require("../errors/bad-request");
const NotFound = require("../errors/not-found");
const Product = require("../model/product");
const ObjectId = mongoose.Types.ObjectId;
const deleteImage = require("../helpers/deleteImages");
const { deleteHandlerCreator } = require("../helpers/controller-creators");
const getColorImages = require("../helpers/ge-color-Images");

/* data received:
      1-the new product data  
      2-json web token 
  */

/* 
  data returned json object and the id of the product in the db to add the images
   */

exports.addProduct = async (req, res, next) => {
	const {
		title,
		describtion,
		price,
		colors,
		category,
		brand,
		discount,
		gender,
		ageGroup,
	} = req.body;

	// console.log(req.files,"files")
	const images = getColorImages(req.files);
	// const images = req.files.map((ele) => {
	// 	return `uploudes/${ele.filename}`;
	// });
	console.log(images);

	const product = new Product({
		price: +price,
		title: title,
		describtion: describtion,
		discount,
		gender,
		ageGroup,
		colors: colors,
		category: category,
		brand: brand,
		images,
	});
	try {
		const response = await product.save();
		res
			.status(200)
			.json({ msg: "product has bean added succesfully", id: response._id });
	} catch (err) {
		next(err, req, res, next);
	}
};

//delete
exports.deleteProduct = deleteHandlerCreator(Product, "product", (doc) => {
	console.log(doc, "doc");
});

// get
exports.getProduct = async (req, res, next) => {
	//get all the product data
	const id = req.params.id;
	try {
		let query = Product.findOne()
			.where("_id")
			.equals(id)
			.populate("category", "title")
			.populate("brand", "title")
			.populate("skus")
			.select("-colors");

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
	const {
		title,
		brand,
		category,
		gender,
		ageGroup,
		price,
		rating,
		sort,
		skip,
		limit,
	} = req.body;
	//
	//1->match 2-->lookup || project
	let pipeline = [
		{
			$lookup: {
				from: "skus",
				localField: "skus",
				foreignField: "_id",
				as:"skus"
			}
		},
		{
			$project: {
				title: 1,
				price: 1,
				images: 1,
				ageGroup: 1,
				rate: "$reviews.rating",
				skus:1
			},
		},
	];
	const matchArr = [];
	const sortArr = [];
	// first to match with
	if (title)
		matchArr.push({
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

		matchArr.push({
			$match: {
				price: compare,
			},
		});

		if (sort === -1) {
			sortArr.unshift({
				$sort: {
					price: -1,
				},
			});
		} else if (sort === 1) {
			sortArr.unshift({
				$sort: {
					price: 1,
				},
			});
		}
	}
	if (typeof rating !== "undefined") {
		console.log("hello");
		matchArr.push({
			$match: {
				"reviews.rating": {
					$gte: +rating,
				},
			},
		});
		if (sort === -1) {
			sortArr.unshift({
				$sort: {
					"reviews.rating": -1,
				},
			});
		} else if (sort === 1) {
			sortArr.unshift({
				$sort: {
					"reviews.rating": 1,
				},
			});
		}
	}
	if (!sort)
		sortArr.unshift({
			$sort: {
				createdAt: -1,
			},
		});
	if (brand)
		matchArr.push({
			$match: {
				brand: new ObjectId(brand),
			},
		});

	if (gender)
		matchArr.push({
			$match: {
				gender: gender,
			},
		});
	if (ageGroup)
		matchArr.push({
			$match: {
				ageGroup: ageGroup,
			},
		});
	if (category)
		matchArr.push({
			$match: {
				category: new ObjectId(category),
			},
		});

	pipeline = [...matchArr, ...sortArr, ...pipeline];

	if (skip) pipeline.push({ $skip: skip });

	pipeline.push({ $limit: limit || 20 });

	// return res.send(pipeline);
	try {
		const products = await Product.aggregate(pipeline);
		res.send(products);
	} catch (err) {
		next(err, req, res, next);
	}
};
