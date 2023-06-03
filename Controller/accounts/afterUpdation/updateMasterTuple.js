import { conn1 } from "../../../Db/Db.js";


export const updateMasterTuple = (dbResult,child,creator)=>{
    try{
        const sql = `UPDATE users SET ? WHERE id = ?`
        conn1.query(sql,[creator.id],)
    }catch(err){

    }
}