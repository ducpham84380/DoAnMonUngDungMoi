module.exports = function(app){
    app.get("/", function(req, res){
        res.render("game", {content:"./index.ejs"});
    });
}
// Set up the Three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

// Add a light to the scene
var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 20, 20);
scene.add(light);

// Add a ground plane to the scene
var groundTexture = new THREE.TextureLoader().load("../public/img/bg.jpg");
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);
var groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
var groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Load the dinosaur model
var loader = new THREE.ObjectLoader();
loader.load(
  'trex.json',
  function (dinosaur) {
    dinosaur.scale.set(0.1, 0.1, 0.1);
    dinosaur.position.set(0, 1, 0);
    scene.add(dinosaur);
  }
);

// Set up the game state
var game = {
  score: 0,
  speed: 0.01,
  isJumping: false,
  jumpSpeed: 0.15,
  jumpHeight: 1,
  obstacles: []
};

// Handle keyboard input
var keys = {};
document.addEventListener('keydown', function (event) {
  keys[event.keyCode] = true;
});
document.addEventListener('keyup', function (event) {
  keys[event.keyCode] = false;
});

// Start the game loop
var lastTimestamp = 0;
function gameLoop(timestamp) {
  var deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Move the dinosaur
  if (!game.isJumping) {
    if (keys[32]) {
      game.isJumping = true;
    }
    else {
      var dinosaur = scene.getObjectByName('dinosaur');
      dinosaur.position.z -= game.speed * deltaTime;
    }
  }
  else {
    var dinosaur = scene.getObjectByName('dinosaur');
    dinosaur.position.y += game.jumpSpeed * deltaTime;
    game.jumpSpeed -= 0.001;
    if (dinosaur.position.y <= 1) {
      dinosaur.position.y = 1;
      game.jumpSpeed = 0.15;
      game.isJumping = false;
    }
  }

  // Spawn new obstacles
  if (Math.random() < game.speed * 0.1) {
    var obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
    var obstacleMaterial = new THREE.Mesh;
    var obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(Math.random() * 20 - 10, 0.5, 10);
    scene.add(obstacle);
    game.obstacles.push(obstacle);
  }

  // Move the obstacles
  for (var i = 0; i < game.obstacles.length; i++) {
    var obstacle = game.obstacles[i];
    obstacle.position.z -= game.speed * deltaTime;
    if (obstacle.position.z < -10) {
      scene.remove(obstacle);
      game.obstacles.splice(i, 1);
      i--;
    }
    else {
      // Check for collisions with the dinosaur
      var dinosaur = scene.getObjectByName('dinosaur');
      var distance = dinosaur.position.distanceTo(obstacle.position);
      if (distance < 1.5) {
        alert('Game over! Score: ' + game.score);
        window.location.reload();
      }
    }
  }

  // Update the score
  game.score += game.speed * deltaTime * 100;
  document.getElementById('score').textContent = 'Score: ' + Math.floor(game.score);

  // Increase the speed over time
  game.speed += 0.0001;

  // Render the scene
  renderer.render(scene, camera);

  // Call the game loop again on the next frame
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
