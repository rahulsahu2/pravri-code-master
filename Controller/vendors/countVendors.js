import { conn1 } from "../../Db/Db.js";
import { getVendorStatusCountsForAdmin, getVendorStatusCountsForMaster, getVendorStatusCountsForSuper } from "./counter/statusCounter.js";

export const getVendorCounts = async(req,res)=>{
    try{
        if(req.params.userType === "m"){
            getCountsForMaster(req,res);
        }else if(req.params.userType === "s"){
            getCountsForSuper(req,res);
        }else if(req.params.userType === "a"){
            getCountsForAdmin(req,res);
        }
    }catch(err){
        res.json({success:false,data:err})
    }
}

const getCountsForMaster =async (req,res)=>{
    try{
        const approvedAccounts =await getVendorStatusCountsForMaster("approved");
        const pendingAccounts =await getVendorStatusCountsForMaster("pending");
        const blockedAccounts =await getVendorStatusCountsForMaster("blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        console.log(err);
    }
}


const getCountsForSuper =async (req,res)=>{
    try{
        const approvedAccounts =await getVendorStatusCountsForSuper(req.params.userId,"approved");
        const pendingAccounts =await getVendorStatusCountsForSuper(req.params.userId,"pending");
        const blockedAccounts =await getVendorStatusCountsForSuper(req.params.userId,"blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        console.log(err);
    }
}


const getCountsForAdmin = async (req,res)=>{
    try{
        const approvedAccounts =await getVendorStatusCountsForAdmin(req.params.userId,"approved");
        const pendingAccounts =await getVendorStatusCountsForAdmin(req.params.userId,"pending");
        const blockedAccounts =await getVendorStatusCountsForAdmin(req.params.userId,"blocked");
        res.json({success:true,data:{approvedAccounts,pendingAccounts,blockedAccounts}});
    }catch(err){
        console.log(err);
    }
}