const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historialVExtSchema = new Schema({
    vendedor: { type: String, required: true },
    alumno: { type: String, required: true },
    aCuenta: { type: Number },
    fechaCuenta: { type: Date, default: Date.now() },
    saldo: { type: Number },
    fechaSaldo: { type: Date },
    totalPago: { type: Number },
    comision: { type: Number }
});

module.exports = HVendedorExts = mongoose.model('HVendedorExts', historialVExtSchema);