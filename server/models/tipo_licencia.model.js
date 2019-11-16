const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TipoLicenciaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  clases: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tipo_clases'
    }
  ]
});

module.exports = TipoLicencia = mongoose.model(
  'tipo_licencias',
  TipoLicenciaSchema
);
