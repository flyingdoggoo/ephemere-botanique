/**
 * ÉPHÉMÈRE AMBIENT PETAL PHYSICS
 * Lightweight, organic Canvas particle simulation.
 * Petals drift at a STRICTLY CONSTANT, serene speed (zero acceleration over time).
 * Uses delta-time normalization (identical speed across 60Hz, 120Hz, and 144Hz displays).
 * Strictly prevents duplicate RAF loop stacking.
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
    this.petalCount = window.innerWidth < 768 ? 14 : 24;

    this.mouse = { x: -1000, y: -1000 };
    this.rafId = null;
    this.lastTimestamp = 0;
    this.isRunning = false;

    this.colors = [
      'rgba(138, 42, 60, 0.40)',   /* Peony crimson */
      'rgba(92, 26, 38, 0.30)',    /* Deep velvet */
      'rgba(232, 204, 210, 0.50)',  /* Rose blush */
      'rgba(212, 154, 61, 0.25)',  /* Saffron pollen gold */
      'rgba(244, 239, 235, 0.55)'   /* Chalk cream */
    ];

    this.resize();
    this.initPetals();
    this.bindEvents();
    this.start();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  initPetals() {
    this.petals = [];
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 9 + Math.random() * 12,
        // STRICT CONSTANT VELOCITY (never accelerates or grows with time)
        speedY: 0.22 + Math.random() * 0.18, // Constant vertical rate (~0.3px per 60Hz frame)
        speedX: -0.10 + Math.random() * 0.20, // Constant horizontal drift
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005, // Constant gentle tumble
        oscillationPhase: Math.random() * Math.PI * 2,
        oscillationSpeed: 0.01 + Math.random() * 0.01,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
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

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame((ts) => this.tick(ts));
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  tick(timestamp) {
    if (!this.isRunning) return;

    // Delta time normalization (capped at 50ms to prevent jumps after background tab return)
    const elapsed = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    const timeScale = Math.min(Math.max(elapsed / 16.667, 0.5), 3.0);

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let p of this.petals) {
      // 1. Strictly constant linear vertical motion scaled by time
      p.y += p.speedY * timeScale;

      // 2. Controlled bounded sinusoidal sway (bounded between -0.3px and +0.3px)
      p.oscillationPhase = (p.oscillationPhase + p.oscillationSpeed * timeScale) % (Math.PI * 2);
      p.x += (p.speedX + Math.sin(p.oscillationPhase) * 0.3) * timeScale;

      // 3. Constant linear rotation
      p.angle = (p.angle + p.rotationSpeed * timeScale) % (Math.PI * 2);

      // 4. Soft mouse deflection (spring return)
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 100 && dist > 0) {
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 1.2 * timeScale;
        p.y += (dy / dist) * force * 1.2 * timeScale;
      }

      // 5. Seamless boundary wrap without speed mutation
      if (p.y > this.height + 25) {
        p.y = -25;
        p.x = Math.random() * this.width;
      }
      if (p.x < -25) p.x = this.width + 25;
      if (p.x > this.width + 25) p.x = -25;

      this.drawPetal(p);
    }

    this.rafId = requestAnimationFrame((ts) => this.tick(ts));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.petalSimulation) {
    window.petalSimulation = new PetalPhysics();
  }
});
