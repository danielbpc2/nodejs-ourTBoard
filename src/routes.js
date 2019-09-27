import express from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BoardController from './app/controllers/BoardController';

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

// Board Routes
routes.get('/boards', BoardController.index);
routes.get('/boards/:id', BoardController.show);
routes.post('/boards', BoardController.store);
routes.put('/boards', BoardController.update);
routes.delete('/boards/:id', BoardController.delete);

export default routes;
