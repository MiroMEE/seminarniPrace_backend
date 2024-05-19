import express from "express";
import { createData, getDataById } from "../db/DataScheme";
export const vytvorHru = async (req:express.Request,res:express.Response)=>{
    try{
        const {name, slovicka, gameMode, players} = req.body;
        if(!name||!slovicka||!gameMode||!players){
            return res.status(404).json({message: "chybí údaje"});
        }
        const data = await createData({
            name:name,
            slovicka:slovicka,
            gameMode:gameMode,
            players:players
        });
        return res.status(200).json(data);
    } catch(error){
        console.error(error);
        return res.status(400).json({message:"něco ješpatně"});
    }
}
export const ziskatHru = async (req:express.Request,res:express.Response)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message:"chybí údaje"});
        }
        const data = await getDataById(id);
        if(!data){
            return res.status(404).json({message: 'hra nenalezena'});
        }
        return res.status(200).json(data);
    } catch(error){
        console.error(error);
        return res.status(400).json({message:"něco ješpatně"});
    }
}