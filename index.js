var express = require('express')
var app = express()
var socketio = require('socket.io')
var crypto = require('crypto')

var server = app.listen(3000)
var io = socketio.listen(server)

app.use(express.static('public'))

app.get('/', function(req, res){
    res.sendfile('load.html')    
})

app.get('/game', function(req, res){
	res.sendfile('index.html')
})

app.get('/instructions', function(req, res){
	res.sendfile('instructions.html')
})

io.on('connection', function(socket){
    //console.log('a user connected');
    crypto.randomBytes(48, function(err, buffer) {
  		var token = buffer.toString('hex');
  		io.emit('id', token) // emit to all users
	})

	socket.on('message', function(msg){
		console.log(msg)
		io.emit('message', msg)
	})
});
