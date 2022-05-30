const express = require('express');
const app = express();
const rutaProductos = require('./src/routes/rutaProductos.js');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', rutaProductos);

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})
