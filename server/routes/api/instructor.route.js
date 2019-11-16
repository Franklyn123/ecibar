const express = require('express');
const router = express.Router();
const Instructor = require('../../models/instructor.model.js');

// @route   GET api/instructor
// @desc    Get instructores
// @access  Public
router.get('/', (req, res) => {
  Instructor.find()
    .populate('clases')
    .then(instructores => res.json(instructores))
    .catch(err => res.status(404).json({ novehiculos: 'No hay instructores' }));
});

router.get('/hinstructores', async (req, res) => {
  res.json(await Instructor.find().exec());
});

module.exports = router;
