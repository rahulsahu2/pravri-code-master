import { conn1 } from "../../../../Db/Db.js"
export const getInvoicesCountsForUser = async (id, status) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT SUM(ord.amount) as amount
            FROM orders ord
            INNER JOIN invoices inv
            ON ord.id = inv.orderId 
            INNER JOIN users usr
            ON ord.clientId = usr.id
            WHERE usr.id = ? AND inv.status = ?;`
            conn1.query(sql, [id, status], (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log(sql, result);
                    resolve(result[0]);
                }
            })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

export const getInvoicesCountsForAdmin = (id,status)=>{
    return new Promise((resolve,reject)=>{
        try {
            const sql = `SELECT SUM(ord.amount) as amount
            FROM orders ord
            INNER JOIN invoices inv
            ON ord.id = inv.orderId 
            INNER JOIN users usr
            ON ord.sellerId = usr.id
            WHERE usr.id = ? AND inv.status = ?;`
            conn1.query(sql, [id, status], (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log(sql, result);
                    resolve(result[0]);
                }
            })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}

export const getInvoicesCountsForSuper = (id,status)=>{
    return new Promise((resolve,reject)=>{
        try {
            const sql = `SELECT SUM(ord.amount) as amount
            FROM orders ord
            INNER JOIN invoices inv
            ON ord.id = inv.orderId 
            INNER JOIN users usr
            ON ord.superId = usr.id
            WHERE usr.id = ? AND inv.status = ?;`
            conn1.query(sql, [id, status], (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log(sql, result);
                    resolve(result[0]);
                }
            })
        } catch (err) {
            console.log(err);
            reject(err);
        }
    })
}


export const getInvoicesCountsForMaster = (id,status)=>{
    return new Promise((resolve,reject)=>{
        try {
            const sql = `SELECT SUM(ord.amount) as amount
            FROM orders ord
            INNER JOIN invoices inv
            ON ord.id = inv.orderId 
            WHERE inv.status = ?;`
            conn1.query(sql, [status], (err, result) => {
                if (err) {
                    throw err
                } else {
                    console.log(result);
                    resolve(result[0]);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}