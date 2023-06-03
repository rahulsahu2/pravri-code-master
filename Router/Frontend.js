import express from 'express'
import path from "path";

const __dirname = path.resolve();

const Frontend = express.Router();

Frontend.get("/",(req,res)=>{res.sendFile(path.join(__dirname,"build","index.html"))});
Frontend.get("*",(req,res)=>{res.sendFile(path.join(__dirname,"build","index.html"))})

export default Frontend;