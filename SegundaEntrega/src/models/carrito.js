const mongoose = require("mongoose");

const carritoCollection = 'carrito';

const CarritoSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    time: { type: Date, default: Date.now },
    array: [],
})

const carrito = mongoose.model(carritoCollection, CarritoSchema);

module.exports = carrito