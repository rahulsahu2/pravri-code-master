import { conn1 } from "../../Db/Db.js";



export const completeOrder = (req,res)=>{

    let newDate = Date.now() + (330 * 60 * 1000);
    try{
        let completionDetails = JSON.stringify({ completedAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' ') });
        conn1.query(`UPDATE orders SET completionStatus = ?, completionDetails = ?, status = ? WHERE id = ?`,["true",completionDetails,"completed",req.body.id],(err,result)=>{
            if(err)throw err;
            else{
                res.json({success:true,data:result});
            }
        });
    }catch(err){
        res.json({success:false,data:err})
    }
}