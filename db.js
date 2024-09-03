const mysql = require('mysql2');
// conexion a base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',       
    password: '123456789',       // esta es la contraseña que puso para esta actividad
    database: 'api_database'
});

const promisePool = pool.promise();

module.exports = promisePool;
