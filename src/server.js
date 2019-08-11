const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    console.log(user, socket.id);

    connectedUsers[user]
});

mongoose.connect('mongodb+srv://kledenai:qRVepHoNwAE5zC82@cluster0-rhehb.mongodb.net/tinder-server?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use();

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);