const express = require('express');
const app = express();

app.get('/api/prueba', function (req, res) {
   res.send("Realizo un get");
});
app.post('/api/prueba', function (req, res) {
   res.send("Realizo un post");
});
app.put('/api/prueba', function (req, res) {
   res.send("Realizo un put");
});
app.delete('/api/prueba', function (req, res) {
   res.send("Realizo un delete");
});

app.listen(8080);
