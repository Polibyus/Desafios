const express = require('express');
const fs = require("fs");
const { isTypedArray } = require('util/types');
const { Router } = express;
const app = express();
const productos = Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productos);

app.use(express.static('public'));
app.use('/custom/url', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

class Contenedor {
  constructor (archivo) {
      this.archivo = archivo;
  }
  async save(title, price) {
      try {
          const data = await fs.promises.readFile(this.archivo, 'utf-8');
          const json = JSON.parse(data.toString("utf-8"));
          const obj = {title: title, price: price, id: json.length};
          json.push(obj);
          console.log(`El id del producto es ${data.length}`);
          await fs.promises.writeFile(this.archivo, JSON.stringify(json, null, "\t"));
      }
      catch(err) {
          console.log('Hubo un error');
      }
  }
  async getById(id) {
      try {
        const data = await fs.promises.readFile(this.archivo, 'utf-8');
        const json = JSON.parse(data.toString("utf-8"));
        const obj = json.find(e => e.id === id);
        return obj;
      }
      catch(err) {
          console.log('Hubo un error');
      }
  }
  async getAll() {
      try {
          const data = await fs.promises.readFile(this.archivo, 'utf-8');
          return data;
      }
      catch(err) {
          console.log('Hubo un error');
      }
  }
  async deleteById(id) {
      try {
          const data = await fs.promises.readFile(this.archivo, 'utf-8');
          const json = JSON.parse(data.toString("utf-8"));
          const indexObj = json.findIndex(e => e.id === id);
          json.splice(indexObj, 1);
          await fs.promises.writeFile(this.archivo, JSON.stringify(json, null, "\t"));
      }
      catch(err) {
          console.log('Hubo un error');
      }
  }
}
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

const items = new Contenedor('./public/items.txt');

productos.get('/', async (req, res) => {
  console.log('productos ok');
  const listaProd = await items.getAll();
  res.send(listaProd);
})

productos.get('/:id', async (req, res) => {
  console.log('producto individual ok');
  var id = parseInt(req.params.id, 10);
  const producto = await items.getById(id);
  if (producto === undefined) {
    res.json({ error : 'producto no encontrado' });
  } else {
      res.json(producto);}
})

productos.post('/', async (req, res) => {
    console.log('carga de productos ok');
    let title = req.query.title;
    let price = req.query.price;
    items.save(title, price);
    res.json({
        success: true,
        message: "Carga exitosa"
    });
  })
  
// productos.put('/', async (req, res) => {
//     console.log('productos ok');
//     const listaProd = await items.getAll();
//     res.send(listaProd);
//     })

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await items.deleteById(id);
    res.send('objeto elimina2');
});

app.listen(PORT, err => {
  if(err) throw new Error(`error en el sv ${err}`)
  console.log(`el sv escuchar en ${PORT}`);
})

