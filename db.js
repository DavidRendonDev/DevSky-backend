// backend/db.js
// Este archivo configura y exporta la conexión a la base de datos MySQL.
// Cambia los valores de host, user, password y database según tu entorno.

// backend/db.js
require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,       // Servidor de la base de datos
  user: process.env.MYSQLUSER,       // Usuario de MySQL
  password: process.env.MYSQLPASSWORD, // Contraseña de MySQL
  database: process.env.MYSQLDATABASE, // Nombre de la base de datos
  port: process.env.MYSQLPORT,       // Puerto de MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
