const mysql = require('mysql');
//el modulo mysql no soporta las promesas para ellos se utiliza el modulo util que convierte callback a promise() o para poder soportarlas 
const {promisify} = require('util'); 
const {database} = require('./key');


//creamos una conexion con la base de datos llamada pool

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
            //LA CONEXIÓN DE LA BASE DE DATOS FUE CERRADA
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS')
            //LA BASE DE DATOS TIENE MUCHAS CONEXIONES
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED')
            //SE RECHAZÓ LA CONEXIÓN DE LA BASE DE DATOS
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify pool querys(convirtiendo consultaras a promesas)
pool.query = promisify(pool.query);

module.exports = pool;
