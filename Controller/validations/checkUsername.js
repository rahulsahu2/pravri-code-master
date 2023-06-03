import { conn1 } from "../../Db/Db.js"

export const checkUsername = (req,res)=>{
        console.log(req.params)
        const sql = `SELECT * FROM users WHERE username = ?`

        conn1.query(sql,[req.params.word],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result);
                if(result.length < 1){
                    res.json({success:true,isValid:true})
                }else{
                    res.json({success:true,isValid:false})
                }
            }
        })
}