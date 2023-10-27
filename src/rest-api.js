app.post('/tasks', (req, res) => {
  const { Indicador, Descripción, Completada } = req.body;
  if (!Indicador || !Descripción) {
    return res.status(400).json({ error: 'Indicador y Descripción son campos obligatorios' });
  }

  const tarea = { Indicador, Descripción, Completada: Completada || false };
  tareas.push(tarea);
  return res.status(201).json(tarea);
});

// Listar todas las tareas
app.get('/tasks', (req, res) => {
  return res.json(tareas);
});

// Obtener una sola tarea por su Indicador
app.get('/tasks/:Indicador', (req, res) => {
  const indicador = req.params.Indicador;
  const tarea = tareas.find(t => t.Indicador === indicador);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  return res.json(tarea);
});

// Actualizar una tarea por su Indicador
app.put('/tasks/:Indicador', (req, res) => {
  const indicador = req.params.Indicador;
  const tarea = tareas.find(t => t.Indicador === indicador);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const { Descripción, Completada } = req.body;
  if (Descripción !== undefined) {
    tarea.Descripción = Descripción;
  }
  if (Completada !== undefined) {
    tarea.Completada = Completada;
  }

  return res.json(tarea);
});

// Eliminar una tarea por su Indicador
app.delete('/tasks/:Indicador', (req, res) => {
  const indicador = req.params.Indicador;
  const index = tareas.findIndex(t => t.Indicador === indicador);
  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  tareas.splice(index, 1);
  return res.sendStatus(204);
});

// Listar las tareas completadas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tareas.filter(t => t.Completada);
  return res.json(completedTasks);
});

// Listar las tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tareas.filter(t => !t.Completada);
  return res.json(incompleteTasks);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});