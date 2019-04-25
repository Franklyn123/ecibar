const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AsistenciaSchema = new Schema({
  entrada: {
    type: Date
  },
  salida: {
    type: Date
  },
  expediente: {
    type: Schema.Types.ObjectId,
    ref: 'expedientes'
  }
});

module.exports = Asistencia = mongoose.model('asistencias', AsistenciaSchema);