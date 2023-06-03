import { conn1 } from "../../Db/Db.js";
import { getProperProductFM } from "../../operations/DataConvert/Products/getProperProductFM.js";

export const addProduct = (req,res)=>{
    if(req.params.user === "m"){
        addProductByMaster(req,res);
    }
}


const addProductByMaster = (req,res)=>{
    const properData = getProperProductFM(req.body);
    console.log(properData);
    try{
        const sql = `INSERT INTO products SET ?`
        conn1.query(sql,[properData],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result);
                res.json({success:true,data:result});
            }
        })
    }catch(err){
        console.log(err);
        res.json({success:false,data:err});
    }
}