const express = require('express');
const fs = require("fs");
const app = express();
const { Router } = express;
const products = Router();
const form = Router();
const carrito = Router();
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
app.use('/', form);
app.use('/api/cart', carrito);

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
            return res.render('item.pug',{ obj: obj ? obj : { error: 'producto no encontrado' }});
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
            let title = req.body.title;
            let desc = req.body.desc;
            let code = parseInt(req.body.code, 10);
            let pic = req.body.pic;
            let price = parseInt(req.body.price, 10);
            let stock = parseInt(req.body.stock, 10);
            const obj = {id: data.length, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock};
            json.push(obj);
            await fs.promises.writeFile(this.txt, JSON.stringify(json, null, "\t"));
            return res.render('form.pug', {
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
form.get('/',(req,res)=>{

    res.render('form.pug')
  
  })
  
form.post('/form', items.save.bind(items));
products.delete('/:id', items.deleteById.bind(items));
products.put('/:id', items.updateById.bind(items));

class Carrito {
    constructor() {}
    async crearCart(req, res) {
        try {
            let time = Date(Date.now());
            let id = Date.now();
            const obj = {id: id, time: time.toString()};
            await fs.writeFile(`cart${id}.txt`, JSON.stringify(obj, null, "\t"), function (err) {
                if (err) throw err;
                console.log('File is created successfully.');
            });
            return res.render('cart.pug', {
                success: true,
                message: `El id del cart es ${id}`
            });
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    async deleteCartId(req, res) {
        try {
            let id = parseInt(req.params.id, 10);
            fs.unlink(`cart${id}.txt`, (err => {
                if (err) console.log(err);
                else {
                  console.log("\nDeleted file: example_file.txt");
                }})
            )
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    // async showAll(req, res) {
    //     try {
    //         const data = await fs.promises.readFile(this.txt, 'utf-8');
    //         return res.render('productos.pug', { products: JSON.parse(data.toString("utf-8")) });
    //     }
    //     catch (err) {
    //         console.log(`Hubo un error = ${err} `);
    //     }
    // }
    // async showItems(req, res) {
    //     try {
    //         const data = await fs.promises.readFile(this.txt, 'utf-8');
    //         const json = JSON.parse(data.toString('utf-8'));
    //         const obj = json.find(e => e.id === parseInt(req.params.id, 10));
    //         return res.render('item.pug',{ obj: obj ? obj : { error: 'producto no encontrado' }});
    //     }
    //     catch (err) {
    //         console.log(`Hubo un error = ${err} `);
    //     }
    // }
    // async updateById(req, res) {
    //     try {
    //         const data = await fs.promises.readFile(this.txt, 'utf-8');
    //         const json = JSON.parse(data.toString("utf-8"));
    //         let id = parseInt(req.params.id, 10);
    //         if (id <= data.length) {
    //             const indexObj = json.findIndex(e => e.id === id);
    //             let time = Date(Date.now());
    //             let title = req.query.title;
    //             let desc = req.query.desc;
    //             let code = parseInt(req.query.code, 10);
    //             let pic = req.query.pic;
    //             let price = parseInt(req.query.price, 10);
    //             let stock = parseInt(req.query.stock, 10);
    //             json[indexObj] = {id: id, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock};
    //             await fs.promises.writeFile(this.txt, JSON.stringify(json, null, "\t"));
    //             return res.json({ producto: 'Producto actualizado correctamente' });
    //         } else {
    //             return res.json({ error: 'Producto no encontrado' });
    //         }
    //     }
    //     catch (err) {
    //         console.log(`Hubo un error = ${err} `);
    //     }
    // }
}

const cart = new Carrito();

carrito.post('/', cart.crearCart);
carrito.delete('/:id', cart.deleteCartId);

app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})