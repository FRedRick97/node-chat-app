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
//rendering
socket.on('newMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

	jQuery('#messages').append(html);
});
//rendering
socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

	jQuery('#messages').append(html);
});

// socket.emit('createMessage', {
// 	from: 'Fredrick',
// 	text: 'Cool!'
// }, function(data) { //this is the 3rd argument which will fire when the ack arrives at the client
// 	console.log('Got it!', data);
// }); 

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault(); // prevent default  behaviour of the event	 

	var messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('');
	});
});

// on-click "send location button"
var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Sending location....');
	navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttr('disabled').text('Send location'); //re-enable the button
		// console.log(position.coords.longitude);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() { // if something goes wrong
		location.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});





