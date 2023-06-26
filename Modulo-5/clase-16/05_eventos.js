
var eventos = require('events'); // cargamos la libreria de eventos

var control_remoto = new eventos();// creamos un nuevo manejador de eventos

// cuando presionamos adelante
var func_adelante = function(){
    console.log('El robot camina hacia el frente');
};

control_remoto.on('adelante', func_adelante);

var funcion_atras = function(){
    console.log('El robot camina hacia atras');
}
// cuando presionamos atras

control_remoto.on('atras', funcion_atras);
// cuando ordenamos saludar
// el robot se detiene

control_remoto.on('saludar',function(){
    console.log('Detener robot.');
});

// el robot saluda
control_remoto.on('saludar',function(){
    console.log('El robot dice "Hola, soy Genialo"!');
});




// utilizar controles
control_remoto.emit('adelante');
control_remoto.emit('atras');
control_remoto.emit('saludar');
