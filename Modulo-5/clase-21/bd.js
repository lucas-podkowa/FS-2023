var base = require('mysql');

// Agregue las credenciales para acceder a su base de datos
var connection = base.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'clinica'
});

// conectarse a mysql
connection.connect(function (err) {
    // en caso de error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    } else {
        console.log("estoy conectado");
    }
});

//-----------------------------------------------------------------

//app.METODO(PATH, Function);
var id = 999;
connection.query('DELETE from medico WHERE matricula=?', id,  function (err, rows) {
   if (err) {
       console.log("An error ocurred performing the query.");
       return;
   }
   console.log("Consulta ejecutada con éxito:", rows);
});


connection.end();

