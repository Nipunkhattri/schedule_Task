import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

export default mongoose.model('Users', UserSchema);