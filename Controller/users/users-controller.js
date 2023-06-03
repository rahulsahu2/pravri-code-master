import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { conn1 } from "../../Db/Db.js"
import { makeSalt } from "../../operations/makeSalt.js";
import { compareSalt } from "../../operations/compareSalt.js";
import { sendMail } from "../../operations/sendMail.js";

dotenv.config();

export const getAllUsers = async (req, res) => {
    try {
        const sql = `SELECT * from users`;
        conn1.query(sql, (err, result) => {
            var obj = {
                success: true,
                data: result,
                error: null,
            }
            res.json(obj);
        })
    } catch (err) {
        res.json({ success: false, data: null, error: err });
    }
}


export const getToken = async (req, res) => {

    const token = jwt.sign({
    }, process.env.JWT_SECRET_KEY, { expiresIn: "120m" });

    res.send({
        ok: true,
        token: token
    });
}

export const loginUser = (req, res) => {

    try {

        console.log(req.body);

        const sql = `SELECT * FROM users WHERE email = ?`;

        conn1.query(sql, [req.body.email], async (err, result) => {
            if (!err) {
                if (result.length === 0) {
                    res.json({ success: false, data: {} });
                } else {
                    console.log(result[0]);
                    let response = await compareSalt(req.body.password, result[0].password);
                    const token = jwt.sign({
                    }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" });
                    if (response) {
                        var obj = {
                            "success": true,
                            "result": {
                                "id": result[0].id,
                                "roles": [
                                    JSON.parse(result[0].role).userlevel
                                ],
                                "active": result[0].active,
                                "email": result[0].email,
                                "merchant": {
                                    "merchantId": result[0].merchantId,
                                    "title": result[0].title,
                                    "verified": result[0].verified
                                },
                                "user": {
                                    "email": result[0].email,
                                    "username": result[0].username,
                                    "role":JSON.parse(result[0].role).userlevel,
                                    "mobile": result[0].mobile,
                                    "fullname": result[0].fullname
                                },
                                "permissions": JSON.parse(result[0].permissions),
                                "profileImg": result[0].profileImg,
                                "others": result[0].others
                            },
                            "token": token
                        };
                        res.json(obj)
                    } else {
                        res.json({ success: false, data: {} })
                    }
                }


            } else {
                throw err;
            }
        })
    } catch (err) {
        console.log(err);
        res.json({ success: false, data: err });
    }

}

export const sendResetLink = (req, res) => {
    const email = req.body.email;
    const sql = `SELECT * FROM users WHERE email = ?`
    try {
        conn1.query(sql, [email], (err, result) => {
            if (err) {
                res.json({ success: false, ...err })
            } else {
                const user = result[0];
                if (!user) {
                    res.json({ success: true, exist: false });
                } else {
                    const secret = process.env.JWT_SECRET_KEY + user.password;

                    const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: "30m" })

                    const link = `${process.env.APPURL}/forgot-password/${user.id}/${token}`;
                    sendMail({
                        recipient: 'parasunofficial1@gmail.com',
                        text: link,
                        subject: "Verification Link",
                        html: ''
                    });
                    res.json({ success: true, exist: true, link: link })
                }
            }
        })
    } catch (error) {
        res.json({ success: false, data: error })
    }
}


export const verifyResetLink = (req, res) => {
    const { id, token } = req.params;
    const sql = `SELECT * FROM users WHERE id = ?`
    try {
        conn1.query(sql, [id], (err, result) => {
            if (err) {
                res.json({ success: false, data: err })
            } else {
                var obj = {
                    "id": result[0].id,
                    "roles": [
                        (result[0].role).userlevel
                    ],
                    "active": result[0].active,
                    "merchantUserId": result[0].merchantUserId,
                    "email": result[0].email,
                    "merchant": {
                        "merchantId": result[0].merchantId,
                        "title": result[0].title,
                        "verified": result[0].verified
                    },
                    "user": {
                        "email": result[0].email,
                        "firstName": result[0].firstname,
                        "lastName": result[0].lastname,
                        "username": result[0].username,
                        "role": (result[0].role).userlevel,
                        "mobile": result[0].mobile
                    },
                    "merchantProfile": {
                        "businessGst": result[0].businessGst,
                        "businessName": "Some Business",
                        "businessPan": result[0].businessPan,
                        "businessType": result[0].businessType,
                        "accountNo": result[0].accountNo,
                        "bankName": result[0].bankName,
                        "ifsc": result[0].ifsc,
                        "bankBranch": result[0].bankBranch
                    },
                    "permissions": {
                        "users": true
                    }
                };
                const secret = process.env.JWT_SECRET_KEY + result[0].password;
                try {
                    const verify = jwt.verify(token, secret)
                    if (verify) {
                        res.json({ success: true, exist: true, data: obj })
                    }
                } catch (error) {
                    res.json({ success: false, data: error })
                }
            }
        })

    } catch (err) {
        res.json({ success: false, data: err })
    }
}


export const resetPassword = async (req, res) => {
    try {
        if (req.body.pass.currPassword) {
            const sql = `SELECT * FROM users WHERE id = ?`;

            conn1.query(sql, [req.body.acc.id], async (err, matchedAcc) => {
                if (!err) {

                    let isMatched = await compareSalt(req.body.pass.currPassword, matchedAcc[0].password);

                    if (isMatched) {
                        const changePass = `UPDATE users SET password = ? WHERE id = ?`;
                        const newPassSalt = await makeSalt(req.body.pass.newPassword)
                        conn1.query(changePass, [newPassSalt, req.body.acc.id], (err, result) => {
                            if (result) {
                                res.json({ success: true, data: result });
                            } else {
                                throw (err);
                            }
                        })
                    } else {
                        res.json({ success: false, data: "not matched" });
                    }
                } else {
                    throw (err);
                }

            })


        } else {

            const sql = `UPDATE users SET password = ? WHERE id = ?`
            let pass = await makeSalt(req.body.pass.newPassword);
            conn1.query(sql, [pass, req.body.acc.id], (err, result) => {
                if (result) {
                    console.log(result);
                    conn1.query(`SELECT * FROM users WHERE id = ?`, [req.body.acc.id], (err, result) => {
                        var obj = {
                            "id": result[0].id,
                            "roles": [
                                (result[0].role).userlevel
                            ],
                            "active": result[0].active,
                            "merchantUserId": result[0].merchantId,
                            "email": result[0].email,
                            "user": {
                                "email": result[0].email,
                                "firstName": result[0].firstname,
                                "lastName": result[0].lastname,
                                "username": result[0].username,
                                "role":(result[0].role).userlevel,
                                "mobile": result[0].mobile
                            },
                            "merchantProfile": {
                                "businessGst": result[0].businessGst,
                                "businessName": result[0].title,
                            },
                            "permissions": result[0].permissions
                        };
                        const token = jwt.sign({
                        }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" });
                        res.json({ success: true, data: obj, token, token });
                    })
                } else {
                    throw (err);
                }
            })
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}