import { conn1 } from "../../Db/Db.js";
import { findUser } from "../../operations/FindUser.js";
import { findUserType } from "../family/findUserType.js";

export const getOrdersAnalytics = async (req, res) => {
    try {
        const { id } = req.params;
        if ((await findUserType(id)) === "master") {
            const data = await getOrdersAnalyticsDataForMaster();
            res.json({ success: true, data })
        } else if ((await findUserType(id)) === "super") {
            const data = await getOrdersAnalyticsDataForSuper(id);
            res.json({ success: true, data });
        } else if((await findUserType(id))==="admin"){
            const data = await getOrdersAnalyticsDataForAdmin(id);
            res.json({success:true,data});
        } else if((await findUserType(id))==="user"){
            const data = await getOrdersAnalyticsDataForUser(id);
            res.json({success:true,data});
        }else if((await findUserType(id))==="t"){
            const data = await getOrdersAnalyticsDataForAssociate(id);
            res.json({success:true,data});
        }
    } catch (err) {
        res.json({ success: false, data: err })
    }
}

const getOrdersAnalyticsDataForMaster = async () => {
    try {
        const pendingOrders = await getOrdersWithStatus("pending");
        const approvedOrders = await getOrdersWithStatus("approved");
        const shippedOrders = await getOrdersWithStatus("shipped");
        const invoicedOrders = await getOrdersWithStatus("invoiced");
        const completedOrders = await getOrdersWithStatus("completed");
        const cancelledOrders = await getOrdersWithStatus("cancelled");
        return { pendingOrders, approvedOrders, shippedOrders, invoicedOrders, completedOrders, cancelledOrders };
    } catch (err) {
        return err;
    }
}

const getOrdersWithStatus = (status) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ?`, [status], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}


const getOrdersAnalyticsDataForSuper = async (id) => {
    try {
        const pendingOrders = await getOrdersWithStatusForSuper("pending",id);
        const approvedOrders = await getOrdersWithStatusForSuper("approved",id);
        const shippedOrders = await getOrdersWithStatusForSuper("shipped",id);
        const invoicedOrders = await getOrdersWithStatusForSuper("invoiced",id);
        const completedOrders = await getOrdersWithStatusForSuper("completed",id);
        const cancelledOrders = await getOrdersWithStatusForSuper("cancelled",id);
        return { pendingOrders, approvedOrders, shippedOrders, invoicedOrders, completedOrders, cancelledOrders };
    } catch (err) {
        return err;
    }
}

const getOrdersWithStatusForSuper = (status,id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND superId = ?`, [status,id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
};


const getOrdersAnalyticsDataForAdmin = async (id) => {
    try {
        const pendingOrders = await getOrdersWithStatusForAdmin("pending",id);
        const approvedOrders = await getOrdersWithStatusForAdmin("approved",id);
        const shippedOrders = await getOrdersWithStatusForAdmin("shipped",id);
        const invoicedOrders = await getOrdersWithStatusForAdmin("invoiced",id);
        const completedOrders = await getOrdersWithStatusForAdmin("completed",id);
        const cancelledOrders = await getOrdersWithStatusForAdmin("cancelled",id);
        return { pendingOrders, approvedOrders, shippedOrders, invoicedOrders, completedOrders, cancelledOrders };
    } catch (err) {
        return err;
    }
}


const getOrdersWithStatusForAdmin = (status,id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND sellerId = ?`, [status,id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
};

const getOrdersAnalyticsDataForUser = async (id) =>{
    try {
        const pendingOrders = await getOrdersWithStatusForUser("pending",id);
        const approvedOrders = await getOrdersWithStatusForUser("approved",id);
        const shippedOrders = await getOrdersWithStatusForUser("shipped",id);
        const invoicedOrders = await getOrdersWithStatusForUser("invoiced",id);
        const completedOrders = await getOrdersWithStatusForUser("completed",id);
        const cancelledOrders = await getOrdersWithStatusForUser("cancelled",id);
        return { pendingOrders, approvedOrders, shippedOrders, invoicedOrders, completedOrders, cancelledOrders };
    } catch (err) {
        return err;
    }
}


const getOrdersWithStatusForUser = (status,id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND clientId = ?`, [status,id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
};

const getOrdersAnalyticsDataForAssociate = async (id) =>{
    try {
        const pendingOrders = await getOrdersWithStatusForAssociate("pending",id);
        const approvedOrders = await getOrdersWithStatusForAssociate("approved",id);
        const shippedOrders = await getOrdersWithStatusForAssociate("shipped",id);
        const invoicedOrders = await getOrdersWithStatusForAssociate("invoiced",id);
        const completedOrders = await getOrdersWithStatusForAssociate("completed",id);
        const cancelledOrders = await getOrdersWithStatusForAssociate("cancelled",id);
        return { pendingOrders, approvedOrders, shippedOrders, invoicedOrders, completedOrders, cancelledOrders };
    } catch (err) {
        return err;
    }
}

const getOrdersWithStatusForAssociate = (status,id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND sellerId = ?`, [status,id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
};

