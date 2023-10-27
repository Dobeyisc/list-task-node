const express = require('express');
const app = express();

// Importa el enrutador de list-view
const listViewRouter = require('./list-view-router');
//importar el enrutador de edit-router
const listEditRouter = require('./list-edit-router');

//sintaxis de readline

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

app.use((req, res, next) => {
  const metodosValidos = ['GET', 'POST', 'PUT', 'DELETE']; 

  if (!metodosValidos.includes(req.method)) {
    return res.status(404).send('Método HTTP no permitido');
  }

  next(); // Continúa con la siguiente función middleware 
});

// Definir una lista para almacenar las tareas
const tareas = [];

// Función de agregar una tarea a la lista
function agregarTarea(indicador, descripcion, completada = false) {
  const tarea = { Indicador: indicador, Descripción: descripcion, Completada: completada };
  tareas.push(tarea);
  console.log("Tarea agregada con éxito.");
}

// Función de mostrar todas las tareas
function mostrarTareas() {
  if (tareas.length === 0) {
    console.log("No hay tareas registradas.");
  } else {
    const tableData = tareas.map((tarea, index) => ({
      Tarea: `Tarea ${index + 1}`,
      Indicador: tarea.Indicador,
      Descripción: tarea.Descripción,
      Estado: tarea.Completada ? 'Completada' : 'Pendiente',
    }));

    console.table(tableData);
  }
}

// Función de eliminar una tarea por indicador
function eliminarTarea(indicador) {
  const index = tareas.findIndex(tarea => tarea.Indicador === indicador);
  if (index !== -1) {
    tareas.splice(index, 1);
    console.log("Tarea eliminada con éxito.");
  } else {
    console.log("No se encontró una tarea con ese indicador.");
  }
}

// Función de marcar una tarea como completada
function completarTarea(indicador) {
  const tarea = tareas.find(t => t.Indicador === indicador);
  if (tarea) {
    tarea.Completada = true;
    console.log("Tarea marcada como completada.");
  } else {
    console.log("No se encontró una tarea con ese indicador.");
  }
}

//sintaxis rl y switch
function main() {
  rl.question("Bienvenido al Gestor de Tareas. Seleccione una opción:\n1. Agregar Tarea\n2. Mostrar Tareas\n3. Eliminar Tarea\n4. Completar Tarea\n5. Salir\nOpción: ", (opcion) => {
    switch (opcion) {
      case "1":
        rl.question("Ingrese el indicador de la tarea: ", (indicador) => {
          rl.question("Ingrese la descripción de la tarea: ", (descripcion) => {
            agregarTarea(indicador, descripcion);
            main();
          });
        });
        break;
      case "2":
        mostrarTareas();
        main();
        break;
      case "3":
        rl.question("Ingrese el indicador de la tarea a eliminar: ", (indicador) => {
          eliminarTarea(indicador);
          main();
        });
        break;
      case "4":
        rl.question("Ingrese el indicador de la tarea a marcar como completada: ", (indicador) => {
          completarTarea(indicador);
          main();
        });
        break;
      case "5":
        rl.close();
        break;
      default:
        console.log("Opción no válida. Por favor, seleccione una opción válida.");
        main();
    }
  });
}

// Iniciar el programa
main();