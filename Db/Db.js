import mysql from 'mysql2';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path:__dirname+'.env'});
 
export const conn1 = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: 'root',
    password:'LexPubSum@1917',
    database:'pravri',
    connectionLimit:10
})

// dotenv.config();
// export const conn1 = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.DB_USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     connectionLimit:10,
//     multipleStatements:true
// })


