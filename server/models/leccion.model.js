const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LeccionSchema = new Schema({
    fecha_inicio: {
        type: Date
    },
    fecha_fin: {
        type: Date
    },
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'vehiculos'
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'instructores'
    },
    km_inicio: {
        type: String
    },
    km_fin: {
        type: String
    }
});

module.exports = Leccion = mongoose.model('lecciones', LeccionSchema);