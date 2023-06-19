// presionar control + shift + P para abrir consola debug js


var nombre = "mi nombre"
console.log(`esto es un template ${nombre}`)



class Personaje{
    name;                 // Propiedad sin definir (undefined)
    type = "Player";      // Propiedad definida
    lifes = 5;            // Propiedad definida con 5 vidas restantes
    energy = 10;          // Propiedad definida con 10 puntos de energía
   
    constructor(name) {
      this.name = name;   // Modificamos el valor de la propiedad name
      console.log(`¡Bienvenido/a, ${this.name}!  variable global ${nombre}`);  // Accedemos al valor actual de la propiedad name
    }
}   



var pers1 = new Personaje("pj1");
var pers2 = new Personaje("pj2");

console.log(pers1.name);
console.log(pers1.type);
console.log(pers1.lifes);
console.log(pers1.energy);

 