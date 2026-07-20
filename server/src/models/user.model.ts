import mongoose, { InferSchemaType, model,  Schema } from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },

},
{
    timestamps:true,
}
)
export type User=InferSchemaType<typeof UserSchema>;
export const UserModel=model<User>("User",UserSchema);