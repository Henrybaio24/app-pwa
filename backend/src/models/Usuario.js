const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require('bcryptjs');

const User = new Schema({
    nombre: { require: true, type: String },
    apellido: { require: true, type: String },
    email: { require: true, type: String },
    acerca: {require: true, type: String },
    password: { require: true, type: String },
    ruta: String
});

User.methods.encriptpassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

User.methods.comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = mongoose.model('User', User);