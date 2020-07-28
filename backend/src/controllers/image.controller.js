const imagenController = {};
const Image = require('../models/Imagen');
const User = require('../models/Usuario');
const cloudinary = require('../config/configcloud');
const fs = require('fs-extra');

imagenController.index = async (req, res) => {
    const imagenes = await Image.find({ userId: req.userId });
    return res.json(imagenes);
}

imagenController.create = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const image = new Image({
            userId: req.userId,
            nombre,
            descripcion,
            ruta: result.url,
        });
        await fs.unlink(req.file.path);
        await image.save();
        res.json({ message: 'successfully saved image', image });
    } catch (error) {
        console.log(error)
    }

}

imagenController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByIdAndDelete(id);
        await cloudinary.v2.uploader.destroy(image.public_id);
        return res.json({ message: 'successfull', image });

    } catch (error) {
        console.log(error)
    }

}

imagenController.show = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);
        image.save();
        return res.json(image);

    } catch (error) {
        console.log(error)
    }

}

imagenController.update = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const image = await Image.findById(id);

    if (image.userId != req.userId) {
        return res.status(401).json({ message: 'unauthorized user' });
    }
    image.nombre = nombre;
    image.descripcion = descripcion;
    image.save();

    return res.json({ message: 'updated successfy', image });
}


imagenController.getImagesUser = async (req, res) => {
    const { id } = req.params;
    const images = await Image.find({ userId: id });

    res.json(images);
}

module.exports = imagenController;