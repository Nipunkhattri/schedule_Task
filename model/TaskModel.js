import mongoose from "mongoose";

const Taskschema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    assigneduser:{
        type:String,
        required:true
    },
    completionStatus: {
        type: String,
        default: false,
    },
    Catagories:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Task', Taskschema);