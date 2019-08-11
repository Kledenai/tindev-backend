const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('nova conexão', socket.id);
});

mongoose.connect('mongodb+srv://kledenai:qRVepHoNwAE5zC82@cluster0-rhehb.mongodb.net/tinder-server?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);