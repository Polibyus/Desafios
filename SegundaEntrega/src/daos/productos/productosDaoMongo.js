const ContainerMongo = require('../../contenedores/contenedorMongoDb')
const productoModel = require('../../models/productos.js')

class ProductosDaoMongo extends ContainerMongo{
  constructor() {
    super(productoModel);
  }

} 

module.exports = { ProductosDaoMongo }