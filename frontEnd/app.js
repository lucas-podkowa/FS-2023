const express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static('public'))

app.post("/crearPersona", (req, res) => {
    const data = req.body;
    //const values = Object.values(data);
    console.log(data);
});


app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Front escuchando en el puerto 3000");
    }
});
