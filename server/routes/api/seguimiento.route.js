const express = require('express');
const router = express.Router();

const Expediente = require('../../models/expediente.model.js');
const Curso = require('../../models/tipo_curso.model.js');
const TipoLicencia = require('../../models/tipo_licencia.model.js');
const Alumno = require('../../models/alumno.model.js');

router.post('/expediente', async (req, res) => {
    var expedientes = [];
    if(req.body.numeracion.length>0 && req.body.dni.length==0){
        expedientes = await Expediente.find({numeracion:req.body.numeracion},
            {alumno:1,
                numeracion:1,
                asistencias_manejo:1,
                asistencias_teoricas:1,
                curso_licencia:1}).populate('alumno').populate('curso_licencia');
    }else if(req.body.numeracion.length==0 && req.body.dni.length>0){
        const alumno = await Alumno.find({dni:req.body.dni});
        if(alumno.length>0){
            expedientes = await Expediente.find({alumno:alumno[0]._id},
                {alumno:1,
                    numeracion:1,
                    asistencias_manejo:1,
                    asistencias_teoricas:1,
                    curso_licencia:1}).populate('alumno').populate('curso_licencia');
        }

    }
    if(expedientes.length>0){
        const curso =  await Curso.find({_id:expedientes[0].curso_licencia.curso});
        const lactual =  await TipoLicencia.find({_id:expedientes[0].curso_licencia.licencia_actual});
        const lpostula =  await TipoLicencia.find({_id:expedientes[0].curso_licencia.licencia_postula});
        res.json({
            exp: expedientes[0],
            curso: curso[0].nombre,
            lactual:lactual[0].nombre,
            lpostula:lpostula[0].nombre,
            state:true});
    }else{
        res.json({
            exp: [],
            curso: "",
            lactual:"",
            lpostula:"",
            state:false});
    }

 });

module.exports = router;
