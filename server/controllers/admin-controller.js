const Product = require("../model/product");

/* data received:
    1-the new product data  
    2-json web token 
*/

/* 
data returned json object and the id of the product in the db to add the images
 */
exports.addProduct = async (req, res) => {
	const {
		title,
		describtion,
		price,
		stock,
		category,
		brand,
		discount,
		gender,
		ageGroup,
	} = req.body;

	const product = new Product({
		price: price,
		title: title,
		describtion: describtion,
		discount,
		gender,
		ageGroup,
		stock: stock,
		category: category,
		brand: brand,
	});
	const response = await product.save();
	try {
		res
			.status(200)
			.json({ msg: "product has bean added succesfully", id: response._id });
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: "not a correct product data" });
	}
};
