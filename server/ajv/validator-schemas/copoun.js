const ajvInstance = require("../ejv-instance");


const categorySchema = {
	type: "object",
	additionalProperties: false,
	properties: {
    code: {
      type:"string",
    },
    amount: {
      type: "number",
      minimum:0
    },
    percentile: {
      type:"boolean"
    },
    expirationDate: {
      type:"string"
    }
	},
	required: ["amount", "code","percentile","expirationDate"],
};



module.exports= ajvInstance.compile(categorySchema)