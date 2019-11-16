const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExpedienteSchema = new Schema({
  numeracion: {
    type: Number,
    required: true
  },
  alumno: {
    type: Schema.Types.ObjectId,
    ref: 'alumnos'
  },
  curso_licencia: {
    type: Schema.Types.ObjectId,
    ref: 'cursos_licencias'
  },
  fecha_registro_expediente: {
    type: Date
  },
  fecha_inicio_teoria: {
    type: Date
  },
  fecha_fin_teoria: {
    type: Date
  },
  fecha_inicio_manejo: {
    type: Date
  },
  fecha_fin_manejo: {
    type: Date
  },
  km_inicio: {
    type: Number
  },
  km_fin: {
    type: Number
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'vehiculos'
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'instructores'
  },
  tramitador: {
    type: Schema.Types.ObjectId,
    ref: 'tramitadores'
  },
  costo: {
    type: Number,
  },
  saldo: {
    type: Number
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    default: 'R' //T: termindado R: registrado C:cancelado
  },
  asistencias_teoricas:[],
  asistencias_manejo:[]
});


module.exports = Expediente = mongoose.model('expediente', ExpedienteSchema);