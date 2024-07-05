// our server will handle json data upto 16kb
import express from 'express'
import cors from 'cors'
const app = express();

app.use(express.json({
    limit: "16kb"
}))

// converting the data to urlencoded
app.use(express.urlencoded({
    extended : true
}))

// allowing cors
app.use(cors('*'));

// in order to use the public assests
app.use(express.static("public"))
// routes
import userRouter from './routes/user/userRoutes.js'

app.use("/users", userRouter)


export default app;