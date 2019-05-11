const mongoose = require('mongoose');
/*eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

const TipoLicenciaVehiculoInstructorSchema = new Schema({
  tipo_licencia: {
    type: Schema.Types.ObjectId,
    ref: 'tipo_licencias'
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    ref: 'vehiculos'
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'instructores'
  }
});
/*eslint-disable */
module.exports = TipoLicenciaVehiculoInstructor = mongoose.model('tipolicenciavehiculoinstructor', TipoLicenciaVehiculoInstructorSchema);
/* eslint-enable */
