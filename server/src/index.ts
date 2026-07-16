import dotenv from "dotenv";
import express from "express";
import { logger } from "./middleware/type.middleware.js";
dotenv.config();
const app=express();
app.use(logger);
const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("hello from server");
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})