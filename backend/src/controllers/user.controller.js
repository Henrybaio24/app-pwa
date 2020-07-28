const userController = {};
const User = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');

userController.register = async (req, res) => {
    const user = new User(req.body);
    user.password = await user.encriptpassword(user.password);
    await user.save();
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    });
    return res.json({auth: true, user, token});
}

userController.auth = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.status(401).json({auth: false, message: 'usuario no encontrado'});
    } 
    const validPassword = await user.comparePassword(password, user.password);
    if (!validPassword) {
        return res.status(401).json({auth: false, message: 'password incorrecto'});
    }
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    });
    return res.json({auth: true, user, token});

}

userController.logout = (req, res) => {
    jwt.sign({id: req.userId}, process.env.SECRET_KEY, {
        expiresIn: 0
    });
    return res.json({auth: false, messaje: 'user logout'});
}

userController.show = async (req, res) => {
    const {id} = req.params;
    const user = await User.findOne({_id: id}, {password: 0});
    res.json({"_id": user._id,
    "nombre": user.nombre,
    "apellido": user.apellido,
    "email": user.email,
    "acerca": user.acerca});
}

userController.userAuth = async (req, res) => {
    const user = await User.findOne({_id: req.userId}, {password: 0});
    res.json({"_id": user._id,
    "nombre": user.nombre,
    "apellido": user.apellido,
    "email": user.email,
    "acerca": user.acerca,
});
}

userController.update = async (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, email, acerca} = req.body;
    const user = await User.findById(id);
    user.nombre = nombre;
    user.apellido = apellido;
    user.email = email;
    user.acerca = acerca;
    await user.save();
    res.json({message: 'successfy', user});
}


module.exports = userController;