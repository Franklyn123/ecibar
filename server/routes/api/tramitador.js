const express = require("express");
const router = express.Router();
const Tramitadores = require("../../models/tramitador.model");
const User = require("../../models/user.model.js");
const datos = require("./datos.json");

router.get("/reniec/:dni", (req, res) => {
  const dni = req.params.dni;
  if (dni == datos.result.nuDni) {
    res.json(datos);
  } else {
    res.json({
      estado: "no coincide"
    });
  }
});

router.post("/guardar_usuario", async (req, res) => {
  const nuevoUsuario = new User({
    name: "administracion",
    username: "administracion",
    password: "administracion"
  });

  await nuevoUsuario.save(nuevoUsuario);
  res.json({ status: true });
});

router.post("/login", async (req, res) => {
  /*eslint-disable */
  const username = req.body.username;
  const password = req.body.password;
  /* eslint-enable */
  try {
    await User.find({ username, password }).then(user => {
      if (user.length === 0) {
        /*eslint-disable */
        throw "Contraseña incorrecta o usuario inválido";
        /* eslint-enable */
      }
    });
  } catch (e) {
    res.json({ error: e });
  }
  res.json({ status: true, username });
});
router.get("/tramitadores", (req, res) => {
  Tramitadores.find().then(tramitador => {
    res.json(tramitador);
  });
});

router.post("/tramitador", (req, res, next) => {
  const tramitador = new Tramitadores(req.body);
  tramitador.save((err, tramitadorRes) => {
    if (err) {
      return next(err);
    }
    return res.json(tramitadorRes);
  });
});

router.put("/tramitador/:id", (req, res) => {
  Tramitadores.findById(req.params.id, (err, tramitador) => {
    /*eslint-disable */
    tramitador.dni = req.body.dni;
    tramitador.a_parterno = req.body.a_parterno;
    tramitador.a_materno = req.body.a_materno;
    tramitador.nombres = req.body.nombres;
    tramitador.celular = req.body.celular;
    tramitador.save(err => {
      if (err) {
        res.send(err);
      }
      res.json(tramitador);
    });
    /* eslint-enable */
  });
});

router.delete("/tramitador/:id", (req, res) => {
  Tramitadores.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "tramitador eleminado" });
  });
});

module.exports = router;
