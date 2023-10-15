require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var usuarioDb = require("model/usuario.js");

const auth = require("config/auth.js");



// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para USUARIOS-- 
// -------------------------------------------------------- 

app.get('/', auth.verificarToken, getAll);
app.post('/', auth.verificarToken, createUser);
app.put('/:id_usuario', updateUser);
app.delete('/:id_usuario', deleteUser);


// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// -------------------------------------------------------- 

//req : datos enviados desde el frontend para que lo utilicemos
//res : respuesta enviada desde el servidor al frontend

function getAll(req, res) {
    usuarioDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function createUser(req, res) {
    let usuario = req.body;
    usuarioDb.create(usuario, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


function updateUser(req, res) {
    let datos_usuario = req.body; //aquellos datos que quiero reemplazar, modificar, etc 
    let id_usaurio = req.params.id_usuario //para identificarlo dentro de la base de datos
    usuarioDb.update(datos_usuario, id_usaurio, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado)
        }
    })
}


function deleteUser(req, res) {
    usuarioDb.borrar(req.params.id_usuario, (err, result_model) => {
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

module.exports = app;



