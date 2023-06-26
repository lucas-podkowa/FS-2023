

//Definicion de la clase ANIMAL
class Animal {
    //Definicion de sus propiedades
    nombre;
    color;
    tipo;

    //inicializacion
    constructor(nombre, color, tipo) {
        this.nombre = nombre;
        this.color = color;
        this.tipo = tipo;
    }

    //metodos
    presentarme() {
        console.log(`Hola, soy un: ${this.tipo}, me llaman: ${this.nombre} y soy de color: ${this.color}`);
        //console.log("Hola, soy un: " + this.tipo + ", me llaman: " + this.nombre + "y soy de color: " + this.color);
    }
};


//instanciacion de clase a objetos
var animal1 = new Animal('Pelusa', 'Blanco');
var animal2 = new Animal('Aaron', 'perro');


//invocacion de metodos.
animal1.presentarme();
animal2.presentarme();

console.log(animal1.color);

