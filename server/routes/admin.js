const express = require("express");
const router = express.Router();
const { addProduct } = require("../controllers/admin-controller");


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


//ejv schemas
const producCompiledSchema = require("../ejv/validator-schemas/product-schema");
const objectIdCompiledSchema = require("../ejv/validator-schemas/ObjectIdSchema");
// router

// will accept form-data--> uses multer to upload the file and pass any text to the req.body
/* 
    data:
    title-->
    describtion-->
    price-->
    inStock-->
    category-name-->
    gender-->
    age-groub-->
    size-->
    colour-->
    file-->
*/
// to send product data as form data would be hard

//using two request one as application/json and the other multipart json

// product data as json-->sent firt the the user will get the prod id and make another
//request to upload the images

router.post(
	"/add-product",
	validator(producCompiledSchema),
	addProduct
);
router.post(
	"/add-product/:id",
	validator(objectIdCompiledSchema,true),
	upload.array("files"),
	fileExtensionValidator,
	async (req, res, next) => {
		// console.log(req.files);
		// console.log(req.params.id);
		const x = await JSON.parse(req.body.ha)
		console.log(x)
		res.end();
	}
);

module.exports = router;
