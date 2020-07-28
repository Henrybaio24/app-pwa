const middleware = {}
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');

middleware.verifyToken = async (req, res, next) => {
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    } 
    var decode;
    
    try {
        decode =  await jwt.verify(token, process.env.SECRET_KEY);
    } catch(e) {
        return res.status(401).json({
            auth: false,
            message: 'token expire or incorrect'
        });
    }
    req.userId = decode.id;

    const user = await User.findById(req.userId);
    if (!user) {
        return res.json({
            auth: false,
            message: 'No user found'
        });
    }
    req.user = user;
    next();
}

module.exports = middleware;