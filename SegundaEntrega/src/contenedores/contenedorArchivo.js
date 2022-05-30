const fs = require("fs");

class ContenedorArchivo {
    constructor(txt) {
        this.txt = txt;
    }

    guardarArchivo(data) {
        fs.writeFileSync(this.txt, JSON.stringify(data, null, "\t"));
    }

    getContenido() {
        let contenido = [];
        try {
            const data = fs.readFileSync(this.txt, 'utf-8');
            contenido = JSON.parse(data.toString("utf-8"));
        }
        catch (err) {
            console.log(`Hubo un error en contenedor = ${err} `);
        }
        return contenido;
    }

    getByID(id) {
            const data = this.getContenido();
            const obj = data.find(e => e.id === id);
            return { obj: obj ? obj : { error: 'producto no encontrado' } };
    }

    updateById(req, res) {
        try {
            const data = this.getContenido();
            let id = parseInt(req.params.id, 10);
            if (id <= data.length) {
                const indexObj = data.findIndex(e => e.id === id);
                let time = Date(Date.now());
                let title = req.query.title;
                let desc = req.query.desc;
                let code = parseInt(req.query.code, 10);
                let pic = req.query.pic;
                let price = parseInt(req.query.price, 10);
                let stock = parseInt(req.query.stock, 10);
                data[indexObj] = { id: id, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock };
                this.guardarArchivo(data);
                return res.json({ producto: 'Producto actualizado correctamente' });
            } else {
                return res.json({ error: 'Producto no encontrado' });
            }
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
    deleteById(id) {
        respuesta = '';
        try {
            const data = this.getContenido();
            if (id <= data.length) {
                const indexObj = json.findIndex(e => e.id === id);
                data.splice(indexObj, 1);
                this.guardarArchivo(data);
                respuesta = 'Producto Eliminado'
                return respuesta;
            } else {
                respuesta = 'Producto no encontrado';
                return respuesta;
            }
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
}

module.exports = { ContenedorArchivo }