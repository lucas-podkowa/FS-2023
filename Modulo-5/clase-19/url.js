var url = require('url');
var adr =   'http://localhost:8080/default.htm?year=2017&month=february#segundaparte';
var q = url.parse(adr, true);

console.log(q.protocol);
console.log(q.hostname);
console.log(q.port); 
console.log(q.pathname);
console.log(q.search);
console.log(q.hash);  
var qdata = q.query;
console.log(qdata.month); 
