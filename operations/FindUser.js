import { conn1 } from "../Db/Db.js";
export const findUser = (id)=>{
    return new Promise ((resolve,reject)=>{
        try{
            conn1.query(`SELECT username FROM users WHERE id = ?`,[id],(err,result)=>{
                if(err){
                    throw err;
                }else{
                    resolve(result[0])
                }
            })
        }catch(err){
            reject(err);
        }
    })
}