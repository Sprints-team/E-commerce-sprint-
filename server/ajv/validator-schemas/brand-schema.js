const ajvInstance = require("../ejv-instance");


const brandSchema = {
	type: "object",
	additionalProperties: false,
	properties: {
		title: {
			type: "string",
			format: "alph-numeric",
		},
		describtion: {
			type: "string",
			format: "alph-numeric",
        },
	},
	required: ["title", "describtion"],
};


module.exports=ajvInstance.compile(brandSchema)


