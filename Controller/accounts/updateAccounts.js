import { conn1 } from "../../Db/Db.js";
import { convertDataFromMasterForAccount } from "../../operations/DataConvert/CreateAccountFM.js";
import { convertDataFromMasterForAccountUpdate } from "../../operations/DataConvert/UpdateAccount/UpdateAccountFM.js";



export const updateAccount = async (req, res) => {
    try {
        let properData = await convertDataFromMasterForAccountUpdate(req.body);
        console.log(properData);
        const sql = `UPDATE users SET ? WHERE id = ?`;
        conn1.query(sql,[properData,req.body.id],(err,result)=>{
            if(err){
                throw err
            }else{
                conn1.query(`SELECT * FROM users WHERE id = ?`,[req.body.id],(err,result)=>{
                    if(err){
                        throw err;
                    }else{
                        res.json({success:true,data:result[0]});
                    }
                })
            }
        })
    } catch (err) {
        res.json({success:false,data:err})
    }

}