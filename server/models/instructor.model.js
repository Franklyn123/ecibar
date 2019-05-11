const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  nombres: 'string',
  a_paterno: 'string',
  a_materno: 'string',
  curso: 'string'
});
/*eslint-disable */
module.exports = Instructor = mongoose.model('instructores', instructorSchema);
/* eslint-enable */
