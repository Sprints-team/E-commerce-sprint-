const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajvInstance= new Ajv({allErrors:true})
addFormats(ajvInstance)

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
const alpha = new RegExp(/^[a-zA-Z]+$/)
const alphNumericRgx = new RegExp(/[a-zA-Z0-9]/)
const checkForObjectId = new RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
const checkIfStrOfInt = new RegExp('^[0-9]*$')
const checkIfStrOfFlt= new RegExp('[+-]?([0-9]*[.])?[0-9]+')

ajvInstance.addFormat('strong-password', {
    validate: (password)=> strongPassword.test(password)
})

ajvInstance.addFormat("int-string-only", {
    validate: (string)=>checkIfStrOfInt.test(string)
})

ajvInstance.addFormat("number-string", {
    validate: (string)=>checkIfStrOfInt.test(string)
})

ajvInstance.addFormat('objectId', {
    validate:(string)=> checkForObjectId.test(string)
})

ajvInstance.addFormat('only-letters', {
    validate: (alpah)=>alpha.test(alpah)
})

ajvInstance.addFormat('alph-numeric', {
    validate:(string)=>alphNumericRgx.test(string)
})

ajvInstance.addFormat('confirmed-password', {
    validate: function (confirmPassword) {
        console.log(this.password)
        return this.password === confirmPassword
    }
})




module.exports=ajvInstance