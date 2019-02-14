const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinary = require('../options/cloudinary');
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;



const Photo = require('../models/route');


/* GET home private */
router.get('/', ensureLoggedIn('auth/login'), (req, res, next) => {
	res.render('profile/mysession', { user: req.user });
});

module.exports = router;
