const express = require("express");
const router = express.Router();
const Route = require("../models/route");
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const cloudinary = require("../options/cloudinary");
const Meteosapi = require("meteoscrapi");
const meteosapi = Meteosapi();

// vamos a buscar todas las rutas de nuestra base de datos
// la ruta será LOCALHOST:3000/predefinidas
// y ahí renderizaremos nuestra hoja profile/mostrar-rutas con los resultados
// que encontremos. Nuestro argumento allRoutes lo retornaremos a la página
// profile/mostrar-rutas.hbs con los distintos campos que nos interese mostar
router.get("/predefinidas", ensureLoggedIn("auth/login"), (req, res, next) => {
  Route.find()
    .then(allRoutes => {
      res.render("profile/mostrar-rutas", { allRoutes });
    })
    .catch(error => {
      console.log("No conecto con la base de datos", error);
      next();
    });
});

// ejemplo de ruta mostrada con la selccion: http://localhost:3000/rutas/predefinidas/5c61b45a1472c2d438937aab
router.get(
  "/predefinidasjson/:id",
  ensureLoggedIn("auth/login"),
  (req, res, next) => {
    Route.findById(req.params.id)
      .then(oneRoute => {
        res.json(oneRoute);
      })
      .catch(err => {
        console.log("No he podido recuperar nada en la base de datos", err);
        next();
      });
  }
);

// ejemplo de ruta mostrada con la selccion: http://localhost:3000/rutas/predefinidas/5c61b45a1472c2d438937aab
router.get(
  "/predefinidas/:id/",
  ensureLoggedIn("auth/login"),
  (req, res, next) => {
    Route.findById(req.params.id)
      .then(oneRoute => {
        res.render("profile/mostrarUna", { oneRoute });
      })
      .catch(err => {
        console.log("No he podido recuperar nada en la base de datos", err);
        next();
      });
  }
);

router.get("/crear", ensureLoggedIn("auth/login"), (req, res, next) => {
  res.render("profile/crear-ruta");
});

router.post("/crear", ensureLoggedIn("auth/login"), (req, res, next) => {
  Route.create({
    name: req.body.name,
    description: req.body.description,
    origen: req.body.description,
    destination: req.body.destination,
    waypoints: JSON.parse(req.body.stations),
    creatorId: req.user._id
  }).then(() => {
    res.redirect("/");
  });
});

router.get("/favorito", (req, res, next) => {
  res.render("profile/favorito");
});

router.get("/misrutas", (req, res, next) => {
  let idUsuario = req.user._id;
  Route.find({ creatorId: idUsuario })
    .then(data => {
      res.render("profile/mis-rutas", { user: req.user, routes: data });
    })
    .catch(() => {
      res.send("An error has ocurred");
    });
});

router.get("/rutas/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  let idRuta = req.params.id;
  Route.findById(idRuta)
    .then(ruta => {
      res.render("profile/detalle-ruta", { ruta: ruta });
    })
    .catch(() => {
      res.send("An error has ocurred");
    });
});

module.exports = router;
