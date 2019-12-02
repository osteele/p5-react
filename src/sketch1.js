import {
    p5
} from './Sketch'

let particles = Array(20).fill().map(makeParticle);

// A particle is an array [x, y, dx, dy]
function makeParticle() {
    return [Math.random() - 0.5, Math.random() - 0.5, 0, 0];
}

function moveParticle([x, y, dx, dy]) {
    const b = 0.99;
    dx *= b;
    dy *= b;
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

function repel(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const f = -0.001;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    if (d < 10) {
        const ddx = (x2 - x1) * f;
        const ddy = (y2 - y1) * f;
        p1[2] += ddx;
        p1[3] += ddy;
        p2[2] -= ddx;
        p2[3] -= ddy;

    }
}

function bounceParticles() {
    const particlesAndMouse = [
        [p5.mouseX, p5.mouseY, 0, 0], ...particles
    ];
    particlesAndMouse.forEach(p1 =>
        particlesAndMouse.forEach(p2 =>
            p1 !== p2 && repel(p1, p2)))
}


export function draw() {
    p5.background(40);
    particles.forEach(bounceParticles);
    particles = particles.map(moveParticle);
    particles.forEach(drawParticle);
}
