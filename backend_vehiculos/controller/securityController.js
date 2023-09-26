require('rootpath')();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var usuarioDb = require("model/usuario.js");


// -------------------------------------------------------- 
// ---- POST Login: en el body llegan las credeciales ----- 
// -------------------------------------------------------- 
app.post('/login', login);




function login(req, res) {
    //const nickname = req.body.nickname
    //const clave = req.body.clave

    /*
    controller: gestionaba peticiones y respuestas 
    model: donde tengo las querys a la BD
    */

    const { nickname, clave } = req.body; //ES6
    usuarioDb.findByNickname(nickname, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // hasta aca sabemos que el usuario con ese "nickname" existe en la DB,
            // ahora debemos verificar si su clave es correcta, para ello debemos desencriptarla
            
            
            //const iguales = bcrypt.compareSync("texto plano", "texto encriptado");

            const iguales = bcrypt.compareSync(clave, result.detail.clave);
            if (iguales) {
                let user = {
                    nickname: result.nickname,
                    mail: result.mail
                }

                jwt.sign(user, 'siliconSectret', { expiresIn: '1200s' }, (err, token) => {
                    if (err) {
                        res.status(500).send({
                            message: err
                        });
                    } else {
                        res.json({
                            datos: user,
                            token: token
                        });
                    }
                })
            } else {
                res.status(403).send({
                    message: 'Contraseña Incorrecta'
                });
            }
        }
    });
}

/*
requisito
1. Encriptar la clave de usuario

login
1. poseer un archivo que gestione la seguridad (ej: securityController.js) que contenga la funcion login
2. viene una peticion desde el front y debe pegar en algun endpoint de /login 
    2.1. en el req.body llegara el nickname y la clave desde el formulario de login
    2.2. debo consultar si existe ese usuario en la base de datos por lo que debo hacer una consulta (ej: findByNickname)
        2.2.1 si no existe el usuario: devuelvo un mensaje de error avisando que el usuario no existe
        2.2.2 si existe: debo verificar si su clave es correcta, como la clave de la bd esta encriptada, utilizo "bcrypt.compareSync"
            2.2.2.1 si no es la misma clave: devuelvo un mensaje de error con clave incorrecta
            2.2.2.2 si es la misma: debo generar un token con "jwt.sign"

3. para pegar contra ese login debo generar en index.js un enlace al controlador securityController
*/


module.exports = app;