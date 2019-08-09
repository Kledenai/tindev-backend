const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const server = express();

mongoose.connect('mongodb+srv://kledenai:qRVepHoNwAE5zC82@cluster0-rhehb.mongodb.net/tinder-server?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());

server.use(routes);

server.listen(3333);