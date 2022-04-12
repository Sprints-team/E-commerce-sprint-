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
			type: "array",
			uniqueItems: true,
			items: {
				type: "object",
				properties: {
					color: {
						type: "string",
						format: "hex-decimal-color",
					},
					sizes: {
						type: "array",
						uniqueItems: true,
						items: {
							type: "object",
							properties: {
								size: {
									type: "string",
									oneOf:[{format:"universal-size",},{format:"num-size"}]
								},
								qty: {
									type: "number",
									minimum: 1,
								},
							},
							// required: ["size", "qty"],
						},
					},
				},
				// required: ["size", "colors"],
			},
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
