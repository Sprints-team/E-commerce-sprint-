const passwordValidator = (password) => {
    const validator = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})')
    
    if (!validator.test(password)) {
        return false
    }
    if (password.includes(" ")) {
        return false
    }

    return true
}

module.exports= passwordValidator