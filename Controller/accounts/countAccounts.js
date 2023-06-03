import { conn1 } from "../../Db/Db.js";
import { getAdminStatusCounts, getAssociateStatusCounts, getMasterStatusCounts, getSuperStatusCounts } from "./counter/masterCounts.js";

export const getAccountCounts = async(req,res)=>{
    try{
        if(req.params.userType === "m"){
            getCountsForMaster(req,res);
        }else if(req.params.userType === "s"){
            getCountsForSuper(req,res);
        }else if(req.params.userType === "a"){
            getCountsForAdmin(req,res);
        }else if(req.params.userType === "t"){
            getCountsForAssociate(req,res);
        }
    }catch(err){
        res.json({success:false,data:err})
    }
}

const getCountsForMaster =async (req,res)=>{
    try{
        const approvedAccounts =await getMasterStatusCounts("approved");
        const pendingAccounts =await getMasterStatusCounts("pending");
        const blockedAccounts =await getMasterStatusCounts("blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        res.json({success:false,data:err});
    }
}


const getCountsForSuper =async (req,res)=>{
    try{
        const approvedAccounts =await getSuperStatusCounts(req.params.userId,"approved");
        const pendingAccounts =await getSuperStatusCounts(req.params.userId,"pending");
        const blockedAccounts =await getSuperStatusCounts(req.params.userId,"blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        res.json({success:false,data:err})
    }
}


const getCountsForAdmin = async (req,res)=>{
    try{
        const approvedAccounts =await getAdminStatusCounts(req.params.userId,"approved");
        const pendingAccounts =await getAdminStatusCounts(req.params.userId,"pending");
        const blockedAccounts =await getAdminStatusCounts(req.params.userId,"blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        res.json({success:false,data:err});
    }
}

const getCountsForAssociate = async (req,res)=>{
    try{
        const approvedAccounts =await getAssociateStatusCounts(req.params.userId,"approved");
        const pendingAccounts =await getAssociateStatusCounts(req.params.userId,"pending");
        const blockedAccounts =await getAssociateStatusCounts(req.params.userId,"blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        res.json({success:false,data:err});
    }
}