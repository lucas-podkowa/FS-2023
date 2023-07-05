var http = require('http');

var miServidor = http.createServer((peticion, respuesta) => {
   respuesta.writeHead(200, { 'Content-Type' : 'text/plain' });
   respuesta.end('Hola mundo!');
});

miServidor.listen(8080,'127.0.0.1');
