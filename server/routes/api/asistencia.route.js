const express = require('express');
const router = express.Router();

/*eslint-disable */
const ObjectId = require('mongoose').Types.ObjectId;
/* eslint-enable */

const CodeError = require('../../tools/tools.js');
const Expediente = require('../../models/expediente.model.js');
const TipoLicencia = require('../../models/tipo_licencia.model.js');
const TipoLicenciaVehiculoInstructor = require('../../models/tipolicenciavehiculoinstructor.model.js');
const CursoLicencia = require('../../models/curso_licencia.model.js');
const Vehiculo = require('../../models/vehiculo.model.js');


router.get('/alumnos_en_proceso', async (req, res) => {
  const d = new Date();
  const expedientes = await Expediente.find(
    {
      asistencias_teoricas: { $not: { $elemMatch: { fDia: d.getDate(), fMes: d.getMonth(), fAnio: d.getFullYear() } } },
      asistencias_manejo: { $not: { $elemMatch: { fDia: d.getDate(), fMes: d.getMonth(), fAnio: d.getFullYear() } } },
      estado: 'R'
    },
    { alumno: 1, numeracion: 1 }).populate('alumno');
  res.json(expedientes);
});
router.get('/asistencia', async (req, res) => {
  const expedientes = await Expediente.aggregate(
    [
      {
        $lookup: {
          from: 'cursos_licencias',
          localField: 'curso_licencia',
          foreignField: '_id',
          as: 'curso_licencia'
        }
      },
      {
        $lookup: {
          from: 'tipo_cursos',
          localField: 'curso_licencia.curso',
          foreignField: '_id',
          as: 'curso'
        }
      }
    ]
  );
  res.json(expedientes);
});

router.get('/marcar_asistencia/:id', async (req, res) => {
  try {
    const expedientes = await Expediente.find({ numeracion: req.params.id }).populate('curso_licencia');
    if (!expedientes) {
      throw new CodeError(`expediente con _id ${req.params.id} existe`, 404);
    }
    const cursoLicencia = await CursoLicencia.findOne({ _id: expedientes[0].curso_licencia._id });

    if (!cursoLicencia) {
      throw new CodeError(`CursoLicencia con _id ${expedientes[0].curso_licencia._id} no existe`, 404);
    }
    const licenciaActual = cursoLicencia.licencia_actual;
    const licenciaPostula = cursoLicencia.licencia_postula;

    const tipoLicenciaPostula = await TipoLicencia.findOne({ _id: licenciaPostula });
    const tipoLicenciaActual = await TipoLicencia.findOne({ _id: licenciaActual });

    if (!tipoLicenciaActual) {
      throw new CodeError(`licencia con _id ${licenciaActual} no existe`, 404);
    }

    if (!tipoLicenciaPostula) {
      throw new CodeError(`licencia con _id ${licenciaPostula} no existe`, 404);
    }

    const tipoLicenciaVehiculoInstructor = await TipoLicenciaVehiculoInstructor.findOne({ tipo_licencia: ObjectId(tipoLicenciaPostula._id) });

    if (!tipoLicenciaVehiculoInstructor) {
      if (!cursoLicencia) {
        throw new CodeError(`TipoLicenciaVehiculoInstructor con tipoLicencia _id: ${tipoLicenciaPostula._id} no existe`, 404);
      }
    }

    const vehiculoTipoLicenciaVehiculoInstructor = tipoLicenciaVehiculoInstructor.vehiculo;
    const vehiculo = await Vehiculo.findOne({ _id: vehiculoTipoLicenciaVehiculoInstructor });
    if (!vehiculo) {
      throw new CodeError(`vehiculo con _id: ${vehiculoTipoLicenciaVehiculoInstructor} no existe`, 404);
    }
    if (expedientes[0].instructor === null || expedientes[0].vehiculo === null) {
      Expediente.findOneAndUpdate({ _id: ObjectId(expedientes[0]._id) }, {
        $set: {
          vehiculo: ObjectId(vehiculo._id),
          instructor: tipoLicenciaVehiculoInstructor.instructor,
        }
      }, {}, () => {});
    }

    const kilometrajeVehiculo = vehiculo.km;
    const kilometrajeAumentado = parseInt(kilometrajeVehiculo, 10) + 2;
    Vehiculo.findOneAndUpdate({ _id: ObjectId(vehiculoTipoLicenciaVehiculoInstructor) }, {
      $set: {
        km: String(kilometrajeAumentado.toString()),
      }
    }, {}, () => {});

    Vehiculo.findOneAndUpdate({ _id: ObjectId(vehiculoTipoLicenciaVehiculoInstructor) }, {
      $set: {
        km: String(kilometrajeAumentado.toString()),
      }
    }, {}, () => {});
    const d = new Date();

    if (expedientes[0].curso_licencia.dias_teoricas > expedientes[0].asistencias_teoricas.length) {
      const asistencia = {
        fDia: d.getDate(),
        fMes: d.getMonth(),
        fAnio: d.getFullYear(),
        tHora: d.getHours(),
        tMinuto: d.getMinutes()
      };
      await Expediente.findByIdAndUpdate(expedientes[0]._id, { $push: { asistencias_teoricas: asistencia } });
    } else {
      if (expedientes[0].curso_licencia.dias_manejo > expedientes[0].asistencias_manejo.length) {
        const kmInicio = kilometrajeVehiculo;
        const kmFin = kilometrajeAumentado;
        const asistencia = {
          fDia: d.getDate(),
          fMes: d.getMonth(),
          fAnio: d.getFullYear(),
          tHora: d.getHours(),
          tMinuto: d.getMinutes(),
          km_inicio: Number(kmInicio),
          km_fin: kmFin
        };
        await Expediente.findByIdAndUpdate(expedientes[0]._id, {
          $push: {
            asistencias_manejo: asistencia,
          }
        });
      }
      if (expedientes[0].curso_licencia.dias_manejo === (expedientes[0].asistencias_manejo.length + 1)) {
        await Expediente.findByIdAndUpdate(expedientes[0]._id, { $set: { estado: 'T' } });
      }
    }

    res.json({ status: true });
  } catch (e) {
    res.json({ error: e });
  }
});
module.exports = router;
