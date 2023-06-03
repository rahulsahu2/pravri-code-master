import { conn1 } from "../../Db/Db.js";

export const updateOrder = (req,res)=>{
    
   const obj =  {
        "id": 10,
        "uniqueId": 1001,
        "clientDetails": "{\"clientName\":\"dummyuser\",\"clientId\":\"4\"}",
        "serialNumber": "MUMO12",
        "others":"{}",
        "totalItems": 4,
        "amount": "4000",
        "payment_mode": "ONLINE",
        "status": "pending",
        "orderAt": "2023-02-15T11:11:15.000Z",
        "vendorDetails": "{\"vendorName\":\"paras kumar\",\"vendorId\":\"1\"}",
        "shipmentDetails": "{}",
        "releasePOStatus": "false",
        "releasePO": "{}",
        "invoice": "{\"invoiceStatus\":\"false\"}",
        "approvalStatus": "false",
        "approvalDetails": "{}"
    }
    const sql  = `UPDATE orders SET ? WHERE id = ?`;
    conn1.query(sql,[obj,obj.id],(err,result)=>{
        if(result){
            res.json({success:true,data:result})
        }else{
            res.json({success:false,data:err});
        }
    })
};

