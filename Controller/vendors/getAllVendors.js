import { conn1 } from "../../Db/Db.js";


export const getAllVendors = (req,res)=>{
    try{
        console.log(req.params)
        if(req.params.userType === "m"){
            getAllVendorsForMaster(req,res);
        }else if(req.params.userType === "s"){
            getAllVendorsForSuper(req,res);
        }else if(req.params.userType === "a"){
            getAllVendorsForAdmin(req,res);
        }
    }catch(err){
        res.json({success:false})
    }
}


const getAllVendorsForMaster = (req,res)=>{
    try{
        const sql = `SELECT * FROM users WHERE isVendor = ? ORDER BY createdAt DESC;`
        conn1.query(sql,[true],(err,result)=>{
            if(err){
                throw err
            }else{
                res.json({success:true,data:result})
            }
        })
    }catch(err){
        res.json({success:false,data:err})
    }
}



const getAllVendorsForSuper = (req,res)=>{
    try{
        const sql = `SELECT * FROM users WHERE superParentId = ? AND isVendor = ?  ORDER BY createdAt DESC;`
        conn1.query(sql,[req.params.userId,true],(err,result)=>{
            if(err){
                throw err
            }else{
                res.json({success:true,data:result})
            }
        })
    }catch(err){
        res.json({success:false,data:err})
    }
}



const getAllVendorsForAdmin = (req,res)=>{
    try{
        const sql = `SELECT * FROM users WHERE adminParentId = ? AND isVendor = ?  ORDER BY createdAt DESC;`
        conn1.query(sql,[req.params.userId,true],(err,result)=>{
            if(err){
                throw err
            }else{
                res.json({success:true,data:result})
            }
        })
    }catch(err){
        res.json({success:false,data:err})
    }
}