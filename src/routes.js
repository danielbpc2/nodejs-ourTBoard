import express from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ hello: 'working' }));

// Session Controller
routes.post('/session', SessionController.store);

// User Routes
routes.post('/users', UserController.store);

// Using auth middleware
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
