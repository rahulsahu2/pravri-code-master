import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { conn1 } from "../../Db/Db.js"

dotenv.config();

export const getAllMenu = async (req, res) => {
    try {
        console.log("----" + req.params.role);

        const sql = `SELECT * from rolebasedmenu`;
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

export const getAllRoles = async (req, res) => {
    try {
        const sql = `select DISTINCT role from rolebasedmenu`;
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

export const getRoleMenu = async (req, res) => {
    try {
        console.log("----" + req.params.role);

        const sql = `SELECT * from rolebasedmenu where role = ?`;
        conn1.query(sql, [req.params.role], (err, result) => {
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

export const getActiveRoleMenu = async (req, res) => {
    try {
        console.log("----" + req.params.role);

        const sql = conn1.format(`SELECT * from rolebasedmenu where role = ? and isVisible = ?`,[req.params.role,1]);
        console.log(sql);
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

export const updateRoleMenu = async (req, res) => {
    try {
        const data = req.body;
        var result = [];
        var queries = '';
        data.forEach(function (item) {
            queries += conn1.format("UPDATE rolebasedmenu SET isVisible = ? WHERE text = ? and role =?; ", [item.isChecked === true ? 1 : 0,item.menu,item.role]);
        });
        console.log(queries);
        if(queries === undefined)
            return  res.json({ success: false });
        conn1.query(queries, (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                res.json({ success: true, data: result });
            }
        })

    } catch (err) {
        console.log(err);
        res.json({ success: false, data: err });
    }
}