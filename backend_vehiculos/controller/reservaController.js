// roothpath : manejo de rutas de otros modulos del proyecto
// express : modulo que permite gestionar y lanzar servidores
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var db_reserva = require("model/reserva.js");
const auth = require("config/auth.js");


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para PERSONAS-- 
// -------------------------------------------------------- 
app.get('/', listar);
app.post('/', crear);
app.get('/buscar/:reserva_id', buscarPorId);
app.put('/:reserva_id', actualizar);
app.get('/personas', personas_x_reserva);
app.put('/cancelar/:reserva_id', cancelar);
app.put('/finalizar/:reserva_id', finalizar);




// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// --------------------------------------------------------

// --- GET-------------------------------------------------- 
function listar(req, res) {
    db_reserva.listar(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function buscarPorId(req, res) {
    db_reserva.buscarPorId(req.params.reserva_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}


function personas_x_reserva(req, res) {
    //recibo por parametro dentro de 

    if (req.headers["reservas"]) {
        ids_reservas = req.headers["reservas"]
        try {
            db_reserva.personas_x_reserva(ids_reservas, (err, resultado) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(resultado);
                }
            });
        } catch (error) {
            res.status(500).send({
                message: error.message
            });
        }
    }
}


// --- POST ----------------------------------------------------- 

function crear(req, res) {
    db_reserva.crearReserva(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}


// // --- PUT -----------------------------------------------------
function cancelar(req, res) {
    let reserva_id = req.params.reserva_id;
    db_reserva.cancelarReserva(reserva_id, (err, result) => {
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

function finalizar(req, res) {
    let reserva_id = req.params.reserva_id;
    db_reserva.finalizarReserva(reserva_id, (err, result) => {
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

function actualizar(req, res) {
    let reserva_id = req.params.reserva_id;//para identificarlo dentro de la base de datos
    let datos_reserva = req.body; //aquellos datos que quiero reemplazar, modificar, etc 
    db_reserva.actualizarReserva(reserva_id, datos_reserva, (err, result) => {
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

// // --- DELETE ----------------------------------------------------- 


module.exports = app;

