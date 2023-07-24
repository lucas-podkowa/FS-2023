require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const configuracion = require("config.json");
var personaDb = require("personaBD.js");

//req : es lo que llega desde el frontend (en nuestro caso Postman)
//res : respuesta enviada desde el servidor al frontend

//atendiendo el endpoint /api/persona mediante el metodo GET 
// |--> llamar a la funcion getAll() que está en el archivo encargado de hestionar lo relacionado a la tabla PERSONA en la BD
//      y procesara la respuesta en una funcion callback
// |--> GetAll() enviara como respuesta un error (que le enviará la base de datos) o los datos en caso de exito   


app.get("/api/persona", (req, res) => {

    //    var resultado = personaDb.getAll();
    //     if (resultado.isError) {
    //         res.status(500).send(err);
    //     } else {
    //         res.json(resultado);
    //     }


    personaDb.getAll((err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });

});


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


app.post('/api/persona', (req, res) => {

    let persona = req.body;
    personaDb.create(persona, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });

});


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


app.put('/api/persona/:dni', (req, res) => {
    parametros = [req.body.dni, req.body.nombre, req.body.apellido, req.params.dni]
    $query = 'UPDATE persona set dni = ?, nombre = ?, apellido = ? WHERE dni = ?';

    connection.query($query, parametros, function (err, rows) {
        if (err) {
            res.status(500).send({
                mensaje: "mensajito pa que lo veas fulano del frontend",
                detail: err
            });
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                    message: "no se encontró la persona " + req.params.dni,
                    detail: rows
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


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

app.delete('/api/persona/:dni', (req, res) => {
    $query = 'DELETE FROM persona WHERE dni = ?';

    connection.query($query, req.params.dni, function (err, rows) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            if (rows.affectedRows == 0) {
                res.status(404).send({
                    message: "no se encontró la persona " + req.params.dni,
                    detail: rows
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


//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------


app.listen(configuracion.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sevidor escuchando en el puerto " + configuracion.server.port);
    }
});