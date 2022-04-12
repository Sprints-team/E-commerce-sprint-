const ajvInstance = require("../ejv-instance");


const categorySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		title: {
			type: "string",
			format: "alph-numeric",
		},
		abrv: {
			type: "string",
			format:"cate-abrv"
		},
		describtion: {
			type: "string",
			format: "alph-numeric",
		},
		gender: {
			type: "string",
			enum:["MALE","FEMALE","UNISEX","male","female","unisex"]
		}
	},
	required: ["title", "describtion"],
};



module.exports= ajvInstance.compile(categorySchema)