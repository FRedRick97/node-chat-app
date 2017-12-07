// no es6
var socket = io();

// connect event of client side is same as connection event of server.js
socket.on('connect', function() {
	console.log('connected to server');

});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// custom event - listener
socket.on('newMessage', function(message) {
	console.log('newMessage', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.emit('createMessage', {
	from: 'Fredrick',
	text: 'Cool!'
}, function(data) { //this is the 3rd argument which will fire when the ack arrives at the client
	console.log('Got it!', data);
}); 

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault(); // prevent default  behaviour of the event	 

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function() {

	});
});