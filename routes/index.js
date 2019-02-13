const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinary = require('../options/cloudinary');
const Photo = require('../models/route');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

module.exports = router;
