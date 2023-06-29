const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  rl.question('como te llamas ? ', function (nombre) {
    console.log(`me llamo ${nombre}`);
    rl.close();
  });




rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});



//console.log('fin aca debe terminar');