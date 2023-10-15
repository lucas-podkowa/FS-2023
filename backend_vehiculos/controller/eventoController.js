// roothpath : manejo de rutas de otros modulos del proyecto
// express : modulo que permite gestionar y lanzar servidores
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var db_evento = require("model/evento.js");
const auth = require("config/auth.js");


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para PERSONAS-- 
// -------------------------------------------------------- 
app.post('/', crear); //C
app.get('/', listar); //R
app.put('/:evento_id', actualizar); //U
app.delete('/:evento_id', borrar); //D 
app.get('/:evento_id', buscarPorEventoID);


// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// --------------------------------------------------------

// --- GET-------------------------------------------------- 

function listar(req, res) {
    db_evento.listar(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function buscarPorEventoID(req, res) {
    db_evento.buscarPorEventoID(req.params.evento_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}


// --- POST ----------------------------------------------------- 

function crear(req, res) {
    db_evento.crear(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


// --- PUT ----------------------------------------------------- 

function actualizar(req, res) {
    db_evento.actualizar(req.body, req.params.evento_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// --- DELETE ----------------------------------------------------- 

function borrar(req, res) {
    db_evento.borrar(req.params.evento_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).send(result.message);
            } else {
                res.send(result);
            }
        }
    });
}


module.exports = app;

