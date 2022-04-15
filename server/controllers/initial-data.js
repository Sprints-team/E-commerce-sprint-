const Brand = require("../model/brands")
const Category = require("../model/category")


exports.initialData = async (req, res, next) => {
  try {
    const result = await Promise.all([Brand.find(), Category.find()])
    res.status(200).json({
      brands: result[0],
    categories:result[1]})
  } catch (err) {
    next(err,req,res,next)
  }
}