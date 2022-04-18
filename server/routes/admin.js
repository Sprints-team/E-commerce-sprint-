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

//ajv schemas
const producCompiledSchema = require("../ajv/validator-schemas/product-schema");
const objectIdCompiledSchema = require("../ajv/validator-schemas/ObjectIdSchema");
const categoryCompiledSchema = require("../ajv/validator-schemas/category-schema");
const brandCompiledSchema = require("../ajv/validator-schemas/brand-schema");
const orderStatus = require("../ajv/validator-schemas/order-status");
const getOrderSchem = require("../ajv/validator-schemas/get-order");
const updateProductSchema = require("../ajv/validator-schemas/update-product");
const getUsersSchema = require("../ajv/validator-schemas/get-users");
const statuschmea= require("../ajv/validator-schemas/status")

//controllers
const {
	addProduct,
	deleteProduct,
	updateProduct,
} = require("../controllers/product");
const { deleteCategory, addCategory } = require("../controllers/category");
const { addBrand, deleteBrand } = require("../controllers/brand");
const { updateOrderStatus, getOrders } = require("../controllers/order");
const { getUsers, updateStatus } = require("../controllers/user");
const { getStatistics } = require("../controllers/initial-data");

// router

//get
router.get("/statistics",getStatistics)
router.get("/orders", validator(getOrderSchem), getOrders);
router.get("/users", validator(getUsersSchema), getUsers);

//post
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
	upload.single("category"),
	fileExtensionValidator,
	validator(categoryCompiledSchema),
	addCategory
);

//form data
router.post(
	"/brand",
	upload.single("brand"),
	fileExtensionValidator,
	validator(brandCompiledSchema),
	addBrand
);

//put
router.put("/order", validator(orderStatus), updateOrderStatus);
router.put("/product/:id", validator(updateProductSchema), updateProduct);
router.put("/user/suspend",validator(statuschmea) ,updateStatus("SUSPENDED"));
router.put("/user/active", validator(statuschmea),updateStatus("ACTIVE"));

//delete

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
