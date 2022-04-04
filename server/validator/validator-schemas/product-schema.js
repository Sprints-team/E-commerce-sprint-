const ajvInstance = require("../ejv-instance")

// const imageArrSchema = {
//     images: {
//         type: "array",
//         items: {
//             type: "string",
//             format: 
//         }
//     }
// }


const productSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            format:"alph-numeric"
        },
        describtion: {
            type: "string",
            format:"alph-numeric"
        },
        price: {
            type: "string",
            format:"number-string",
        },
        discount: {
            type: "string",
            format:"number-string",
        },
        inStock: {
            type: "string",
            format:"int-string-only",
        },
        category: {
            type: "string",
            format:"objectId"
        }
        ,
        brand: {
            type: "string",
            format:"objectId"
        }
    },
    required:["title","price","inStock","describtion"]
}


module.exports= ajvInstance.compile(productSchema)