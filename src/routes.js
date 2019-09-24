import express from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ hello: 'working' }));

// Session Controller
routes.post('/session', SessionController.store);

// User Routes
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

routes.post('/users', UserController.store);

routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
