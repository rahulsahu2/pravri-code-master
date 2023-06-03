
import bcrypt from "bcrypt";

export const compareSalt = (str, hash) => {

    const state = [];

    return new Promise((resolve, reject) => {

        try {
            bcrypt.compare(str, hash, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        } catch (err) {
            reject(err);
        }
    })

}