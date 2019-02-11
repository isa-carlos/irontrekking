const express = require("express");
const router = express.Router();

router.get("/predefinidas", (req, res, next) => {
  res.render("profile/rutas-predefinidas");
});

router.get("/misrutas", (req, res, next) => {
  res.render("profile/mis-rutas")
})

router.get("/crear", (req, res, next) => {
  res.render("profile/crear-ruta");
});

router.get("/favorito", (req, res, next) => {
  res.render("profile/favorito");
});


module.exports = router;
