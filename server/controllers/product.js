const { default: mongoose } = require("mongoose");
const BadRequest = require("../errors/bad-request");
const Product = require("../model/product");
const ObjectId = mongoose.Types.ObjectId;
const { deleteHandlerCreator } = require("../helpers/controller-creators");
const getColorImages = require("../helpers/ge-color-Images");
const SKU = require("../model/sku");

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

	const images = getColorImages(req.files);

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
		const response = await product.addProduct();
		if (response.saved)
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

// get with skuid
exports.getProduct = async (req, res, next) => {
	//get all the product data
	const id = req.params.id;
	const pipeline = [
		{
			$match: {
				_id: new ObjectId(id),
			},
		},
		{
			$lookup: {
				from: "products",
				localField: "productId",
				foreignField: "_id",
				as: "product",
				pipeline: [
					{
						$lookup: {
							from: "categories",
							localField: "category",
							foreignField: "_id",
							as: "category",
						},
					},
					{
						$lookup: {
							from: "brands",
							localField: "brand",
							foreignField: "_id",
							as: "brand",
						},
					},
					{
						$lookup: {
							from: "skus",
							localField: "skus",
							foreignField: "_id",
							as: "colors"
						}
					},
					{
						$unwind: "$category",
					},
					{
						$unwind: "$brand",
					},
					{
						$project: {
							"skus":0
						}
					}
				],
			},
		},
		{
			$replaceRoot: {
				newRoot: {
					$mergeObjects: [{ $arrayElemAt: ["$product", 0] }, "$$ROOT"],
				},
			},
		},
		{ $project: { product: 0 } },
	];

	try {
		const product = await SKU.aggregate(pipeline);
		console.log(product);
		if (!product[0]) {
			const err = new BadRequest("there is no product with that id");
			return next(err, req, res, next);
		}
		return res.status(200).json(product[0]);
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
				as: "skus",
			},
		},
		{
			$project: {
				title: 1,
				price: 1,
				images: 1,
				ageGroup: 1,
				rate: "$reviews.rating",
				skus: 1,
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

// [
// 	{
// 		skuId,
// 		size,
// 		qty,
// 	},
// ];

exports.updateProduct = async (req, res, next) => {
	const newPrice = req.body.price || req.query.price;
	const newDiscount = req.body.discount || req.query.discount;
	const newStock = req.body.stock;
	const productId = req.params.id;
	console.log("upthere");

	const updateProductQuery = Product.updateOne().where("_id").equals(productId);

	if (newPrice) updateProductQuery.set("price", newPrice);
	if (newDiscount) updateProductQuery.set("discount", newDiscount);
	if (newStock) {
		const stockUpdates = {};
		console.log("downherer");
		newStock.forEach((prod) => {
			const qtyField = `sizes.${prod.size}.qty`;
			if (stockUpdates[prod.skuId]) {
				stockUpdates[prod.skuId] = stockUpdates[prod.skuId]
					.where(qtyField)
					.equals({ $exists: true })
					.set(qtyField, prod.qty);
				console.log(prod.qty);
			} else {
				stockUpdates[prod.skuId] = SKU.updateOne()
					.where("_id")
					.equals(prod.skuId)
					.where(qtyField)
					.equals({ $exists: true })
					.set(qtyField, prod.qty);
			}
		});
		try {
			const results = await Promise.all([
				...Object.values(stockUpdates),
				updateProductQuery,
			]);
			return res.status(200).json({ msg: "updated successfully" });
		} catch (err) {
			next(err, req, res, next);
		}
	}
};

exports.addReview = async (req, res, next) => {
	const { productId, review, rate } = req.body;
	const userName = req.user.userName;

	console.log(userName, "userName");
	// return res.send(userName);
	const newReview = {
		user: { userName },
		rating: rate,
		content: review,
	};

	try {
		const product = await Product.findById(productId).select("reviews");

		const reviews = {
			reviews: [...product.reviews.reviews, newReview],
			rating:
				(rate + product.reviews.reviews.length * product.reviews.rating) /
				(product.reviews.reviews.length + 1),
		};

		const updatedProduct = await Product.updateOne(
			{ _id: productId },
			{ $set: { reviews: reviews } }
		);
		if (updatedProduct.modifiedCount === 0)
			return res.status(403).json({ error: "403", msg: "couldn't add review" });
		res.status(200).json({ msg: "review added successfully" });
	} catch (err) {
		next(err, req, res, next);
	}
};
