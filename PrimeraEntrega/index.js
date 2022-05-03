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
    constructor (txt) {
        this.txt = txt;
    }

    async showAll(req, res) {
            const data = await fs.readFile(this.txt, 'utf-8');
            const json = JSON.parse(data.toString('utf-8'));
            return res.send(json);
    }
}

const items = new Productos('items.txt');


products.get('/', items.showAll.bind(items));

app.listen(PORT, () => {
console.log(`Server escuchando en puerto ${PORT}`)
})