const Category = require("../model/category");
const BadRequest=require("../errors/bad-request");
const { deleteHandlerCreator } = require("../helpers/controller-creators");


exports.addCategory=async (req, res, next) => {
  const image = `uploudes/${req.file.filename}`;
  console.log(image)
  req.body.gender = req.body.gender.toUpperCase()
  const {title,describtion,gender,abrv}=req.body
  const category = new Category({
    title: title.trim(),
    describtion: describtion.trim(),
    gender: gender.trim(),
    abrv:abrv,
    imgUrl: image,
  });
  try {
    await category.save();
    res.status(200).json({
      msg: `category added successfully`,
    });
  } catch (err) {
    if (err.code && err.code === 11000) {
      return next(new BadRequest(`there is a category with that title already exists`), req, res, next);
    }
    next(err, req, res, next);
  }
};


exports.deleteCategory = deleteHandlerCreator(Category, "category", (doc) => {
  console.log(doc)
})