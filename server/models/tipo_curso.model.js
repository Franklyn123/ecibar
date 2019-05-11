const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TipoCursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  }
});
//mongoimport --db shopping-list --collection tipo_licencias --file tipo_licencia.json --jsonArray
module.exports = TipoCurso = mongoose.model('tipo_cursos', TipoCursoSchema);