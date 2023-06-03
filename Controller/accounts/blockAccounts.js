import { conn1 } from "../../Db/Db.js";


export const blockAccounts = async (req,res)=>{
    try{
        conn1.query(`UPDATE users SET status = ? WHERE id = ?`,["blocked",req.body.id],(err,result)=>{
            if(err){
                throw err;
            }else{
                res.json({success:true,data:result})
            }
        })
    }catch(err){
        res.json({success:false,data:err});
    }
}