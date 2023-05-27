
// -------- 00 - METODOS BASICOS DE INTERACCION ----------------------------------------------------------------

// - SALIDA
// console.log(parametro);      (muestra por consola lo que estoy enviando por parametro)
// alert(parametro);            (muestra una ventana emergente con el contenido que estoy enviando por parametro)
// document.write(parametro);   (similar a console pero muestra el contenido en la pagina pricipal)

// - ENTRADA
// variable = prompt("mensaje"); (abre una ventana emergente con un mensaje, la variable almacena lo que ingrese el usuario)



// -------- 01 - VARIABLES -------------------------------------------------------------------------------------

// var		(se toma por defecto cuando no escribimos nada)
var fecha = new Date();

// let		(se limita el bloque donde fue declarada)
let edad = 25;

// const	(definimos una sola vez y no podemos cambiar su valor, me obliga a inicializar cuando se declara)
const curso = "Programacion Full-Stack Nivel II";



// -------- 02 - TIPOS DE DATOS PRIMITIVOS (estandar del lenjuaje JavaScript) ---------------------------------

// string   (cadenas de caracteres, alias texto)
let nombre = "Slatan";

// number   (un numero con o sin decimales)
let clases = 48;
let altura = 1.80

//boolean   (verdadero o falso, en ingles TRUE or FALSE)
let estudiante = true;
let millonario = false;

//undefinet     (la variable existe en el programa pero aun no fue inicializada)
//var telefono  (si lo dejara así  sin asignarle nada sería indefinido)

//null			(es intencional, no esta vacia y sí esta definida pero su valor es null)
let telefono = null;

//funcion typeof()    (palabra reservada de JS que nos devuelve el tipo de datos de una variable)
let aguinaldo = 100000;
tipo = console.log(typeof (aguinaldo)); //(tipo será igual a NUMBER ya que aguinaldo es del tipo numerico) 



// -------- 03 - METODOS DE CADENA ---------------------------------------------------------------------------

// - concat()		junta dos o mas cadenas y retorna una nueva 			        res = c1.concat(c2)
// - startsWith()	devuelve true o false si una cadena comienza con otra cadena	res = c1.startsWith(c2)
// - endsWith()		devuelve true o false si una cadena termina con otra cadena	    res = c1.endsWith(c2)	   
// - includes()		devuelve true o false si una cadena contiene otra cadena	    res = c1.includes(c2)	   
// - indexOf()		devuelve el numero la posicion que halla la primer letra o -1	res = c1.indexOf(c2)
// - lastIndexOf()	devuelve el numero la posicion que halla la ultima letra o -1	res = c1.lastIndexOf(c2)	 
// - length         devuelve la logitud (cantidad de posiciones o caracteres)       res = c1.length
// - slice(i, f)    devuelve el contenido entre el inicio y el fin de una cadena    res = c1.slice(6, 11) 
// - split(cond)    devuelve un array con la cadena separada segun la condicion     res = c1.split(" ")
// - toLowerCase()  devuelve el teto original pero pasado a minusculas              res = c1.toLowerCase()
// - toUpperCase()  devuelve el teto original pero pasado a mayusculas              res = c1.toUpperCase()

//breves ejemplos

let direccion = "Juan Manuel de Rosas N° 325";
//console.log(direccion.length);

unaParte = direccion.slice(5, 11);
console.log(unaParte);

ultimoCaracter = direccion.slice(-1);
console.log(ultimoCaracter);

let texto = "Pablito clavó un clavito, cuantos clavitos clavó pablito"
console.log(texto.split(" "))
//devolverá un array con 8 palabras dado que el parametro de separacion fue " " el cual es un espacio en blanco



//-------- 04 - ESTRUCTURAS DE CONTROL (tambien llamados condicionales) -------------------------------------

/*
    if (condicion) {
        // accion a ser ejecutada si la condicion es verdadera
    } else {
        // accion a ser ejecutada si la condicion es falsa
    }
*/

//Ejemplo N°1: Tengo que pagar netflix el cual cuesta $1300, hacer un programa que segun la cantidad de dinero
//que tengo, me devuelva un mensaje con lo que me sobra o me falta respecto a dicho monto

let dinero = prompt("Ingrese la cantidad que usted posee actualmente:")

if (dinero >= 1300) {
    diferencia = dinero - 1300;
    alert("Gracias por el pago, su vuelto es de $" + diferencia);
} else {
    diferencia = 1300 - dinero;
    alert("Lo siento, le faltan $" + diferencia + " para el valor de la cuota");
}

// Ejemplo N°2: realizar un algortimo donde el sistema le pregunte al usuario sobre su estado de animo
// segun la respuesta del usuario, el sistema debe contestar con alguna frase coherente

let saludo = prompt("hola como estas?"); //preguntamos al usuario con el metodo prompt

if (saludo.includes("bien")) {  // utilizamos el metodo de cadena includes para analizar la respuesta
    res = "me alegro mucho";
} else if (saludo.includes("mal")) {   // hacemos uso de la sentencia ELSE IF para seguir consultando opciones  
    res = "que pena che";
} else if (saludo.includes("maso")) {
    res = "tranqui, tuviste días peorees";
} else {
    res = "no se que decirte";  // vamos generando una posible respuesta en la variable res
}

alert(res);     //utilizamos un metodo de salida ALERT para mostrar un Pop-up con nuestra frase

// si analizan el codigo en ningun momento declaré la variable res con LET u otra cosa,
// pero aun así la funcion alert(res) pus+do saber que tenia en su interior por más que está totalmente por fuera
// de la estructura condicional. Esto se debe a que por defecto JS tomó a res como VAR y ese tipo de variable
// tiene un alcance global por lo que puede ser vista desde fuera del bloque donde fue inicializada



