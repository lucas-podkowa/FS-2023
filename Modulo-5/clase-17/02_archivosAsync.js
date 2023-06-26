//llamado async
var fs = require('fs');

var alTerminar = function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
}

fs.readFile(__dirname + '/texto3.txt', 'utf8', alTerminar);

console.log("Fin del programa");

// setTimeout(() => {
//   console.log("Fin del programa");
// }, 1000);













// fs.readFile(__dirname + '/texto.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
//   console.log("Fin del programa");
// });

