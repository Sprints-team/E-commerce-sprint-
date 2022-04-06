const Product = require("../model/product");
const BadRequest = require("../errors/bad-request");



const getModelName = (Model) => {
    const modalWithNoS = Model.collection.collectionName.substr(
        0,
        Model.collection.collectionName.length - 1
        )
        return modalWithNoS.endsWith("ie")
        ? modalWithNoS.substr(0, modalWithNoS.length - 2) + "y"
        : modalWithNoS
    }
    
    
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

	const images = req.files.map((ele) => {
		return `uploudes/${ele.filename}`;
	});

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
		images,
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

exports.addImageToProduct = async (req, res, next) => {
	const images = req.files.map((ele) => {
		return `uploudes/${ele.filename}`;
	});
	const id = req.params.id;
	const err = await Product.addImages(id, images, res);
	try {
		if (err) {
			return next(err, req, res, next);
			// return res.status(404).json({msg:err.message})
		}
		return res.status(200).json({ msg: "image Addded successfully" });
	} catch (err) {
		return res.status(404).json({ error: "404", msg: err });
	}
};


// a handler creator that handles all delete requests
exports.deleteHandlerCreator = (Model) => {
	return async (req, res, next) => {
		const id = req.params.id;

        const record = await Model.deleteOne({ _id: id });
    
        const modalName=getModelName(Model)

		try {
			if (record.deletedCount === 0) {
				throw new BadRequest(`there is no ${modalName} with that id`);
			}
			return res.status(200).json({ msg: `${modalName} deleted successfully` });
		} catch (err) {
			next(err, req, res, next);
		}
	};
};

// post to handle cat and brand 
exports.psotHandlerCreator = (Model,fileRef) => {
	return async (req, res, next) => {
		console.log(req.body);
		image = `uploudes/${req.file.filename}`;

		const doc = new Model({
			...req.body,
			[fileRef]: image,
		});
		("asda");
        const modalName=getModelName(Model)
		try {
			await doc.save();
			res.status(200).json({
				msg: `${
					modalName
				} added successfully`,
			});
		} catch (err) {
			if (err.code && err.code === 11000) {
				return next(new BadRequest(`there is a ${modalName} with that title already exists  `), req, res, next);
			}
			next(err, req, res, next);
		}
	};
};