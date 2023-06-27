var fs = require('fs');

fs.writeFileSync(__dirname+'/texto2.txt', "texto nuevo");


// fs.writeFileSync(__dirname+'/texto3.js', "var fs = require('fs'); /n fs.writeFileSync(__dirname+'/texto2.js', 'Ahora le voy a pisar el contenido por este nuevo');");