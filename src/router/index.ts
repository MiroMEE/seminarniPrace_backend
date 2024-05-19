import express from 'express';

import authentication from './authentication';
import users from './users';
import slovicka from './slovicka';
import data from './data';
const router = express.Router();

// routování - default
export default (): express.Router => {
    authentication(router);
    users(router);
    slovicka(router);
    data(router);
    return router;
}