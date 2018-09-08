const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
                     
const publicPath = path.join(__dirname, '/../public');
const config = path.join(__dirname, '/../config/config');
const {generateMessage} = require('./utils/message');

require(config);


var app = express();
const port = process.env.PORT;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
                
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));
    
socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text)); 
  });

    socket.on('disconnect', function () {
    console.log('Client disconnected');
    });
    
});

server.listen(port, function () {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};