const express = require('express');
const app = express();



app.get('/user/:id', function(req, res) {
    res.send(req.params);
});

app.get('/user/perfil/:id', function(req, res) {
    res.send("Perfil de usuario");
 });
 app.get('/user/perfil/:id', function(req, res) {
    res.send("Perfil de usuario");
 });




app.listen(8080, () => {
console.debug('App escuchando puerto :8080');
});
