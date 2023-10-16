//importar y crear un enrutador 
const express = require('express');
const listViewRouter = express.Router();

listViewRouter.use(validarParametros);

// Middleware para validar los parámetros
function validarParametros(req, res, next) {
  // Verifica los parámetros que deseas validar, 
  const { completas } = req.query;

  // Validación de parámetros 
  if (completas && completas !== 'true' && completas !== 'false') {
    return res.status(400).json({ error: 'El parámetro "completas" debe ser "true" o "false".' });
  }

  // Si los parámetros son válidos, continúa con el siguiente middleware
  next();
}



listViewRouter.get('/completas', (req, res) => {
  const tareasCompletas = tasks.filter(tarea => tarea.completada);
  res.json(tareasCompletas);
});

// Ruta para listar tareas incompletas (GET)
listViewRouter.get('/incompletas', (req, res) => {
  const tareasIncompletas = tasks.filter(tarea => !tarea.completada);
  res.json(tareasIncompletas);
});

module.exports = listViewRouter;