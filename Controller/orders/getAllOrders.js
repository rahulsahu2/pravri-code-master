import { Limit } from "../../constants.js"
import { conn1 } from "../../Db/Db.js"

export const getAllOrdersForUser = (req, res) => {

    try {
        if (req.params.user === "u") {
            const startIndex = (req.params.page - 1) * Limit;
            const sql = `SELECT * FROM orders WHERE clientId = ? ORDER BY orderAt DESC LIMIT ?,?`
            console.log(req.body.userId, startIndex, Limit);
            conn1.query(sql, [req.body.userId, startIndex, Limit], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.json({ success: true, data: result });
                }
            })
        } else if (req.params.user === "a") {
            getOrdersForAdminUser(req, res);
        } else if (req.params.user === "s") {
            getOrdersForSuperUser(req, res);
        } else if (req.params.user === "m") {
            getOrdersForMaster(req, res);
        } else if (req.params.user === "t") {
            getOrdersForAssociate(req, res);
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}




const getOrdersForAdminUser = async (req, res) => {

    try {
        const startIndex = ((req.params.page - 1) * Limit);
        const adminId = req.body.userId;
        const sql = `SELECT * FROM orders WHERE sellerId = ? ORDER BY orderAt DESC LIMIT ?,?`;
        conn1.query(sql, [adminId, startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: true, data: err });
    }

}

const getOrdersForSuperUser = (req, res) => {
    try {

        const startIndex = ((req.params.page - 1) * Limit);
        const sql = `SELECT * FROM orders WHERE superId = ? ORDER BY orderAt DESC LIMIT ?,?`;
        conn1.query(sql, [req.body.userId, startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}


const getOrdersForMaster = (req, res) => {
    try {
        const startIndex = ((req.params.page - 1) * Limit);
        console.log(startIndex, Limit);
        const sql = `SELECT * FROM orders ORDER BY orderAt DESC LIMIT ?,?`;
        conn1.query(sql, [startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getOrdersForAssociate = (req, res) => {
    try {
        const startIndex = ((req.params.page - 1) * Limit);
        const sql = `SELECT * FROM orders WHERE sellerId = ? ORDER BY orderAt DESC LIMIT ?,?`;
        conn1.query(sql, [req.body.userId, startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}


