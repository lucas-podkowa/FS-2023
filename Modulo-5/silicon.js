

//Definicion de la clase ANIMAL
class Animal {
    //Definicion de sus propiedades
    nombre;
    color;
    tipo;

    //inicializacion
    constructor(nombre, color, tipo) {
        this.color = color;
        this.nombre = nombre;
        this.tipo = tipo;
    }

    //metodos
    presentarme() {
        console.log(`Hola, soy un: ${this.tipo}, me llaman: ${this.nombre} y soy de color: ${this.color}`);
        //console.log("Hola, soy un: " + this.tipo + ", me llaman: " + this.nombre + "y soy de color: " + this.color);
    }
};


//instanciacion de clase a objetos
var animal1 = new Animal('Pelusa', 'Blanco', 'gato');
var animal2 = new Animal('Aaron', 'Gris', 'perro');


//invocacion de metodos.
animal1.presentarme();
animal2.presentarme();

console.log(animal1.color);





var jsona = {
    "nombre": "Pelusa",
    "color": "blanco",
    "tipo": "gato",
    "presentarme": function () {
        //console.log("Hola, soy un: " + this.tipo + ", me llaman: " + this.nombre + "y soy de color: " + this.color);
    }
}
var jsonb = {
    "nombre": "Aaron",
    "color": "gris",
    "tipo": "perro",
    "presentarme": function () {
        //console.log("Hola, soy un: " + this.tipo + ", me llaman: " + this.nombre + "y soy de color: " + this.color);
    }
}