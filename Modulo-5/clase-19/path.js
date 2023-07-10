const express = require('express');
const app = express();


app.get('/', function (req, res) {
    res.send("Pagina de Inicio");
});

app.get('/personas', function (req, res) {
    res.send("podria ser un listado de usuarios");
});

app.get('/personas/:id', function (req, res) {
    res.send("detalles de la persona: "+ req.params.id);
});


app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});
