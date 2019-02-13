const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinary = require('../options/cloudinary');
const Meteosapi = require("meteoscrapi");
const meteosapi = Meteosapi();

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});
let proviceKey = 28015;
meteosapi.getForecast(proviceKey).then(console.log);
module.exports = router;
