const ajvInstance = require("../ejv-instance");

const schema = {
	type: "object",
	properties: {
    status: {
      type: "string",
      enum:[
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
    userId: {
      type: "string",
      format:"objectId"
    },
    id: {
      type: "string",
      format:"objectId"
    }
  },
};

module.exports = ajvInstance.compile(schema);
