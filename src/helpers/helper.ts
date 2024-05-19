import jwt from 'jsonwebtoken';
import env from "dotenv";
import {Types} from 'mongoose';
import { hash, compare } from 'bcrypt';

env.config();
const secret =  process.env.TOKEN_SECRET;
const salt = Number(process.env.salt);

// vytvoří JWT - token expirace (1 den)
export const setToken = (name:string,id:Types.ObjectId) => jwt.sign(
  {username:name,_id:id},
  secret,
  {expiresIn:"1d"}
)

// vytváří hash heslo (knihovna bcrypt)
export const authentication = async (password:string) => {
  const hashedPassword = await hash(password,salt);
  return hashedPassword;
}
// kontrola hesla (knihovna bcrypt)
export const comparePassword = (password:string,hashedPassword:string) => {
  const isValid = compare(password,hashedPassword);
  return isValid;
}