
//--------------------------------------------------------------------------------
// Ejercicio 1 TP2  --------------------------------------------------------------
//--------------------------------------------------------------------------------

var valores = [true, false, 2, "diclofenac", "mundo", 3, "dimetindildiclorovinilfoscfato"];

let longitud = 0;
for (let valor of valores) {
    tipo = typeof (valor);

    if(tipo == "number"){
        console.log("estamos evaluando a " + valor);
        if(valor.length > longitud){
            mayor = valor
            longitud = valor.length
        }
    }   
}
console.log("el mayor es:" + mayor);

//--------------------------------------------------------------------------------
var valores = ["hola", false, 2, "programacion", "popaganda_arreglada", 3, "variables"];
let mayor = "";

for (const dato of valores) {
    if (dato.length > mayor.length) {
        mayor = dato;
    }
}

document.write(`El texto mas largo es ${mayor}`);


//--------------------------------------------------------------------------------
// Ejercicio 9 TP2  --------------------------------------------------------------
//--------------------------------------------------------------------------------
let vocales = ["a", "e", "i", "o", "u"];

for (let i = 0; i < vocales.length; i++) {
    document.write(vocales[i]);
    document.write("</br>");
}

document.write("</br> ------------------------------------------</br>");

for (let letra of vocales) {
    document.write(letra + "</br>");
}


//--------------------------------------------------------------------------------
// Ejercicio 10 TP2  --------------------------------------------------------------
//--------------------------------------------------------------------------------
let meses = ["Enero", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

let num = prompt("ingrese un valor entre 1 y 12, gracias");

if (parseInt(num) >= 1 && parseInt(num) <= 12) {

    document.write("el mes correspondiente es: " + meses[num -1] );    
} 



