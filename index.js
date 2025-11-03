const express = require("express");
const routerApi = require("./routes/rutas");
const setupSwagger = require("./swagger")

const app = express();
const port = 3000;

app.use(express.json());
setupSwagger(app);

app.get("/", (req, res) => {
    res.send ("Servidor chidote");
});

routerApi(app);

app.listen(port, () => {
    console.log(`El servidor esta escuchando en: http://localhost:${port}`);
});