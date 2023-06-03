import { response } from "express";
import { conn1 } from "../../Db/Db.js";
import { findUser } from "../../operations/FindUser.js";
import { findUserType } from "../family/findUserType.js";
import { getTotalPendingOrderForMaster, getTotalPendingOrdersForAdmin, getTotalPendingOrdersForAssociate, getTotalPendingOrdersForSuper, getTotalPendingOrdersForUser } from "./pendingOrders.js";
import { getTotalNewOrdersForAdmin, getTotalNewOrdersForAssociate, getTotalNewOrdersForMaster, getTotalNewOrdersForSuper, getTotalNewOrdersForUser, getTotalOldOrdersForAdmin, getTotalOldOrdersForAssociate, getTotalOldOrdersForMaster, getTotalOldOrdersForSuper, getTotalOldOrdersForUser } from "./totalOrders.js";
import { getTotalBudgetForAdmin, getTotalBudgetForAssociate, getTotalBudgetForUser } from "./getTotalBudget.js";


export const getDashboardCounts = async (req, res) => {
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

const getTotalClients = async (id) => {
    try {
        if ((await findUserType(id)) === "master") {
            const response = await getTotalSuperClients();
            return response;
        } else if ((await findUserType(id)) === "super") {
            const response = await getTotalAdminClients(id);
            return response;
        } else if ((await findUserType(id)) === "admin") {
            const response = await getTotalBudgetForAdmin(id);
            return response;
        } else if ((await findUserType(id)) === "user") {
            const response = await getTotalBudgetForUser(id);
            return response;
        }else if((await findUserType(id)) === "t"){
            const response = await getTotalBudgetForAssociate(id);
            return response;
        }
    } catch (err) {
        return response;
    }
}

const getTotalOrders = async (id) => {
    try {
        if ((await findUserType(id)) === "master") {
            const response = await getTotalNewOrdersForMaster();
            return response;
        } else if ((await findUserType(id)) === "super") {
            const response = await getTotalNewOrdersForSuper(id);
            return response;
        } else if ((await findUserType(id)) === "admin") {
            const response = await getTotalNewOrdersForAdmin(id);
            return response;
        } else if ((await findUserType(id)) === "user") {
            const response = await getTotalNewOrdersForUser(id);
            return response;
        }else if((await findUserType(id)) === "t"){
            const response = await getTotalNewOrdersForAssociate(id);
            return response;
        }
    } catch (err) {
        return err;
    }
}

const getOldOrders = async (id) => {
    try {
        if ((await findUserType(id)) === "master") {
            const response = await getTotalOldOrdersForMaster();
            return response;
        } else if ((await findUserType(id)) === "super") {
            const response = await getTotalOldOrdersForSuper(id);
            return response;
        } else if ((await findUserType(id)) === "admin") {
            const response = await getTotalOldOrdersForAdmin(id);
            return response;
        } else if((await findUserType(id))==="user"){
            const response = await getTotalOldOrdersForUser(id);
            return response;
        }else if((await findUserType(id))==="t"){
            const response = await getTotalOldOrdersForAssociate(id);
            return response;
        }
    } catch (err) {
        return err;
    }
}

const getPendingOrders = async (id) => {
    try {
        if ((await findUserType(id)) === "master") {
            const response = await getTotalPendingOrderForMaster();
            return response;
        } else if (await findUserType(id) === "super") {
            const response = await getTotalPendingOrdersForSuper(id);
            return response;
        } else if ((await findUserType(id)) === "admin") {
            const response = await getTotalPendingOrdersForAdmin(id);
            return response;
        } else if((await findUserType(id)) === "user"){
            const response = await getTotalPendingOrdersForUser(id);
            return response;
        }else if((await findUserType(id))==="t"){
            const response = await getTotalPendingOrdersForAssociate(id);
            return response;
        }
    } catch (err) {
        return err;
    }
}

const getTotalSuperClients = async () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM users WHERE role REGEXP ? AND isVendor = ?`, ["super", false], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result[0].count)
                }
            })
        } catch (err) {
            reject(err.message);
        }
    })
}

const getTotalAdminClients = (superId) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM users WHERE role REGEXP ? AND superParentId = ? AND isVendor = ? `, ["admin", superId, false], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
                    } else {
                        resolve(result[0].count)
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}



