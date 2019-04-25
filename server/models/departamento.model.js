const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DepartamentoSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Departamento = mongoose.model('departamentos', DepartamentoSchema);
