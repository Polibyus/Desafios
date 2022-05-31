const ContainerMongo = require('../../contenedores/contenedorMongoDb')
const carritoModel = require('../../models/carrito.js')

class CarritoDaoMongo extends ContainerMongo{
  constructor() {
    super(carritoModel);
  }

  crearCart(){
    let time = Date(Date.now());
    let id = Date.now();
  }
} 

module.exports = { CarritoDaoMongo }