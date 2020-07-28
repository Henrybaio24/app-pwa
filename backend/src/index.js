require('dotenv').config();
const app = require('./setup/server');

app.listen(app.get('port'), () => {
    console.log('Corriendo en el puerto', app.get('port'));
});