import { conn1 } from "../../Db/Db.js"

export const countAssociates = async(req,res)=>{
    try{
        const pendingAssociates = await findAssociatesWithStatus("pending");
        const approvedAssociates = await findAssociatesWithStatus("approved");
        const blockedAssociates = await findAssociatesWithStatus("blocked");
        res.json({success:true,data:{pendingAssociates,approvedAssociates,blockedAssociates}})    
    }catch(err){
        res.json({success:false,data:err})
    }
}


const findAssociatesWithStatus = (status)=>{
    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT COUNT(*) as count FROM users WHERE isAssociate = ? AND status = ?`,[true,status],(err,result)=>{
              if(err){
                throw err
              }else{
                resolve(result[0].count);
              }
            })
        }catch(err){
           reject (err);
        }
    })
}