const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
		status: {
			type: "string",
			enum: [
				"PROCESSING",
				"WITH_CARRIER",
				"ON_THE_WAY",
				"DELIVERED",
				"CANCELED",
				"processing",
				"with_carrier",
				"on_the_way",
				"delivered",
				"canceled",
			],
		},
		carrier: {
			type: "string",
		},
		id: {
			type: "string",
			format: "objectId",
		},
		message: {
			type: "string",
		},
	},
	required: ["id", "status", "carrier"],
};

module.exports = ajvInstance.compile(schema);
