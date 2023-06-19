
class Animal {
    tipo
}

class Persona extends Animal{
    nombre;
    apellido;

    presentarme(){
        return `${this.apellido} ${this.nombre}`;
    }
}

class Alumno extends Persona{ 
    notas;  
}

class Docente extends Persona{ 
    curso;
}



var alu = new Alumno();
alu.nombre = "Arturo"
alu.apellido = "Gonzalez";
alu.tipo = "Mamifero";

var alu2 = new Alumno();
alu2.nombre = "Aleli";
alu2.apellido = "Schaffer";

var doc = new Docente();
doc.nombre = "Miguel";
doc.apellido = "Cicha"



console.log(doc.presentarme());
console.log(alu.presentarme());
console.log(alu2.presentarme());

