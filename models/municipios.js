const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const muniSchema = new Schema(
	{
    codigo_postal: String, 
    municipio_id: String, 
    nombre_entidad_singular: String,
  },
	{ timestamps: true }
);

module.exports = mongoose.model('Municipio', muniSchema);
// entre parentesis de model va el nombre de la colección (en la coleccion aparece en minusculas y plural)
