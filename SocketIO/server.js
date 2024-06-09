// Importer les modules nécessaires
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import path from 'path';
import { SensorSimulator } from './SensorSimulator.js';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const io = new SocketServer(server);

// Définir __dirname manuellement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.send("Welcome to the monitoring application!");
});

app.get("/monitoring-client", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "monitoring-client.html"));
});

app.get('/tata', (req, res) => {
  res.json({ message: 'tata' });
});

// Créer une instance de SensorSimulator et démarrer la simulation
const sensor = new SensorSimulator();
sensor.start();

// Gérer les événements émis par SensorSimulator
sensor.on('data', (data) => {
  io.emit('data', data);
});

sensor.on('alert', (alert) => {
  io.emit('alert', alert);
});

// Configurer les événements de connexion Socket.IO
io.on('connection', (socket) => {
  console.log("Un utilisateur s'est connecté");

  socket.on('message', (msg) => {
    console.log('Message reçu : ' + msg);
    io.emit('message', msg);
  });

  setInterval(() => {
    socket.emit('message', 'Message automatique');
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
