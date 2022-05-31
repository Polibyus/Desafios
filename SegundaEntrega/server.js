const express = require('express');
const app = express();
const rutaProductos = require('./src/routes/rutaProductos.js');
const rutaCarrito = require('./src/routes/rutaCarrito.js');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', rutaProductos);
app.use('/api/cart', rutaCarrito);

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})
