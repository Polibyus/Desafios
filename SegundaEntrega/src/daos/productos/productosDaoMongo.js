const ContainerMongo = require('../../contenedores/contenedorMongoDb')
const productoModel = require('../../models/productos')

class ProductosDaoMongo extends ContainerMongo{
  constructor() {
    super(productoModel);
  }

} 

module.exports = { ProductosDaoMongo }