//crear y importar
const express = require("express");
const listEditRouter = express.Router();

listEditRouter.use(validateTask);

// Middleware para validar los datos de la tarea en las solicitudes POST y PUT
function validateTask(req, res, next) {
  // Para las solicitudes POST
  if (req.method === "POST") {
    if (!req.body || !req.body.indicador || !req.body.descripcion) {
      // Si el cuerpo está vacío o falta información, devuelve un error 400
      return res.status(400).json({ error: "Datos de tarea no válidos" });
    }
  }

  // Para las solicitudes PUT
  if (req.method === "PUT") {
    if (!req.body || (!req.body.indicador && !req.body.descripcion)) {
      // Si el cuerpo está vacío o la información no es válida, devuelve un error 400
      return res.status(400).json({ error: "Datos de tarea no válidos" });
    }
  }

  // Si los datos son válidos, continúa con el siguiente middleware (o la ruta)
  next();
}

// Continuar con la definición de rutas a continuación...

listEditRouter.post("/crear", (req, res) => {
  const { indicador, descripcion, completada } = req.body;
  if (!indicador || !descripcion) {
    return res
      .status(400)
      .json({ error: "El indicador y la descripción son obligatorios" });
  }

  const nuevaTarea = {
    indicador,
    descripcion,
    completada: completada || false,
  };

  tasks.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Ruta para eliminar una tarea por su indicador (DELETE)
listEditRouter.delete("/eliminar/:indicador", (req, res) => {
  const indicador = req.params.indicador;
  const tareaIndex = tasks.findIndex((tarea) => tarea.indicador === indicador);

  if (tareaIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks.splice(tareaIndex, 1);
  res.status(204).send();
});

// Ruta para actualizar una tarea por su indicador (PUT)
listEditRouter.put("/actualizar/:indicador", (req, res) => {
  const indicador = req.params.indicador;
  const { descripcion, completada } = req.body;

  if (!descripcion && completada === undefined) {
    return res
      .status(400)
      .json({
        error: "Se debe proporcionar al menos una propiedad para actualizar",
      });
  }

  const tarea = tasks.find((t) => t.indicador === indicador);

  if (!tarea) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  if (descripcion) {
    tarea.descripcion = descripcion;
  }

  if (completada !== undefined) {
    tarea.completada = completada;
  }

  res.json(tarea);
});

module.exports = listEditRouter;
