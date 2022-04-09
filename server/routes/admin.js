const express = require("express");
const router = express.Router();
//multer
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads/");
	},
	filename: (req, file, cb) => {
		let extArray = file.mimetype.split("/");
		let extension = extArray[extArray.length - 1];
		cb(null, `image-${Date.now()}.${extension}`);
	},
});
const upload = multer({ storage: storage });

// validator middlewares
const validator = require("../middleware/validators/validator-middleware");
const fileExtensionValidator = require("../middleware/validators/file-extension-validator");

// middlewares
const parseJson = require("../middleware/parsing-middlewares/jsonParse");

//ejv schemas
const producCompiledSchema = require("../ajv/validator-schemas/product-schema");
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const categoryCompiledSchema = require("../ajv/validator-schemas/category-schema");
const brandCompiledSchema = require("../ajv/validator-schemas/brand-schema");
//controllers
const {addProduct,deleteProduct}=require("../controllers/product")
const { deleteCategory, addCategory } = require("../controllers/category");
const { addBrand, deleteBrand } = require("../controllers/brand");



// router
router.post(
	"/product",
	upload.any(),
	parseJson,
	fileExtensionValidator,
	validator(producCompiledSchema),
	addProduct
);

// form data
router.post(
	"/category",
	upload.single("image"),
	fileExtensionValidator,
	validator(categoryCompiledSchema),
    addCategory
);

//form data
router.post(
	"/brand",
	upload.single("image"),
	fileExtensionValidator,
	validator(brandCompiledSchema),
    addBrand
);

router.delete(
	"/product/:id",
	validator(objectIdCompiledSchema, true),
    deleteProduct
);

router.delete(
	"/category/:id",
	validator(objectIdCompiledSchema, true),
	deleteCategory
);

router.delete(
	"/brand/:id",
	validator(objectIdCompiledSchema, true),
	deleteBrand
);


module.exports = router;