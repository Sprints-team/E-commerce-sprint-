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



exports.addImageToProduct =async (req,res,next) => {
    const images = req.files.map(ele => {
        return `uploudes/${ele.filename}`
    })
    const id = req.params.id
    const err=await Product.addImages(id,images,res)
    try {
        if (err) {
            console.log(err.message)
            return res.status(404).json({msg:err.message})
        }
        return res.status(200).json({msg:"image Addded successfully"})
    } catch (err){
        console.log(err)
        return res.status(404).json({error:"404",msg: err})
    }
}