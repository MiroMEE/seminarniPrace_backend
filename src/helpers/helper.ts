import jwt from 'jsonwebtoken';
import env from "dotenv";
import {Types} from 'mongoose';
import { hash, compare } from 'bcrypt'

env.config();
const secret =  process.env.TOKEN_SECRET
const salt = process.env.salt
export const setToken = (name:string,id:Types.ObjectId) => jwt.sign(
  {username:name,_id:id},
  secret,
  {expiresIn:"1d"}
)

export const authentication = async (password:string) => {
  const hashedPassword = await hash(password,salt);
  return hashedPassword;
}

export const comparePassword = (password:string,hashedPassword:string) => {
  const isValid = compare(password,hashedPassword);
  return isValid;
}

export const tryGetName = (token:string):any => {
  const tokost:any = jwt.verify(token,secret);
  return tokost.username;
};