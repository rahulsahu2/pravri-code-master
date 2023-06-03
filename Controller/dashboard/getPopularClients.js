import axios from "axios"
import { findUserType } from "../family/findUserType";
import { findUser } from "../../operations/FindUser";
import { conn1 } from "../../Db/Db";

export const getPopularClients = async(req,res)=>{
    try{
        const {id} = req.params;
        if((await findUserType(id))==="master"){
            const data = await getPopularClientsForMaster(id);
            res.json({success:true,data});
        }else if((await findUserType(id))==="super"){
            const data = await getPopularClientsForSuper(id);
            res.json({success:true,data});
        }else if((await findUserType(id))==="admin"){
            const data = await getPopularClientsForAdmin(id);
            res.json({success:true,data});
        }else if((await findUserType(id))==="user"){
            const data = await getPopularClientsForUser(id);
            res.json({success:true,data});
        }
    }catch(err){
        res.json({success:true,data});
    }
}

const getPopularClientsForMaster = ()=>{
    return new Promise((resolve,reject)=>{
        try{
            return 1;
        }catch(err){

        }
    })
}