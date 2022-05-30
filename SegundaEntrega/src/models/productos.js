const mongoose = require("mongoose");

const productosCollection = 'productos';

const ProductosSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    desc: {type: String, required: true, max: 255},
    code: {type: Number, required: true},
    pic: {type: String},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos