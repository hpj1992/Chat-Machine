var http = require('http'),
    fs = require('fs'),
    sanitize = require('validator');

 
var app = http.createServer(function (request, response) {
    fs.readFile("../html/client.html", 'utf-8', function (error, data) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(1337);
 
var io = require('socket.io').listen(app);
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: sanitize.escape(data["message"]) });
    });
});
