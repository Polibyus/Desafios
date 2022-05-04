const express = require('express');
const fs = require("fs");
const app = express();
const { Router } = express;
const products = Router();
const PORT = 8080;
let adm = true;

//express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//views
app.set('views', './views');
app.set('view engine', 'pug');
//public
app.use(express.static('public'));
//rutas con express
app.use('/api/products', products);


// EMPIEZA LA CLASE DE PRODUCTOS

class Productos {
    constructor(txt) {
        this.txt = txt;
    }
    async showAll(req, res) {
        try {
            const data = await fs.promises.readFile(this.txt, 'utf-8');
            return res.render('productos.pug', { products: JSON.parse(data.toString("utf-8")) });
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    async showItems(req, res) {
        try {
            const data = await fs.promises.readFile(this.txt, 'utf-8');
            const json = JSON.parse(data.toString('utf-8'));
            const obj = json.find(e => e.id === parseInt(req.params.id, 10));
            return res.json(obj ? obj : { error: 'producto no encontrado' });
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    async save(req, res) {
        try {
            const data = await fs.promises.readFile(this.txt, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            let time = Date(Date.now());
            let title = req.query.title;
            let desc = req.query.desc;
            let code = parseInt(req.query.code, 10);
            let pic = req.query.pic;
            let price = parseInt(req.query.price, 10);
            let stock = parseInt(req.query.stock, 10);
            const obj = {id: json.length, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock};
            json.push(obj);
            await fs.promises.writeFile(this.txt, JSON.stringify(json, null, "\t"));
            return res.render('index.pug', {
                success: true,
                message: `El id del producto es ${data.length}`
            });
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    async updateById(req, res) {
        try {
            const data = await fs.promises.readFile(this.txt, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            let id = parseInt(req.params.id, 10);
            if (id <= data.length) {
                const indexObj = json.findIndex(e => e.id === id);
                let time = Date(Date.now());
                let title = req.query.title;
                let desc = req.query.desc;
                let code = parseInt(req.query.code, 10);
                let pic = req.query.pic;
                let price = parseInt(req.query.price, 10);
                let stock = parseInt(req.query.stock, 10);
                json[indexObj] = {id: id, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock};
                await fs.promises.writeFile(this.txt, JSON.stringify(json, null, "\t"));
                return res.json({ producto: 'Producto actualizado correctamente' });
            } else {
                return res.json({ error: 'Producto no encontrado' });
            }
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    async deleteById(req, res) {
        try {
            const data = await fs.promises.readFile(this.txt, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            let id = parseInt(req.params.id, 10);
            if (id <= data.length) {
                const indexObj = json.findIndex(e => e.id === id);
                json.splice(indexObj, 1);
                await fs.promises.writeFile(this.txt, JSON.stringify(json, null, "\t"));
                return res.json({ respuesta: 'Producto Eliminado' });
            } else {
                return res.json({ error: 'Producto no encontrado' });
            }
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
}

const items = new Productos('items.txt');


products.get('/:id', items.showItems.bind(items));
products.get('/', items.showAll.bind(items));
products.post('/', items.save.bind(items));
products.delete('/:id', items.deleteById.bind(items));
products.put('/:id', items.updateById.bind(items));

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})