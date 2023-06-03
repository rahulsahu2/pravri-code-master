import { conn1 } from "../../Db/Db.js"
import { backendToFrontend } from "./user-convert.js";


export const updateUser = (req, res) => {
    const userData = req.body?.userData;
    const userAccQ = `SELECT * FROM users WHERE id = ?`;
    try {

        conn1.query(userAccQ, [req.body.acc.id], (err, result) => {
            if (err) {
                throw (err)
            } else {
                const obj = {
                    "active": result[0].active,
                    "email": userData.email,
                    "title": result[0].title,
                    "verified": result[0].verified,
                    "fullname": userData.fullname,
                    "username": userData.username,
                    "mobile": userData.mobile,
                    "role": JSON.stringify({ userlevel: userData.role }),
                    "permissions":JSON.stringify(result[0].permissions),
                    "profileImg": userData.profileImg,
                    "others": JSON.stringify({ facebook: userData?.facebook, instagram: userData?.instagram, linkedin: userData?.linkedin, twitter: userData?.twitter, youtube: userData?.youtube, pinterest: userData?.pinterest, address: userData?.address, biography: userData?.biography })
                };
                console.log(obj);
                const updateSql = `UPDATE users SET ? WHERE id = ?`
                conn1.query(updateSql, [obj, req.body.acc.id], (err, response) => {
                    if (err) {
                        throw err;
                    } else {
                        conn1.query(`SELECT * FROM users WHERE id = ?`, [req.body.acc.id], (err, newId) => {
                            const newUser = backendToFrontend(newId[0]);
                            res.json({ success: true, data: newUser });
                        })

                    }
                })

            }
        })
    } catch (error) {
        res.json({ success: false, data: err });
    }
}