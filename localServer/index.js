var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile('friend.html', {root: __dirname});
});

app.get('/friend', function(req, res) {
	res.sendFile('friend.html', {root: __dirname});
});

app.get('/canvas', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

['css', 'img', 'js', 'plugin', 'lib'].forEach(function (dir){
    app.use('/'+dir, express.static(__dirname+'/'+dir));
});

io.on('connection', function(socket){
	console.log('a user connected');
  	socket.on('disconnect', function(){
    	console.log('user disconnected');
  	});
  	socket.on('chat message', function(msg){
  		console.log('message: ' + msg);
  	});
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log(msg);
    });
});

http.listen(3500, function(){
	console.log('listening on *:3500');
});