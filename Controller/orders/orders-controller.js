import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {conn1} from "../../Db/Db.js";

dotenv.config();

export const getAllOrders = (req,res)=>{
    const sql = `SELECT * FROM orders`;
    conn1.query(sql,(err,result)=>{
        if(result){
            res.json({success:true,data:result})
        }else{
            res.json({succes:false,data:err})
        }
    })
}

export const getOrderDetails = (req,res)=>{
    const sql = `SELECT * FROM orders WHERE id = ?`;
    conn1.query(sql,[req.params.id],(err,result)=>{
        if(result){
            res.json({success:true,data:result})
        }else{
            res.json({success:false,data:err})
        }
    })
}