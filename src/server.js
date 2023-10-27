const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Usuarios predefinidos 
const users = [
    { id: 1, username: 'Admin', password: '@13nadhaQs_wd' },
    { id: 2, username: 'usuariodefecto', password: 'wqhoh13+}-@' },
  ];
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Buscar el usuario en la lista de usuarios
    const user = users.find((i) => i.username === username && i.password === password);
  
    if (!user) {
      return res.status(404).json({ message: 'Credenciales incorrectas' });
    }
  
    // Crear un token JWT con el secreto
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  
    res.json({ token });
  });

  app.get('/ruta protegida', (req, res) => {
    const token = req.header('autorizado');
  
    if (!token) {
      return res.status(404).json({ message: 'Token no proporcionado' });
    }
  
    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // sintaxis de verificacion decoded
      res.json({ message: 'Ruta protegida', user: decoded });
    } catch (error) {
      res.status(404).json({ message: 'Token inválido' });
    }
  });

const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`Servidor en funcionamiento en el puerto ${port}`);
});