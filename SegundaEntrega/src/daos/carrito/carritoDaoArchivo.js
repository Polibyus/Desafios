const fs = require("fs");
const { ContenedorArchivo } = require('../../contenedores/contenedorArchivo');


class CarritoDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./src/data/cart.txt');
    }

    crearCart() {
        let time = Date(Date.now());
        let id = Date.now();
        const data = { id: id, time: time.toString(), productos: [] };
        this.guardarArchivo(data);
        return id
    }

    deleteCart() {
        let respuesta = '';
        fs.unlinkSync(this.txt, (err => {
            if (err) {respuesta = 'Error'}
            else {respuesta = 'Carrito eliminado'};
        })
        )
    }

    getAll() {
        const data = this.getContenido();
        return data;
    }

    addItem(id, obj) {
        const data = this.getContenido();
        let time = Date(Date.now());
        let title = obj.title;
        let desc = obj.desc;
        let code = parseInt(obj.code, 10);
        let pic = obj.pic;
        let price = parseInt(obj.price, 10);
        let stock = parseInt(obj.stock, 10);
        const producto = { id: this.id, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock };
            if (stock > 0) {
                data.productos.push(producto);
                this.guardarArchivo(data);
            } else {
                const msj = 'No hay stock'
            }
    }
}

module.exports = { CarritoDaoArchivo }