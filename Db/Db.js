import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();


export const conn1 = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE,
    connectionLimit:10
})


