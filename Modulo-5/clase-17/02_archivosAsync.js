//llamado async
var fs = require('fs');


fs.readFile(__dirname + '/texto2.txt', 'utf8', (err, contenido)=>{
  if (err) {
    console.error(err);
    return;
  }
  console.log(contenido);
  console.log('para este punto del tiempo deberia haber mostrado el contenido del archivo')

});



setTimeout(() => {
  console.log("Fin del programa");
}, 1000);















// fs.readFile(__dirname + '/texto.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
//   console.log("Fin del programa");
// });

