const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new mongoose.Schema({
  nombres: 'string',
  a_paterno: 'string',
  a_materno: 'string',
  clases: [
    {
      type: Schema.Types.ObjectId,
      ref: 'tipo_clases'
    }
  ]
});
module.exports = Instructor = mongoose.model('instructores', instructorSchema);
