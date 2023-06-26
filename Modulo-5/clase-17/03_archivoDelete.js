
var fs = require('fs');



fs.unlink(__dirname + '/texto3.txt', (err) => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});