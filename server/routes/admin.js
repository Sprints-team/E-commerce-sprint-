const express = require("express");
const router = express.Router();
const { addProduct,addImageToProduct} = require("../controllers/admin-controller");


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

router.post(
	"/add-product", upload.array("files",5),
	(req, res, next) => {
		req.body = JSON.parse(req.body.json)
		next()
	},
	validator(producCompiledSchema),
	addProduct
);


router.post(
	"/add-product/:id",
	validator(objectIdCompiledSchema,true),
	upload.array("files"),
	fileExtensionValidator,
	addImageToProduct
);

module.exports = router;
