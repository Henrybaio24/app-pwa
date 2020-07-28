const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (res, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

//database
require('../config/db');

//config
app.set('port', process.env.PORT || 3000);
app.use(multer({storage}).single('imagen'));
app.use(cors());


//middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api', require('../routes/user.route'));
app.use('/api', require('../routes/image.route'));

module.exports = app;