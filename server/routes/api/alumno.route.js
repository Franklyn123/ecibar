const express = require("express");
const router = express.Router();
const Alumno = require("../../models/alumno.model");

// @route   GET api/alumno
// @desc    Get alumnos
// @access  Public
router.get("/", (req, res) => {
  Alumno.find()
    .then(alumnos => res.json(alumnos))
    .catch(err => res.status(404).json({ noalumnos: "No hay alumnos" }));
});

module.exports = router;
