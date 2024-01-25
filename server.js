import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoutes.js'
import TaskRoutes from './Routes/TaskRoutes.js'
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
app.use(cors());
app.use("/api",TaskRoutes);//All Task Related operations
app.use("/auth",AuthRoute);//Authentication routes

app.get('/',(req,res)=>{
    res.json({message:"Hello"})
})

const PORT = 5000;

/*Connecting to MongoDB Database*/
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
.catch((error)=>console.log(`${error} did not connect`));
