import app from "../app.js";
import { connectDB } from "../config/database.js";
import serverless from "serverless-http";
let isConnected =false;
const handler = async(req:any,res:any)=>{
    if(!isConnected){
        await connectDB();
        isConnected=true;
    }
    return serverless(app)(req,res);
}
export default handler;