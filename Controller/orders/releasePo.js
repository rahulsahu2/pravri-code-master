import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { conn1 } from '../../Db/Db.js';
import { generatePO } from '../../pdfGeneration/generatePO.js';
import { addPO } from '../PurchaseOrder/add-Po.js';
import { PDFDocument } from 'pdf-lib';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getPoRecipt = async (req, res) => {
    let newDate = Date.now() + (330 * 60 * 1000);
    try {
        if (!(await checkIfReleasedAlready(req.body.id))) {
            let PoDetails = JSON.stringify({ releaseAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' ') });
            let shipmentDetails = JSON.stringify({shippedAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' ')})
            const sql = `UPDATE orders SET releasePOStatus = ?,releasePO = ?,status = ?, shipmentDetails = ? WHERE id = ?`;
            conn1.query(sql, ["true", PoDetails,"shipped",shipmentDetails,req.body.id], async (err, result) => {
                if (err) {
                    throw err;
                } else {
                    await generatePO("123456", new Date(newDate).toISOString().slice(0, 19).replace('T', ' '));
                    const filepath = path.join(__dirname, "output.pdf");
                    addPO(req.body.id, await generateDataUrl());
                    res.download(filepath, 'output.pdf');
                }
            })
        } else {
            conn1.query(`SELECT * FROM purchaseorder WHERE orderId = ?`, [req.body.id], async (err, result) => {
                if (err) {
                    throw err;
                } else {

                    const base64String = await result[0].url;
                    const base64Data = base64String.replace(/^data:application\/pdf;base64,/, '');
                    const pdfBuffer = Buffer.from(base64Data, 'base64');

                    const pdfDoc = await PDFDocument.load(pdfBuffer);

                    const filename = 'output.pdf';
                    const filepath = path.join(__dirname, filename);
                    await fs.writeFile(filepath, await pdfDoc.save());
                    res.download(filepath, filename, async (err) => {
                        if (err) {
                            throw err;
                        } else {
                            // Delete the file after sending it as a response
                            await fs.unlink(filepath);
                        }
                    });
                }
            })
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}




export const generateDataUrl = async () => {
    const filepath = path.join(__dirname, "output.pdf");
    const data = await fs.readFile(filepath, "base64")
    const uri = `data:application/pdf;base64,${data}`;
    return uri;
};


export const checkIfReleasedAlready = (id) => {


    const sql = `SELECT * FROM purchaseorder WHERE orderId = ?`;
    return new Promise((resolve, reject) => {

        conn1.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result[0]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        })
    })
}
