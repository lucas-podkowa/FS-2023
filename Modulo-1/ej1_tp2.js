// var valores = [true, false, 2, "diclofenac", "mundo", 3, "dimetindildiclorovinilfoscfato"];

// let longitud = 0;
// for (let valor of valores) {
//     tipo = typeof (valor);

//     if(tipo == "number"){
//         console.log("estamos evaluando a " + valor);
//         if(valor.length > longitud){
//             mayor = valor
//             longitud = valor.length
//         }
//     }   
// }
// console.log("el mayor es:" + mayor);

//--------------------------------------------------------------------------------
var valores = ["hola", false, 2, "programacion", "popaganda_arreglada", 3, "variables"];
let mayor = "";

for (const dato of valores) {
    if (dato.length > mayor.length) {
        mayor = dato;
    }
}

document.write(`El texto mas largo es ${mayor}`);





