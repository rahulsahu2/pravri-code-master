import { conn1 } from "../../Db/Db.js";

export const findUserType = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT * FROM users WHERE id = ?`
            conn1.query(sql, [id], (err, result) => {
                if (err) {
                    throw err;
                }else{
                    const role = JSON.parse(result[0].role).userlevel;
                    resolve(role)
                }
            })
        } catch (err) {
            reject (err);
        }
    })

}