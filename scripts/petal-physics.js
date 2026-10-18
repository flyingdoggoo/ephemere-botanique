/**
 * ÉPHÉMÈRE AMBIENT PETAL PHYSICS
 * Lightweight, organic Canvas particle simulation.
 * Petals drift on a sinusoidal breeze and gently part as the mouse moves.
 * Strictly respects prefers-reduced-motion.
 */

class PetalPhysics {
  constructor() {
    this.canvas = document.getElementById('petal-canvas');
    if (!this.canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.canvas.style.display = 'none';
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.petalCount = window.innerWidth < 768 ? 14 : 26;

    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    this.lastMouse = { x: -1000, y: -1000 };

    this.colors = [
      'rgba(138, 42, 60, 0.45)',  /* Peony crimson */
      'rgba(92, 26, 38, 0.35)',   /* Deep velvet */
      'rgba(232, 204, 210, 0.55)', /* Rose blush */
      'rgba(212, 154, 61, 0.30)', /* Saffron pollen gold */
      'rgba(244, 239, 235, 0.60)'  /* Chalk cream */
    ];

    this.resize();
    this.initPetals();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.vx = e.clientX - this.lastMouse.x;
      this.mouse.vy = e.clientY - this.lastMouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.lastMouse.x = e.clientX;
      this.lastMouse.y = e.clientY;
    });
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 8 + Math.random() * 14,
        speedY: 0.15 + Math.random() * 0.25, // Gentle, weightless downward drift
        speedX: -0.15 + Math.random() * 0.30, // Soft horizontal breeze
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.006, // Slow organic tumbling
        oscillationSpeed: 0.008 + Math.random() * 0.012,
        oscillationDistance: 15 + Math.random() * 20,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        seed: Math.random() * 100
      });
    }
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);

    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    // Organic curved petal silhouette
    this.ctx.moveTo(0, -p.size);
    this.ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
    this.ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.petals) {
      // Natural gentle sway
      p.seed += p.oscillationSpeed;
      p.x += p.speedX + Math.sin(p.seed) * 0.35;
      p.y += p.speedY;
      p.angle += p.rotationSpeed;

      // Soft mouse deflection
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120 && dist > 0) {
        const force = (120 - dist) / 120;
        p.x += (dx / dist) * force * 1.5;
        p.y += (dy / dist) * force * 1.5;
      }

      // Recycle petals at screen boundaries
      if (p.y > this.height + 30) {
        p.y = -30;
        p.x = Math.random() * this.width;
      }
      if (p.x < -30) p.x = this.width + 30;
      if (p.x > this.width + 30) p.x = -30;

      this.drawPetal(p);
    }

    if (!document.hidden) {
      requestAnimationFrame(() => this.animate());
    }
  }
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.petalSimulation) {
    window.petalSimulation.animate();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  window.petalSimulation = new PetalPhysics();
});
