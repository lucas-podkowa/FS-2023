require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const configuracion = require("config.json");


const controladorPersona = require("controller/personaController.js");
 const controladorUsuario = require("controller/usuarioController.js");
// const controladorArticulo = require("controller/articuloController.js");

app.use('/api/persona', controladorPersona);
 app.use('/api/usuario', controladorUsuario);
// app.use('/articulos', controladorArticulo);

//aplicacion --> cuando se ejecuta el use hace dos cosas
//(todo lo que entre aca, enviamelo aca)

app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + configuracion.server.port);
    }
});