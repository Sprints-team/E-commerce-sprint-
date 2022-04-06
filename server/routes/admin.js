const express = require("express");
const router = express.Router();
const {
	addProduct,
	psotHandlerCreator,
    deleteHandlerCreator,
} = require("../controllers/admin-controller");

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
const Brand = require("../model/brands");
const Category = require("../model/category");
const Product = require("../model/product");
// router

// will accept form-data--> uses multer to upload the file and pass any text to the req.body
// the text data will be sent in the form of json with a json key
/* 
    data-->
	form data :{
	files--> the uploaded files
	json--> {
    "title":"product1 ",
    "describtion":"a very good product",
    "price": 33.3,
    "discount":0,
    "gender":"MALE",
    "ageGroup":"ADULT",
    "stock":{
        "sizes":[
            {
                "size":"S",
                "colors":[{
                    "hexColor":"#ffffff",
                    "qty": 33
                },{
                    "hexColor":"#eeeeee",
                    "qty": 33
                },{
                    "hexColor":"#000000",
                    "qty": 33
                }]
            }, {
                "size":"M",
                "colors":[{
                    "hexColor":"#ffffff",
                    "qty": 33
                },{
                    "hexColor":"#eeeeee",
                    "qty": 33
                },{
                    "hexColor":"#000000",
                    "qty": 33
                }]
            }, {
                "size":"L",
                "colors":[{
                    "hexColor":"#ffffff",
                    "qty": 33
                },{
                    "hexColor":"#eeeeee",
                    "qty": 33
                },{
                    "hexColor":"#000000",
                    "qty": 33
                }]
            }
        ]
    }
}
	}

*/
// to send product data as form data would be hard

//using two request one as application/json and the other multipart json

// product data as json-->sent firt the the user will get the prod id and make another
//request to upload the images

// router.use(["/add-product","add-category"],upload)

router.post(
	"/product",
	upload.array("files", 5),
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
    psotHandlerCreator(Category, "imgUrl")
);

//form data
router.post(
    "/brand",
    upload.single("image"),
    fileExtensionValidator,
    validator(brandCompiledSchema),
    psotHandlerCreator(Brand, "logo")
);


router.delete(
    "/product/:id",
	validator(objectIdCompiledSchema, true),
	deleteHandlerCreator(Product)
    );
    
    router.delete(
        "/category/:id",
        validator(objectIdCompiledSchema, true),
        deleteHandlerCreator(Category)
        );

        router.delete(
            "/brand/:id",
            validator(objectIdCompiledSchema, true),
            deleteHandlerCreator(Brand)
);


module.exports = router;

// router.post(
// 	"/add-product/:id",
// 	validator(objectIdCompiledSchema, true),
// 	upload.array("files"),
// 	fileExtensionValidator,
// 	addImageToProduct
// );