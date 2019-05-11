const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DistritoSchema = new Schema({
  provincia: {
    type: Schema.Types.ObjectId,
    ref: 'provincias'
  },
  name: {
    type: String,
    required: true
  }
  
});

module.exports = Distrito = mongoose.model('distritos', DistritoSchema);