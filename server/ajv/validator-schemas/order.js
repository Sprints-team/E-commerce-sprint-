const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		products: {
			type: "array",
			items: {
				type: "object",
				properties: {
					skuId: {
						type: "string",
						format:"objectId"
					},
					qty: {
						type: "number",
						minimum:1
					},
					size: {
						type: "string",
						format:"size"
					}
				},
				required:["skuId","qty","size"]
			}
		},

		country: {
			type: "string",
		},
		governerate: {
			type: "string",
		},
		city: {
			type: "string",
		},
		zipCode: {
			type: "number",
		},
		adress: {
			type: "string",
		},
  },
  required:["adress","city","zipCode","governerate","country","products"]
};

module.exports = ajvInstance.compile(schema);
