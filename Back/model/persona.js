//configuraciones iniciales
require('rootpath')();

/*
se inicializan las constantes para tener acceso a la funcionalidad de mysql asi como el archivo config donde se encuentran los datos de conexion
*/

const mysql = require('mysql');
const configuracion = require("config.json");

//inicializa la conexion entre el servidor y la base de datos
var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

var persona_db = {};

/*
persona_db : es un objeto que sera invocado desde los endpoint del controlador. Aquí en el MODEL, dicho objeto posee las funcionalidades que permiten la interaccion con la base de datos como update, create, delete, etc. entonces del lado del controlador puedo invocar a persona_db.update(); o persona_db.create();

funCallback: en una funcion que la enviamos desde el endpoint del controlador, es mediante esta funcion que le damos una respuesta desde el MODEL hacia el CONTROLLER, aquí lo que enviamos como error o detalles con mensajes, es lo que recibira personaController para seguir su proceso de respuesta hacia el forontend
*/


// C = CREATE
// personaController --> app.post('/', create);
persona_db.create = function (datos, funCallback) {
    consulta = "INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?);";
    params = [datos.dni, datos.nombre, datos.apellido];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    message: "La persona ya fue registrada anteriormente",
                    detail: err
                });
            } else {
                funCallback({
                    message: "error diferente",
                    detail: err
                });
            }
        } else {
            funCallback(undefined, {
                message: `se creo la persona  ${persona.nombre} ${persona.apellido}`,
                detail: rows
            });
        }
    });
}

//R = READ
// personaController --> app.get('/', getAll);
persona_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM persona';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: "ha ocurrido un error inesperado al buscar la persona",
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}


// U = UPDATE
// personaController --> app.put('/', actualizar);
persona_db.update = function (datos, id, funCallback) {
    consulta = "UPDATE persona SET dni = ?, nombre = ?, apellido = ? WHERE dni = ?";
    params = [datos.dni, datos.nombre, datos.apellido, id];

    connection.query(consulta, params, (err, result) => {

        if (err) {
            if (err.code == "ER_DUP_ENTRY") { //dni duplicado
                funCallback({
                    message: "Los datos a insertar generan una persona duplicada",
                    detail: err
                });
            } else { //algun otro codigo de error
                funCallback({
                    message: "error diferente, analizar codigo error",
                    detail: err
                });
            }
        } else if (result.affectedRows == 0) { //persona a actualizar no encontrada
            funCallback({
                message: "No existe persona que coincida con el criterio de busqueda",
                detail: result
            });
        } else {
            funcallback(undefined, {
                message: `se modificó la persona  ${persona.nombre} ${persona.apellido}`,
                detail: result
            });
        }
    });
}



// D = DELETE
// personaController --> app.post('/', borrar);
persona_db.borrar = function (id, funCallback) {
    consulta = "DELETE FROM persona WHERE dni = ?";
    connection.query(consulta, id, (err, result) => {
        if (err) {
            funCallback({ menssage: err.code, detail: err });
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,
                    {
                        message: "no se encontro una persona con el dni ingresado",
                        detail: result
                    });
            } else {
                funCallback(undefined, { message: "persona eliminada", detail: result });
            }
        }
    });
}


// personaController --> app.get('/:dni', getByDNI);
persona_db.getByDNI = function (dni, funCallback) {
    connection.query('SELECT * FROM persona WHERE dni = ?', dni, (err, result) => {
        if (err) {
            funCallback({
                menssage: "a ocurrido algun error inesperado al buscar la persona",
                detail: err
            });
        } else if (result.length == 0) { //consulta no impacta en nada dentro de la BD
            funCallback(undefined, {
                menssage: `no se encontro una persona con el DNI: ${dni}`,
                detail: result
            });
        } else {

            funCallback(undefined, {
                menssage: `los datos de la persona con el dni ${dni} son:`,
                detail: result
            });
        }
    });

}


// personaController --> app.get('/:persona', getUserByPersona);
persona_db.getUserByPersona = function (persona, funcallback) {

    connection.query("select * from persona where dni = ?", persona, (err, result) => {
        if (err) {
            funcallback({
                menssage: "a ocurrido algun error, posiblemente de sintaxis en buscar la persona",
                detail: err
            });
        } else if (result.length == 0) { //consulta no impacta en nada dentro de la BD
            funcallback(undefined, {
                menssage: "no se encontro la persona buscada",
                detail: result
            });
        } else {
            consulta = "select nickname from usuario INNER JOIN persona on usuario.persona = persona.dni and usuario.persona = ?";
            connection.query(consulta, persona, (err, result) => {
                if (err) {
                    funcallback({
                        menssage: "a ocurrido algun error, posiblemente de sintaxis en buscar el nickname",
                        detail: err
                    });
                } else if (result.length == 0) { //array vacio
                    funcallback(undefined, {
                        menssage: "la persona seleccionada no posee usuario registrado en la base de datos",
                        detail: result
                    });
                } else {
                    funcallback(undefined, { // consulta impacta bien, y el array no esta vacio 
                        menssage: `El nikname de la persona seleccionada es ${result[0]['nickname']}`,
                        detail: result
                    });
                }
            });
        }
    });
}

// exportamos el objeto persona_db para que Node.JS lo haga publico y pueda utilizarse desde otros modulos
module.exports = persona_db;