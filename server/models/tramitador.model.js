const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TramitadorSchema = new Schema({
    dni: {
        type: String
    },
    a_paterno: {
        type: String
    },
    a_materno: {
        type: String
    },
    nombres: {
        type: String,
        required: true
    },
    celular: {
        type: String
    }
});

module.exports = Tramitador = mongoose.model('tramitadores', TramitadorSchema);