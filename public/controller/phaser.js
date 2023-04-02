// Connect to the server using Socket.IO
const socket = io();

// Create a new Phaser game
const game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', {
  preload: preload,
  create: create,
  update: update
});

// Load assets
function preload() {
  game.load.image('dinosaur', 'assets/dinosaur.png');
}

// Create game objects
let player;
let otherPlayers = {};

function create() {
  // Create the player sprite
  player = game.add.sprite(game.world.centerX, game.world.centerY, 'dinosaur');
  player.anchor.set(0.5);

  // Enable physics for the player sprite
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  // Listen for playerMoved events from the server
  socket.on('playerMoved', (data) => {
    if (otherPlayers[data.playerId]) {
      otherPlayers[data.playerId].x = data.x;
      otherPlayers[data.playerId].y = data.y;
    }
  });

  // Listen for newPlayer events from the server
  socket.on('newPlayer', (data) => {
    otherPlayers[data.playerId] = game.add.sprite(game.world.randomX, game.world.randomY, 'dinosaur');
    otherPlayers[data.playerId].anchor.set(0.5);
  });

  // Listen for playerDisconnected events from the server
  socket.on('playerDisconnected', (data) => {
    otherPlayers[data.playerId].destroy();
    delete otherPlayers[data.playerId];
  });
}

// Update game objects
function update() {
  // Send player movement events to the server
  const movementData = { x: player.x, y: player.y };
  socket.emit('playerMovement', movementData);
  
  // Move the player sprite
  const cursors = game.input.keyboard.createCursorKeys();
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  if (cursors.left.isDown) {
    player.body.velocity.x = -200;
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 200;
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -200;
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 200;
  }

  // Update other player sprites
  for (let playerId in otherPlayers) {
    if (otherPlayers.hasOwnProperty(playerId)) {
      game.physics.arcade.collide(player, otherPlayers[playerId]);
      game.physics.arcade.moveToObject(otherPlayers[playerId], player, 100);
    }
  }
}
