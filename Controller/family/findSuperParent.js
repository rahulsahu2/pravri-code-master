import { conn1 } from "../../Db/Db.js";

export const findSuperParent = ({ id }) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    conn1.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        // const jsonResult = {superId:result[0].superParentId,adminId:result[0].adminParentId};
        resolve(result[0].superParentId);
      }
    });
  });
};


