const ajvInstance = require("../ejv-instance");

const ObjectIdSchema = {
	type: "object",
	properties: {
		id: { type: "string", format: "objectId" },
	},
};

module.exports = ajvInstance.compile(ObjectIdSchema);
