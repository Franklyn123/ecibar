const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CursoLicenciaSchema = new Schema({
  curso: {
    type: Schema.Types.ObjectId,
    ref: 'cursos'
  },
  licencia_actual: {
    type: Schema.Types.ObjectId,
    ref: 'tipo_licencias'
  },
  licencia_postula: {
    type: Schema.Types.ObjectId,
    ref: 'tipo_licencias'
  },
  horas_teoricas: {
    type: Number
  },
  horas_manejo: {
    type: Number
  },
  dias_teoricas: {
    type: Number
  },
  dias_manejo: {
    type: Number
  },
});

module.exports = CursoLicencia = mongoose.model('cursos_licencias', CursoLicenciaSchema);