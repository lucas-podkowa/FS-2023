//configuraciones iniciales
//se inicializan las constantes para tener acceso a la funcionalidad de mysql asi como el archivo config donde se encuentran los datos de conexion

require('rootpath')();
const mysql = require('mysql');
const config = require("config/config.json");

//inicializa la conexion entre el servidor y la base de datos
var connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

var db_vehiculo = {};

/*
db_vehiculo : es un objeto que sera invocado desde los endpoint del controlador. Aquí en el MODEL, dicho objeto posee las funcionalidades que permiten la interaccion con la base de datos como update, create, delete, etc. entonces del lado del controlador puedo invocar a db_vehiculo.update(); o db_vehiculo.create();

funCallback: en una funcion que la enviamos desde el endpoint del controlador, es mediante esta funcion que le damos una respuesta desde el MODEL hacia el CONTROLLER, aquí lo que enviamos como error o detalles con mensajes, es lo que recibira vehiculoController para seguir su proceso de respuesta hacia el forontend
*/


// C = CREATE
// vehiculoController --> app.post('/', create);
db_vehiculo.crear = function (datos, funCallback) {
    consulta = "INSERT INTO vehiculo (marca_id, matricula, modelo, ano) VALUES (?,?,?,?);";
    params = [datos.marca_id, datos.matricula, datos.modelo, datos.ano];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    message: "El Vehiculo ya fue registrado anteriormente",
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
                message: `se creo el Vehiculo  ${datos.modelo}, matricula N°: ${datos.matricula}`,
                detail: rows
            });
        }
    });
}

//R = READ
// vehiculoController --> app.get('/', getAll);
db_vehiculo.listar = function (funCallback) {
    var consulta = 'SELECT vehiculo.*, CONCAT (vehiculo.modelo, " (", vehiculo.matricula, ")") vehiculo_desc FROM vehiculo';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: "ha ocurrido un error inesperado al listar los vehiculos",
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}

//R = READ
// vehiculoController --> app.get('/disponibles', findDisponibles);
db_vehiculo.findDisponibles = function (funCallback) {
    var consulta = `SELECT * FROM vehiculo where vehiculo_id NOT IN 
    (SELECT vehiculo_id FROM reservas where finalizada is false and cancelada is false)`;
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: "ha ocurrido un error inesperado al listar los vehiculos",
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}


// U = UPDATE
// vehiculoController --> app.put('/', actualizar);
db_vehiculo.actualizar = function (datos, vehiculo_id, funCallback) {
    params = [datos.marca_id, datos.modelo, datos.matricula, datos.ano, vehiculo_id];
    consulta = "UPDATE vehiculo SET marca_id = ?, modelo = ?, matricula = ?, ano = ? WHERE vehiculo_id = ?";

    connection.query(consulta, params, (err, result) => {

        if (err) {
            if (err.code == "ER_DUP_ENTRY") { //dni duplicado
                funCallback({
                    message: "Los datos a insertar generan un vehiculo duplicado",
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
                message: "No existe un vehiculo que coincida con el criterio de busqueda",
                detail: result
            });
        } else {
            funCallback(undefined, {
                message: `se modificó el vehiculo  ${datos.matricula}`,
                detail: result
            });
        }
    });
}



// D = DELETE
// vehiculoController --> app.post('/', borrar);
db_vehiculo.borrar = function (vehiculo_id, funCallback) {
    consulta = "DELETE FROM vehiculo WHERE vehiculo_id = ?";
    connection.query(consulta, vehiculo_id, (err, result) => {
        if (err) {
            funCallback({
                message: err.code,
                detail: err
            });
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,
                    {
                        message: "no se encontro un vehiculo con el id ingresado",
                        detail: result
                    });
            } else {
                funCallback(undefined,
                    {
                        message: "Vehiculo eliminado con exito",
                        detail: result
                    });
            }
        }
    });
}



// securityController --> app.post('/login', login);
db_vehiculo.buscarPorVehiculoID = function (vehiculo_id, funCallback) {
    connection.query('SELECT * FROM vehiculo WHERE vehiculo_id = ?', vehiculo_id, (err, result) => {
        if (err) {
            funCallback({
                message: "a ocurrido algun error inesperado, revisar codigo de error",
                detail: err
            });
        } else if (result.length == 0) { //consulta no impacta en nada dentro de la BD
            funCallback(undefined, {
                message: `no se encontro un vehiculo con el ID: ${vehiculo_id}`,
                detail: result
            });
        } else {

            funCallback(undefined, {
                message: `Vehiculo hallado con exito`,
                detail: result[0]
            });
        }
    });

}

// exportamos el objeto db_vehiculo para que Node.JS lo haga publico y pueda utilizarse desde otros modulos
module.exports = db_vehiculo;