const middleware = {}
const User = require('../models/Usuario');

middleware.verifyEmail = async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    if (user) {
        return res.status(401).json({
            auth: false,
            message: 'this email has already been registered'
        });
    }
    next();
}

module.exports = middleware;