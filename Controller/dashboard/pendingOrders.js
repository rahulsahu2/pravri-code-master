import { conn1 } from "../../Db/Db.js"

export const getTotalPendingOrderForMaster = () => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ?`, ["pending"], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    result.length === 0 ? resolve(0) : resolve(result[0].count)
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

export const getTotalPendingOrdersForSuper = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND superId = ?`, ["pending", id], (err, result) => {
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

export const getTotalPendingOrdersForAdmin = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE status = ? AND sellerId = ?`, ["pending", id], (err, result) => {
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

export const getTotalPendingOrdersForUser = (id) => {
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE clientId = ? AND status = ?`, [id,"pending"], (err, result) => {
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

export const getTotalPendingOrdersForAssociate = (id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
        try {
            conn1.query(`SELECT count(*) as count FROM orders WHERE sellerId = ? AND status = ?`, [id,"pending"], (err, result) => {
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