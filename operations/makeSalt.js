import bcrypt from 'bcrypt';
import dotenv from "dotenv"
dotenv.config();

export const makeSalt = async (str) => {
    try {
        const salt = await new Promise((resolve, reject) => {
            bcrypt.hash(str, 10, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
        return salt;
    } catch (err) {
        console.log(err);
        return err;
    }
}
