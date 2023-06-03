import { conn1 } from "../../Db/Db.js";

const findParents = ({ id }) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    conn1.query(sql, [id], (err, result) => {
      console.log(id);
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const jsonResult = {superId:result[0].superParentId,adminId:result[0].adminParentId,associateId:result[0].associateParentId};
        resolve(jsonResult);
      }
    });
  });
};

export default findParents;
