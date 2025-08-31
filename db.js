// backend/db.js
require('dotenv').config();
const mysql = require('mysql2');

// Verificar que todas las variables necesarias estén definidas
const requiredEnv = ['MYSQLHOST', 'MYSQLUSER', 'MYSQLPASSWORD', 'MYSQLDATABASE', 'MYSQLPORT'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Falta la variable de entorno: ${key}`);
  }
});

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,        // Servidor de la base de datos
  user: process.env.MYSQLUSER,        // Usuario de MySQL
  password: process.env.MYSQLPASSWORD, // Contraseña de MySQL
  database: process.env.MYSQLDATABASE, // Nombre de la base de datos
  port: process.env.MYSQLPORT,        // Puerto de MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar conexión al iniciar
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    connection.release();
  }
});

// Exportar pool con soporte para promesas
module.exports = pool.promise();
