import { conn1 } from "../../Db/Db.js";

export const cancelOrder = (req,res)=>{
    try{
        const sql = `UPDATE orders SET ? WHERE id = ?`
        conn1.query(sql,[{"status":"cancelled"}],(err,result)=>{
            if(err){
                throw err;
            }else{
                res.json({success:false,data:result});
            }
        })
    }catch(err){
        console.log(err);
        res.json({success:false,data:err})
    }
}