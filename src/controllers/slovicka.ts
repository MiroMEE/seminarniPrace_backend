import express from "express";

import {getSlovickaByName,createSlovicko,getSlovickoById,getAllSlovicka, deleteSlovickoById, yourSlovicka} from '../db/SlovickaScheme';

export const vytvorSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {name,slovicka_json,jazyk,username} = req.body;
        if(!name||!slovicka_json||!jazyk||!username){
            return res.status(404).json({message: 'nebyly zadané všechny údaje'});
        }
        const existName = await getSlovickaByName(name);
        if(existName){
            return res.status(403).json({message: "slovíčko s tímto názvem už existuje"})
        }
        const slovicko = await createSlovicko({
            name:name,
            username:username,
            slovicka_json:slovicka_json,
            jazyk:jazyk
        });
        return res.status(200).json(slovicko);
      } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
      }
}
export const getSlovicko =  async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(403).json({message: "slovíčko neexistuje"});
        }
        const slovicko = await getSlovickoById(id);
        return res.status(200).json(slovicko);
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}
export const getAllSlovicek = async(req:express.Request,res:express.Response) => {
    try {
        const allSlovicka = await getAllSlovicka();
        return res.status(200).json(allSlovicka);
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}
export const updateSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params
        const {slovicka_json} = req.body;
        if(!slovicka_json){
            return res.status(400).json({message:"změna nenalezena"})
        }
        const slovicko = await getSlovickoById(id);
        if(!slovicko){
            return res.status(403).json({message:"Slovíčko nenalezeno"});
        }
        slovicko.slovicka_json = slovicka_json;
        await slovicko.save();

        return res.status(200).json(slovicko);
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}
export const smazatSlovicko = async(req:express.Request,res:express.Response) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({message: "Slovíčko nenalezeno"});
        }

        const znicit = await deleteSlovickoById(id);

        if(!znicit){
            return res.status(403).json("Slovíčko neexistuje");
        }
        return res.status(200).json(znicit);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}

export const getSlovickaA = async(req:express.Request, res:express.Response) => {
    try {
        const {slovicka} = req.body;

        if(!Array.isArray(slovicka)){
            return res.status(403).json({message:'slovíčka nejsou pole'});
        }

        const slovickaBalicek = [];
        
        for (const id of slovicka){
            const slovicko = await getSlovickoById(id);
            if(!slovicko){
                return res.status(403).json({message: 'nastala chyba u slovíček, nějaké má špatné id'})
            }
            slovickaBalicek.push(slovicko);
        }
        return res.status(200).json(slovickaBalicek);
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}
export const getOwnSlovicka = async(req:express.Request, res:express.Response) => {
    try {
        const {username} = req.body;
        if(!username){
            return res.status(404).json({message: 'uživatel nenalezen'});
        }
        const slovicka = await yourSlovicka(username);
        if(!slovicka){
            return res.status(403).json({message:"slovíčka nenalezena"});
        }  
        return res.status(200).json(slovicka);
    } catch (error) {
        console.error(error);
        return res.status(400).json({message:"něco je špatně"});
    }
}