const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        // Broadcast the message to all connected sockets
        io.emit('chat message', msg);
    });

    // Broadcast a greeting to all connected sockets when a new user joins
    socket.broadcast.emit('hi');

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
