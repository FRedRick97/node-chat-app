const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// when client connects to server - special event
io.on('connection', (socket) => {
	console.log('New user connected');

	// socket.emit from admin text welcome to the chat app
	// generateMessage is an function.
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// socket.broadcast.emit from admit text new user joined
	// generateMessage is an function.
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	// socket.io emits an event to a single connection & emit.io emits to every single connection
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		// print to every user
		io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
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