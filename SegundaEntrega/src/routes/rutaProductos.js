const express = require('express');
const { Router } = express;
const productos = Router();

const { ProductosDaoArchivo } = require('../daos/productos/productosDaoArchivo');

const productosDao = new ProductosDaoArchivo();

productos.get('/', async (req, res) => {
    let productos = await productosDao.getAll();
    res.json({ productos: productos });
})

productos.get('/:id', async (req, res) => {
    let producto = await productosDao.getByID(parseInt(req.params.id, 10));
    res.json({ producto });
})

productos.post('/', async (req, res) => {
    let time = Date(Date.now());
    let title = req.body.title;
    let desc = req.body.desc;
    let code = parseInt(req.body.code, 10);
    let pic = req.body.pic;
    let price = parseInt(req.body.price, 10);
    let stock = parseInt(req.body.stock, 10);
    const obj = { id: data.length, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock };
    await productosDao.save(obj);
    res.json({result: 'Producto Guardado'})
})

productos.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id, 10);
    let respuesta = await productosDao.deleteById(id);
    res.json({result: respuesta});
})

module.exports = productos