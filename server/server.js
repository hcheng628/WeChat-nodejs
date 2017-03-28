const path = require('path');
const express = require('express');
const fs = require('fs');
const socketIO = require('socket.io');

const PUBLIC_PATH = path.join(__dirname, '../public/');

const wechat_HOMEPAGE = '/index.html';

const nodeApp_PORT = process.env.PORT || 3000;
// console.log(__dirname + '/../public');
console.log(PUBLIC_PATH);

var nodeApp = express();

nodeApp.get(wechat_HOMEPAGE,(request, response) => {
  fs.readFile(PUBLIC_PATH + 'index.html', 'utf-8', (err, data)=>{
    // console.log(PUBLIC_PATH + 'index.html');
    // console.log(data);
    response.send(data);
  });
});

nodeApp.listen(nodeApp_PORT, ()=>{
  console.log(`Node Application Up n' Running @ ${nodeApp_PORT} ......`);
});

module.exports = {
  nodeApp
}
