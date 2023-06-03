import { generateInvoice } from "../../pdfGeneration/invoice/generateInvoice.js";
import path, { resolve } from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { conn1 } from "../../Db/Db.js";
import { addInvoice } from "../Invoice/add-invoice.js";
import { findInvoiceUrl } from "../Invoice/find-invoice-url.js";
import { PDFDocument } from "pdf-lib";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const generateInvoiceRecipt = async (req, res) => {
    try {
        if (!(await checkIfInvoicedAlready(req.body.invoiceRequestedOrder.id))) {
            await generateInvoice("123890", "2023-02-22 13:40:12");
            const filepath = path.join(__dirname, "invoice.pdf");
            res.download(filepath, 'invoice.pdf');
            await updateOrderTable(req.body);
        } else {
            conn1.query(`SELECT * FROM invoices WHERE orderId = ?`, [req.body.invoiceRequestedOrder.id], async (err, result) => {
                if (err) {
                    throw err;
                } else {
                    const base64String = await result[0]?.url;
                    const base64Data = base64String.replace(/^data:application\/pdf;base64,/, '');
                    const pdfBuffer = Buffer.from(base64Data, 'base64');

                    const pdfDoc = await PDFDocument.load(pdfBuffer);

                    const filename = 'invoice.pdf';
                    const filepath = path.join(__dirname, filename);
                    await fs.writeFile(filepath, await pdfDoc.save());
                    res.download(filepath, filename);
                }

            })
        }

    } catch (err) {
        res.json({ success: false, data: err });
    }
}




const updateOrderTable = async (data) => {

    let newDate = Date.now() + (330 * 60 * 1000);

    return new Promise((resolve, reject) => {
        try {
            const sql = `UPDATE orders SET invoiceStatus = ?,status = ? WHERE id = ?`;
            conn1.query(sql, ["true", "invoiced", data?.invoiceRequestedOrder?.id], async (err, result) => {
                if (err) reject(err);
                else {
                    await generateInvoice("123456", new Date(newDate).toISOString().slice(0, 19).replace('T', ' '));
                    const filepath = path.join(__dirname, "output.pdf");
                    addInvoice(data.invoiceRequestedOrder.id, await generateDataUrl());
                }
            })
        } catch (err) {
            reject(err);
        }
    })

}




const generateDataUrl = async () => {
    const filepath = path.join(__dirname, "invoice.pdf");
    const data = await fs.readFile(filepath, "base64")
    const uri = `data:application/pdf;base64,${data}`;
    return uri;
};



const checkIfInvoicedAlready = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT * FROM orders WHERE id = ?`, [id], async (err, result) => {
                if (err) reject(err);
                else {
                    if (result[0].invoiceStatus === "true") {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })

}