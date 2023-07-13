import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require('dotenv').config();
//giúp chạy đc process.env

let app = express();
app.use(cors({ credentials: true, origin: true })); 

//config app

//cấu hình tham số người dùng gửi lên
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
//PORT === undefined => port = 6969
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port)

});