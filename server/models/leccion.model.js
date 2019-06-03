const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeccionSchema = new Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'instructores'
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'vehiculos'
  },
  turno: {
    type: String
  },
  km_inicio: {
    type: String
  },
  km_fin: {
    type: String
  }
});

module.exports = Leccion = mongoose.model('lecciones', LeccionSchema);
