const express = require("express");
const router = express.Router();
const Vehiculo = require("../../models/vehiculo.model");

// @route   GET api/vehiculo
// @desc    Get vehiculos
// @access  Public
router.get("/", (req, res) => {
  Vehiculo.find()
    .populate("clase")
    .then(vehiculos => res.json(vehiculos))
    .catch(err => res.status(404).json({ novehiculos: "No hay vehiculos" }));
});

module.exports = router;
