import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import Router from "./Router/Router.js";
import path from "path";
import { getProperProductsResult, getTotalOrdersForProduct } from "./Controller/products/get-proper-products-result.js";
import Frontend from "./Router/Frontend.js";
import { conn1 } from "./Db/Db.js";

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.static('build'))
app.use(bodyParser.json({limit:"5mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"5mb",extended:true}));
app.use("/api/",Router);
app.use("/",Frontend);

app.listen(8000,()=>{console.log('server at portnumber 8000')});





