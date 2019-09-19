/* eslint-disable func-names */
import express from 'express';
import models from './app/models';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ hello: 'working' }));
// User Routes
// INDEX
routes.get('/users', (req, res) =>
  models.User.findAll({}).then(user => res.json(user))
);
// Create User
routes.post('/users', (req, res) => {
  console.log(req.body);
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    active: true,
  }).then(user => {
    res.json(user);
  });
});
export default routes;
