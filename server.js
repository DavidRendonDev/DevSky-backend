// backend/server.js
// Archivo principal del backend. Configura el servidor Express, middlewares y rutas.

require('dotenv').config(); // Cargar variables de entorno desde .env

const express = require('express');
const cors = require('cors');

// Importamos las rutas
const authRoutes = require('./routes/auth');
const tareasRoutes = require('./routes/tareas');

const app = express();

// Puerto: usa el de .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer JSON en las peticiones

// Rutas principales
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/tareas', tareasRoutes); // Rutas de tareas

// Ruta de prueba para saber si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor de GMA funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
