const { Socket } = require('dgram');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the '/root' route to serve the 'index.html' file
app.get('/root', (req, res) => {
    console.log('Root page');
    // Provide the absolute path to the 'index.html' file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var user = 0;

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Increment user count and broadcast the updated count
    user++;
socket.emit('newUser',{message:"hii welcome to this page"});
socket.broadcast.emit('newUser',{message:user + "user connected"});
    

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        
        // Decrement user count and broadcast the updated count
        user--;
        socket.broadcast.emit('newUser',{message:user + "user connected"});
    });
});

server.listen(8000, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Connecting to 8000...');
    }
});
