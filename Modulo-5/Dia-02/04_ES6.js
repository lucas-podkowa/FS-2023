
class Personaje{


    constructor(name){
      this.name = name;
      this.aguante = 'mucho';
      this.mana = 5;
      this.ira = 10;
    }

    // // variable global ${nombre}
    // constructor(name) {
    //   this.name = name;   // Modificamos el valor de la propiedad name
    //   console.log(`¡Bienvenido/a, ${this.name}!`);  // Accedemos al valor actual de la propiedad name
    // }
    
}   

var pers2 = new Personaje("pj2");

console.log(pers2.aguante);
console.log(pers2.mana);

// console.log(pers1.lifes);
// console.log(pers1.energy);

// pers1.energy = 500;

// console.log(pers1.energy);




// var nombre = "mi nombre"
// console.log(`esto es un template ${nombre}`)

// presionar control + shift + P para abrir consola debug js



 