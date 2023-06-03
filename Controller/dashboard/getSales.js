import { conn1 } from "../../Db/Db.js";
import { findUser } from "../../operations/FindUser.js";
import { findUserType } from "../family/findUserType.js"

export const getSales = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log(await findUserType(id));
        if ((await findUserType(id)) === "master") {
            const amount = await getSalesAmountForMaster();
            res.json({ success: true, data: amount });
        } else if ((await findUserType(id)) === "super") {
            const amount = await getSalesAmountForSuper(id);
            res.json({ success: true, data: amount });
        } else if ((await findUserType(id)) === "admin") {
            const amount = await getSalesAmountForAdmin(id);
            res.json({ success: true, data: amount });
        } else if ((await findUserType(id)) === "user") {
            const amount = await getSalesAmountForUser(id);
            res.json({ success: true, data: amount });
        }else if((await findUserType(id)) === "t"){
            const amount = await getSalesAmountForAssociate(id);
            res.json({success:true,data:amount});
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const getSalesAmountForMaster = () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT SUM(amount) as amount FROM orders`, (err, result) => {
                if (err) { throw err }
                else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        const amount = result[0].amount ? result[0].amount : 0;
                        resolve(amount);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

export const getSalesAmountForSuper = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT SUM(amount) as amount FROM orders WHERE superId = ?`, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
                    } else {
                        const amount = result[0].amount ? result[0].amount : 0;
                        resolve(amount);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

export const getSalesAmountForAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(0);
        } catch (err) {
            reject(err);
        }
    })
}

export const getSalesAmountForUser = (id) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(0);
        } catch (err) {
            reject(err);
        }
    })
}

export const getSalesAmountForAssociate = (id) => {
    return new Promise((resolve,reject) => {
        try{
            resolve(0)
        }catch(err){
            reject(err);
        }
    })
}