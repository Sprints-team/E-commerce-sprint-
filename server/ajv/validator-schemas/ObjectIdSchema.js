const ajvInstance=require("../ejv-instance")


const ObjectIdSchema = {
    type: "string",
    format:"objectId"
}


module.exports=ajvInstance.compile(ObjectIdSchema)
