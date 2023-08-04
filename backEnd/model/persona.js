require('rootpath')();

var persona_db = {};

const { query } = require('express');
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



//-- antes -------------------------------------------------------------------
//teniamos un solo archivo que era el index //codificaba todo en la misma funcion


//-- ahora -------------------------------------------------------------------
//tenemos 2 archivos que son el persona_index y la persona_BD
//tengo que codificar en dos funciones y comunicarme entre ellas
//persona_index (interaccion con el servidor): se encargara de mandarle los mensajes al frontend y de hacer peticiones a persona_BD  
//persona_BD (interaccion con la base de datos): recibira peticiones de persona_index y debera devolver una respuesta
//¿como me comunico?: una forma invocar(mandar una funcion [carretilla vacia]) ---> atender (recibir la funcion que me mandaron)
//persona_BD are lo que tenga que hacer y enviare mis datos a la funcion que me enviaron [llenar la carretilla]




persona_db.getAll = function (funCallback) {
    var consulta = 'SELECT * FROM persona';
    connection.query(consulta, function (err, rows) {
        if (err) {
            funCallback(err);
            return;
        } else {
            funCallback(undefined, rows);
        }
    });
}

persona_db.getByDNI = function (dni, funCallback) {
    connection.query("select * from persona where dni = ?;", dni, (err, respuesta) => {
        if (err) {
            funCallback({
                mensajito: "a ocurrido algun error inesperado al buscar la persona",
                detalle: err
            });
        } else if (respuesta.length == 0) { //consulta no impacta en nada dentro de la BD
            funCallback(undefined, {
                mensajito: `no se encontro la persona con el dni: ${dni}`,
                detalle: respuesta
            });
        }else {

            funCallback(undefined, {
                mensajito: `los datos de la persona con el dni ${dni} son:`,
                detalle: detail_bd
            });
        }
    });
    
}


persona_db.create = function (persona, funcallback) {
    consulta = "INSERT INTO persona (dni, nombre, apellido) VALUES (?,?,?);";
    params = [persona.dni, persona.nombre, persona.apellido];

    connection.query(consulta, params, (err, detail_bd) => {
        if (err) {

            if (err.code == "ER_DUP_ENTRY") {
                funcallback({
                    mensajito: "La persona ya fue registrada",
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
                mensajito: "se creo la persona " + persona.nombre + persona.apellido,
                detalle: detail_bd
            });
        }
    });
}


persona_db.borrar = function (id_p_e, retorno) {
    consulta = "DELETE FROM persona WHERE dni = ?";
    parametro = id_p_e;

    connection.query(consulta, parametro, (err, result) => {
        if (err) {
            retorno({ menssage: err.code, detail: err }, undefined);

        } else {

            if (result.affectedRows == 0) {
                retorno(undefined, { message: "no se encontro la persona, ingrese otro DNI", detail: result });
            } else {
                retorno(undefined, { message: "persona eliminada", detail: result });
            }
        }
    });

    //borrara la persona y le comunicara al conrtrolador como salio la cosa

}


persona_db.getUserByPersona = function (dni, funcallback) {

    connection.query("select * from persona where dni = ?", dni, (err, respuesta) => {
        if (err) {
            funcallback({
                mensajito: "a ocurrido algun error, posiblemente de sintaxis en buscar la persona",
                detalle: err
            });
        } else if (respuesta.length == 0) { //consulta no impacta en nada dentro de la BD
            funcallback(undefined, {
                mensajito: "no se encontro la persona buscada",
                detalle: respuesta
            });
        } else {
            consulta = "select nickname from usuario INNER JOIN persona on usuario.persona = persona.dni and usuario.persona = ?";
            connection.query(consulta, dni, (err, r) => {
                if (err) {
                    funcallback({
                        mensajito: "a ocurrido algun error, posiblemente de sintaxis en buscar el nickname",
                        detalle: err
                    });
                } else if (r.length == 0) { //array vacio
                    funcallback(undefined, {
                        mensajito: "la persona seleccionada no posee usuario registrado en la base de datos",
                        detalle: r
                    });
                } else {
                    funcallback(undefined, { // consulta impacta bien, y el array no esta vacio 
                        mensajito: `El nikname de la persona seleccionada es ${r[0]['nickname']}`,
                        detalle: r
                    });
                }
            });


        }
    });




}


module.exports = persona_db;