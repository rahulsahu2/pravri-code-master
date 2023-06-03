import { conn1 } from "../../Db/Db.js";

export const getAllAssociates = (req,res)=>{
    try{
        const sql = `SELECT * FROM users WHERE isAssociate = ?`;
        conn1.query(sql,[true],(err,result)=>{
            if(err){
                throw err;
            }else{
                res.json({success:true,data:result});
            }
        })
    }catch(err){
        res.json({success:false,data:err});
    }
}