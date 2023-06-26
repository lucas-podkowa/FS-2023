// class Animal {
//     etnia;
// }


// class Persona extends Animal{
//     nombre;
//     apellido;

//     presentarme(){
//         return `${this.apellido} ${this.nombre}`;
//     }
// }

// class Alumno extends Persona{
//     notas;
// }

// class Docente extends Persona{
//     titulo;
// }


// var alu = new Alumno();
//  alu.nombre = "Arturo"
//  alu.apellido = "Gonzalez";
//  alu.etnia = 'Algo';
// console.log(alu.etnia);

// var alu2 = new Alumno();
//  alu2.nombre = "josi";
//  alu2.apellido = "Guaimas";
// console.log(alu2.presentarme());

// var doc = new Docente();
//  doc.nombre = "Ruben";
//  doc.apellido = "Perez"
// console.log(doc.presentarme());



//----------------------------------------------------------------

class Persona{

    static unidadPeso = "Kg";

    constructor(nombre,apellido, peso){
        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso
    }

    static saludarA(parametro){
        console.log(`Buenos dias ${parametro}`);
    }
    presentarme(){
        return `${this.apellido} ${this.nombre}`;
    }

    pesoATexto(){
        return `Hola soy ${this.nombre}, mi peso es de ${this.peso} ${Persona.unidadPeso}`;
    }
}



 class Alumno extends Persona{
    notas; 
    constructor(nombre,apellido,notas){
        super(nombre,apellido);
        this.notas = notas;
    }
    // sobrescibir un metodo heredado
    presentarme(){
        return super.presentarme() + '(Alumno)';
    }

    listarNotas(){
        console.log(super.presentarme() + ` notas: ${this.notas}`);
    }
 }
 
 class Docente extends Persona{
    curso;
    constructor(nombre,apellido,curso){
        super(nombre,apellido);
        this.curso = curso;
    }
 }

 
   var docente1 = new Docente("Miguel","Cicha","Nivel 2");
   console.log(docente1.presentarme());

  var alumno1 = new Alumno("Arturo","Gonzalez","10,8");
  console.log(alumno1.presentarme());
  console.log(alumno1.listarNotas());

     var persona = new Persona("mundy","schulz",80);
    var persona2 = new Persona("pedro","zapata",70);

    console.log(persona.saludarA());



    // console.log(persona2.pesoATexto());
    
    // Persona.unidadPeso = 'Toneladas';
    

    



//----------------------------------------------------------------


// class Persona  {
//     nombre;
//     apellido;
//     peso;
//     static uniadPeso = "Kg";
   
//     constructor(nombre,apellido,peso){
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.peso = peso;
//     }
 
//     presentarme(){
//         return `${this.apellido} ${this.nombre}`;
//     }

//     pesoATexto(){
//         return `${this.peso} ${Persona.unidadPeso}`;
//     }
 

// propiedades y metodos estaticos (propias de la clase y no de instancias de la clase)
// no se pueden invocar desde una instancia
//     static saludarA(){
//         console.log(`Buenos dias ${this.nombre}`);
//     }
//  }
 
//  Persona.saludarA();

//  var persona = new Persona("mundy","schulz",80);
//  var persona2 = new Persona("pedro","zapata",70);
  




 
