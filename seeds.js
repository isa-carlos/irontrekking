// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require('dotenv').config();


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Route = require('./models/route');
const bcryptSalt = 10;

mongoose
	.connect(`mongodb://localhost/${process.env.KEY_ATLAS}`, { useNewUrlParser: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
		console.log(process.env.DB);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const routes = [
	{
		name: 'Prueba 1 - Prueba 2',
		description: 'Esta es la ruta de Maruja',
		origen: 'Hola',
		destination: 'Adios',
		waypoints: [
			{ lat: 28.059552, lng: -15.547752, name: 'Station 1' },
			{ lat: 28.059523, lng: -15.547698, name: 'Station 2' },
			{ lat: 28.059578, lng: -15.547656, name: 'Station 3' },
			{ lat: 28.059575, lng: -15.547657, name: 'Station 4' },
			{ lat: 28.059577, lng: -15.547655, name: 'Station 5' },
			{ lat: 28.059591, lng: -15.54764, name: 'Station 6' },
			{ lat: 28.059619, lng: -15.547668, name: 'Station 7' },
			{ lat: 28.059579, lng: -15.547584, name: 'Station 8' },
			{ lat: 28.059643, lng: -15.547524, name: 'Station 9' },
			{ lat: 28.060125, lng: -15.546919, name: 'Station 10' },
			{ lat: 28.060815, lng: -15.546439, name: 'Station 11' },
			{ lat: 28.061605, lng: -15.546489, name: 'Station 12' },
			{ lat: 28.145358, lng: -15.567643, name: 'Station 13' },
			{ lat: 28.144209, lng: -15.569096, name: 'Station 14' },
			{ lat: 28.143619, lng: -15.569954, name: 'Station 15' }
		],
		creatorId: { _id: '5c635a43b426b5fe24674e07' }
		// photos: { _id: '5c61c8b45bb9467de445fjjj' }
	},
	{
		name: 'Prueba 2 - Prueba 3',
		description: 'Esta descripción es un ejemplo',
		origen: 'Principio',
		destination: 'Fin',
		waypoints: [
			{ lat: 28.059552, lng: -15.547752, name: 'Station 1' },
			{ lat: 28.059523, lng: -15.547698, name: 'Station 2' },
			{ lat: 28.059578, lng: -15.547656, name: 'Station 3' },
			{ lat: 28.059575, lng: -15.547657, name: 'Station 4' },
			{ lat: 28.059577, lng: -15.547655, name: 'Station 5' },
			{ lat: 28.059591, lng: -15.54764, name: 'Station 6' },
			{ lat: 28.059619, lng: -15.547668, name: 'Station 7' },
			{ lat: 28.059579, lng: -15.547584, name: 'Station 8' },
			{ lat: 28.059643, lng: -15.547524, name: 'Station 9' },
			{ lat: 28.060125, lng: -15.546919, name: 'Station 10' },
			{ lat: 28.060815, lng: -15.546439, name: 'Station 11' },
			{ lat: 28.061605, lng: -15.546489, name: 'Station 12' },
			{ lat: 28.145358, lng: -15.567643, name: 'Station 13' },
			{ lat: 28.144209, lng: -15.569096, name: 'Station 14' },
			{ lat: 28.143619, lng: -15.569954, name: 'Station 15' }
		],
		creatorId: { _id: '5c635a43b426b5fe24674e06' }
		// photos: { _id: '5c61c8b45bb9467de445f444' }
	}
];

let users = [
	{
		username: 'alice',
		password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt))
	},
	{
		username: 'bob',
		password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt))
	}
];

// let photos = [

// 	{content: "una foto curiosa",
// 	authorId: { _id: '5c605550b85a1cbed4a111' },
// 	picPath: "esto es picpath",
// 	picName: "esto es una picname"
// 	},

// 	{content: "otra foto mierdosa",
// 	authorId: { _id: '5c605550b85a1cbed4a222' },
// 	picPath: "esto es picpath",
// 	picName: "esto es una picname"
// 	}
// ]

// guardar usuarios
// then => coger un id cualquiera
// coger ese id y asignarlo a creatorId de routes

User.deleteMany()
	.then(() => {
		return User.create(users);
	})
	.then((usersCreated) => {
		console.log(`${usersCreated.length} users created with the following id:`);
		console.log(usersCreated.map((u) => u._id));
		routes[0].creatorId = usersCreated[0]._id;
		return Route.create(routes);
	})
	.then(() => {
		// Close properly the connection to Mongoose
		mongoose.disconnect();
	})
	.catch((err) => {
		mongoose.disconnect();
		throw err;
	});

// ESTE ARCHIVO LO CARGAMOS UNA VEZ Y ASI PROBRAMOS NUESTRA BASE DE DATOS

// node bin/seed.js
