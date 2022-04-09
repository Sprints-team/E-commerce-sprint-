require("dotenv").config();
const secret = process.env.SECTRET_STRING;


const express = require("express");
const path = require("path");
const connectToDataBase = require("./utils/data-base");
const {checkIfAdmin}= require("./middleware/auth/auth")
const errorHandler = require("./middleware/error-handler/error-handler");
const cors= require("cors")


const mongoConnectionUri = process.env.MONGO_CONNECTION;
const port = process.env.PORT;
// routers
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const sharedRouter=require("./routes/store")

const app = express();


app.use(cors())

// miidleware for parsing incomming request
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

// static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/auth", authRouter);
// auth.checkIfAdmin 
app.use("/admin", checkIfAdmin(secret), adminRouter);
app.use("/user", userRouter);
app.use("/",sharedRouter)
app.use(errorHandler);

//initializing app and connecting to database
connectToDataBase(mongoConnectionUri, () => {
	app.listen(port, () => {
		console.log(`app is listening on port ${port}`);
	});
});
