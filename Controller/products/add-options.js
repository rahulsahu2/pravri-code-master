import { conn1 } from "../../Db/Db.js"

export const addOptions = async (req, res) => {
    try {
        conn1.query(`SELECT data FROM others WHERE reason = ?`, ["products"], (err, result) => {
            if (err) {
                throw err;
            } else {
                const category = updateOptions(req.body, "category", JSON.parse(result[0].data));
                const brand = updateOptions(req.body, "brand", JSON.parse(result[0].data));
                const color = updateOptions(req.body, "color", JSON.parse(result[0].data));
                const size = updateOptions(req.body, "size", JSON.parse(result[0].data));
                conn1.query(`UPDATE others SET data = ? WHERE reason = ?`, [JSON.stringify({ category, brand, color, size }), "products"], (err, response) => {
                    if (err) {
                        throw err;
                    } else {
                        res.json({ success: true, data: response });
                    }
                });
            }
        })
    } catch (error) {
        res.json({ success: false, data: err });
    }
}

const updateOptions = (data, field, current) => {
    if (data[field]) {
        const array = current[field];
        array.push(data[field]);
        return array;
    } else {
        return current[field];
    }
}

