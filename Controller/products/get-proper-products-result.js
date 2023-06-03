import { conn1 } from "../../Db/Db.js";
export const getProperProductsResult =async(data) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const orders = await getTotalOrdersForProduct(data.id);
            const obj = {...data,orders, sales: " abhi tak 300 ki sale ho gayi"};
            resolve(obj);
        } catch (err) {
            reject (err);
        }
    })
}




export const getTotalOrdersForProduct = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const str = `"id":${id}`;
            const sql = `SELECT products FROM orders WHERE products REGEXP ?`;
            conn1.query(sql, [str], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result.length);
                }
            })
        } catch (err) {
            console.log(err);
            reject (err.message);
        }
    })
}