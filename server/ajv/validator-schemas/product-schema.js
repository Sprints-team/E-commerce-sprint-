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
			type: "string",
			format:"objectId"
		},
		brand: {
			type: "string",
			format:"objectId"
		},
	},
	required: ["title", "price", "stock", "describtion","gender","discount","ageGroup",]
};

module.exports = ajvInstance.compile(productSchema);
