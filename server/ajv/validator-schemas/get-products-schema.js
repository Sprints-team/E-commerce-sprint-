const ajvInstance = require("../ejv-instance")

//{ title, brand, category,gender, price, rating, sort, skip, limit } 
const getProductsSchema = {
    type: "object",
	additionalProperties: false,
    properties: {
        title: {
            type: "string",
        },
        brand: {
            type: "string",
        },
        category: {
            type: "string",
        },
        gender: {
            type: "string",
            enum:["M","F","U"]
        },
        ageGroup: {
            type: "string",
            enum:["A","C"]
        },
        price: {
            type: "object",
            properties: {
                gt: {
                    type: "number",
                    format:"positive-number"
                },
                lt: {
                    type: "number",
                    format:"positive-number"
                }
            }
        },
        rating: {
            type: "number",
            format:"five-star-rating"
        },
        sort: {
            type: "number",
            enum:[1,-1]
        },
        skip: {
            type: "number",
            format:"five-star-rating"
        },
        limit: {
            type: "number",
            format:"five-star-rating"
        },
        bestSeller: {
            type:"boolean"
        }
    }
}



module.exports= ajvInstance.compile(getProductsSchema)