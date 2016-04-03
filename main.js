    // When a user posts a message to the chat: 
    // user's client will send the message to the server, 
    // and the server will then forward it to all other connected clients, 
    // which then see the message appear in their browsers.

var http = require('http'),
	fs = require('fs');

// Creating the server
var app = http.createServer(function (request, response) {  

    fs.readFile("client.html", 'utf-8', function (error, data) {
        
        response.writeHead(200, { 'content-type': 'text/html' });
        
        response.writeHead(data);
        
        response.end();
    });
}).listen(1337);

var io = require('socket.io').listen(app);

    
io.sockets.on('connection', function (socket) {
    socket.on('message_to_server', function (data) {
        io.sockets.emit("message_to_client", { message: data["message"] });
    });
});


