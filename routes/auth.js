// backend/routes/auth.js
// Rutas de autenticación: login de usuario.
// Permite a inspectores y técnicos iniciar sesión.

const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta: POST /api/auth/login
// Recibe: { nombre_usuario, contraseña }
// Responde: { success, user } o { success: false, message }
router.post('/login', (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  if (!nombre_usuario || !contraseña) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }

  // Consulta el usuario en la base de datos
  db.query(
    'SELECT id, nombre_usuario, rol FROM usuarios WHERE nombre_usuario = ? AND contraseña = ?',
    [nombre_usuario, contraseña],
    (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      if (results.length === 0) {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
      }
      // Usuario encontrado
      const user = results[0];
      res.json({ success: true, user });
    }
  );
});

module.exports = router;
