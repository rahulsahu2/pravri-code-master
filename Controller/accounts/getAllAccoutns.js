import { Limit } from "../../constants.js";
import { conn1 } from "../../Db/Db.js";


export const getAllAccounts = (req,res)=>{
    try{
        console.log(req.params);
        if(req.params.userType === "m"){
            getAllAccountsForMaster(req,res);
        }else if(req.params.userType === "s"){
            getAllAccountsForSuper(req,res);
        }else if(req.params.userType === "a"){
            getAllAccountsForAdmin(req,res);
        }else if(req.params.userType === "t"){
            getAllAccountsForAssociate(req,res);
        }
    }catch(err){
        res.json({success:false,data:err})
    }
}


const getAllAccountsForMaster = (req,res)=>{
    try{
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT * FROM users WHERE id <> 1 AND isVendor = ? AND role <> '{"userlevel":"t"}' ORDER BY createdAt DESC LIMIT ?,?;`
        conn1.query(sql,[false,startIndex,Limit],(err,result)=>{
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


const getAllAccountsForSuper = (req,res)=>{
    try{
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT * FROM users WHERE superParentId = ? AND isVendor = ? AND role <> '{"userlevel":"t"}'  ORDER BY createdAt DESC LIMIT ?,?`;
        conn1.query(sql,[req.params.userId,false,startIndex,Limit],(err,result)=>{
            if(err){
                throw err;
            }else{
                res.json({success:true,data:result});
            }   
        })
    }catch(err){
        res.json({success:false,data:result});
    }
}

const getAllAccountsForAdmin = (req,res)=>{
    try{
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT * FROM users WHERE adminParentId = ? AND isVendor = ? AND role <> '{"userlevel":"t"}' ORDER BY createdAt DESC LIMIT ?,?`;
        conn1.query(sql,[req.params.userId,false,startIndex,Limit],(err,result)=>{
            if(err){
                throw err;
            }else{
                res.json({success:true,data:result});
            }
        })
    }catch(err){
        res.json({success:false,data:result});
    }
}


const getAllAccountsForAssociate = (req,res)=>{
    try{
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT * FROM users WHERE associateParentId = ? AND isVendor = ? ORDER BY createdAt DESC  LIMIT ?,?`;
        conn1.query(sql,[req.params.userId,false,startIndex,Limit],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result)
                res.json({success:false,data:result});
            }
        })
    }catch(err){
        console.log(err)
        res.json({success:false,data:err})
    }
};

