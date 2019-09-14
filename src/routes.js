const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => res.json({ hello: 'working' }))

module.exports = routes
