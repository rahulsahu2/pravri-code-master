import jwt from 'jsonwebtoken';
import { conn1 } from '../../Db/Db.js';
import { findUser } from '../../operations/FindUser.js';
import findParents from '../family/findParents.js';
import { backendToFrontend } from '../users/user-convert.js';


export const approveOrder = async (req, res) => {
    try {
        const verify = jwt.verify(req.params.token, process.env.JWT_SECRET_KEY)

        if (verify) {
            conn1.query(`SELECT * FROM users WHERE id = ?`, [req.params.id], async (err, users) => {
                if (err) {
                    throw err;
                } else {
                    const parents = await findParents({ id: req.params.id });
                    const id = parents.adminId ? parents.adminId : parents.associateId;
                    await updateOrderStatus(req.params, id);
                    conn1.query(`SELECT * FROM users WHERE id = ?`, [id], (err, result) => {
                        if (err) {
                            throw err;
                        } else {
                            res.json({ success: true, data: backendToFrontend(result[0]) });
                        }
                    })
                }
            })
        }
    } catch (err) {
        res.json({ success: false, data: err });
    }
}

export const approveOrderFromDashboard = async (req, res) => {
    try {
        const { orderId, adminId } = req.params;
        const response = await updateOrderStatus({ orderId }, adminId);
        res.json({success:true,data:response});
    } catch (err) {
        res.json({success:false,data:err});
    }
}




const updateOrderStatus = async (data, id) => {

    let newDate = Date.now() + (330 * 60 * 1000);
    try {
        const username = await findUser(id);
        let approvalDetails = JSON.stringify({ approvalBy: id, approvalAt: new Date(newDate).toISOString().slice(0, 19).replace('T', ' '), approvalName: username });
        return new Promise((resolve, reject) => {
            conn1.query(`UPDATE orders SET approvalStatus = ?, approvalDetails = ?, status= ? WHERE id = ?`, ["true", approvalDetails, "approved", data?.orderId], (err, result) => {
                if (err) {
                    throw err;
                } else {
                    resolve(result);
                }
            })
        })
    } catch (err) {
        return err;
    }
}

