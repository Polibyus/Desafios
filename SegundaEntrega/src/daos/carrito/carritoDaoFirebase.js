const { ContainerFirestore } = require('../../contenedores/contenedorFirebase')

class CarritoDaoFirestore extends ContainerFirestore {
    constructor() {
        super('carrito')
        this.id = 0
    }

    async crearCart() {
        let time = Date(Date.now());
        let id = Date.now();
        const data = { time: time.toString(), productos: [] };
        this.saveProducto(data, id);
        return id
    }

    async deleteCart(id) {
        this.deleteById(id);
        return ({ status: 'Deleted' })
    }

    async addItem(id, obj) {
        const carrito = await this.getByID(id);
        let time = Date(Date.now());
        let title = obj.title;
        let desc = obj.desc;
        let code = parseInt(obj.code, 10);
        let pic = obj.pic;
        let price = parseInt(obj.price, 10);
        let stock = parseInt(obj.stock, 10);
        const producto = {time: time.toString(), title: title, desc: desc, code: code, pic: pic, price: price, stock: stock };
            if (stock > 0) {
                carrito.data.productos.push(producto);
                this.update(carrito, id);
            } else {
                const msj = 'No hay stock'
            }
    }
}

module.exports = { CarritoDaoFirestore }