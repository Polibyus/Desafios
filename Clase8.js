const express = require('express');
const fs = require("fs");
const { Router } = express;
const app = express();
const productos = Router();
const PORT = 8080;

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productos);

app.use(express.static('public'));
app.use('/custom/url', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

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
      let title = req.query.title;
      let price = req.query.price;
      const obj = { title: title, price: price, id: data.length };
      json.push(obj);
      console.log(`El id del producto es ${data.length}`);
      await fs.promises.writeFile('items.txt', JSON.stringify(json, null, "\t"));
      return res.json({
        success: true,
        message: "Carga exitosa"
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
      console.log(this.archivo);
      return res.send(data);
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
productos.post('/', items.save);
productos.delete('/:id', items.deleteById);
productos.put('/:id', items.updateById);

app.listen(PORT, err => {
  if (err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT}`);
})

