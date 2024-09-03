const bcrypt = require('bcrypt');

const password = 'tu_contraseña'; 
const saltRounds = 12;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log('Contraseña encriptada:', hash);
});
