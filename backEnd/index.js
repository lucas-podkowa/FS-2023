//declaraciones y configuraciones iniciales
const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');


//fin de declaraciones


//conectarnos a la BD
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'silicon'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

//fin conexion


//codigo fuente

app.get('/api/persona', (req, res) => {

    $query = 'SELECT * FROM persona';

    connection.query($query, function (err, rows) {
        if (err) {
            res.send(err);
            return;
        }
        res.send(rows);
    });

    //res.send("listar")
});

/*
         {
                    mensaje : "error del servidor",
                    detalle: err 
                }
*/

//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : lo que le evio desde el servidor al frontend
app.post('/api/persona', (req, res) => {

    parametros = [req.body.dni, req.body.nombre, req.body.apellido]
    $query = 'INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?)';

    connection.query($query, parametros, function (err, rows) {
        if (err) {
            res.status(500).send({
                mensaje: "error del servidor",
                detalle: err
            });
            return;
        } else {
            res.send("se creo la persona" + req.body.nombre + req.body.apellido);
        }
    });

});

app.put('/api/persona/:dni', (req, res) => {
    parametros = [req.body.dni, req.body.nombre, req.body.apellido, req.params.dni]
    $query = 'UPDATE persona set dni = ?, nombre = ?, apellido = ? WHERE dni = ?';

    connection.query($query, parametros, function (err, rows) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                    message: "no se encontró la persona " + req.params.dni,
                });
            } else {
                res.send({
                    message: "se modifico la persona " + req.params.dni,
                    detail: rows
                });
            }
        }
    });

});

app.delete('/api/persona/:dni', (req, res) => {
    parametros = [req.params.dni]
    $query = 'DELETE FROM persona WHERE dni = ?';

    connection.query($query, parametros,  function (err, rows) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                   message: "no se encontró la persona " + req.params.dni,
                });
            } else {
                res.send({
                    message: "se elimino la persona " + req.params.dni,
                    detail: rows
                });
            }
        }
    });

});


//fin codigo


app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto 8080");
    }
});