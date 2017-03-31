const path = require('path');
const express = require('express');
const fs = require('fs');
const socketIO = require('socket.io');
const http = require('http');

const PUBLIC_PATH = path.join(__dirname, '../public/');

const wechat_HOMEPAGE = '/index.html';

const nodeApp_PORT = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
console.log(PUBLIC_PATH);


var nodeApp = express();
var nodeServer = nodeApp.listen(nodeApp_PORT, ()=> {
  console.log(`Node Application Up n' Running @ ${nodeApp_PORT} ......`);
});
var io = socketIO.listen(nodeServer);

io.on('connection',(new_socket)=>{
  console.log('Server: New User Connected');
  // new_socket.broadcast.emit('server_request', {
  //    message: ' ----- '
  //  });


  new_socket.emit('server_request', {
     from: 'SERVER',
     message: 'Welcome to Wechat'
   });

  new_socket.on('client_request',(new_client_message) => {
    console.log("Server: Client Message: " + JSON.stringify(new_client_message));
    new_socket.broadcast.emit('server_request', {
       from: 'SERVER',
       message: new_client_message.user + ' Just Joined Us.'
     });
  });
});

io.on('disconnect',(new_socket)=>{
  console.log('Server: New User got Disconnected');
  // console.log("Server Socket: ", new_socket);
});

nodeApp.use(express.static(PUBLIC_PATH));
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

module.exports = {
  nodeApp
}
