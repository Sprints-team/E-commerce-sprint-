const ajvInstance=require("../ejv-instance")


const schema = {
    type: "object",
    properties: {
      id: {
        type: "string",
        format:"objectId"
      }
    },
    required:["id"]
}


module.exports= ajvInstance.compile(schema)