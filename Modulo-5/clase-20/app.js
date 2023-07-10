const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


//home
app.get('/', function (req, res) {
    res.send("Pagina de Inicio");
});


//------------------------------------------------------------
app.param('id', function (req, res, next, id) {
    if (!isNaN(id) && !isNaN(parseInt(id))) {
        next();
    } else {
        res.send("El id debe ser un numero entero")
    }
});


app.use(function(req, res, next) {
    var data ={
        "httpVersion":req.httpVersion,
        "headers":req.headers,
        "url":req.url,
        "method":req.method,
        "query":req.query
    };
    console.log(JSON.stringify(data));
    next();
 });

 //------------------------------------------------------------

//usaurios y a cierto id de usuario
app.get('/user/:id', function (req, res) {
    res.send('Datos de usuario con id ' + req.params.id);
});


//http://localhost:8080/user?miniaturas=true&cantidad=50
app.get('/user', function (req, res) {
    res.send('atendido mediante GET: ' +
        JSON.stringify(req.query) +
        JSON.stringify(req.params));
});

app.post('/user', function (req, res) {
    res.send('atendido mediante POST: ' + JSON.stringify(req.body));
});



 
app.post('/api/persona', function(req, res) {
    console.log(req.body);
    //todo nuestro codigo por aqui
     res.send(`Se creó la persona ${req.body.nombre} ${req.body.apellido} ${req.body.dni}`);
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

