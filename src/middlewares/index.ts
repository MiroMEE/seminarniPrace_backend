import express from "express";
import { merge} from 'lodash';
import { verify } from "jsonwebtoken";
import env from "dotenv";
import { getSlovickoById } from "../db/SlovickaScheme";

env.config();
const secret = process.env.TOKEN_SECRET
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const {token}:any = req.headers;
      if(!token){
        throw new Error('Není token');
      }
      const user:any = verify(token,secret);
      req.body = merge(req.body,{username:user.username});
      console.log(req.body);
      next();
    } catch (error) {
      res.clearCookie("token");
      return res.sendStatus(400);
    }
}
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token:any = req.headers.token;
    const user:any = verify(token,secret);
    const currentUserId = user._id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
export const isOwnerOfSlovicek = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
  try{
    const {id} = req.params;
    const token_2:any = req.headers.token;
    const token:any = verify(token_2,secret);
    const slovicko = await getSlovickoById(id);
    if(slovicko.username!=token.username){
      return res.sendStatus(403);
    }
    next();
  } catch(error){
    console.log(error);
    return res.sendStatus(400);
  }
}
// hlavní cíl - spojit databázi s socketioof 