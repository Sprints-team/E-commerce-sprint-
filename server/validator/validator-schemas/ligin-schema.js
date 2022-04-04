const ajvInstance=require("../ejv-instance")

const logInSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" }
    },
    required:["email","password"]
}


module.exports=ajvInstance.compile(logInSchema)