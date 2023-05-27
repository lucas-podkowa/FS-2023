let vocales = ["a", "e", "i", "o", "u"];

for (let i = 0; i < vocales.length; i++) {
    document.write(vocales[i]);
    document.write("</br>");
}

document.write("</br> ------------------------------------------</br>");

for (let letra of vocales) {
    document.write(letra + "</br>");
}
