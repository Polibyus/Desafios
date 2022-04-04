const express = require('express');

const app = express();
let visitas = 0;
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${server.address().port}`);
})

server.on('error', error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.send('<h1 style="color:0000FF">Hola mundo en el titulo </h1>');
})

app.get('/visitas', (req, res) => {
    visitas++;
    res.send(`<h1 style="color:0000FF">La cantidad de visitas es ${visitas}</h1>`);
})
