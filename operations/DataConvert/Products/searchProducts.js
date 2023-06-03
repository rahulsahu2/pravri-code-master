import { response } from "express";
import { conn1 } from "../../../Db/Db.js";

export const searchProducts = (req,res)=>{
    try{
        const sql = `SELECT * FROM products WHERE ${req.params.para} REGEXP ?`
        conn1.query(sql,[req.params.val],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result);
                res.json({success:true,data:result});
            }
        })
    }catch(err){
        res.json({success:false,data:err});
    }
}