const { ContenedorArchivo } = require('../../contenedores/contenedorArchivo');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./src/data/items.txt');
        let data = this.getAll();
        this.id = (data.length > 0) ? data[data.length -1].id + 1 : 1;
    }

    save(obj) {
        const data = this.getContenido();
        let time = Date(Date.now());
        let title = obj.title;
        let desc = obj.desc;
        let code = parseInt(obj.code, 10);
        let pic = obj.pic;
        let price = parseInt(obj.price, 10);
        let stock = parseInt(obj.stock, 10);
        const producto = { id: this.id, time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock };
        data.push(producto);
        this.guardarArchivo(data);
        return obj
    }

    getAll() {
        const data = this.getContenido();
        return data;
    }
}

module.exports = { ProductosDaoArchivo }