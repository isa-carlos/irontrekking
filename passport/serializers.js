const passport = require('passport');
const User = require('../models/User');

passport.serializeUser((loggedInUser, cb) => {
	// aqui puedo poner lo que quiera. lo personalizo
	cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
	User.findById(userIdFromSession)
		.then((userDocument) => {
			cb(null, userDocument);
		})
		.catch((err) => {
			cb(err);
		});
});
