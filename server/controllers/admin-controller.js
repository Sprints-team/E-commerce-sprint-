const Product = require("../model/product");
const BadRequest = require("../errors/bad-request");
const Category = require("../model/category");

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
    
    const images=req.files.map(ele => {
        return `uploudes/${ele.filename}`
    })

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
        images
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
            return next(err,req,res,next)
            // return res.status(404).json({msg:err.message})
        }
        return res.status(200).json({msg:"image Addded successfully"})
    } catch (err){
        return res.status(404).json({error:"404",msg: err})
    }
}


exports.deleteProduct = async(req, res, next) => {
    const id = req.params.id
    const record = await Product.deleteOne({ _id: id })
    if (record.deletedCount === 0) {
        throw new BadRequest("there is no product wiht that id")
        // return res.status(400).json({error:"400",msg:"there is no product wiht that id"})
    }
    try {
        console.log(record)
        return res.status(200).json({msg:"product deleted successfully"})
    } catch (err) {
        next(err,req,res,next)
    }
}


exports.addCategory = async (req,res,next) => {
    const { title, describtion } = req.body

    const imgUrl = `uploudes/${req.file.filename}`

    const category = new Category({
        title,describtion,imgUrl
    }) 
    
    try {
        await category.save()
        return res.status(200).json("category added successfuly")
    } catch (err) {
        if (err.code&&err.code === 11000) {
            return next (new BadRequest("there is a cateory with that title"),req,res,next)
        }
        next(err,req,res,next)
    }
}
