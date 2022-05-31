const express = require('express');
const { Router } = express;
const productos = Router();

// const { ProductosDaoArchivo } = require('../daos/productos/productosDaoArchivo');
// const productosDao = new ProductosDaoArchivo();

// const { ProductosDaoMongo } = require('../daos/productos/productosDaoMongo')
// const productosDao = new ProductosDaoMongo();

// const { ProductosDaoFirestore } = require('../daos/productos/productosDaoFirebase')
// const productosDao = new ProductosDaoFirestore();

productos.get('/', async (req, res) => {
    let productos = await productosDao.getAll();
    res.json({ productos: productos });
})

productos.get('/:id', async (req, res) => {
    let producto = await productosDao.getByID(parseInt(req.params.id, 10));
    res.json({ producto });
})

productos.post('/', async (req, res) => {
    await productosDao.save(req.query);
    res.json({result: 'Producto Guardado'})
})

productos.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let respuesta = await productosDao.deleteById(id);
    res.json({result: respuesta});
})

module.exports = productos