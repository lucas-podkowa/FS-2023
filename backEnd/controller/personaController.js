require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var personaDb = require("model/persona.js");


app.get('/', getAll);
app.get('/:persona', getUserByPersona);
app.get('/:dni', getByDNI);
app.post('/', create);
app.delete('/:dni', borrar);


//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : respuesta enviada desde el servidor al frontend

//atendiendo el endpoint /api/persona mediante el metodo GET 
// |--> llamar a la funcion getAll() que está en el archivo encargado de hestionar lo relacionado a la tabla PERSONA en la BD
//      y procesara la respuesta en una funcion callback
// |--> GetAll() enviara como respuesta un error (que le enviará la base de datos) o los datos en caso de exito  

function getAll(req, res) {
    personaDb.getAll(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function getUserByPersona(req, res) {
    personaDb.getUserByPersona(req.params.dni_persona, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result_model.mensajito);
        }
    });
}


function create(req, res) {
    let persona = req.body;
    personaDb.create(persona, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });

}

function borrar(req, res) {
    let id_persona_a_eliminar = req.params.dni;
    personaDb.borrar(id_persona_a_eliminar, (err, result_model) => {
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


function getByDNI(req, res) {
    personaDb.getByDNI(req.params.dni, (err, result_model) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result_model);
        }
    });
}

module.exports = app;

