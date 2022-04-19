const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		price: {
			type: "number",
			minimum: 1,
		},
    discount: { type: "number", minimum: 0, maximum: 99 },
    id: {
      type: "string",
      format:"objectId"
    },
    single: {
      type:"boolean"
    }
	},
	required: [],
};

module.exports = ajvInstance.compile(schema);
