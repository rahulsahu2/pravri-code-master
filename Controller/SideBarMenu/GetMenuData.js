import { response } from "express";
import { conn1 } from "../../Db/Db.js";

export const GetMenuData = async (req, res) => {
    try {
        const totalClients = await getTotalClients(req.params.id);
        const newOrders = await getTotalOrders(req.params.id);
        const oldOrders = await getOldOrders(req.params.id);
        const pendingOrders = await getPendingOrders(req.params.id);
        console.log(totalClients,newOrders,oldOrders,pendingOrders);
        res.json({ success: true, data: { totalClients, newOrders, oldOrders, pendingOrders } });
    } catch (err) {
        res.json({ success: false, data: err })
    }
}




