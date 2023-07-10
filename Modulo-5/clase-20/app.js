const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send("Pagina de Inicio");
});

app.param('id', function (req, res, next, id) {
    if (!isNaN(id) && !isNaN(parseInt(id))) {
        next();
    } else {
        res.send("El id debe ser un numero entero")
    }
});

app.get('/user/:id', function (req, res) {
    res.send('Datos de usuario con id ' + req.params.id);
});


//http://localhost:8080/user?miniaturas=true&cantidad=50
app.get('/user', function (req, res) {
    res.send('atendido mediante GET: ' +
        JSON.stringify(req.query) +
        JSON.stringify(req.params));
});


app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});













// const morgan = require('morgan');
// app.use(morgan('tiny'));

// morgan(':method :url :status :res[content-length] - :response-time ms');



//-------------------------- esuchar el mismo path con otro metodo
// app.post('/user', function (req, res) {
//     res.send('atendido mediante POST: ' +
//         JSON.stringify(req.query) +
//         JSON.stringify(req.params));
// });


//-------------------------- post con JSON
// app.post('/api/persona', function (req, res) {
//     console.log(req.body);
//     //todo nuestro codigo por aqui
//     res.send(`Se creó la persona ${req.body.nombre} ${req.body.apellido} ${req.body.dni}`);
// });

