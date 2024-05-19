import express from "express";
import { merge} from 'lodash';
import { verify } from "jsonwebtoken";
import env from "dotenv";
import { getSlovickoById } from "../db/SlovickaScheme";

env.config();
const secret = process.env.TOKEN_SECRET;

// pro zjištění zda uživatel má platný token
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const {token}:any = req.headers;

      // kontrola zda existuje token
      if(!token){
        throw new Error('Není token');
      }
      // kontrola expirace tokenu
      const user:any = verify(token,secret);
      if(!user){
        return res.status(403).json({message:"uživatel neověřen"});
      }
      req.body = merge(req.body,{username:user.username});
      next();
    } catch (error) {
      return res.status(400).json({message:"někde je chyba"});
    }
}

// pro zjištění, zda "uživatel" vlastní "tento účet" 
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token:any = req.headers.token;
    const user:any = verify(token,secret);
    if(!user){
      return res.status(403).json({message:"uživatel nebyl ověřen"});
    }

    const currentUserId = user._id;
    if (!currentUserId) {
      return res.status(403).json({message:"id nenalezeno"});;
    }
    next();
  } catch (error) {
    return res.status(400).json({message:"někde je chyba"});
  }
}

// pro zjistení, zda vlastní slovíčka
export const isOwnerOfSlovicek = async (req: express.Request, res:express.Response, next: express.NextFunction) => {
  try{
    const {id} = req.params;
    const token_2:any = req.headers.token;
    const token:any = verify(token_2,secret);
    if(!token){
      return res.status(403).json({message:"token nenalezen"});
    }
    const slovicko = await getSlovickoById(id);
    if(slovicko.username!=token.username){
      return res.status(403).json({message:"nastala chyba"});
    }
    next();
  } catch(error){
    return res.status(400).json({message:"někde je chyba"});
  }
}