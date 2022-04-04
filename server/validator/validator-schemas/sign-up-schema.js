const ajvInstance=require("../ejv-instance")


const signupSchema = {
    type: "object",
    properties: {
        name: {
            type: "object",
            properties:{
                first: { type: "string", format:"only-letters"},
                last: { type: "string", format: "only-letters" }
            },
            required:["first","last"]
        },
        email: { type: "string", format: "email" },
        password: { type: "string", format:"strong-password"},
        confirmPassword: {
            type: "string", format:"strong-password"}
    },
    required:["name","email","password","confirmPassword"]
}


module.exports= ajvInstance.compile(signupSchema)