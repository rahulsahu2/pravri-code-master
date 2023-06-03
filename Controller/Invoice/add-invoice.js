import { conn1 } from "../../Db/Db.js"


export const addInvoice = (orderId, url) => {
    const invoice = {
        orderId,
        url,
        status:"pending"
    }

    return new Promise((resolve, reject) => {

        try {
            const sql = `INSERT INTO invoices SET ?`;
            conn1.query(sql, [invoice], async (err, result) => {
                if (err) reject(err);
                else {
                    updateInvoiceInOrderTable(result.insertId, orderId);
                }
            })
        } catch (err) {
            reject(err);
        }
    })

}


const updateInvoiceInOrderTable = (invoiceId, orderId) => {
    let newDate = Date.now() + (330 * 60 * 1000);

    return new Promise((resolve, reject) => {

        const sql = `UPDATE orders SET invoice = ? WHERE id = ?`
        try {
            let invoice = JSON.stringify({ createdAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' '), invoiceId, });
            conn1.query(sql, [invoice, orderId], (err, result) => {
                if (err) throw err;
                else {
                    resolve(result);
                }
            })

        } catch (err) {
            reject(err);
        }
    })
}