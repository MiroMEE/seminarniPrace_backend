import express from 'express';

import {getAllSlovicek, vytvorSlovicko, updateSlovicko, smazatSlovicko, getSlovicko} from '../controllers/slovicka';
import { isAuthenticated, isOwnerOfSlovicek } from '../middlewares/index';
export default (router: express.Router) =>{
    router.get('/slovicka',getAllSlovicek);
    router.get('/slovicka/:id',getSlovicko);
    router.post('/slovicka',isAuthenticated,vytvorSlovicko);
    router.patch('/slovicka/:id',isAuthenticated,isOwnerOfSlovicek,updateSlovicko);
    router.delete('/slovicka/:id',isAuthenticated,isOwnerOfSlovicek,smazatSlovicko);
};