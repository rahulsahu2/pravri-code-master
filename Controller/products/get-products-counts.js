import { conn1 } from "../../Db/Db.js";


export const getProductsCounts = async (req, res) => {
    try {
        const totalProducts = await getTotalProducts();
        const CategoriesNBrands = await getTotalCategoriesBrands();
        res.json({ success: true, data: { totalProducts, totalCategories: CategoriesNBrands.totalCategories, totalBrands: CategoriesNBrands.totalBrands } });
    } catch (err) {
        res.json({ success: false, data: err })
    }
}

const getTotalProducts = async () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM products`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count)
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

const getTotalCategoriesBrands = async () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT data FROM others WHERE reason = ?`, ["products"], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length !== 0) {
                        const data = JSON.parse(result[0].data);
                        resolve({ totalCategories: data.category.length, totalBrands: data.brand.length });
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}
