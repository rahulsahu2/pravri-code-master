import { convertDataFromMasterForAccount } from "../../operations/DataConvert/CreateAccountFM.js";
import { conn1 } from "../../Db/Db.js";
import { convertDataFromSuperForAccount } from "../../operations/DataConvert/CreateAccountFS.js";
import { convertDataFromAdminForAccount } from "../../operations/DataConvert/CreateAccountFA.js";
import { updateMasterTuple } from "./afterUpdation/updateMasterTuple.js";
import { convertDataFromAssociateForUser } from "../../operations/DataConvert/CreateUserForAss.js";

export const createAccounts = async (req, res) => {
    console.log(req.params);
    try {
        if (req.params.user === "m") {
            addSuperAccount(req, res);
        } else if (req.params.user === "s") {
            addAdminAccount(req, res);
        } else if (req.params.user === "a") {
            addUserAccount(req, res);
        } else if (req.params.user === "t") {
            console.log(req.body);
            addUserAccountForAssociate(req, res);
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const addSuperAccount = async (req, res) => {
    try {
        let convertedData = await convertDataFromMasterForAccount(req.body.data, req.body.acc);
        console.log(convertedData);
        const sql = `INSERT INTO users SET ?`
        conn1.query(sql, [convertedData], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const addAdminAccount = async (req, res) => {
    try {
        let convertedData = await convertDataFromSuperForAccount(req.body);
        const sql = `INSERT INTO users SET ?`
        conn1.query(sql, [convertedData], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const addUserAccount = async (req, res) => {
    try {
        let convertedData = await convertDataFromAdminForAccount(req.body);
        const sql = `INSERT INTO users SET ?`
        conn1.query(sql, [convertedData], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

const addUserAccountForAssociate = async (req, res) => {
    try {
        let convertedData = await convertDataFromAssociateForUser(req.body);
        const sql = `INSERT INTO users SET ?`
        conn1.query(sql, [convertedData], (err, result) => {
            if (err) {
                throw err;
            } else {
                res.json({ success: true, data: result });
            }
        })
    } catch (err) {
        res.json({ success: false, data: err })
    }
}
