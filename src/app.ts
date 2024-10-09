import express from 'express';
import bodyParser from 'body-parser';
import connection from './config/db';
import cors from "cors";
import router from './main';
require('dotenv').config();
const app = express();
app.use(cors());
const port = process.env.PORT;
app.use(bodyParser.json({ extended: true } as any));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
connection();
// npm install buffer dotenv mongoose jsonwebtoken body-parser cors
// URL=mongodb://localhost:27017/yashtask
// PORT=3030
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port} 123`);
});