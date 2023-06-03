import { conn1 } from "../../Db/Db.js";

export const findInvoiceUrl = (id)=>{

    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT * FROM invoices WHERE orderId = ?`,[id],(err,result)=>{
                if(err)throw (err);
                else{
                    resolve(result.url)
                }
            })
        }catch(err){
            reject (err);
        }
    })
}