// handles any any email dublication 
const handleEmailDublicationError = (err,res) => {
    const field=Object.keys(err.keyValue)
    const code = 409
    
    res.status(code).json({field:field[0],error: `an account with that ${field} already exist`})
}


// handles if there is any validation of the input was not fullfilled
const handleValidationError = (err, res) => {
    const code=400
    const {errors}=err
    const fields = Object.keys(errors)
    errors[fields[0]]
    res.status(400).json({field:errors[fields[0]].path,error:errors[fields[0]].message})
}

// middleware for handling any error rom the auth route 
const authErrorHandler = (err,req,res,next) => {
    try {
        if (err.name === "ValidationError") return handleValidationError(err, res)
        if (err.code && err.code === 11000) return handleEmailDublicationError(err, res)
        // --> fields yet to be added 


} catch (err){
    res.status(500).json({error:"unknown error has occured"})
    }

}



module.exports=authErrorHandler