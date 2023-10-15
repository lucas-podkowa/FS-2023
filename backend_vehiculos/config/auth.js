require('rootpath')();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require("config/config.json");
var usuarioDb = require("model/usuario.js");

//controller: gestionaba peticiones y respuestas 
//model: donde tengo las querys a la BD


// -------------------------------------------------------- 
// ---- POST Login: en el body llegan las credeciales ----- 
// -------------------------------------------------------- 
app.post('/login', login);

/*
requisito
1. Encriptar la clave de usuario

login
1. poseer un archivo que gestione la seguridad (ej: securityController.js) que contenga la funcion login
2. viene una peticion desde el front y debe pegar en algun endpoint de /login   (NEXT)
    2.1. en el req.body llegara el nickname y la clave desde el formulario de login
    2.2. debo consultar si existe ese usuario en la base de datos por lo que debo hacer una consulta (ej: findByNickname)
        2.2.1 si no existe el usuario: devuelvo un mensaje de error avisando que el usuario no existe
        2.2.2 si existe: debo verificar si su clave es correcta, como la clave de la bd esta encriptada, utilizo "bcrypt.compareSync"
            2.2.2.1 si no es la misma clave: devuelvo un mensaje de error con clave incorrecta
            2.2.2.2 si es la misma: debo generar un token con "jwt.sign"

3. para pegar contra ese login debo generar en index.js un enlace al controlador securityController
*/


function login(req, res) {
    //const nickname = req.body.nickname
    //const clave = req.body.clave

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
                    nickname: result.detail.nickname,
                    mail: result.detail.mail,
                    rol: result.detail.nombre,
                    rol_id: result.detail.rol_id
                }
                //JSON WEB TOKEN
                // devolvemos un json en forma de token (que basicamente es un string cifrado)

                jwt.sign(user, config.auth.accesKey, { expiresIn: '600s' }, (err, token) => {
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
                res.status(401).send({
                    message: 'Contraseña Incorrecta'
                });
            }
        }
    });
}

// function login(req, res) {
//     //const nickname = req.body.nickname
//     //const clave = req.body.clave

//     const { nickname, clave } = req.body; //ES6

//     usuarioDb.findByNickname(nickname, (err, result) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             // hasta aca sabemos que el usuario con ese "nickname" existe en la DB,
//             // ahora debemos verificar si su clave es correcta, para ello debemos desencriptarla
//             //const iguales = bcrypt.compareSync("texto plano", "texto encriptado");

//             const iguales = bcrypt.compareSync(clave, result.detail.clave);
//             if (iguales) {
//                 let user = {
//                     nickname: result.detail.nickname,
//                     mail: result.detail.mail,
//                 }


//                 let acces = generando(user, config.auth.accesKey, '10m');
//                 let refresh = generando(user, config.auth.refreshKey, '12h');
//                 console.log(acces.resolve)

//                 // let retornar = {
//                 //     datos: user,
//                 //     accesToken: acces,
//                 //     refreshToken: refrsh
//                 // }
//                 // console.log(retornar)

//             } else {
//                 res.status(401).send({
//                     message: 'Contraseña Incorrecta'
//                 });
//             }
//         }
//     });
// }

// async function generando(user, key, time) {
//     return await getToken(user, key, time);
// }


// const getToken = (user, key, time) => {
//     return new Promise((resolve, reject) => {
//         jwt.sign(user, key, { expiresIn: time }, (err, token) => {
//             if (err) {
//                 reject(err.message)
//             } else {
//                 resolve(token)
//             }
//         })
//     })
// };

function verificarToken(req, res, next) {
    if (req.headers["authorization"]) {
        try {
            const token = req.headers["authorization"]
            const verified = jwt.verify(token, "nuestraClave");
            if (verified) {
                next();
            } else {
                res.status(403).send({
                    message: "Token invalido, permiso denegado"
                });

            }

        } catch (error) {
            res.status(403).send({
                message: "Acceso Denegado"
            });
        }

    } else {
        res.status(403).send({
            message: "No posee token de autorizacion"
        });
    }
}

module.exports = { app, verificarToken };