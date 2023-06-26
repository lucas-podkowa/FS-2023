'use strict';
let events = require('events');

class Robot extends events {
    constructor(nombre){
        super();
        this.nombre = nombre;
    }
    saludar(){
        console.log(`Hola, mi nombre es ${this.nombre}.`);
        this.emit('saludar');
    }
    frente(){
        console.log(`${this.nombre} camina al frente.`);
        this.emit('frente');
    }
    atras(){
        console.log(`${this.nombre} camina hacia atras.`);
        this.emit('atras');
    }
}
let genialo = new Robot('Genialo');
genialo.on('frente',function(){
    console.log(this.nombre + ' da dos pasos al frente');
});

genialo.on('atras',function(){
    console.log(this.nombre + ' da dos pasos atras');
});

genialo.saludar();
genialo.frente();
genialo.atras();
