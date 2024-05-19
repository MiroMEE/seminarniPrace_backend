import express from 'express';

import { createUser, getUserByEmail, getUserByName } from '../db/UserScheme';
import { authentication, comparePassword, setToken } from '../helpers/helper';

export const login = async (req:express.Request,res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({message:"údaje chybí"});
        }
        const user = await getUserByEmail(email).select("password username");
        if (!user) {
            return res.status(403).json({message:"uživatel neexistuje"});
        }
        ;
        if(!comparePassword(password,user.password)){
            return res.status(403).json({message:"hesla se neshodují"});
        }
        const token = setToken(user.username,user._id);

        return res.status(200).json({token:token}).end();
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco se pokazilo"});
    }
}

export const register = async (req:express.Request, res: express.Response) => {
    try{
        const { email, password, username} = req.body;

        if (!email || !password ||!username){
            return res.status(404).json({message:"údaje chybí"});
        }

        const existingUserByEmail = await getUserByEmail(email);
        const existingUserByName = await getUserByName(username);
        if(existingUserByEmail){
            return res.status(403).json({message:"Email už existuje!"});
        }
        if(existingUserByName){
            return res.status(403).json({message:"Jméno už existuje!"});
        }
        const passwordHashed = await authentication(password)
        const user = await createUser({
            email,
            username,
            password:passwordHashed
        })
        if(!user){
            res.status(400).json({message:"nastala chyba"});
        }
        return res.status(200).json({
            username:user.username,
            id:user._id
        });
    }catch(error){
        console.error(error);
        return res.status(400).json({message:"něco se pokazilo"});
    }
}
