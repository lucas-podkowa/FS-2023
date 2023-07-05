var express = require('express');
var app = express();

app.get('/', function(peticion, respuesta) {
   respuesta.send("Hola grupo esto es la pagina princiapal");
});

app.get('/perfil', function(peticion, respuesta) {
   respuesta.send("Este es mi perfil modificado");
});
app.get('/perfil/lucas', function(peticion, respuesta) {
   respuesta.send("Este es el perfil de Lucas");
});

app.get('/user/:id', function(req, res) {
   res.send("aca estan los datos de este id, que probablemente lo recupere de la BD");
   //res.send(req.params);
});
  

app.listen(8080);

