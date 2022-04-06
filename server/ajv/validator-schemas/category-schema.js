const ajvInstance = require("../ejv-instance");


const categorySchema = {
	type: "object",
	properties: {
		title: {
			type: "string",
			format: "alph-numeric",
		},
		describtion: {
			type: "string",
			format: "alph-numeric",
		},
		imgUrl: {
			type: "string",
		},
	},
	required: ["title", "describtion"],
};



module.exports= ajvInstance.compile(categorySchema)