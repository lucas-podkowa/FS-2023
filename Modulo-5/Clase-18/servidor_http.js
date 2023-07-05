var http = require('http');
var uc = require('upper-case');
var server = http.createServer(function (request, resposnse) {
    resposnse.writeHead(200, { 'Content-Type': 'text/html' });
    resposnse.write(uc.upperCase("Hola servidor normal"));
    resposnse.end();
});

server.listen(8080);
