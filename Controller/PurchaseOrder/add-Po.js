import { conn1 } from "../../Db/Db.js"


export const addPO = (orderId,url)=>{
    try{
        const sql = `INSERT INTO purchaseOrder SET ?`
        const obj = {
            orderId,
            url
        }
        conn1.query(sql,[obj],(err,result)=>{
            if(err){
                throw err;
            }else{
                updatePoNumberInOrderTable(result.insertId,orderId);
            }
        })
    }catch(err){
        return err;

    }
}


const updatePoNumberInOrderTable = async(poNumber,orderId)=>{

    try{
        let newDate = Date.now() + (330 * 60 * 1000);
        const PoDetails = JSON.stringify({ releaseAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' '),poNumber:poNumber });
        const sql = `UPDATE orders SET releasePO = ? WHERE id= ?`;
        conn1.query(sql,[PoDetails,orderId],(err,result)=>{
            if(err){
                throw err;
            }
        })
    }catch(err){
        return err;
    }

}