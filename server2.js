const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Listen for new socket connections
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  // Emit a message to all connected sockets when a new player joins
  socket.broadcast.emit('newPlayer', { playerId: socket.id });

  // Listen for player movement events from the client
  socket.on('playerMovement', (movementData) => {
    console.log(`Player ${socket.id} moved: ${movementData.x}, ${movementData.y}`);
    // Broadcast the movement to all connected sockets except the sender
    socket.broadcast.emit('playerMoved', { playerId: socket.id, x: movementData.x, y: movementData.y });
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
    // Emit a message to all connected sockets when a player leaves
    socket.broadcast.emit('playerDisconnected', { playerId: socket.id });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
