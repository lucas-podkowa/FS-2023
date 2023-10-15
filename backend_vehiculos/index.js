require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
const config = require("config/config.json");

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


const auth = require("config/auth.js");
app.use('/security', auth.app);


const eventoController = require("controller/eventoController.js");
app.use('/evento', eventoController);

const personaController = require("controller/personaController.js");
app.use('/persona', personaController);

const reservaController = require("controller/reservaController.js");
app.use('/reserva', reservaController);

const usuarioController = require("controller/usuarioController.js");
app.use('/usuario', usuarioController);

const vehiculoController = require("controller/vehiculoController.js");
app.use('/vehiculo', vehiculoController);



app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + config.server.port);
    }
});