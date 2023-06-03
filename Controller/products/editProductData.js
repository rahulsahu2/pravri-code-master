import { trusted } from "mongoose";
import { conn1 } from "../../Db/Db.js";

export const editProductData = async (req, res) => {
    try {
        const data = req.body.data;
        delete data.sales;
        delete data.publishedAt;
        delete data.updatedAt;
        console.log(data);
        conn1.query(`UPDATE products SET ? WHERE id = ?`, [data, data.id], (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                res.json({success:true,data:result});
            }
        })
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: err });
    }
}