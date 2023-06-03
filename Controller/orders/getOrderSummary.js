import { conn1 } from "../../Db/Db.js";

export const getOrderSummary = async (req, res) => {
    try {
        console.log(req.body);
        const products = JSON.parse(req.body.item.products)
        const productsData = await getProductsListData(products);
        const details = await getShippingDetails([req.body.item.clientId, req.body.item.sellerId]);
        const obj = {
            products: productsData,
            amount: req.body.item.amount,
            details,
        }
        res.json({success:true,data:obj});
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getProductsListData = async (products) => {
    try {
        const data = await Promise.all(products.map((e, index) => {
            return new Promise((resolve, reject) => {
                conn1.query(`SELECT name,price,offeredPrice,images,discount,tax,shippingFee FROM products WHERE id = ?`, [e.id], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result[0]);
                    }
                })
            })
        }));
        return data;
    } catch (err) {
        return err;
    }
}

const getShippingDetails = async (arr) => {

    const details = await Promise.all(arr.map((e) => {
        return new Promise((resolve, reject) => {
            conn1.query(`SELECT shippingAddress,mobile,email FROM users WHERE id = ?`, [e], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            })
        })
    }))
    return details;
}