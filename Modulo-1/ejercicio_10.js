let meses = ["Enero", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

let num = prompt("ingrese un valor entre 1 y 12, gracias");

if (parseInt(num) >= 1 && parseInt(num) <= 12) {

    document.write("el mes correspondiente es: " + meses[num -1] );    
} 