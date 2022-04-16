const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		price: {
      type: "number",
      minimum:1
		},
		discount: { type: "number", minimum: 0,maximum:99 },
    stock: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skuId: {
            type: "string",
            format:"objectId"
          },
          size: {
            type: "string",
            format:"size"
          },
          qty: {
            type: "number",
            minimum: 0,
          }
        }
      }
    },
	},
	required: [],
};

module.exports = ajvInstance.compile(schema);
