var moment = require('moment');
moment.locale('br');
moment.weekdays(true).forEach(function(dia){
   console.log(dia);
});
