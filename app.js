const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var chatHistory = [];
var Users = [];

io.on("connect", (socket)=>{
	socket.on('username', (nickname)=> {
		    socket.nickname = nickname;
		    Users.push(socket.nickname);
		    Users = [...new Set(Users)]
		});
	  socket.on('GroupMessage', (msg, name)=>{
	    io.emit('GroupMessage', msg, name, Users)
	  })
})


http.listen(8080);  