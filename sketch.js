let ship;
let bullets = [];
let aliens = [];

function preload() {
  // Load your ship and alien images here
  ship = loadImage("ressources/spaceship.png");
}

function setup() {
  createCanvas(400, 400);
  ship = new Ship();
  
  // Create aliens
  for (let i = 0; i < 5; i++) {
    aliens.push(new Alien(i * 80 + 40, 50));
  }
}

function draw() {
  background(0);
  
  ship.update();
  ship.display();
  // Update and display aliens
  for (let alien of aliens) {
    alien.update();
    alien.display();
  }
  
  // Update and display bullets
  for (let bullet of bullets) {
    bullet.update();
    bullet.display();
    
    // Check for bullet-alien collisions
    for (let alien of aliens) {
      if (bullet.hits(alien)) {
        bullet.toDelete = true;
        alien.toDelete = true;
      }
    }
  }
  
  // Remove bullets that are offscreen
  bullets = bullets.filter(bullet => !bullet.toDelete);
  
  // Remove aliens that are hit
  aliens = aliens.filter(alien => !alien.toDelete);
}

function keyPressed() {
  if (keyCode === 32) {
    bullets.push(new Bullet(ship.x, height - 20));
  }
}

class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 20;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - 30);
  }
  
  display() {
    image(ship, this.x, this.y, 30, 20);
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;
  }
  
  update() {
    this.y -= 5;
    if (this.y < 0) {
      this.toDelete = true;
    }
  }
  
  display() {
    fill(255);
    ellipse(this.x + 15, this.y, 6, 12);
  }
  
  hits(alien) {
    let d = dist(this.x + 15, this.y, alien.x, alien.y);
    return d < 25;
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.toDelete = false;
  }
  
  update() {
    // Add alien movement logic here
  }
  
  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, 20, 20);
  }
}
