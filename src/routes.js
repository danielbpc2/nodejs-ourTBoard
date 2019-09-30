import express from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import BoardController from './app/controllers/BoardController';
import UserBoardController from './app/controllers/UserBoardController';
import ListController from './app/controllers/ListController';
import authMiddleware from './app/middlewares/auth';

const routes = express.Router();

// Root route
routes.get('/', (req, res) => res.json({ Api_status: 'working' }));

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

// UserBoard Routes
routes.get('/userboards', UserBoardController.index);
routes.post('/userboards', UserBoardController.store);
routes.delete('/userboards/:id', UserBoardController.delete);
// Userboard and List nested in Board Route, gives users inside a board
routes.get('/boards/:board_id/usersboard', UserBoardController.show);
routes.get('/boards/:board_id/lists', ListController.show);
routes.post('/boards/lists', ListController.store);
routes.delete('/boards/lists/:id', ListController.delete);
routes.put('/boards/lists', ListController.update);

export default routes;
