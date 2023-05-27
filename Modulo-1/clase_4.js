// -------------------------------------------------------------------------------------------
// FUNCIONES

//Ejemplo 1º:  forma de declaramos una funcion sencilla

function saludar() {
    let respuesta = prompt("¡Hola lucas! ¿como fue tu día?");
    if (respuesta == "bien") {
        alert("me alegro");
    } else {
        alert("una pena");
    }
}

//saludar(); //llamamos a la funcion 


// -------------------------------------------------------------------------------------------


//Ejemplo 2°: tenemos un array de arrays donde cada elemento del array principal
//           en realidad es otro array con los datos de la persona con su edad
// debemos realiar una funcion que imprima el nombre y la edad del mayor de estos 

//declaramos el array con el nombre de 'conjunto'
conjunto = [["lucas", 33], ["mony", 25], ["ana", 60], ["jose", 19]];

//llamamos a la funcion que en realidad esta definida mas adelante
//averiguar_el_mayor(conjunto);

function averiguar_el_mayor(datos_recibdos) {
    let mayor = datos_recibdos[0]; //por el momento el mayor será la primer persona

    for (let persona of datos_recibdos) {
        if (persona[1] > mayor[1]) { //persona[1] hace referencia a la edad
            mayor = persona;
        } else {
            console.log(persona[0] + " no es la mayor"); //persona[0] hace referencia al nombre
        }
    }
    //alert("la persona con mas edad es " + mayor[0].toUpperCase() + " y tiene " + mayor[1] + " años");
}


// -------------------------------------------------------------------------------------------

//2º forma de declara funciones, consiste en asignarla a una variable 
// de ese modo nuestra variale es si se convertira en una funcion

//ejemplo, la constante hola sera igual a la funcion saludar
const hola = function saludar() {
    let respuesta = prompt("¡Hola lucas! ¿como fue tu día?");
    if (respuesta == "bien") {
        alert("me alegro");
    } else {
        alert("una pena");
    }
}
// entonces ahora con llamar a hola() es como si llamaramos a saludar()
//hola();


// -------------------------------------------------------------------------------------------

// funciones con parametros y backstic en su interior
function hola_b(nombre, apellido, edad) {

    try {
        let saludo = `Hola ${nombre} ¿como estas?, que complicado es escribir ${apellido}
        un apellido raro por solo tener ${edad} años`

        console.log("despues del error en el try ");
        //debemos utilizar el return para devolver el saludo como resultado de la funcion
        return saludo;

    } catch (error) {
        alert(error) //aca les mostraba como capturabamos el error
    } finally {
        console.log("fin del try")
    }
}
var res = hola_b("Lucas", "Podkowa", 19);
//si no hubieramos puesto el return, aca res quedaria como udefinded.
//document.write(res);



// // 3º forma: funciones flechas, 
// basicamente se reemplaza la palabra 'function' por una '=>' despues del parentesis
// se debe asignar a una variable y ese sera el nombre de la funcion


//funcion normal
function saludar_normal(persona) {
    return `hola ${persona} como va eso`;
}

//funcion flecha
const saludar_flecha = (persona) => {
    return `hola ${persona} como va eso`;
}

let saludo1 = saludar_normal("Mengano");
let saludo2 = saludar_flecha("Mengano");

//alert(saludo1);
//alert(saludo2);



//
//let metodo = prompt("1 para consola, 2 para ventana emergente");
//let nombre = prompt("¿Cuál es tu nomrbe?");
//switch (metodo) {
//    case "1":
//        let saludo = saludar(nombre);
//        console.log(saludo);
//    case "2":
//        let saludo1 = saludar(nombre);
//        alert(saludo1);
//        break
//    default:
//        alert("Tenias que ingresar 1 o 2");
//}



// -------------------------------------------------------------------------------------------

//otra forma de utilizar una funcion para definir el lugar de votacion segun el DNI 
/*
function asignarLugarDeVotacion(dni) {
    let lugarDeVotacion;
    switch (dni % 10) {
        case 0:
        case 1:
        case 2:
            lugarDeVotacion = "Autódromo";
            break;
        case 3:
        case 4:
        case 5:
            lugarDeVotacion = "Costanera";
            break;
        case 6:
        case 7:
        case 8:
            lugarDeVotacion = "Terminal de colectivos";
            break;
        case 9:
            lugarDeVotacion = "No vota en esta ocasión";
            break;
        default:
            lugarDeVotacion = "DNI inválido";
    }

    return lugarDeVotacion;
}

let donde_voto = asignarLugarDeVotacion(prompt("ingrese su DNI"));
alert(donde_voto);
*/


// -------------------------------------------------------------------------------------------

// Conceptos de JSON (JavaScript Object Notation)

var mate = {
    "altura": 15,
    "material": "madera",
    "color": ["marron", "plata", "perlado"],
    "bombilla": {
        "altura": 20,
        "material": "Acero Inoxidable"
    },
    "presentacion": function () {
        alert(`Hola soy un mate de ${this.material} de unos ${this.altura} centimetros de altura`);
    },
    "tienes_el_color": function (color) {
        let respuesta = null;
        if (this.color.includes(color)) {
            respuesta = `Porsupuesto, ¿quisieras comprar uno?`;
        } else {
            respuesta = `Lo lamenteo, no me fabricaron en color ${color}`;
        }
        return respuesta;
    }

    
}
//mate.presentacion()

//document.write(mate.tienes_el_color("verde"));

//alert (mate.tienes_el_color("plata"));

