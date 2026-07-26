import mongoose from "mongoose";

const taskSchema= new mongoose.Schema(
    {
        title :{
            type:String,
            required:true,
        },
        description :{
            type:String,
            default:"",
        },
        deadline:{
            type:Date,
            default:()=>new Date(Date.now()+24*60*60*1000),
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user:{
            type : mongoose.Schema.Types.ObjectId ,
            ref:"User",
        }
    }
    ,{
        timestamps:true,
    }
);

export default mongoose.model("Task",taskSchema);