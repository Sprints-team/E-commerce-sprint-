const ajvInstance = require("../ejv-instance");

// const imageArrSchema = {
//     images: {
//         type: "array",
//         items: {
//             type: "string",
//             format:
//         }
//     }
// }

const productSchema = {
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
		price: {
			type: "string",
			format: "number-string",
			// minimum: 1,
		},
		discount: {
			type: "string",
			format: "number-string",
			// minimum: 0,
		},
		gender: {
			type: "string",
			enum: ["MALE", "FEMALE"],
		},
		ageGroup: {
			type: "string",
			enum: ["ADULT", "CHILD"],
		},
		colors: {
			type: "object",
			patternProperties: {
				"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$": {
					type: "object",
					patternProperties: {
						'^(?:[1-9]|[2-4][0-9]|50)$': {
							type: "object",
							properties: {
								qty:{type:"number"}
							}
						},
						"^(\d*(?:M|X{0,2}[SL]))(?:$|\s+.*$)": {
							type: "object",
							properties: {
								qty:{type:"number"}
							}
						},
					},
					additionalProperties: false
				}
			},
			additionalProperties: false
		},
		category: {
			type: "string",
			format: "objectId",
		},
		brand: {
			type: "string",
			format: "objectId",
		},
	},
	required: ["title", "price", "describtion", "gender", "ageGroup"],
};

module.exports = ajvInstance.compile(productSchema);
