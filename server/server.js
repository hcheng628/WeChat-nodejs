const path = require('path');
const express = require('express');
const fs = require('fs');
const socketIO = require('socket.io');
const http = require('http');

var {
    generateMessage,
    generateLocation
} = require('./utils/message');

const PUBLIC_PATH = path.join(__dirname, '../public/');

const wechat_HOMEPAGE = '/index.html';

const nodeApp_PORT = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
console.log(PUBLIC_PATH);


var nodeApp = express();
var nodeServer = nodeApp.listen(nodeApp_PORT, () => {
    console.log(`Node Application Up n' Running @ ${nodeApp_PORT} ......`);
});
var io = socketIO.listen(nodeServer);

io.on('connection', (new_socket) => {
    console.log('Server: New User Connected');
    new_socket.emit('server_notification', generateMessage('SERVER', 'Welcome to Wechat'));

    // new_socket.on('new_user', (new_client_message) => {
    //   new_socket.broadcast.emit('new_user', generateMessage('SERVER', new_client_message.user + ' Just Joined Us.'));
    // });

    new_socket.on('new_location', (new_client_location, callback) => {
        console.log("Server: Client Location: " + JSON.stringify(new_client_location));
        io.emit('new_location', generateLocation(new_client_location.from, new_client_location.la, new_client_location.lo));
        callback('new_location: Server 200');
    });

    new_socket.on('new_message', (new_client_message, callback) => {
        console.log("Server: new_message " + JSON.stringify(new_client_message));
        io.emit('new_message', new_client_message);
        callback('new_message: Server 200');
    });

});

io.on('disconnect', (new_socket) => {
    console.log('Server: New User got Disconnected');
    // console.log("Server Socket: ", new_socket);
});

nodeApp.use(express.static(PUBLIC_PATH));

module.exports = {
    nodeApp
}

// nodeApp.get(wechat_HOMEPAGE,(request, response) => {
//   fs.readFile(PUBLIC_PATH + 'index.html', 'utf-8', (err, data)=>{
//     // console.log(PUBLIC_PATH + 'index.html');
//     // console.log(data);
//     response.send(data);
//   });
// });

// nodeApp.listen(nodeApp_PORT, ()=>{
//   console.log(`Node Application Up n' Running @ ${nodeApp_PORT} ......`);
// });
