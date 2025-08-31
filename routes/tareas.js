// backend/routes/tareas.js
// Rutas para la gestión de tareas de mantenimiento aeronáutico.
// Permite al inspector asignar tareas y a los técnicos ver y actualizar su estado.

const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las tareas (para el inspector)
// GET /api/tareas
router.get('/', (req, res) => {
  db.query(
    `SELECT t.id, t.descripcion, t.estado, u.id AS id_tecnico, u.nombre_usuario AS tecnico_nombre
     FROM tareas t
     LEFT JOIN usuarios u ON t.id_tecnico_asignado = u.id`,
    (err, results) => {
      if (err) {
        console.error('Error al obtener tareas:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      res.json({ success: true, tareas: results });
    }
  );
});

// Crear una nueva tarea y asignarla a un técnico (inspector)
// POST /api/tareas
// Recibe: { descripcion, id_tecnico_asignado }
router.post('/', (req, res) => {
  const { descripcion, id_tecnico_asignado } = req.body;
  if (!descripcion || !id_tecnico_asignado) {
    return res.status(400).json({ success: false, message: 'Faltan datos' });
  }
  db.query(
    'INSERT INTO tareas (descripcion, id_tecnico_asignado) VALUES (?, ?)',
    [descripcion, id_tecnico_asignado],
    (err, result) => {
      if (err) {
        console.error('Error al crear tarea:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      res.json({ success: true, tarea_id: result.insertId });
    }
  );
});

// Obtener tareas asignadas a un técnico específico
// GET /api/tareas/tecnico/:id_tecnico
router.get('/tecnico/:id_tecnico', (req, res) => {
  const { id_tecnico } = req.params;
  db.query(
    'SELECT id, descripcion, estado FROM tareas WHERE id_tecnico_asignado = ?',
    [id_tecnico],
    (err, results) => {
      if (err) {
        console.error('Error al obtener tareas del técnico:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      res.json({ success: true, tareas: results });
    }
  );
});

// Actualizar el estado de una tarea (técnico)
// PUT /api/tareas/:id
// Recibe: { estado }
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  if (!estado) {
    return res.status(400).json({ success: false, message: 'Falta el estado' });
  }
  db.query(
    'UPDATE tareas SET estado = ? WHERE id = ?',
    [estado, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar estado:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      res.json({ success: true });
    }
  );
});

module.exports = router;
