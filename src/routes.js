/* eslint-disable func-names */
import express from 'express';
import { toUnicode } from 'punycode';
import models from './app/models';

const routes = express.Router();

routes.get('/', (req, res) => res.json({ hello: 'working' }));
// User Routes
// Returns All users
routes.get('/users', (req, res) =>
  models.User.findAll({}).then(user => res.json(user))
);
// Create a User
routes.post('/users', (req, res) => {
  models.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    active: true,
  }).then(user => {
    res.json(user);
  });
});

// Find and return a User
routes.get('/user/:id', (req, res) => {
  models.User.findByPk(req.params.id).then(user => res.json(user));
});

// Update a User
routes.put('/user/:id', (req, res) => {
  models.User.findByPk(req.params.id).then(user => {
    if (user) {
      user
        .update({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          active: req.body.active,
        })
        .then(user => res.json(user));
    }
  });
});

// Delete a User
routes.delete('/user/:id', (req, res) => {
  models.User.findByPk(req.params.id).then(user => {
    user.destroy();
    return res.json(user);
  });
});
export default routes;
