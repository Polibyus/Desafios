const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/globals');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MONGO_URI, advancedOptions, () => console.log('Connected'))

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

module.exports = mongoose.model(usuariosCollection, UsuarioSchema)