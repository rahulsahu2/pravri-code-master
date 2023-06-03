import { conn1 } from "../../../Db/Db.js";

export const getOrderCountsForMaster = async (req, res) => {

    try {
        const pendingOrders = await getPendingOrders(req);
        const shippedOrders = await getShippedOrders(req);
        const recievedOrders = await getRecievedOrders(req);
        const cancelledOrders = await getCancelledOrders(req);
        const approvedOrders = await getApprovedOrders(req);

        res.json({ success: true, data: { pendingOrders, shippedOrders, recievedOrders, cancelledOrders } });
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getPendingOrders = async (req) => {
    try {
        const sql = `SELECT COUNT(*) AS count FROM orders WHERE status = ?`;
        const result = await new Promise((resolve, reject) => {
            conn1.query(sql, ["pending"], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return result[0].count;
    } catch (err) {
        return err;
    }
};



const getShippedOrders = async (req) => {
    try {
        const sql = `SELECT COUNT(*) AS count FROM orders WHERE status = ?`;
        const result = await new Promise((resolve, reject) => {
            conn1.query(sql, ["shipped"], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return result[0].count;
    } catch (err) {
        return err;
    }
};



const getRecievedOrders = async (req) => {
    try {
        const sql = `SELECT COUNT(*) AS count FROM orders`;
        const result = await new Promise((resolve, reject) => {
            conn1.query(sql, [], (err, result) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(result);
                }
            });
        });

        return result[0].count;
    } catch (err) {
        return err;
    }
};



const getCancelledOrders = async (req) => {
    try {
        const sql = `SELECT COUNT(*) AS count FROM orders WHERE status = ?`;
        const result = await new Promise((resolve, reject) => {
            conn1.query(sql, ["cancelled"], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return result[0].count;
    } catch (err) {
        return err;
    }
};


const getApprovedOrders = async (req) => {

    try {
        const sql = `SELECT COUNT(*) AS count FROM orders WHERE status = ?`;
        const result = await new Promise((resolve, reject) => {
            conn1.query(sql, ["approved"], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return result[0].count;
    } catch (err) {
        return err;
    }
}
