import { RequestHandler } from "express";
import {  ZodError, ZodType } from "zod";
import HttpError from "../utils/httperror.js";

export const validate=(schema:ZodType ):RequestHandler=>(req,res,next)=>{
    try{
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        });
        next();
    }
    catch(error){
        if(error instanceof ZodError){
            return next(HttpError.badRequest(error.issues.map((i)=>i.message).join(',')));
        }
        return next(error);
    }
}