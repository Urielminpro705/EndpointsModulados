const express = require("express");
const routerApi = require("./routes/rutas");
const setupSwagger = require("./swagger");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
setupSwagger(app);

app.get("/", (req, res) => {
    res.send ("Servidor chidote");
});

routerApi(app);

mongoose.connect('mongodb+srv://uriel:Hola1234$@cluster25711.fc8peuv.mongodb.net/')
    .then(() => console.log("Conexion a Mongo DB exitosa"))
    .catch(err => console.log("No salio UWU", err));

app.listen(port, () => {
    console.log(`El servidor esta escuchando en: http://localhost:${port}`);
});