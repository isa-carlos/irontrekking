require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
// const User = require("./models/user")
mongoose
	.connect(`${process.env.KEY_ATLAS}`, { useNewUrlParser: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database: "${x.connections[0].host}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.locals.API_KEY = process.env.API_KEY;

// Middleware Setup
// para que pueda entender informacion del post enviada por json
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

hbs.registerHelper('ifUndefined', (value, options) => {
	if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
	if (typeof value !== undefined) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// Enable authentication using session + passport
// aqui configuras el middelware de session
app.use(
	session({
		secret: 'irongenerator',
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);



// middleware de flash para los mensajes de error
// se autodestruye el mensaje que se muestra para no ocupar moemoria
app.use(flash());
require('./passport')(app);

app.use(function (req, res, next) {
	res.locals = {
		user: req.user
	};
	console.log("isa")
	console.log(res.locals)
	
	next();
});

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const private = require('./routes/profile');
app.use('/profile', private);

const rutas = require('./routes/rutas');
app.use('/rutas', rutas);

module.exports = app;
