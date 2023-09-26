require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const configuracion = require("config.json");

const securityController = require("controller/securityController.js");
app.use('/security', securityController);


const personaController = require("controller/personaController.js");
app.use('/persona', personaController);


const usuarioController = require("controller/usuarioController.js");
app.use('/usuario', usuarioController);


const vehiculoController = require("controller/vehiculoController.js");
app.use('/vehiculo', vehiculoController);


app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + configuracion.server.port);
    }
});