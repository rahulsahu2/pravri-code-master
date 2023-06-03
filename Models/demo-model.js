import mongoose from "mongoose";
import { conn1 } from "../DB/Db.js";

const userSchema = mongoose.Schema({
    id:Number,
    name:String,
})

const User = conn1.model('User',userSchema);

export default User;