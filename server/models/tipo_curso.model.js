const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TipoCursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
});

module.exports = TipoCurso = mongoose.model('tipo_cursos', TipoCursoSchema);
