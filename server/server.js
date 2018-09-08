const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
                     
const publicPath = path.join(__dirname, '/../public');
const config = path.join(__dirname, '/../config/config');

require(config);


var app = express();
const port = process.env.PORT;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New user connected');
    
socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
    });
});
    socket.on('disconnect', function () {
    console.log('Client disconnected');
    });

});


server.listen(port, function () {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};