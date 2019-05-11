const mongoose = require('mongoose');
/*eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const TipoLicenciaSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
});
/*eslint-disable */
module.exports = TipoLicencia = mongoose.model('tipo_licencias', TipoLicenciaSchema);
/* eslint-enable */
