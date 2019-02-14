const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema(
	{
		name: String,
		description: String,
		origen: String,
		destination: String,
		waypoints: [ { lat: Number, lng: Number, name: String } ],
		municipioCode: Number,
		creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
		photos: [ { type: Schema.Types.ObjectId, ref: 'Photo' } ]
	},
	{ timestamps: true }
);

const Route = mongoose.model('Route', RouteSchema);

module.exports = Route;
