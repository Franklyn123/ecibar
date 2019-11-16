const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const AlumnoSchema = new Schema({
  dni: {
    type: String,
    required: true
  },
  a_paterno: {
    type: String,
    required: true
  },
  a_materno: {
    type: String,
    required: true
  },
  nombres: {
    type: String,
    required: true
  },
  sexo: {
    type: String
  },
  domicilio: {
    type: String
  },
  cel_tel: {
    type: String
  },
  fecha_nacimiento: {
    type: Date
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    default: 'A'
  },
  departamento: {
    type: Schema.Types.ObjectId,
    ref: 'departamentos'
  },
  provincia: {
    type: Schema.Types.ObjectId,
    ref: 'provincias'
  },
  distrito: {
    type: Schema.Types.ObjectId,
    ref: 'distritos'
  },
  expediente: { type: Schema.Types.ObjectId, ref: 'expediente' },
  licencia_actual: {
    type: Schema.Types.ObjectId,
    ref: 'tipo_licencias'
  },
  licencia_postula: {
    type: Schema.Types.ObjectId,
    ref: 'tipo_licencias'
  }
});

module.exports = Alumno = mongoose.model('alumnos', AlumnoSchema);
