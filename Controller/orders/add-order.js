import { conn1 } from "../../Db/Db.js";
import { sendMail } from "../../operations/sendMail.js";
import reqOrderApproval from "./req-order-approval.js";
import getParents from "../family/findParents.js";



export const addOrder = async(req,res)=>{

    try{
        const parents =await getParents(req.body?.user);
        const properData = await getProperObject(req.body,parents);
        const sql = `INSERT INTO orders SET ?`;
        conn1.query(sql,[properData],(err,result)=>{
            if(result){
                reqOrderApproval(req.body,result?.insertId);
                res.json({success:true,data:result}); 
            }else{
                throw err;
            }
        })
    }catch(err){
        console.log(err);
        res.json({success:false,data:err})
    }
}



async function getProperObject(data,parents){



    const obj = {
        clientDetails:JSON.stringify({clientId:data?.user.id, clientName:data?.user?.username,clientEmail:data?.user?.email}),
        totalItems:getTotalItems(data.products),
        amount:data.amounts.total,
        status:"pending",
        others:"",
        vendorDetails:JSON.stringify(data.vendorDetails || ""),
        shipmentDetails:JSON.stringify(data.shipmentDetails || ""),
        releasePOStatus:"false",
        releasePO:JSON.stringify(""),
        invoice:JSON.stringify(""),
        invoiceStatus:JSON.stringify(""),
        approvalStatus:"false",
        approvalDetails:JSON.stringify(""),
        products:JSON.stringify(data?.products),
        payment_mode:"COD",
        sellerId:parents.adminId || parents.associateId,
        clientId:data?.user?.id,
        superId:parents.superId  || 0, 
        completionStatus:JSON.stringify(""),
        completionDetails:JSON.stringify(""),
        sellerDetails:JSON.stringify(""),
        parents:JSON.stringify(parents),
        associateId:parents.associateId || 0
    }
    return obj;
}


const getTotalItems = (data)=>{
    const items = data.reduce((accumulator,currentItems)=>{
        return accumulator + currentItems.quantity
    },0)
    return items;
}

