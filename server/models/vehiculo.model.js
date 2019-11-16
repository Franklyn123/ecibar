const mongoose = require('mongoose');
/*eslint-disable */
const Schema = mongoose.Schema;
/* eslint-enable */

// Create Schema
const VehiculoSchema = new Schema({
    placa: {
        type: String,
        required: true
    },
    clase: {
        type: Schema.Types.ObjectId,
        ref: 'tipo_clases'
    },
    km: {
        type: String,
        required: true
    },
    serie: {
        type: String,
        required: true
    },

    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = Vehiculo = mongoose.model('vehiculos', VehiculoSchema);