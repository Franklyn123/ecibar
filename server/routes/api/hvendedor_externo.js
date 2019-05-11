const express = require('express');
const router = express.Router();

// Item Model
const HVendedorExts = require('../../models/historial_vendedor_externo.models.js')
const Alumno = require('../../models/alumno.model.js');

// crud de historial de vendedores externos
// get
router.get('/historialext', (req, res) => {
    HVendedorExts.find().then(vendedoresextr => { res.json(vendedoresextr); });
});

router.get('/halumnos', async (req, res) => {
    res.json(await Alumno.find().populate({
        path: 'expediente'
    }).populate('licencia_actual')
      .populate('licencia_postula')
      .exec())
});

// post
router.post('/historialext', (req, res, next) => {
    console.log(req.body);
    const vendedorExts = new HVendedorExts(req.body);
    vendedorExts.save((err, historialext) => {
        if (err) { return next(err); }
        res.json(historialext);
    });
});

// put
router.put('/historialext/:id', (req, res) => {
    HVendedorExts.findByid(req.params.id, (err, historialext) => {
        historialext.vendedor = req.body.vendedor;
        historialext.alumno = req.body.alumno;
        historialext.aCuenta = req.body.aCuenta;
        historialext.saldo = req.body.saldo;
        historialext.fechaSaldo = req.body.fechaSaldo;
        historialext.totalPago = req.body.totalPago;
        historialext.comision = req.body.comision;
        historialext.save((err) => {
            if (err) { res.send(err); }
            res.json(historialext);
        });
    });
});

// delete
router.delete('/historialext/:id', (req, res) => {
    HVendedorExts.findByIdAndRemove(req.params.id, (err) => {
        if (err) { res.send(err); }
        res.json({ message: 'historial fue elimado' });
    });
});

module.exports = router;
