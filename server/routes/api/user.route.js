const express = require('express');
const router = express.Router();

const User = require('../../models/user.model.js');

router.post('/guardar_usuario', async (req, res) => {
  const nuevoUsuario = new User({
    name: 'administracion',
    username: 'administracion',
    password: 'administracion'
  });

  await nuevoUsuario.save(nuevoUsuario);
  res.json({ status: true });
});

router.post('/login', async (req, res) => {
  console.log('hello from login');
  res.json({ status: true });
});
