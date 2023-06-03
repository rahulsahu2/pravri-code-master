import { Limit } from "../../constants.js";
import { conn1 } from "../../Db/Db.js";
import { getProperProductsResult } from "./get-proper-products-result.js";


export const getAllProducts = (req, res) => {
    try {
        const userType = req.params.userType;
        if (userType === "m") {
            getAllProductsForMaster(req, res);
        }else if(userType === "u"){
            getAllProductsForMaster(req,res);
        }
    } catch (err) {
        res.json({ success: false, data: err })
    }
}




const getAllProductsForMaster = (req, res) => {
    try {
        const sql = `SELECT * FROM products ORDER BY publishedAt DESC LIMIT ?,?`;
        const startIndex = (req.params.page - 1) * Limit;
        conn1.query(sql, [startIndex, Limit],async (err, result) => {
            if (err) {
                throw err;
            } else {
                const properResult = await Promise.all(result.map(async (item) => {
                        const data = await getProperProductsResult(item);
                        return await data;
                }));
                console.log(properResult);
                res.json({ success: true, data: properResult });
            };
        })
    } catch (err) {
        res.json({ success: false, data: err })
    }
}