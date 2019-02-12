const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

/* GET home private */
router.get('/', ensureLoggedIn('auth/login'), (req, res, next) => {
	res.render('profile/mysession', {user: req.user});
});

module.exports = router;
