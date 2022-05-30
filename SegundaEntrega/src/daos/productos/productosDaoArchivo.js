const { ContenedorArchivo } = require('../../contenedores/contenedorArchivo');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('./src/data/items.txt');
    }

    save(obj) {
        const data = this.getContenido();
        data.push(obj);
        this.guardarArchivo(data);
        return obj
    }

    getAll() {
        const data = this.getContenido();
        console.log(`Esto es dao: ${data}`);
        return data;
    }
}

module.exports = { ProductosDaoArchivo }