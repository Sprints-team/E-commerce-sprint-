const Product = require("../model/product");




/* data received:
    1-the new product data  
    2-json web token 
*/
exports.addProduct =async (req, res) => {
    const { title, describtion, price, inStock, images, category, brand } = req.body

    console.log(req.files,"files")

    const product = new Product({
        price:price,
        title: title,
        describtion: describtion,
        inStock:inStock,
        images: images,
        category: category,
        brand:brand
    })
    const response=await product.save()
    try {
        res.status(200).json({msg:"product has bean added succesfully"})
    } catch (err) {
        console.log(err)
        res.status(400).json({error:"not a correct product data"})
    }
}