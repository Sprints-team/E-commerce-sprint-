const express = require("express")
const path= require("path")
const connectToDataBase = require("./utils/data-base")
const authorizationMiddleware = require("./controllers/authorization-middleware")
const checkIfAdmin = require("./middleware/validators/admin-authorization")
const errorHandler = require("./middleware/error-handler/error-handler")

require("dotenv").config()

const mongoConnectionUri = process.env.MONGO_CONNECTION
const port = process.env.PORT
// routers
const adminRouter=require("./routes/admin")
const userRouter=require("./routes/user")
const authRouter=require("./routes/auth")



const app=express()


// miidleware for parsing incomming request
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));







// static files
app.use(express.static(path.join(__dirname, "public")));




//routes
app.use("/auth", authRouter)

app.use("/admin",authorizationMiddleware,checkIfAdmin,adminRouter)
app.use("/user", userRouter)
app.use(errorHandler)




//initializing app and connecting to database
connectToDataBase(mongoConnectionUri, () => {
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`)
    })
})