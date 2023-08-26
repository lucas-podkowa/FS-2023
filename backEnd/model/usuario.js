require('rootpath')();
const mysql = require('mysql');
const configuracion = require("config.json");

var connection = mysql.createConnection(configuracion.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("base de datos conectada");
    }
});

var usuario_db = {};

/*
usuario_db : es un objeto que sera invocado desde los endpoint del controlador. Aquí en el MODEL, dicho objeto posee las funcionalidades que permiten la interaccion con la base de datos como getAll, update, etc. Entonces desde usuarioController puedo invocar a usuario_db.update(); o usuario_db.borrar();

funCallback: en una funcion que la enviamos desde el endpoint del controlador, es mediante esta funcion que le damos una respuesta desde el MODEL hacia el CONTROLLER, aquí lo que enviamos como error o detalles con mensajes, es lo que recibira usuarioController para seguir su proceso de respuesta hacia el forontend
*/


// C = CREATE
// usuarioController --> app.post('/', createUser);
usuario_db.create = function (usuario, funcallback) {
    consulta = "INSERT INTO USUARIO (mail, nickname, clave, persona) VALUES (?,?,?,?);";
    params = [usuario.mail, usuario.nickname, usuario.clave, usuario.persona];

    connection.query(consulta, params, (err, detail_bd) => {
        if (err) {

            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "el usuario ya fue registrado",
                    detalle: err
                });
            } else {
                funcallback({
                    mensajito: "error diferente",
                    detalle: err
                });
            }
        } else {

            funcallback(undefined, {
                mensajito: "se creo el usaurio " + usuario.nickname,
                detalle: detail_bd
            });
        }
    });
}

//R = READ
// usuarioController --> app.get('/', getAll);
usuario_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM USUARIO';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

//U = UPDATE
// usuarioController --> app.put('/:id_usuario', updateUser);
usuario_db.update = function (datos_usuario, id_usaurio, funcallback) {
    params = [datos_usuario.mail, datos_usuario.nickname, datos_usuario.clave, id_usaurio]
    consulta = "UPDATE USUARIO set mail = ?, nickname = ?, clave = ? WHERE id_usuario = ?;";

    connection.query(consulta, params, (err, result) => {
        if (err) {
            if (err.code = "ER_TRUNCATED_WRONG_VALUE") {
                funcallback({
                    message: `el id de usuario es incorrecto, se espera un numero entero`,
                    detail: err
                });
            } else {
                funcallback({
                    message: `error desconocido`,
                    detail: err
                });
            }
        } else {
            if (result.affectedRows == 0) {
                funcallback({
                    message: "No existe un usuario que coincida con el criterio de busqueda",
                    detail: result
                });
            } else {
                funcallback(undefined, {
                    message: `se actualizaron los datos del usuario ${id_usaurio}`,
                    detail: result
                });
            }
    
        }
    });



}

// D = DELETE
// usuarioController --> app.delete('/:id_usuario', deleteUser);
usuario_db.borrar = function (id_usuario, retorno) {
    consulta = "DELETE FROM USUARIO WHERE id_usuario = ?";
    connection.query(consulta, id_usuario, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);

        } else {

            if (result.affectedRows == 0) {
                retorno(undefined, { message: "no se encontro el usaurio, ingrese otro id", detail: result });
            } else {
                retorno(undefined, { message: "usuario eliminado", detail: result });
            }
        }
    });
}



module.exports = usuario_db;