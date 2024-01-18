import express from "express";

import {getSlovickaByName,createSlovicko,getSlovickoById,getAllSlovicka, deleteSlovickoById} from '../db/SlovickaScheme';
import { tryGetName } from "../helpers/helper";

export const vytvorSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {name,slovicka_json,jazyk} = req.body;
        if(!name||!slovicka_json||!jazyk){
            return res.sendStatus(400);
        }
        const existName = await getSlovickaByName(name);
        if(existName){
            return res.sendStatus(403)
        }
        const token = req.cookies['token']
        const username:string = tryGetName(token);
        const slovicko = await createSlovicko({
            name:name,
            username:username,
            slovicka_json:slovicka_json,
            jazyk:jazyk
        });
        return res.json(slovicko).end();
      } catch (error) {
        console.log(error);
        return res.sendStatus(400);
      }
}
export const getSlovicko =  async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.sendStatus(400);
        }
        const slovicko = await getSlovickoById(id);
        return res.json(slovicko);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const getAllSlovicek = async(req:express.Request,res:express.Response) => {
    try {
        const allSlovicka = await getAllSlovicka();
        return res.json(allSlovicka)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const updateSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params
        const {slovicka_json} = req.body;
        if(!slovicka_json){
            return res.sendStatus(400)
        }
        const slovicko = await getSlovickoById(id);
        slovicko.slovicka_json = slovicka_json;
        await slovicko.save();
        return res.status(200).json(slovicko).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
export const smazatSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        const znicit = await deleteSlovickoById(id);
        return res.json(znicit);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}