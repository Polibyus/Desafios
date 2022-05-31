const express = require('express');
const { Router } = express;
const carrito = Router();

// const { CarritoDaoArchivo } = require('../daos/carrito/carritoDaoArchivo.js');
// const carritoDao = new CarritoDaoArchivo();

const { carritoDaoMongo } = require('../daos/carrito/carritoDaoMongo')
const carritoDao = new carritoDaoMongo();

// const { CarritoDaoFirestore } = require('../daos/carrito/carritoDaoFirebase.js')
// const carritoDao = new CarritoDaoFirestore();

carrito.get('/create', async (req, res) => {
    let id = await carritoDao.crearCart();
    res.json({ msj: `Carrito con id ${id} creado` });
})

carrito.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let carrito = await carritoDao.getByID(id);
    res.json({ carrito: carrito });
})

carrito.post('/:id', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    await carritoDao.addItem(id, req.query);
    res.json({result: 'Producto Guardado'})
})

carrito.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let respuesta = await carritoDao.deleteCart(id);
    res.json({result: respuesta});
})

module.exports = carrito