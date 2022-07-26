let faker = require('faker');
faker.locale = 'es'
const { commerce, image } = faker;

function generarProducto(id) {
 return {
   id,
   title: commerce.product(),
   price: commerce.price(100, 200, 0, '$'),
   desc: commerce.productDescription(),
   img: image.avatar(),
 }
}

const productos = [] 

for (let i = 1; i < 6; i++) {
  productos.push(generarProducto(i));
}

module.exports = productos;
