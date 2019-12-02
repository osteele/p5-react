import {
    p5
} from './Sketch'

let particles = Array(100).fill().map(makeParticle);

// A particle is an array [x, y, dx, dy]
function makeParticle() {
    return [0, 0, Math.random() - 0.5, Math.random() - 0.5];
}

function moveParticle([x, y, dx, dy]) {
    x += dx;
    y += dy;
    x = (x + p5.width) % p5.width;
    y = (y + p5.height) % p5.height;
    return [x, y, dx, dy];
}

function drawParticle([x, y]) {
    p5.fill('white')
    p5.circle(x, y, 5, 5);
}


export function setup() {
    p5.background(40);
}

export function draw() {
    particles = particles.map(moveParticle);
    particles.forEach(drawParticle);
}
