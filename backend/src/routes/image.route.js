const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

const middleware = require('../middleware/auth');

router.get('/images', middleware.verifyToken, imageController.index);
router.get('/image/:id', middleware.verifyToken, imageController.show);
router.post('/images/create', middleware.verifyToken, imageController.create);
router.delete('/images/delete/:id', middleware.verifyToken, imageController.delete);
router.put('/images/edit/:id', middleware.verifyToken, imageController.update);
router.get('/images/user/:id', middleware.verifyToken, imageController.getImagesUser);


module.exports = router;