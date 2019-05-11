const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PruebaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
});

module.exports = Prueba = mongoose.model('pruebas', PruebaSchema);