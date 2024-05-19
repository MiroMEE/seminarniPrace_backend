import express from 'express';

import {getAllSlovicek, vytvorSlovicko, updateSlovicko, smazatSlovicko, getSlovicko, getSlovickaA, getOwnSlovicka} from '../controllers/slovicka';
import { isAuthenticated, isOwnerOfSlovicek } from '../middlewares/index';

// routování - slovíčka
export default (router: express.Router) =>{
    router.get('/api/slovicka',getAllSlovicek);
    router.get('/api/slovicka/:id',getSlovicko);
    router.post('/api/slovicka',isAuthenticated,vytvorSlovicko);
    router.patch('/api/slovicka/:id',isAuthenticated,isOwnerOfSlovicek,updateSlovicko);
    router.delete('/api/slovicka/:id',isAuthenticated,isOwnerOfSlovicek,smazatSlovicko);
    router.post('/api/slovicka/a',getSlovickaA);
    router.post('/api/slovicka/own',isAuthenticated,getOwnSlovicka);
};