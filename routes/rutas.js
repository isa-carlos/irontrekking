const express = require("express");
const router = express.Router();
const Route = require('../models/route')
const { ensureLoggedIn } = require('connect-ensure-login');
router.get("/predefinidas", (req, res, next) => {
  res.render("profile/rutas-predefinidas");
}); //NO TOCAR

router.get("/misrutas", (req, res, next) => {
  let idUsuario = req.user._id;
  Route.find({creatorId:idUsuario})
  .then( data => {
     res.render("profile/mis-rutas", {user: req.user, routes:data})

  })
  .catch( () => {
    res.send('An error has ocurred')
  })

})

router.get("/rutas/:id",ensureLoggedIn('/auth/login'), (req, res, next) => {
  let idRuta = req.params.id;
  Route.findById(idRuta)
  .then( ruta => {
     res.render("profile/detalle-ruta",{ruta: ruta})

  })
  .catch( () => {
    res.send('An error has ocurred')
  })

})

router.get("/crear", (req, res, next) => {
  res.render("profile/crear-ruta");
});

router.get("/favorito", (req, res, next) => {
  res.render("profile/favorito");
});


module.exports = router;
