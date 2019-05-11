const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProvinciaSchema = new Schema({
  departamento: {
    type: Schema.Types.ObjectId,
    ref: 'departamentos'
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Provincia = mongoose.model('provincias', ProvinciaSchema);