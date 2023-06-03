import { conn1 } from "../../../Db/Db.js";


export const getMasterStatusCounts = (status) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT COUNT(*) as counts FROM users WHERE id <> 1 AND status = ? AND isVendor = ?`;
            conn1.query(sql, [status,false], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve (result[0].counts)
                }
            })
        } catch (err) {
            reject (err);
        }
    })
}


export const getSuperStatusCounts = (id,status) => {
    return new Promise ((resolve,reject)=>{
        try{
            const sql = `SELECT COUNT(*) as counts FROM users WHERE superParentId = ? AND status = ? AND isVendor = ?`;
            conn1.query(sql, [id,status,false], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve (result[0].counts)
                }
            })
        }catch(err){
            reject (err);
        }
    })
}


export const getAdminStatusCounts = (id,status) => {
    return new Promise ((resolve,reject)=>{
        try{
            const sql = `SELECT COUNT(*) as counts FROM users WHERE adminParentId = ? AND status = ?`;
            conn1.query(sql, [id,status], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve (result[0].counts)
                }
            })
        }catch(err){
            reject (err);
        }
    })
}

export const getAssociateStatusCounts = (id,status) => {
    return new Promise ((resolve,reject)=>{
        try{
            const sql = `SELECT COUNT(*) as counts FROM users WHERE associateParentId = ? AND status = ?`;
            conn1.query(sql, [id,status], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve (result[0].counts)
                }
            })
        }catch(err){
            reject (err);
        }
    })
}