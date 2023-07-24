const express = require('express');
const morgan = require('morgan');
var fs = require('fs');

const app = express();

app.use('/static', express.static('public')) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');



app.get('/', function (req, res) {
    res.send("esto es el HOME - mi pagina de inicio");
});

//listamos personas
//getAll()
app.get('/api/persona', function (req, res) {
    
    var personas = fs.readFileSync(__dirname + '/personas.json');
    res.send(personas);
});

//creamos persona
app.post('/api/persona', function (req, res) {
    var persona = {
        "nombre": req.body.nombre,
        "apellido": req.body.apellido,
        "dni": req.body.dni,
    };

    //fs.readFileSyn lee un archivo fisico y me devuelve un string (cadena de caracteres)
    //antes de continuar necesitamos transformar esa cadena de caracteres a un objeto JSON
   
     var personasString = fs.readFileSync(__dirname + '/personas.json');
     var personas = JSON.parse(personasString);
    
    //var personas = JSON.parse(fs.readFileSync(__dirname + '/personas.json'));

    //necesitamos recorrer un array con objetos JSON en su interior, es lo que se almaceno cuando
    //envie esos JSON desde el Postman en el body

//var personas = fs.readFileSync(__dirname + '/personas.json');

   for (var index in personas) {
        var personaExistente = personas[index];
        if (persona.dni == personaExistente.dni) {
            res.send(`Ya existe la persona ${personaExistente.nombre} ${personaExistente.apellido} ${personaExistente.dni}`);
            return;
        }
    }
    personas.push(persona);

    fs.writeFileSync(__dirname+'/personas.json', JSON.stringify(personas));
    
    res.send(`Se creó la persona ${persona.nombre} ${persona.apellido} ${persona.dni}`);


    //los pasos fueron 
    //leer el archivo pesonas.json
    //tranformar a un objero JSON
    //recorrer ese objeto para poder agregar el nuevo dato en caso que aun no exista
    //una vez agregado, volver a tranformar ese JSON a un String
    //escribir ese nuevo string en el archivo personas.json (reemplazar la infomracion antigua por la nueva)
});


//modificamos persona
app.put('/api/persona', function (req, res) {
    var dni = req.body.dni;
    var personas = JSON.parse(fs.readFileSync(__dirname + '/personas.json'));

    for (var index in personas) {
        var persona = personas[index];
        if (persona.dni == dni) {
            persona.nombre = req.body.nombre;
            persona.apellido = req.body.apellido;
            fs.writeFileSync(__dirname+'/personas.json', JSON.stringify(personas));
            res.send(`Se modificó la persona ${persona.nombre} ${persona.apellido} ${req.body.dni}`);
            return;
        }
    }
    
    res.send(`La persona con dni  ${req.body.dni} no existe`);
});



//eliminamos persona
app.delete('/api/persona/:dni', function (req, res) {
    var dni = req.params.dni;
    var personas = JSON.parse(fs.readFileSync(__dirname + '/personas.json'));
    for (var index in personas) {
        var persona = personas[index];
        if (persona.dni == dni) {
            personas.splice(index, 1);
            fs.writeFileSync(__dirname+'/personas.json', JSON.stringify(personas));
            res.send(`Se eliminó la persona ${req.params.dni}`);
            return;
        }
    }
    res.send(`No se encontró la persona ${req.params.dni}`);
});



// app.get('/api/prueba', function (req, res) {
//     res.attachment('mi_archivito.txt');
//     res.end("contenido del archivito");
//  });

 app.get('/api/imagen', function (req, res) {
    //deben tener una imagen con dicho nombre en la carpeta del proyecto
    var fotito = fs.readFileSync(__dirname + '/imagen.png');
    res.attachment('imagen_a_descargarse.png')
    res.end(fotito);
 });
 
 app.get('/api/video', function (req, res) {
    //deben tener una imagen con dicho nombre en la carpeta del proyecto
    var video = fs.readFileSync(__dirname + '/scrum_resumido.mp4');
    res.attachment('video.mp4')
    res.end(video);
 });

 app.get('/api/imagen/descargar', function (req, res) {
    res.download('./public/imagen.png',"archivo01.jpeg")
 });
  
 
 
 














//levantamos el servidor
app.listen(8080, () => {
    console.debug('App escuchando puerto :8080');
});







/*
//montar un servidor


//1
configuracion de modulos y/o paquetes a utilizar, declaracion de variables o constantes globales
podria incluir la necesidad de instalar coasas (NPM install #nombre_modulo)
app --> express()



//2
para atender los pedidos recibidos desde el frontend debemos configurar o programar los ENDPOINTS (rutas a las cuales debo dar serviccio)
()=>{}

app.METODOS("PATH o rutas", funcionCallBack);
dentro de la funcion callback damos inteligencia al sistema, funcionalidad
damos una respuesta... recibimos una peticion (req) y devolvemos una respuesta (res)




//3
activar el servidor, levantarlo, dejarlo a la escucha



*/

























