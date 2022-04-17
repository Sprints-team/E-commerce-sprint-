const ajvInstance = require("../ejv-instance")

//{ title, brand, category,gender, price, rating, sort, skip, limit } 
const getProductsSchema = {
    type: "object",
	additionalProperties: false,
    properties: {
        search: {
            type: "string",
      },
      status: {
        type: "string",
        enum:["ACTIVE","INACTIVE","SUSPENDED","active","inactive,suspended"]
      },
      skip: {
        type:"number"
      },
      limit: {
        type:"number"
      },
      id: {
        type: "string",
        format:"objectId"
      }
    }
}



module.exports= ajvInstance.compile(getProductsSchema)