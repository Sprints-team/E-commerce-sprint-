class NotFound extends Error {
    constructor(message) {
        super(message)
        this.status = 404
        this.name="data was not found"
    }
}



module.exports= NotFound