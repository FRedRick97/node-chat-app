// no es6
var socket = io();

// connect event of client side is same as connection event of server.js
socket.on('connect', function() {
	console.log('connected to server');

	socket.emit('createMessage', {
		from: 'Fredrick',
		text: 'work!'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// custom event - listener
socket.on('newMessage', function(message) {
	console.log('newMessage', message);
});