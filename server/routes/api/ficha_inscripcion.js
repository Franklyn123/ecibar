const express = require("express");
const router = express.Router();

// Item Model
const Departamento = require("../../models/departamento.model.js");
const Provincia = require("../../models/provincia.model.js");
const Distrito = require("../../models/distrito.model.js");
const TipoCurso = require("../../models/tipo_curso.model.js");
const TipoLicencia = require("../../models/tipo_licencia.model.js");
const Alumno = require("../../models/alumno.model.js");
const Expediente = require("../../models/expediente.model.js");
const CursoLicencia = require("../../models/curso_licencia.model.js");
//router.get('/departamentos', (req, res) => {
//    res.json(["Arequipa","Lima","Piura"]);
//});
/*router.post('/tipo_licencias_1', (req, res) => {
    CursoLicencia.find({curso:req.params.curso})
    .populate('curso')
    .then(cls => res.json(cls));
});*/
router.get("/departamentos", (req, res) => {
  Departamento.find()
    .sort({ name: -1 })
    .then(deps => res.json(deps));
});
router.get("/provincias/:id", (req, res) => {
  Provincia.find({ region_id: req.params.id }).then(provincias =>
    res.json(provincias)
  );
});
router.get("/distritos/:id", (req, res) => {
  Distrito.find({ region_id: req.params.id }).then(distritos =>
    res.json(distritos)
  );
});
router.get("/tipo_cursos", (req, res) => {
  TipoCurso.find()
    .sort({ nombre: 1 })
    .then(tipo_cursos => res.json(tipo_cursos));
});
router.get("/tipo_licencias", (req, res) => {
  TipoLicencia.find()
    .sort({ nombre: 1 })
    .then(tipo_licencias => res.json(tipo_licencias));
});
router.get("/cursos_licencias", async (req, res) => {
  const cls = await CursoLicencia.aggregate([
    {
      $lookup: {
        from: "tipo_licencias",
        localField: "licencia_actual",
        foreignField: "_id",
        as: "licencia_actual"
      }
    },
    {
      $lookup: {
        from: "tipo_licencias",
        localField: "licencia_postula",
        foreignField: "_id",
        as: "licencia_postula"
      }
    }
  ]);
  res.json(cls);
});
router.get("/prueba", async (req, res) => {
  const cl = await CursoLicencia.find({
    curso: req.body.tipoCurso,
    licencia_actual: req.body.de,
    licencia_postula: req.body.a
  });
});
//db.col.find().sort({"datetime": -1}).limit(1)
router.get("/estado", async (req, res) => {
  const num = await Expediente.find()
    .sort({ numeracion: -1 })
    .limit(1);
  res.json({ numeracion: num[0].numeracion + 1 });
});
router.get("/alumnos", async (req, res) => {
  res.json([
    { nombres: "Cahuana Rojas, Frankyln", dni: "73464646" },
    { nombres: "Avila Cordava, Aaron", dni: "45454646" },
    { nombres: "Rengifo Garcia, Bragan", dni: "89566646" }
  ]);
});
router.post("/ficha_inscripcion", async (req, res) => {
  try {
    //Departamento.find({id:req.body.departamento});
    const dep = await Departamento.find({ id: req.body.departamento });
    const pro = await Provincia.find({ id: req.body.provincia });
    const dis = await Distrito.find({ id: req.body.distrito });
    let counterExpediente;
    Expediente.count({}, (error, counter) => {
      counterExpediente = counter;
    });
    const cursoLicencia = await CursoLicencia.find({
      curso: req.body.tipoCurso,
      licencia_actual: req.body.de,
      licencia_postula: req.body.a
    });
    cantidadAlumnos = await Alumno.count({ dni: req.body.dni });
    //console.log(cursoLicencia[0].licencia_postula);
    const lActual = await TipoLicencia.findById(req.body.de);
    var idDep = "";
    var idPro = "";
    var idDis = "";
    if (dep.length > 0) {
      idDep = dep[0]._id;
    } else {
      idDep = "5c6e227110be95336d24b216";
    }
    if (pro.length > 0) {
      idPro = pro[0]._id;
    } else {
      idPro = "5c6e232910be95336d24b2c5";
    }
    if (dis.length > 0) {
      idDis = dis[0]._id;
    } else {
      idDis = "5c6e250b10be95336d24b5af";
    }
    let nuevoAlumno = {};
    if (cantidadAlumnos == 0) {
      nuevoAlumno = new Alumno({
        dni: req.body.dni,
        a_paterno: req.body.aPaterno,
        a_materno: req.body.aMaterno,
        sexo: req.body.sexo,
        domicilio: req.body.domicilio,
        cel_tel: req.body.celTel,
        fecha_nacimiento: req.body.selectedDate,
        nombres: req.body.nombres,
        departamento: idDep,
        provincia: idPro,
        distrito: idDis,
        licencia_actual: req.body.de,
        licencia_postula: req.body.a
      });
      await nuevoAlumno.save(nuevoAlumno);
    } else {
      await Alumno.updateOne(
        { dni: req.body.dni },
        {
          $set: {
            a_paterno: req.body.aPaterno,
            a_materno: req.body.aMaterno,
            sexo: req.body.sexo,
            domicilio: req.body.domicilio,
            cel_tel: req.body.celTel,
            fecha_nacimiento: req.body.selectedDate,
            nombres: req.body.nombres,
            departamento: idDep,
            provincia: idPro,
            distrito: idDis,
            licencia_actual: req.body.de,
            licencia_postula: req.body.a
          }
        }
      );
    }
    const alumnoEncontrado = await Alumno.find({ dni: req.body.dni });
    var e = "R";
    /*
        if(lActual.nombre=='AI'){
            e = 'T';
        }
        */

    let nuevoExpediente = {};
    if (alumnoEncontrado.length > 0 && cursoLicencia.length > 0) {
      nuevoExpediente = new Expediente({
        numeracion: counterExpediente + 1,
        alumno: alumnoEncontrado[0]._id,
        curso_licencia: cursoLicencia[0]._id,
        fecha_registro_expediente: req.body.fechaRegistro,
        fecha_inicio_teoria: null,
        fecha_fin_teoria: null,
        fecha_inicio_manejo: null,
        fecha_fin_manejo: null,
        km_inicio: 0,
        km_fin: 0,
        vehiculo: null,
        tramitador: null,
        instructor: null,
        costo: 0,
        saldo: 0,
        asistencias_teoricas: [],
        asistencias_manejo: [],
        estado: e
      });
      nuevoExpediente.save(nuevoExpediente).then(async () => {
        const alumno = await Alumno.findOne(nuevoAlumno._id);
        alumno.expediente = nuevoExpediente;
        await alumno.save();
      });

      res.json({ state: true });
    } else {
      res.json({ state: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ state: false });
  }
});

module.exports = router;
