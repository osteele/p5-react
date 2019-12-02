import { p } from './Sketch'

let particles = Array(100).fill().map(makeParticle);

// A particle is an array [x, y, dx, dy]
function makeParticle() {
    return [0, 0, Math.random() - 0.5, Math.random() - 0.5];
}

function moveParticle([x, y, dx, dy]) {
    x += dx;
    y += dy;
    x = (x + p.width) % p.width;
    y = (y + p.height) % p.height;
    return [x, y, dx, dy];
}

function drawParticle([x, y]) {
    p.fill('white')
    p.circle(x, y, 10, 10);
}

export function setup() {
    p.background(40);
}

export function draw() {
    particles = particles.map(moveParticle);
    particles.forEach(drawParticle);
}

export function mouseClicked() {
    particles.shift();
    particles.push([p.mouseX, p.mouseY, p.random(-1, 1), p.random(-1, 1)]);
}
