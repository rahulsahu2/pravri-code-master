import { conn1 } from "../../../Db/Db.js";


export const getVendorStatusCountsForMaster = (status) => {
    return new Promise((resolve, reject) => {
        try {
            const sql = `SELECT COUNT(*) as counts FROM users WHERE status = ? AND isVendor = ?`;
            conn1.query(sql, [status, true], (err, result) => {
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


export const getVendorStatusCountsForSuper = (id,status) => {
    return new Promise ((resolve,reject)=>{
        try{
            const sql = `SELECT COUNT(*) as counts FROM users WHERE superParentId = ? AND status = ? AND isVendor = ?`;
            conn1.query(sql, [id,status,true], (err, result) => {
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


export const getVendorStatusCountsForAdmin = (id,status) => {
    return new Promise ((resolve,reject)=>{
        try{
            const sql = `SELECT COUNT(*) as counts FROM users WHERE adminParentId = ? AND status = ? AND isVendor = ?`;
            conn1.query(sql, [id,status,true], (err, result) => {
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