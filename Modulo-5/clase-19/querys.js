const express = require('express');
const app = express();

app.param('name', function(req, res, next, name) {
 const modified = name.toUpperCase();
 req.name = modified;
 next();
});

app.get('/api/users/:name', function(req, res) {
 res.send('Hello ' + req.name + '!');
});

app.listen(8080, () => {
console.debug('App escuchando puerto :8080');
});
