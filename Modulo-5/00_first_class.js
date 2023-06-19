let hola = function(){
    console.log('hola mundo');
}

hola();
//-------------------------------

let persona = {
    "nombre":"Elon",
    "apellido":"Musk",
    "saludar": function(){
        console.log('Hola soy'+ this.nombre);
    }
}
persona.saludar();

//-------------------------------

var saludar = function(unaFuncion){
    unaFuncion();
}
var algo = function(){
    console.log('imprimiendo una funcion dentro de otra funcion');
}
saludar(algo);
