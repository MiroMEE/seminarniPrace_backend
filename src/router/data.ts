import express from 'express';

import { ziskatHru, vytvorHru } from '../controllers/data';

// routování - data
export default (router: express.Router) => {
    router.post('/api/data/',vytvorHru);
    router.get('/api/data/:id',ziskatHru)
}