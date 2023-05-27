//-------- 01 - ESTRUCTURAS DE CONTROL (sentencia SWITCH) -------------------------------------

// Ej: En las elecciones debemos repartir a las personas según la terminación de su DNI:
// 0, 1 y 2 votaran en el autodromo,
// 3, 4 y 5 votaran en la costanera
// 6, 7 y 8 en la terminal de colectivos
// 9 no votaran en esta ocacion

// con un IF aninado ariamos algo asi:
//let dni = prompt("ingrese los tres ultimos digitos de su DNI")

// if (dni.endsWith("0") || dni.endsWith("1") || dni.endsWith("2")) {
//     console.log("Usted vota en el Autodromo");
// } else if (dni.endsWith("3") || dni.endsWith("4") || dni.endsWith("5")) {
//     console.log("Usted vota en la Costanera");
// } else if (dni.endsWith("6") || dni.endsWith("7") || dni.endsWith("8")) {
//     console.log("Usted vota en la Terminal de Autobuses");
// } else {
//     console.log("Usted no vota en ésta oportunidad");
// }

// ahora con un switch una de las alternativas es hacer uso del metodo de cadena 
// slice() para averiguar el ultimo digito
// dni = prompt("ingrese los tres ultimos digitos de su DNI")
// let ultimoCaracter = dni.slice(-1);

// switch (ultimoCaracter) {
//     case "0":
//     case "1":
//     case "2":
//         console.log("Usted vota en el Autodromo");
//         break;
//     case "3":
//     case "4":
//     case "5":
//         console.log("Usted vota en la Costanera");
//         break;
//     case "6":
//     case "7":
//     case "8":
//         console.log("Usted vota en la Terminal de Autobuses");
//         break;
//     default:
//         console.log("No vota en esta ocasión");
// }



//-------- 02 - METODOS DE REPETICION (WHILE) -------------------------------------
/*
    while (condition) { se evalua una condicion para saber si entrar al bucle
        // codigo que se ejecuta repetidamente hasta que la condicion sea falsa
    }
*/

//Ej N° 1: escribir un programa que ejecute metodo del factorial de un numero menor a 10

// let valor = prompt("Ingrese un numero por favor");
// let resultado = 1, contador = 1;

// if (valor < 10) {
//     while (contador <= valor) {
//         resultado *= contador;
//         contador++;
//     }
//     console.log("el numeral es " + resultado);
// }else{
//     alert("solo calculamos factoriales de valores menores a 10, no me da el cuero")
// }


//Ej N°2: iniciamos una variable en 0 y mientras dicha variable sea menor que 10 debemos imprimirla por panralla
// sin embargo queremos que esa impresion se salte los numeros pares y ademas finalize al llegar al 7

// let numero = 0;
// while (numero < 10) {
//     if (numero % 2 != 0) {
//         document.write(numero);
//     }
//     if (numero == 7) {
//         document.write(" Encontramos el 7, asi que hasta acá llegamos :(")
//         break; //finalizamos el bucle
//     }
//     numero++;
// }



//-------- 03 - METODOS DE REPETICION (FOR) -------------------------------------
// EJ N°1 : imprime por consola los apellidos de un array

let apellidos =["Peres", "diaz", "aguirre", "nogueira", "rodriguez"]

for (let i = 0; i < apellidos.length; i++) {
    console.log(apellidos[i]);
}

// EJ N°2 : recorrer los numeros del 0 al 5 pero salteando el numero 3
for (let i = 0; i <= 5; i++) {
    if (i == 3) {
        continue;
    }
    console.log(i);
}

// variante FOR IN 
//la forma correcta de utilizar "for in" es utilizando la variable como un puntero
let animales = ["perro", "gato", "pato", "tigre"]
for (let puntero in animales) { //for in imprime la posicion
    console.log("FOR IN imprime: " + puntero);
}

// variante FOR OF
for (let animal of animales) { //for in imprime el contenido
    console.log("FOR OF imprime: " + animal);
}
