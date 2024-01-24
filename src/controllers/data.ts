import express from "express";
import { createData, getDataById } from "../db/DataScheme";
export const vytvorHru = async (req:express.Request,res:express.Response)=>{
    try{
        const {name, slovicka, gameMode, players} = req.body;
        if(!name||!slovicka||!gameMode||!players){
            return res.sendStatus(403);
        }
        const data = await createData({
            name:name,
            slovicka:slovicka,
            gameMode:gameMode,
            players:players
        });
        return res.json(data).end();
    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}
export const ziskatHru = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        const data = await getDataById(id);
        return res.json(data).end();
    } catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}