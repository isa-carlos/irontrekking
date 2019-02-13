const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema(
	{
		content: String,
		authorId: { type: Schema.Types.ObjectId, ref: 'User' },
		picPath: String,
		picName: String
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Photo', photoSchema);
// entre parentesis de model va el nombre de la colección (en la coleccion aparece en minusculas y plural)
