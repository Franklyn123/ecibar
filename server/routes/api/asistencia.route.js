const express = require("express");
const router = express.Router();

var moment = require("moment");
const random = require("random");

const ObjectId = require("mongoose").Types.ObjectId;

const CodeError = require("../../tools/tools.js");
const Expediente = require("../../models/expediente.model.js");
const TipoLicencia = require("../../models/tipo_licencia.model.js");
const TipoLicenciaVehiculoInstructor = require("../../models/tipolicenciavehiculoinstructor.model.js");
const CursoLicencia = require("../../models/curso_licencia.model.js");
const Curso = require("../../models/tipo_curso.model.js");
const Clase = require("../../models/tipo_clase.model.js");
const Licencia = require("../../models/tipo_licencia.model.js");
const Vehiculo = require("../../models/vehiculo.model.js");
const Instructor = require("../../models/instructor.model.js");
const Leccion = require("../../models/leccion.model.js");
const User = require("../../models/user.model.js");

router.post("/guardar_usuario", async (req, res) => {
  const nuevoUsuario = new User({
    name: "administracion",
    username: "administracion",
    password: "administracion"
  });

  await nuevoUsuario.save(nuevoUsuario);
  res.json({ status: true });
});

router.get("/alumnos_en_proceso", async (req, res) => {
  const d = new Date();
  d.setHours(00);
  d.setMinutes(00);
  d.setSeconds(00);
  const d1 = new Date();
  d1.setHours(23);
  d1.setMinutes(59);
  d1.setSeconds(59);

  const expedientes = await Expediente.find(
    {
      asistencias_teoricas: {
        $not: {
          $elemMatch: {
            fecha: { $gte: d, $lte: d1 }
          }
        }
      },
      asistencias_manejo: {
        $not: {
          $elemMatch: {
            fecha: { $gte: d, $lte: d1 }
          }
        }
      },
      estado: "R"
    },
    { alumno: 1, numeracion: 1 }
  ).populate("alumno");
  res.json(expedientes);
});

router.get("/asistencia", async (req, res) => {
  const expedientes = await Expediente.aggregate([
    {
      $lookup: {
        from: "cursos_licencias",
        localField: "curso_licencia",
        foreignField: "_id",
        as: "curso_licencia"
      }
    },
    {
      $lookup: {
        from: "tipo_cursos",
        localField: "curso_licencia.curso",
        foreignField: "_id",
        as: "curso"
      }
    }
  ]);
  res.json(expedientes);
});

// Version anterior de marcar asistencia

router.get("/marcar_asistencia_v1/:id", async (req, res) => {
  try {
    const expedientes = await Expediente.find({
      numeracion: req.params.id
    }).populate("curso_licencia");
    if (!expedientes) {
      throw new CodeError(`expediente con _id ${req.params.id} existe`, 404);
    }
    const cursoLicencia = await CursoLicencia.findOne({
      _id: expedientes[0].curso_licencia._id
    });

    if (!cursoLicencia) {
      throw new CodeError(
        `CursoLicencia con _id ${expedientes[0].curso_licencia._id} no existe`,
        404
      );
    }
    const licenciaActual = cursoLicencia.licencia_actual;
    const licenciaPostula = cursoLicencia.licencia_postula;

    const tipoLicenciaPostula = await TipoLicencia.findOne({
      _id: licenciaPostula
    });
    const tipoLicenciaActual = await TipoLicencia.findOne({
      _id: licenciaActual
    });

    if (!tipoLicenciaActual) {
      throw new CodeError(`licencia con _id ${licenciaActual} no existe`, 404);
    }

    if (!tipoLicenciaPostula) {
      throw new CodeError(`licencia con _id ${licenciaPostula} no existe`, 404);
    }

    const tipoLicenciaVehiculoInstructor = await TipoLicenciaVehiculoInstructor.findOne(
      { tipo_licencia: ObjectId(tipoLicenciaPostula._id) }
    );

    if (!tipoLicenciaVehiculoInstructor) {
      if (!cursoLicencia) {
        throw new CodeError(
          `TipoLicenciaVehiculoInstructor con tipoLicencia _id: ${
            tipoLicenciaPostula._id
          } no existe`,
          404
        );
      }
    }

    const vehiculoTipoLicenciaVehiculoInstructor =
      tipoLicenciaVehiculoInstructor.vehiculo;
    const vehiculo = await Vehiculo.findOne({
      _id: vehiculoTipoLicenciaVehiculoInstructor
    });
    if (!vehiculo) {
      throw new CodeError(
        `vehiculo con _id: ${vehiculoTipoLicenciaVehiculoInstructor} no existe`,
        404
      );
    }
    if (
      expedientes[0].instructor === null ||
      expedientes[0].vehiculo === null
    ) {
      Expediente.findOneAndUpdate(
        { _id: ObjectId(expedientes[0]._id) },
        {
          $set: {
            vehiculo: ObjectId(vehiculo._id),
            instructor: tipoLicenciaVehiculoInstructor.instructor
          }
        },
        {},
        () => {}
      );
    }

    const kilometrajeVehiculo = vehiculo.km;
    const kilometrajeAumentado = parseInt(kilometrajeVehiculo, 10) + 2;
    Vehiculo.findOneAndUpdate(
      { _id: ObjectId(vehiculoTipoLicenciaVehiculoInstructor) },
      {
        $set: {
          km: String(kilometrajeAumentado.toString())
        }
      },
      {},
      () => {}
    );

    Vehiculo.findOneAndUpdate(
      { _id: ObjectId(vehiculoTipoLicenciaVehiculoInstructor) },
      {
        $set: {
          km: String(kilometrajeAumentado.toString())
        }
      },
      {},
      () => {}
    );
    const d = new Date();

    if (
      expedientes[0].curso_licencia.dias_teoricas >
      expedientes[0].asistencias_teoricas.length
    ) {
      // Primer dia
      if (expedientes[0].asistencias_teoricas.length == 0) {
        expedientes[0].fecha_inicio_teoria = d;
      }

      expedientes[0].asistencias_teoricas.push({ fecha: d });

      // Ultimo dia
      if (
        expedientes[0].asistencias_teoricas.length ==
        expedientes[0].curso_licencia.dias_teoricas
      ) {
        expedientes[0].fecha_fin_teoria = d;
      }

      expedientes[0].save(function(err) {
        if (err) {
          console.log(err);
        }
      });

      if (
        expedientes[0].curso_licencia.dias_manejo ===
        expedientes[0].asistencias_manejo.length
      ) {
        await Expediente.findByIdAndUpdate(expedientes[0]._id, {
          $set: { estado: "T" }
        });
      }
    } else {
      if (
        expedientes[0].curso_licencia.dias_manejo >
        expedientes[0].asistencias_manejo.length
      ) {
        const kmInicio = kilometrajeVehiculo;
        const kmFin = kilometrajeAumentado;
        const asistencia = {
          fecha: d,
          km_inicio: Number(kmInicio),
          km_fin: kmFin
        };

        // Primer dia
        if (expedientes[0].asistencias_manejo.length == 0) {
          expedientes[0].fecha_inicio_manejo = d;
          expedientes[0].km_inicio = kmInicio;
        }
        expedientes[0].asistencias_manejo.push(asistencia);
        // Ultimo dia
        if (
          expedientes[0].asistencias_manejo.length ==
          expedientes[0].curso_licencia.dias_manejo
        ) {
          expedientes[0].fecha_fin_manejo = d;
          expedientes[0].km_fin =
            expedientes[0].asistencias_manejo[
              expedientes[0].curso_licencia.dias_manejo - 1
            ].km_fin;
        }

        expedientes[0].save(function(err) {
          if (err) {
            console.log(err);
          }
          //res.json(expediente);
        });
      }
      console.log(expedientes[0].curso_licencia.dias_manejo);
      console.log(expedientes[0].asistencias_manejo.length);

      if (
        expedientes[0].curso_licencia.dias_manejo ===
        expedientes[0].asistencias_manejo.length
      ) {
        await Expediente.findByIdAndUpdate(expedientes[0]._id, {
          $set: { estado: "T" }
        });
      }
    }

    res.json({ status: true });
  } catch (e) {
    res.json({ error: e });
  }
});

router.get("/marcar_asistencia/:id", async (req, res) => {
  try {
    const errors = {};

    // Consultar si existe el expediente
    let expediente = await Expediente.findOne({ numeracion: req.params.id });
    if (!expediente) {
      errors.noexpediente = "No existe el expediente";
      return res.status(404).json(errors);
    }

    // Consultar curso licencia
    let curso_licencia = await CursoLicencia.findOne({
      _id: expediente.curso_licencia
    });
    if (!curso_licencia) {
      errors.no_curso_licencia =
        "El expediente no tiene asociado ningun (curso, licencia)";
      return res.status(404).json(errors);
    }

    const dias_teoricas = curso_licencia.dias_teoricas;
    const dias_manejo = curso_licencia.dias_manejo;

    let hoy = new Date();

    // Asistencias de teoria
    if (dias_teoricas > expediente.asistencias_teoricas.length) {
      // Primer dia
      if (expediente.asistencias_teoricas.length == 0) {
        expediente.fecha_inicio_teoria = hoy;
      }

      // Dia intermedio
      expediente.asistencias_teoricas.push({ fecha: hoy });

      // Ultimo dia
      if (expediente.asistencias_teoricas.length == dias_teoricas) {
        expediente.fecha_fin_teoria = hoy;
        if (dias_manejo == 0) {
          await Expediente.findByIdAndUpdate(expediente._id, {
            $set: { estado: "T" }
          });
        }
      }

      expediente.save(function(err) {
        if (err) {
          errors.no_asistencia_teorica = "No se pudo marcar asistencia teorica";
          return res.status(404).json(errors);
        }
      });

      // Terminar de marcar asistencia de teoria
      return res.json({ status: true });
    }

    // Asistencias de manejo
    if (dias_manejo > 0) {
      if (dias_manejo > expediente.asistencias_manejo.length) {
        if (expediente.vehiculo == null && expediente.instructor == null) {
          let curso_licencia = await CursoLicencia.findOne({
            _id: expediente.curso_licencia
          });
          if (!curso_licencia) {
            errors.no_curso_licencia =
              "El expediente no tiene asociado ningun (curso, licencia)";
            return res.status(404).json(errors);
          }
          // Licencia que postula
          let licencia_postula = await Licencia.findOne({
            _id: curso_licencia.licencia_postula
          });

          // Clases de vehiculos autorizados
          let clases_vehiculos = licencia_postula.clases;
          if (clases_vehiculos.length == 0) {
            errors.no_clases_vehiculos =
              "No existe clases de vehiculos para la licencia que postula";
            return res.status(404).json(errors);
          }

          let numero_aleatorio = random.int(0, clases_vehiculos.length - 1);
          let clase_escogida = clases_vehiculos[numero_aleatorio];

          let candidatos = await Clase.aggregate([
            {
              $match: { _id: clase_escogida }
            },
            {
              $lookup: {
                from: "vehiculos",
                localField: "_id",
                foreignField: "clase",
                as: "vehiculos"
              }
            },
            {
              $lookup: {
                from: "instructores",
                localField: "_id",
                foreignField: "clases",
                as: "instructores"
              }
            }
          ]);

          // vehiculos autorizados y escoger un vehiculo
          let vehiculos = candidatos[0].vehiculos;
          if (vehiculos.length == 0) {
            errors.no_vehiculos =
              "No hay vehiculos para la licencia que postula";
            return res.status(404).json(errors);
          }
          numero_aleatorio = random.int(0, vehiculos.length - 1);
          let vehiculo_escogido = vehiculos[numero_aleatorio];

          // instructores autorizados y escoger un instructor
          let instructores = candidatos[0].instructores;
          if (instructores.length == 0) {
            errors.no_instructores =
              "No hay instructores para la licencia que postula";
            return res.status(404).json(errors);
          }

          numero_aleatorio = random.int(0, instructores.length - 1);
          let instructor_escogido = instructores[numero_aleatorio];

          // Actualizar expediente
          expediente = await Expediente.findOneAndUpdate(
            { _id: ObjectId(expediente._id) },
            {
              $set: {
                vehiculo: vehiculo_escogido._id,
                instructor: instructor_escogido._id
              }
            },
            {},
            () => {}
          );
        }
        let vehiculo = await Vehiculo.findOne({ _id: expediente.vehiculo });

        // Actualizar kilometrajes de los vehiculos
        let kilometrajeVehiculo = vehiculo.km;
        let kilometrajeAumentado = parseInt(kilometrajeVehiculo, 10) + 2;
        await Vehiculo.findOneAndUpdate(
          { _id: expediente.vehiculo },
          {
            $set: {
              km: String(kilometrajeAumentado.toString())
            }
          },
          {},
          () => {}
        );

        const asistencia = {
          fecha: hoy,
          km_inicio: Number(kilometrajeVehiculo),
          km_fin: Number(kilometrajeAumentado)
        };

        // Primer dia
        if (expediente.asistencias_manejo.length == 0) {
          expediente.fecha_inicio_manejo = hoy;
          expediente.km_inicio = Number(kilometrajeVehiculo);
        }

        // Dia intermedio
        expediente.asistencias_manejo.push(asistencia);

        // Ultimo dia
        if (expediente.asistencias_manejo.length == dias_manejo) {
          expediente.fecha_fin_manejo = hoy;
          expediente.km_fin = Number(kilometrajeAumentado);

          await Expediente.findByIdAndUpdate(expediente._id, {
            $set: { estado: "T" }
          });
        }

        expediente.save(function(err) {
          if (err) {
            console.log(err);
          }
          //res.json(expediente);
        });

        // Terminar de marcar asistencia de manejo
        return res.json({ status: true });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/generar/:id", async (req, res) => {
  try {
    const errors = {};

    // Consultar si existe el expediente
    let expediente = await Expediente.findOne({ numeracion: req.params.id });
    if (!expediente) {
      errors.noexpediente = "No existe el expediente";
      return res.status(404).json(errors);
    }

    // Consultar curso licencia
    let curso_licencia = await CursoLicencia.findOne({
      _id: expediente.curso_licencia
    });
    if (!curso_licencia) {
      errors.no_curso_licencia =
        "El expediente no tiene asociado ningun (curso, licencia)";
      return res.status(404).json(errors);
    }

    // Generar dias de teoria

    var fecha_registro = moment(expediente.fecha_registro_expediente);

    return res.json(fecha_registro);

    var fecha_fin_teoria = moment(
      expediente.fecha_registro_expediente,
      moment.ISO_8601
    );

    fecha_fin_teoria.add(curso_licencia.dias_teoricas - 1, "days");
    var asistencias_teoricas = [];

    for (
      var m = moment(fecha_registro);
      m.diff(fecha_fin_teoria, "days") <= 0;
      m.add(1, "days")
    ) {
      if (m.isoWeekday() !== 7) {
        let fecha = new Date(m);
        asistencias_teoricas.push({ fecha: fecha });
      }
    }

    // Asignar días de teoria
    expediente.asistencias_teoricas = asistencias_teoricas;

    // Generar dias de manejo
    const dias_manejo = curso_licencia.dias_manejo;
    if (
      dias_manejo > 0 &&
      expediente.instructor == null &&
      expediente.vehiculo == null
    ) {
      // Buscar clases de vehiculo para la licencia que postula
      let clases_vehiculos = await Licencia.aggregate([
        {
          $match: { _id: curso_licencia.licencia_postula }
        },
        {
          $lookup: {
            from: "tipo_clases",
            localField: "clases",
            foreignField: "_id",
            as: "clases"
          }
        }
      ]);

      clases_vehiculos = clases_vehiculos[0].clases;
      if (clases_vehiculos.length == 0) {
        errors.no_clases_vehiculos =
          "No existe clases de vehiculos para la licencia que postula";
        return res.status(404).json(errors);
      }

      let fechas_disponibles_todo_vehiculos = [];
      let fechas_disponibles_todo_instructores = [];

      // Itera sobre todos los clases de vehiculos disponibles
      for (let i = 0; i < clases_vehiculos.length; i++) {
        let candidatos = await Clase.aggregate([
          {
            $match: { _id: clases_vehiculos[i]._id }
          },
          {
            $lookup: {
              from: "vehiculos",
              localField: "_id",
              foreignField: "clase",
              as: "vehiculos"
            }
          },
          {
            $lookup: {
              from: "instructores",
              localField: "_id",
              foreignField: "clases",
              as: "instructores"
            }
          }
        ]);

        // vehiculos autorizados
        let vehiculos = candidatos[0].vehiculos;
        if (vehiculos.length == 0) {
          errors.no_vehiculos = "No hay vehiculos para la licencia que postula";
          return res.status(404).json(errors);
        }

        // instructores autorizados
        let instructores = candidatos[0].instructores;
        if (instructores.length == 0) {
          errors.no_instructores =
            "No hay instructores para la licencia que postula";
          return res.status(404).json(errors);
        }

        var fecha_inicio_consulta = fecha_fin_teoria.clone().add(1, "days");

        var fecha_fin_consulta = moment(new Date());

        console.log("vehiculos: ", vehiculos.length);

        // Iterar sobre todos los vehiculos que cumplan la condicion
        for (let j = 0; j < vehiculos.length; j++) {
          // Iterar sobre el rango de fechas
          let fechas_disponibles_vehiculo = [];
          for (
            var m = moment(fecha_inicio_consulta);
            m.diff(fecha_fin_consulta, "days") <= 0;
            m.add(1, "days")
          ) {
            let hora_0 = m
              .clone()
              .hour(-5)
              .minute(0)
              .second(0)
              .millisecond(0);
            let hora_24 = m
              .clone()
              .hour(18)
              .minute(59)
              .second(59)
              .millisecond(999);
            if (m.isoWeekday() !== 7) {
              let lecciones_vehiculos = await Leccion.find({
                fecha: {
                  $gte: hora_0,
                  $lte: hora_24
                },
                vehiculo: vehiculos[j]._id
              }).count();

              console.log(j, m.format(), lecciones_vehiculos);

              // Si hay un espacio disponible agregar a fechas disponibles
              if (lecciones_vehiculos < 2) {
                fechas_disponibles_vehiculo.push(m.format());
              }
            }
          }

          // Si hay suficientes fechas disponibles
          if (fechas_disponibles_vehiculo.length >= dias_manejo) {
            fechas_disponibles_todo_vehiculos.push(fechas_disponibles_vehiculo);
          }

          /*
          if (lecciones_vehiculos < 2) {
            for (let k = 0; k < instructores.length; k++) {
              const lecciones_instructores = await Leccion.find({
                fecha: {
                  $gte: expediente.fecha_fin_teoria,
                  $lte: hoy
                },
                instructor: instructores[j]._id
              }).count();
              // Si hay fechas disponibles para instructores
              return res.json(lecciones_instructores);
              if (lecciones_instructores < 2) {
              }
            }
          }*/
        }
      }
      return res.json(fechas_disponibles_todo_vehiculos);
    }

    expediente.save();
    console.log("is all");
  } catch (e) {
    console.log(e);
  }
});

router.get("/test/:id", async (req, res) => {
  try {
    let a = moment();
    return res.json(a.format());
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
