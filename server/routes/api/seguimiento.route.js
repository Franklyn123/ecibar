const express = require('express');
const router = express.Router();

const Expediente = require('../../models/expediente.model.js');
const Curso = require('../../models/tipo_curso.model.js');
const TipoLicencia = require('../../models/tipo_licencia.model.js');
const Alumno = require('../../models/alumno.model.js');
const Vehiculo = require('../../models/vehiculo.model.js');
const Instructor = require('../../models/instructor.model.js');
const Departamento = require('../../models/departamento.model.js');
const Provincia = require('../../models/provincia.model.js');
const Distrito = require('../../models/distrito.model.js');

router.post('/expediente', async (req, res) => {
  let expedientes = [];
  if (req.body.numeracion.length > 0 && req.body.dni.length == 0) {
    expedientes = await Expediente.find(
      { numeracion: req.body.numeracion },
      {
        numeracion: 1,
        estado: 1,
        asistencias_manejo: 1,
        asistencias_teoricas: 1,
        numeracion: 1,
        alumno: 1,
        fecha_registro_expediente: 1,
        fecha_inicio_teoria: 1,
        fecha_fin_teoria: 1,
        fecha_inicio_manejo: 1,
        fecha_fin_manejo: 1,
        km_inicio: 1,
        km_fin: 1,
        vehiculo: 1,
        instructor: 1,
        curso_licencia: 1
      }
    )
      .populate('alumno')
      .populate('vehiculo')
      .populate({ path: 'vehiculo', populate: { path: 'clase' } })
      .populate('instructor')
      .populate('curso_licencia');
  } else if (req.body.numeracion.length == 0 && req.body.dni.length > 0) {
    const alumno = await Alumno.find({ dni: req.body.dni });
    if (alumno.length > 0) {
      expedientes = await Expediente.find(
        { alumno: alumno[0]._id },
        {
          numeracion: 1,
          estado: 1,
          asistencias_manejo: 1,
          asistencias_teoricas: 1,
          numeracion: 1,
          alumno: 1,
          fecha_registro_expediente: 1,
          fecha_inicio_teoria: 1,
          fecha_fin_teoria: 1,
          fecha_inicio_manejo: 1,
          fecha_fin_manejo: 1,
          km_inicio: 1,
          km_fin: 1,
          vehiculo: 1,
          instructor: 1,
          curso_licencia: 1
        }
      )
        .populate('alumno')
        .populate('vehiculo')
        .populate({ path: 'vehiculo', populate: { path: 'clase' } })
        .populate('instructor')
        .populate('curso_licencia');
    }
  }
  if (expedientes.length > 0) {
    const curso = await Curso.find({
      _id: expedientes[0].curso_licencia.curso
    });
    const lactual = await TipoLicencia.find({
      _id: expedientes[0].curso_licencia.licencia_actual
    });
    const lpostula = await TipoLicencia.find({
      _id: expedientes[0].curso_licencia.licencia_postula
    });
    const vehiculo = await Vehiculo.find({
      _id: expedientes[0].vehiculo
    }).populate('clase');
    const instructor = await Instructor.find({
      _id: expedientes[0].instructor
    });
    const departamento = await Departamento.find({
      _id: expedientes[0].alumno.departamento
    });
    const provincia = await Provincia.find({
      _id: expedientes[0].alumno.provincia
    });
    const distrito = await Distrito.find({
      _id: expedientes[0].alumno.distrito
    });

    res.json({
      exp: expedientes[0],
      curso: curso[0].nombre,
      lactual: lactual[0].nombre,
      lpostula: lpostula[0].nombre,
      vehiculo: vehiculo[0],
      instructor: instructor[0],
      departamento: departamento[0].name,
      provincia: provincia[0].name,
      distrito: distrito[0].name,
      state: true
    });
  } else {
    res.json({
      exp: [],
      curso: '',
      lactual: '',
      lpostula: '',
      state: false
    });
  }
});

module.exports = router;
