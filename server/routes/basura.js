//num = await Expediente.find({numeracion:2});
    //num.insert({"costo":0});
    //await Task.findByIdAndUpdate(req.params.id, newTask);
    const exp = await  Expediente.find({numeracion:9});
    await Expediente.findByIdAndUpdate(exp[0]._id,{$set:{costo:1,gg:0}});
    res.json(exp);

    //const cur = await TipoCurso.find({_id:req.body.tipoCurso});
    //const de = await TipoLicencia.find({_id:req.body.de));
    //const a = await TipoLicencia.find({_id:req.body.a));
    //console.log(num[0].numeracion);
    //console.log(cur);
    /*const expediente = new Expediente({
        numeracion: (num[0].numeracion+1),
        curso:req.body.tipoCurso,
        licencia_actual:req.body.de,
        licencia_postula:req.body.a,
        fecha_registro_expediente:req.body.fechaRegistro,
        costo:0

    });*/
    /*const expediente = new Expediente({
        numeracion: (num[0].numeracion+1),
        curso:req.body.tipoCurso,
        licencia_actual:req.body.de,
        licencia_postula:req.body.a,
        fecha_registro_expediente:req.body.fechaRegistro,
        fecha_inicio_teoria:null,
        fecha_fin_teoria:null,
        fecha_inicio_manejo:null,
        fecha_fin_manejo:null,
        km_inicio:0,
        km_fin:0,
        vehiculo:null,
        tramitador:null,
        costo:0,
        saldo:0
        
    });
    expediente.save(expediente);*/
    //.then(item => console.log(item))
    //.catch(err => res.status(404).json({ success: false }));
    //console.log(dep[0]._id);
    //res.json({ success: false });
    /*
    const newAlumno = new Alumno({
        dni: req.body.dni,
        a_paterno: req.body.aPaterno,
        a_materno: req.body.aMaterno,
        sexo: req.body.sexo,
        domicilio: req.body.domicilio,
        cel_tel: req.body.celTel,
        fecha_nacimiento: req.body.selectedDate,
        nombres: req.body.nombres,
        departamento: dep[0]._id,
        provincia: pro[0]._id,
        distrito: dis[0]._id
      });
      newAlumno.save(newAlumno);*/
    //const al = await Alumno.find({dni:'45565656'});
    /*Alumno.find({dni:'45565656'}, function(err, alumnos) {
    	Departamento.populate(alumnos, {path: "departamento"},function(err, libros){
            console.log(libros)
        	res.status(200).send(libros);
        }); 
    });*/
    /*alu = await Alumno.find({dni:'45565656'}).populate('departamento')
            .populate('provincia')
            .populate('distrito');*/
    //alumnoss = await Departamento.populate(alumnos, {path: "departamento"});
    //console.log(alu);
    //console.log(al[0].departamento.nombre);
    //res.json({ success: false });