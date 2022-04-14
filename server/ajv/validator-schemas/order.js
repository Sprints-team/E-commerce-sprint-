const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		products: {
			type: "object",
			patternProperties: {
				"[^]*": {
					type: "object",
					properties: {
						size: {
							type: "string",
							format: "size",
						},
						qty: {
							type: "number",
							minimum: 1,
						},
					},
				},
			},
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
