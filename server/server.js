const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// when client connects to server - special event
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit from admin text welcome to the chat app

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',
		createdAt: new Date().getTime()
	});

	// socket.broadcast.emit from admit text new user joined
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined',
		createdAt: new Date().getTime()
		
	});

	// socket.io emits an event to a single connection & emit.io emits to every single connection
	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		// print to every user
		io.emit('newMessage', {
			from: message.from,
			text: message.to,
			createdAt: new Date().getTime()
		});
        
		// sends to everyone but the sender
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.to,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

app.use(express.static(publicPath));

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});