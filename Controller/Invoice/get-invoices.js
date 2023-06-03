import { conn1 } from "../../Db/Db.js";
import { Limit } from "../../constants.js";
import { findUserType } from "../family/findUserType.js";


export const getInvoices = async (req, res) => {
    try {

        if (await findUserType(req.params.userId) === "user") {
            getInvoicesForUser(req, res);
        } else if (await findUserType(req.params.userId) === "admin") {
            getInvoicesForAdmin(req, res);
        } else if (await findUserType(req.params.userId) === "super") {
            getInvoicesForSuper(req, res);
        } else if (await findUserType(req.params.userId) === "master") {
            console.log(req.params);
            getInvoicesForMaster(req, res);
        } else if (await findUserType(req.params.userId) === "t") {
            getInvoicesForAssociate(req, res);
        } else {
            res.json({ success: false, data: err });
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}



const getInvoicesForUser = (req, res) => {
    try {
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT inv.id, ord.id as orderId, ord.orderAt, ord.amount,ord.totalItems,ord.status,ord.releasePO,inv.status as invoiceStatus,inv.createdAt
        FROM invoices inv
        INNER JOIN orders ord
        ON inv.orderId = ord.id
        WHERE ord.clientId = ? ORDER BY createdAt DESC LIMIT ?,?`
        conn1.query(sql, [req.params.userId,startIndex,Limit], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err })
    }
}

const getInvoicesForAdmin = (req, res) => {
    try {
        const startIndex = req.params.page ?  ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT inv.id, ord.id as orderId, ord.orderAt, ord.amount,ord.totalItems,ord.status,ord.releasePO,inv.status as invoiceStatus, ord.clientDetails, usr.profileImg,inv.createdAt
        FROM invoices inv
        INNER JOIN orders ord
        ON inv.orderId = ord.id
        INNER JOIN users usr
        ON ord.sellerId = usr.id
        WHERE ord.sellerId = ? ORDER BY createdAt DESC LIMIT ?,?;`
        conn1.query(sql, [req.params.userId,startIndex,Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err })
    }
}

const getInvoicesForAssociate = (req, res) => {
    try {
        const startIndex = req.params.page ? ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT inv.id, ord.id as orderId, ord.orderAt, ord.amount,ord.totalItems,ord.status,ord.releasePO,inv.status as invoiceStatus, ord.clientDetails, usr.profileImg,inv.createdAt
    FROM invoices inv
    INNER JOIN orders ord
    ON inv.orderId = ord.id
    INNER JOIN users usr
    ON ord.sellerId = usr.id
    WHERE ord.sellerId = ? ORDER BY createdAt DESC LIMIT ?,?;`
        conn1.query(sql, [req.params.userId, startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err })
    }
}



const getInvoicesForSuper = (req, res) => {
    try {
        const startIndex = req.params.page ? ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT inv.id, ord.id as orderId, ord.orderAt, ord.amount,ord.totalItems,ord.status,ord.releasePO, ord.clientDetails, inv.status as invoiceStatus, usr.profileImg, inv.createdAt
        FROM invoices inv
        INNER JOIN orders ord
        ON inv.orderId = ord.id
        INNER JOIN users usr
        ON ord.superId = usr.id
        WHERE ord.superId = ? ORDER BY orderAt DESC LIMIT ?,?;`
        conn1.query(sql, [req.params.userId, startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result })
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}


const getInvoicesForMaster = (req, res) => {
    try {
        const startIndex = req.params.page ? ((req.params.page - 1) * Limit) : 1;
        const sql = `SELECT inv.id, ord.id as orderId, ord.orderAt, ord.amount,ord.totalItems,ord.status,ord.releasePO, ord.clientDetails, inv.status as invoiceStatus, usr.profileImg, inv.createdAt
        FROM invoices inv
        INNER JOIN orders ord
        ON inv.orderId = ord.id
        INNER JOIN users usr
        ON ord.superId = usr.id ORDER BY orderAt DESC LIMIT ?,?;`
        conn1.query(sql, [startIndex, Limit], (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: err })
    }
}