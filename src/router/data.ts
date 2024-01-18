import express from 'express';

import { ziskatHru, vytvorHru } from '../controllers/data';

// metody
export default (router: express.Router) => {
    router.post('/data/',vytvorHru);
    router.get('/data/:id',ziskatHru)
}