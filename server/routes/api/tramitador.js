const express = require('express');
const router = express.Router();
const Tramitadores = require('../../models/tramitador.model');
router.get('/tramitadores', (req, res) => {
    Tramitadores.find().then(tramitador => { res.json(tramitador); });
})

router.post('/tramitador', (req, res, next) => {
    const tramitador = new Tramitadores(req.body);
    tramitador.save((err, tramitador) => {
        if (err) { return next(err); }
        res.json(tramitador);
    })
})

router.put('/tramitador/:id', (req, res) => {
    Tramitadores.findById(req.params.id, (err, tramitador) => {
        tramitador.dni = req.body.dni;
        tramitador.a_parterno = req.body.a_parterno;
        tramitador.a_materno = req.body.a_materno;
        tramitador.nombres = req.body.nombres;
        tramitador.celular = req.body.celular;
        tramitador.save((err) => {
            if (err) { res.send(err); }
            res.json(tramitador)
        })
    })
})

router.delete('/tramitador/:id', (req, res) => {
    Tramitadores.findByIdAndRemove(req.params.id, (err) => {
        if (err) { res.send(err); }
        res.json({ message: 'tramitador eleminado' })
    })
})

module.exports = router;