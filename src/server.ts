import express, {Request,Response,Application, NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
dotenv.config()

// import { Server } from "socket.io";
// const app = express();
// const server = require('http').Server(app);
// const io = new Server();

const app: Application = express();
const port = process.env.PORT || 3000;
const uri:string = process.env.uri || '';

app.use(cors({
    credentials:true,
    origin: process.env.origin,
    optionsSuccessStatus:200
}));
app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(port, () =>{
    console.log("Node API app is running on port 3000");
});

mongoose.Promise = Promise;
mongoose.connect(uri);
mongoose.connection.on('error',(error:Error) => console.log(error));

app.use("/",router());