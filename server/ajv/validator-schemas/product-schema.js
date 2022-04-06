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
			type: "number",
			minimum: 1,
		},
		discount: {
			type: "number",
			minimum: 0,
		},
		gender: {
			type: "string",
			enum: ["MALE", "FEMALE"],
		},
		ageGroup: {
			type: "string",
			enum: ["ADULT", "CHILD"],
		},
		stock: {
			type: "object",
			properties: {
				sizes: {
					type: "array",
					uniqueItems: true,
					items: {
						type: "object",
						properties: {
							size: {
								type: "string",
								format: "universal-size",
							},
							colors: {
								type: "array",
								uniqueItems: true,
								items: {
									type: "object",
									properties: {
										hexColor: {
											type: "string",
											format: "hex-decimal-color",
										},
										qty: {
											type: "number",
											minimum: 1,
										},
									},
									required: ["hexColor", "qty"],
								},
							},
						},
						required: ["size", "colors"],
					},
				},
			},
			required: ["sizes"],
		},
		category: {
			type: "object",
			properties: {
				categoryId: {
					type: "string",
					format: "objectId",
				},
				categoryName: {
					type: "string",
					format: "alph-numeric",
				},
			},
		},
		brand: {
			type: "object",
			properties: {
				brandName: {
					type: "string",
					format: "objectId",
				},
				brandId: {
					type: "string",
					format: "alph-numeric",
				},
			},
		},
	},
	required: ["title", "price", "stock", "describtion","gender","discount","ageGroup",]
};

module.exports = ajvInstance.compile(productSchema);
