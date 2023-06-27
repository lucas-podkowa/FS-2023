//llamado async
var fs = require('fs');

var alTerminar = function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  console.log('para este punto del tiempo deberia haber mostrado el contenido del archivo')
}

fs.readFile(__dirname + '/texto2.txt', 'utf8', alTerminar);



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

