const express = require('express');
const fs = require("fs");
const { Router } = express;
const app = express();
const productos = Router();
const form = Router();
const PORT = 8080;

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/productos', productos);
app.use('/form', form);

// clase con los metodos
class Contenedor {
  constructor(txt) {
    this.archivo = txt;
  }
  // guardar nuevo objeto
  async save(req, res) {
    try {
      const data = await fs.promises.readFile('items.txt', 'utf-8');
      const json = JSON.parse(data.toString("utf-8"));
      let title = req.body.title;
      let price = parseInt(req.body.price, 10);
      const obj = { title: title, price: price, id: data.length };
      json.push(obj);
      await fs.promises.writeFile('items.txt', JSON.stringify(json, null, "\t"));
      return res.render('index.pug', {
        success: true,
        message: `El id del producto es ${data.length}`
      });
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
  // obtener un objeto segun su id
  async getById(req, res) {
    try {
      const data = await fs.promises.readFile('items.txt', 'utf-8');
      const json = JSON.parse(data.toString("utf-8"));
      const obj = json.find(e => e.id === parseInt(req.params.id, 10));
      return res.json(obj ? obj : { error: 'producto no encontrado' });
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
  // mostrar todos los productos
  async getAll(req, res) {
    try {
      const data = await fs.promises.readFile('items.txt', 'utf-8');
      return res.render('productos.pug', { products: JSON.parse(data.toString("utf-8")) });
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
  // borrar un producto por id
  async deleteById(req, res) {
    try {
      const data = await fs.promises.readFile('items.txt', 'utf-8');
      const json = JSON.parse(data.toString("utf-8"));
      let id = parseInt(req.params.id, 10);
      if (id <= data.length) {
        const indexObj = json.findIndex(e => e.id === id);
        json.splice(indexObj, 1);
        await fs.promises.writeFile('items.txt', JSON.stringify(json, null, "\t"));
        return res.json({ respuesta: 'Producto Eliminado' });
      } else {
        return res.json({ error: 'Producto no encontrado' });
      }
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
  // actualizar un objeto por su id
  async updateById(req, res) {
    try {
      const data = await fs.promises.readFile('items.txt', 'utf-8');
      const json = JSON.parse(data.toString("utf-8"));
      let id = parseInt(req.params.id, 10);
      const indexObj = json.findIndex(e => e.id === id);
      let title = req.query.title;
      let price = req.query.price;
      json[indexObj] = { title: title, price: price, id: id };
      await fs.promises.writeFile('items.txt', JSON.stringify(json, null, "\t"));
      return res.json({ producto: 'Producto actualizado correctamente' });
    }
    catch (err) {
      console.log(`Hubo un error = ${err} `);
    }
  }
}

const items = new Contenedor('items.txt');



productos.get('/', items.getAll);
productos.get('/:id', items.getById);
form.post('/', items.save);
form.get('/', (req, res) => {
  res.render('index.pug')
})
productos.delete('/:id', items.deleteById);
productos.put('/:id', items.updateById);

app.listen(PORT, err => {
  if (err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT}`);
})

