const express = require("express");
const router = express.Router();
const Expediente = require("../../models/expediente.model");

// @route   GET api/expediente
// @desc    Get expedientes
// @access  Public
router.get("/", (req, res) => {
  Expediente.find()
    .populate("alumno")
    .populate({ path: "curso_licencia", populate: { path: "licencia_actual" } })
    .populate({
      path: "curso_licencia",
      populate: { path: "licencia_postula" }
    })
    .then(expedientes => res.json(expedientes))
    .catch(err =>
      res.status(404).json({ noexpedientes: "No hay expedientes" })
    );
});

module.exports = router;
