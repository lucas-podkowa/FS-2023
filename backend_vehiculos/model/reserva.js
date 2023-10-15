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

var db_reserva = {};

/*
db_reserva : es un objeto que sera invocado desde los endpoint del controlador. Aquí en el MODEL, dicho objeto posee las funcionalidades que permiten la interaccion con la base de datos como update, create, delete, etc. entonces del lado del controlador puedo invocar a db_reserva.update(); o db_reserva.create();

funCallback: en una funcion que la enviamos desde el endpoint del controlador, es mediante esta funcion que le damos una respuesta desde el MODEL hacia el CONTROLLER, aquí lo que enviamos como error o detalles con mensajes, es lo que recibira vehiculoController para seguir su proceso de respuesta hacia el forontend
*/


convertirFecha = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${anio}-${mes}-${dia}`;
}



// C = CREATE
// reservaController --> app.post('/:datosReserva', crearReserva);
db_reserva.crearReserva = function (data, funCallback) {
    let reserva = data.datos;
    let personas = data.personas

    consulta = "INSERT INTO reserva (vehiculo_id, evento_id, desde, hasta) VALUES (?,?,?,?);";
    params = [
        reserva.vehiculo_id,
        reserva.evento_id,
        convertirFecha(reserva.desde),
        convertirFecha(reserva.hasta)
    ];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    message: "Datos Duplicados",
                    detail: err
                });
            } else {
                funCallback({
                    message: err.message,
                    detail: err
                });
            }
        } else {
            //hasta aca tenemos la reserva creada pero nos falta asignarles las personas a persona_x_reserva
            //es como si cargara el medico y ahora debo cargar todos los horarios de ese medico en la tabla horarios_medico

            //INSERT INTO persona_x_reserva (persona_id, reserva_id) VALUES (7, 1), (7, 2),  (7, 3),
            //(7, 1), (7, 2), (7, 3),'

            const lastId = rows.insertId;
            let insert = 'INSERT INTO persona_x_reserva (persona_id, reserva_id) VALUES'
            for (let i = 0; i < personas.length; i++) {
                insert = insert + `(${personas[i].value}, ${lastId}),`
            }
            insert = insert.substring(0, insert.length - 1);

            connection.query(insert, (err, result) => {
                if (err) {
                    funCallback({
                        message: err.message,
                        detail: err
                    });
                } else {
                    funCallback(undefined, {
                        message: `se creo la reserva exitosamente`,
                        detail: result
                    });
                }
            });
        }
    });
}




//R = READ
// reservaController --> app.get('/', listar);
db_reserva.listar = function (funCallback) {
    var consulta = `SELECT r.*, v.modelo as vehiculo_desc, e.nombre as evento FROM reserva r
    INNER JOIN vehiculo v on r.vehiculo_id = v.vehiculo_id
    INNER JOIN evento e on r.evento_id = e.evento_id
    AND cancelada is false
    AND finalizada is false`;
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: err.message,
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}




// reservaController --> app.get('/:reserva_id', buscarPorId);
db_reserva.buscarPorId = function (reserva_id, funCallback) {
    var consulta = 'SELECT * FROM reserva WHERE reserva_id = ?';
    connection.query(consulta, reserva_id, function (err, result) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, {
                message: `Reserva encontrada`,
                detail: result[0]
            });

        }
    });
}





//R = READ
// reservaController --> app.get('/personas', personas_x_reserva); 
db_reserva.personas_x_reserva = function (ids_reservas, funCallback) {

    var consulta = `SELECT pxr.persona_id, pxr.reserva_id, CONCAT (p.apellido, ' ', p.nombre) agente FROM persona_x_reserva pxr
    INNER JOIN persona p on pxr.persona_id = p.persona_id
    AND pxr.reserva_id in (${ids_reservas})`;
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback({
                message: err.message,
                detail: err
            });
        } else {
            funCallback(undefined, rows);
        }
    });
}





// reservaController --> app.put('/cancelar/:reserva_id', cancelar);
db_reserva.cancelarReserva = function (reserva_id, funCallback) {
    consulta = "UPDATE reserva SET cancelada = true WHERE reserva_id = ?";
    connection.query(consulta, reserva_id, (err, result) => {
        if (err) {
            funCallback({
                message: err.code,
                detail: err
            });
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,
                    {
                        message: "no se encontro una reserva con el id ingresado",
                        detail: result
                    });
            } else {
                funCallback(undefined,
                    {
                        message: "Reserva cancelada con exito",
                        detail: result
                    });
            }
        }
    });
}

// reservaController --> app.put('/finalizar/:reserva_id', finalizar);
db_reserva.finalizarReserva = function (reserva_id, funCallback) {
    consulta = "UPDATE reserva SET finalizada = true WHERE reserva_id = ?";
    connection.query(consulta, reserva_id, (err, result) => {
        if (err) {
            funCallback({
                message: err.code,
                detail: err
            });
        } else {
            if (result.affectedRows == 0) {
                funCallback(undefined,
                    {
                        message: "no se encontro una reserva con el id ingresado",
                        detail: result
                    });
            } else {
                funCallback(undefined,
                    {
                        message: "Reserva Finalizada con exito",
                        detail: result
                    });
            }
        }
    });
}

db_reserva.actualizarReserva = function (id, datos, funCallback) {

    let reserva = datos.datos;
    let personas = datos.personas

    consulta = "UPDATE reserva SET vehiculo_id = ?, evento_id = ?, desde = ?, hasta= ? WHERE reserva_id = ?;";
    params = [
        reserva.vehiculo_id,
        reserva.evento_id,
        convertirFecha(reserva.desde),
        convertirFecha(reserva.hasta),
        id
    ];

    connection.query(consulta, params, (err, rows) => {
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                funCallback({
                    message: "Datos Duplicados",
                    detail: err
                });
            } else {
                funCallback({
                    message: err.message,
                    detail: err
                });
            }
        } else {
            //hasta aca tenemos la reserva actualizada pero nos falta revisar las personas en ella
            //hay dos alternativas, una es revisar si hay cambios para ver que personas quitar y que personas agregar
            //la otra opcion es hacer un reemplazo directo, es decir, borrar todas las personas anteriores y asignar las nuevas
            //vamos por la segunda opcion

            connection.query(`DELETE FROM persona_x_reserva where reserva_id = ${id} `, (err, result) => {
                if (err) {
                    funCallback({
                        message: err.message,
                        detail: err
                    });
                } else {

                    let insert = 'INSERT INTO persona_x_reserva (persona_id, reserva_id) VALUES'
                    for (let i = 0; i < personas.length; i++) {
                        insert = insert + `(${personas[i].value}, ${id}),`
                    }
                    insert = insert.substring(0, insert.length - 1);

                    connection.query(insert, (err, result) => {
                        if (err) {
                            funCallback({
                                message: err.message,
                                detail: err
                            });
                        } else {
                            funCallback(undefined, {
                                message: `se actualizo la reserva exitosamente`,
                                detail: result
                            });
                        }
                    });
                }
            });
            console.log(rows)
        }
    });
}


module.exports = db_reserva;