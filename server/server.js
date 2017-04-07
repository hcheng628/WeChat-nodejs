const path = require('path');
const express = require('express');
const fs = require('fs');
const socketIO = require('socket.io');
const http = require('http');
const {Users} = require('./utils/users');
var {generateMessage,generateLocation} = require('./utils/message');
var {guid} = require('./utils/guid');

const PUBLIC_PATH = path.join(__dirname, '../public/');

const wechat_HOMEPAGE = '/index.html';

const nodeApp_PORT = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
console.log('PUBLIC_PATH: ' + PUBLIC_PATH);

var users = new Users();
var nodeApp = express();
var nodeServer = nodeApp.listen(nodeApp_PORT, () => {
    console.log(`Node Application Up n' Running @ ${nodeApp_PORT} ......`);
});
var io = socketIO.listen(nodeServer);

io.on('connection', (new_socket) => {
    console.log('Server: New User Connected');
    new_socket.emit('server_notification', generateMessage('WeChat-NodeJS-beta', 'Welcome to Wechat'));

    new_socket.on('join', (user_params, callback)=>{
        // console.log("Server: User Params: " + JSON.stringify(user_params));
        if(user_params.user_name == '' || user_params.room_name == ''){
          callback({error: 'Wrong Params'});
        }
        callback();
        // console.log("Socket ID: " + new_socket.id);
        // before adding, remove it based on socket id
        users.removeUser(new_socket.id);
        if(new_socket.id != '' && user_params.user_name != '' && user_params.room_name != ''){
          users.addUser(new_socket.id.toString(), user_params.user_name, user_params.room_name);
          new_socket.join(user_params.room_name);
          io.to(user_params.room_name).emit('update_userlist', users.getUserListByRoom(user_params.room_name));
        }
        // console.log('Join Checking: Users List', JSON.stringify(users,undefined,2));
    });

    // new_socket.on('new_user', (new_client_message) => {
    //   new_socket.broadcast.emit('new_user', generateMessage('SERVER', new_client_message.user + ' Just Joined Us.'));
    // });

    new_socket.on('new_location', (new_client_location, callback) => {
        // console.log("Server: Client Location: " + JSON.stringify(new_client_location));
        var thisUser = users.getUser(new_socket.id);
        if(thisUser){
          io.to(thisUser.userRoom).emit('new_location', generateLocation(new_client_location.from, new_client_location.la, new_client_location.lo));
          callback('new_location: Server 200');
        }
    });

    new_socket.on('new_message', (new_client_message, callback) => {
        var thisUser = users.getUser(new_socket.id);
        if(thisUser){
          // console.log("Server: new_message " + JSON.stringify(new_client_message));
          io.to(thisUser.userRoom).emit('new_message', new_client_message);
          callback('new_message: Server 200');
        }
    });

    new_socket.on('disconnect', () => {
        // console.log('Server:' + removedUser.userName + ' Disconnected SocketID: ' + new_socket.id.toString());
        // console.log('Server Before Leave Checking: Users List', JSON.stringify(users,undefined,2));
        console.log('Server: Disconnected SocketID: ' + new_socket.id.toString());
        var removedUser = users.removeUser(new_socket.id.toString());
        // console.log('Server Leave Checking: Users List', JSON.stringify(removedUser,undefined,2));
        if(removedUser){
          io.to(removedUser.userRoom).emit('update_userlist', users.getUserListByRoom(removedUser.userRoom));
        }
        // console.log('Server After Leave Checking: Users List', JSON.stringify(users,undefined,2));
    });
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
