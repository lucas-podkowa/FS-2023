// roothpath : manejo de rutas de otros modulos del proyecto
// express : modulo que permite gestionar y lanzar servidores
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var persona_db = require("model/persona.js");


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para PERSONAS-- 
// -------------------------------------------------------- 
app.get('/', getAll);
app.post('/', crear);
app.put('/:dni', actualizar);
app.delete('/:dni', borrar);
app.get('/:dni', getByDNI);
app.get('/usuario/:dni', getUserByPersona);



// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// --------------------------------------------------------

//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : respuesta enviada desde el servidor al frontend

function getAll(req, res) {
    persona_db.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

// -------------------------------------------------------- 

function crear(req, res) {
    let persona = req.body;
    persona_db.create(persona, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// -------------------------------------------------------- 

function actualizar(req, res) {
    let persona = req.body;
    let id = req.params.dni;
    persona_db.update(persona, id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// -------------------------------------------------------- 

function borrar(req, res) {
    let id_persona_a_eliminar = req.params.dni;
    persona_db.borrar(id_persona_a_eliminar, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detail.affectedRows == 0) {
                res.status(404).send(result_model.message);
            } else {
                res.send(result_model.message);
            }
        }
    });
}

// -------------------------------------------------------- 

function getUserByPersona(req, res) {
    persona_db.getUserByPersona(req.params.dni, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result_model);
        }
    });
}

// -------------------------------------------------------- 

function getByDNI(req, res) {
    let id = req.params.dni;
    persona_db.getByDNI(id, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result_model);
        }
    });
}

// -------------------------------------------------------- 

module.exports = app;

