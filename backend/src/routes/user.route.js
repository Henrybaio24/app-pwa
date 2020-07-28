const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const middleware = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/auth', userController.auth);
router.post('/logout', middleware.verifyToken, userController.logout);
router.get('/user/:id', middleware.verifyToken, userController.show);
router.get('/user', middleware.verifyToken, userController.userAuth);
router.put('/user/update/:id', middleware.verifyToken, userController.update);

module.exports = router;