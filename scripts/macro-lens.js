/**
 * ÉPHÉMÈRE INTERACTIVE MACRO LOUPE
 * High-precision inspection lens magnifying botanical cellular textures and dewdrops.
 * Follows Emil Kowalski spring lag physics.
 */

class MacroLens {
  constructor() {
    this.container = document.querySelector('.loupe-container');
    this.glass = document.querySelector('.macro-glass');
    this.img = document.querySelector('.loupe-image');

    if (!this.container || !this.glass || !this.img) return;

    this.zoom = 2.4;
    this.glassWidth = 170;
    this.glassHeight = 170;

    this.currentPos = { x: 0, y: 0 };
    this.targetPos = { x: 0, y: 0 };
    this.isActive = false;

    this.initGlass();
    this.bindEvents();
    this.renderLoop();
  }

  initGlass() {
    const src = this.img.currentSrc || this.img.src;
    this.glass.style.backgroundImage = `url('${src}')`;
  }

  bindEvents() {
    this.container.addEventListener('mouseenter', (e) => {
      this.isActive = true;
      this.glass.classList.add('active');
      this.updateTarget(e);
      this.currentPos.x = this.targetPos.x;
      this.currentPos.y = this.targetPos.y;
    });

    this.container.addEventListener('mousemove', (e) => {
      this.updateTarget(e);
    });

    this.container.addEventListener('mouseleave', () => {
      this.isActive = false;
      this.glass.classList.remove('active');
    });

    window.addEventListener('resize', () => {
      this.initGlass();
    });
  }

  updateTarget(e) {
    const rect = this.container.getBoundingClientRect();
    this.targetPos.x = e.clientX - rect.left;
    this.targetPos.y = e.clientY - rect.top;
  }

  renderLoop() {
    if (this.isActive) {
      // Emil Kowalski spring easing: lerp toward target
      this.currentPos.x += (this.targetPos.x - this.currentPos.x) * 0.22;
      this.currentPos.y += (this.targetPos.y - this.currentPos.y) * 0.22;

      const rect = this.container.getBoundingClientRect();
      const bgWidth = rect.width * this.zoom;
      const bgHeight = rect.height * this.zoom;

      const bgX = (this.currentPos.x * this.zoom) - (this.glassWidth / 2);
      const bgY = (this.currentPos.y * this.zoom) - (this.glassHeight / 2);

      this.glass.style.left = `${this.currentPos.x}px`;
      this.glass.style.top = `${this.currentPos.y}px`;
      this.glass.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
      this.glass.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.macroLens = new MacroLens();
});
