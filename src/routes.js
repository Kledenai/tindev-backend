const express = require('express');
const DevController = require('./controllers/DevController');
const DeslikeConroller = require('./controllers/DislikeController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.post('/devs', DevController.store);
routes.post('/devs/:devId/dislikes', DeslikeConroller.store);
routes.post('/devs/:devId/likes', LikeController.store);

module.exports = routes;
