const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		newStock: {
			type: "array",
      items: {
        type: "object",
        properties: {
          size: {
            type:"string",
            format: "size"
          },
          qty: {
            type: "number",
            minimum:0
          }
        }
      },
    },
    id: {
      type: "string",
      format:"objectId"
    },
	},
	required: ["id","newStock"],
};

module.exports = ajvInstance.compile(schema);
