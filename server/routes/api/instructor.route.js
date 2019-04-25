const express = require('express');
const router = express.Router();

const Instructor = require('../../models/instructor.model.js');


router.get('/hinstructores', async (req, res) => {
  res.json(await Instructor.find()
    .exec());
});

module.exports = router;
