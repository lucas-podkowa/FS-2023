
var fs = require('fs');


fs.unlink(__dirname + '/borrar.js', (err) => {
  if (err) throw err;
  console.log('te borré');
});

console.log('fin es mas rapoido aunque no lo parezca');
