
import { conn1 } from "../../Db/Db.js"


export const getProductOptions = async(req,res)=>{
    try{
      conn1.query(`SELECT data FROM others WHERE id = ?`,[1],(err,result)=>{
        if(err){
            throw err;
        }else{
          console.log(result[0]);
          res.json({success:true,data:result[0]})
        }
      })
    }catch(err){ 
        res.json({success:false,data:err});
    }
}