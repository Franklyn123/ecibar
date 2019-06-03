const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TipoClaseSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
});

module.exports = TipoClase = mongoose.model('tipo_clases', TipoClaseSchema);
