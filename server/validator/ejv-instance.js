const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajvInstance= new Ajv({allErrors:true})
addFormats(ajvInstance)

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
const isAlpha = new RegExp(/^[a-zA-Z]+$/)

ajvInstance.addFormat('strong-password', {
    validate: (password)=> strongPassword.test(password)
})

ajvInstance.addFormat('only-letters', {
    validate: (alpah)=>isAlpha.test(alpah)
})

ajvInstance.addFormat('confirmed-password', {
    validate: function (confirmPassword) {
        console.log(this.password)
        return this.password === confirmPassword
    }
})




module.exports=ajvInstance