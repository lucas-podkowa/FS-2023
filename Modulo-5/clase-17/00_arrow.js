//funcion normal, la variable hello en realidad es definida como una funcion
let hello = function (nombre) {
    return "Hola "+ nombre;
}

// la funcion flecha reenplaza la palabra "function" antes de los parametros por una "=>" despues de los parametros
hello = (nombre) => {
    return "Hola "+ nombre;
}

//si la funcion flecha tiene solamente una sentencia y esta es un return, se pueden quitar tanto las llaves "{ }", como la palabra "return"
hello = (nombre) =>"Hola "+ nombre;

//si ademas recibe solamente un parametro, se pueden quitar incluso los parentesis que envuelven a dicho parametro    
hello = nombre => "Hola " +  nombre;



console.log(hello('Pepito'));
