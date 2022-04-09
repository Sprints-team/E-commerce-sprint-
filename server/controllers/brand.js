const Brand = require("../model/brands");
const BadRequest=require("../errors/bad-request");
const { deleteHandlerCreator } = require("../helpers/controller-creators");


exports.addBrand=async (req, res, next) => {
  const logo = `uploudes/${req.file.filename}`;

  const brand = new Brand({
    ...req.body,
    logo,
  });
  try {
    await brand.save();
    res.status(200).json({
      msg: `brand added successfully`,
    });
  } catch (err) {
    if (err.code && err.code === 11000) {
      return next(new BadRequest(`there is a brand with that title already exists`), req, res, next);
    }
    next(err, req, res, next);
  }
};


exports.deleteBrand = deleteHandlerCreator(Brand, "brand", (doc) => {
	console.log(doc)
});