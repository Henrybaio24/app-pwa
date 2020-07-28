const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Image = new Schema({
    userId: ObjectId,
    nombre: { type: String, required: true },
    descripcion: { type: String, default: '' },
    ruta: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', Image);