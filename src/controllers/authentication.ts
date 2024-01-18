import express from 'express';

import { createUser, getUserByEmail, getUserByName } from '../db/UserScheme';
import { authentication, comparePassword, setToken } from '../helpers/helper';

export const login = async (req:express.Request,res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
        return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select("password username");
        if (!user) {
            return res.sendStatus(400);
        }
        ;
        if(!comparePassword(password,user.password)){
            return res.sendStatus(403);
        }
        const token = setToken(user.username,user._id);
        res.cookie('token',token,{httpOnly:true});

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req:express.Request, res: express.Response) => {
    try{
        const { email, password, username} = req.body;

        if (!email || !password ||!username){
            return res.sendStatus(400);
        }

        const existingUserByEmail = await getUserByEmail(email);
        const existingUserByName = await getUserByName(username);
        console.log(existingUserByEmail,existingUserByName)
        if(existingUserByEmail || existingUserByName){
            return res.sendStatus(403);
        }
        const passwordHashed = await authentication(password)
        const user = await createUser({
            email,
            username,
            password:passwordHashed
        })
        return res.status(200).json(
        {
            username:user.username,
            id:user._id
        }
        ).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}