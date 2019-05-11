const mongoose = require('mongoose');
/*eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

// Create Schema
const VehiculoSchema = new Schema({
  placa: {
    type: String,
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  serie: {
    type: String,
    required: true
  },
  km: {
    type: String,
    required: true
  },
  clase: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});
/*eslint-disable */
module.exports = Vehiculo = mongoose.model('vehiculos', VehiculoSchema);
/* eslint-enable */
