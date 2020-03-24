const express = require('express');
const routes = express.Router();

const ongController = require('./controller/ongController');
const profileController = require('./controller/profileController');
const incidentsController = require('./controller/incidentsController');
const sessionController = require('./controller/sessionController');

routes.post('/session', sessionController.create)

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profiles', profileController.index);

routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

module.exports = routes;