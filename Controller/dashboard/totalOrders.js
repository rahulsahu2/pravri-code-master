import e, { query } from "express";
import { conn1 } from "../../Db/Db.js"

export const getTotalNewOrdersForMaster = () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE orderAt >= DATE_SUB(NOW(), INTERVAL 7 DAY);`, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0);
                    } else {
                        resolve(result[0].count);
                    }
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

export const getTotalOldOrdersForMaster = () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE orderAt <= DATE_SUB(NOW(),INTERVAL 7 DAY)`, (err, result) => {
                if (result.length === 0) {
                    resolve(0);
                } else {
                    resolve(result[0].count);
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

export const getTotalNewOrdersForSuper = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE superId = ? AND orderAt >= DATE_SUB(NOW(),INTERVAL 7 DAY)`, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
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

export const getTotalOldOrdersForSuper = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE superId = ? AND orderAt <= DATE_SUB(NOW(),INTERVAL 7 DAY)`, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
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

export const getTotalNewOrdersForAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE sellerId = ? AND orderAt >= DATE_SUB(NOW(),INTERVAL 7 DAY)`, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
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

export const getTotalOldOrdersForAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE sellerId = ? AND orderAt <= DATE_SUB(NOW(),INTERVAL 7 DAY)`, [id], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    if (result.length === 0) {
                        resolve(0)
                    } else {
                        resolve(result[0].count)
                    }
                }
            })
        } catch (err) {

        }
    })
}

export const getTotalNewOrdersForUser = (id)=>{
    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT count(*) as count FROM orders WHERE clientId = ? AND orderAt >= DATE_SUB(NOW(),INTERVAL 7 DAY)`,[id],(err,result)=>{
                if(err){
                    throw err;
                }else{
                    if(result.length === 0){
                        resolve(0)
                    }else{
                        resolve(result[0].count)
                    }
                }
            })
        }catch(err){
            reject (err);
        }
    })
}

export const getTotalOldOrdersForUser = (id) => {
    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT count(*) as count FROM orders WHERE clientId = ? AND orderAt <= DATE_SUB(NOW(),INTERVAL 7 DAY)`,[id],(err,result)=>{
                if(err){
                    throw err;
                }else{
                    if(result.length === 0){
                        resolve(0)
                    }else{
                        resolve(result[0].count);
                    }
                }
            })
        }catch(err){
            reject (err);
        }
    })
}

export const getTotalNewOrdersForAssociate = (id)=>{
    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT count(*) as count FROM orders WHERE sellerId = ? AND orderAt >= DATE_SUB(NOW(),INTERVAL 7 DAY)`,[id],(err,result)=>{
                if(err){
                    throw err;
                }else{
                    if(result.length === 0){
                        resolve(0)
                    }else{
                        resolve(result[0].count)
                    }
                }
            })
        }catch(err){
            reject (err);
        }
    })
}

export const getTotalOldOrdersForAssociate = (id) => {
    return new Promise((resolve,reject)=>{
        try{
            conn1.query(`SELECT count(*) as count FROM orders WHERE sellerId = ? AND orderAt <= DATE_SUB(NOW(),INTERVAL 7 DAY)`,[id],(err,result)=>{
                if(err){
                    throw err;
                }else{
                    if(result.length === 0){
                        resolve(0)
                    }else{
                        resolve(result[0].count);
                    }
                }
            })
        }catch(err){
            reject (err);
        }
    })
}