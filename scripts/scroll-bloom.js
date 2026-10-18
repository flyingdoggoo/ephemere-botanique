/**
 * ÉPHÉMÈRE SCROLL-BLOOM KINETIC ENGINE ("L'ÉPANOUISSEMENT")
 * Links user vertical scroll progress directly to a multi-layered botanical blooming animation.
 * As the user scrolls through the pinned section, petals unfold parametrically,
 * sepals peel back, golden stamens radiate, and pollen sparkles disperse.
 */

class ScrollBloomEngine {
  constructor() {
    this.stage = document.getElementById('bloom-stage') || document.getElementById('scroll-bloom-section');
    this.stickyContainer = document.getElementById('bloom-sticky-viewport');
    this.svgContainer = document.getElementById('bloom-flower-svg');
    this.percentEl = document.getElementById('bloom-progress-percent');
    this.stageLabelEl = document.getElementById('bloom-current-stage');
    this.pollenCanvas = document.getElementById('bloom-pollen-canvas');

    if (!this.stage || !this.svgContainer) return;

    this.petals = [];
    this.pollenParticles = [];
    this.currentProgress = 0;
    this.targetProgress = 0;

    this.stages = [
      { threshold: 0.0, name: 'PHASE I // LE BOUTON DORMANT', desc: 'The dormant calyx wrapped in cold winter dew' },
      { threshold: 0.28, name: 'PHASE II // L’ÉVEIL DU SÉPALE', desc: 'Outer protective sepals peel downward revealing crimson corolla' },
      { threshold: 0.60, name: 'PHASE III // DÉPLOIEMENT DE LA COROLLE', desc: 'Eighteen velvety petals unfurl along the golden ratio' },
      { threshold: 0.88, name: 'PHASE IV // PLEINE FLORAISON & POLLEN', desc: 'Full senescent bloom radiates golden saffron aura' }
    ];

    this.initPetalsSVG();
    this.initPollenCanvas();
    this.bindEvents();
    this.renderLoop();
  }

  initPetalsSVG() {
    this.svgContainer.innerHTML = '';
    const totalPetals = 20;
    const goldenAngle = 137.508; // Fibonacci Phyllotaxis angle

    // Defs for luxury gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="petalGradOuter" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#3A0D15" />
        <stop offset="50%" stop-color="#6B1C2A" />
        <stop offset="100%" stop-color="#9E2E42" />
      </linearGradient>
      <linearGradient id="petalGradInner" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#801F31" />
        <stop offset="60%" stop-color="#BD3A52" />
        <stop offset="100%" stop-color="#EAA6B4" />
      </linearGradient>
      <radialGradient id="stamenGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FFF2D6" />
        <stop offset="40%" stop-color="#F2BA52" />
        <stop offset="80%" stop-color="#C2801D" />
        <stop offset="100%" stop-color="#613B06" />
      </radialGradient>
      <filter id="bloomGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    `;
    this.svgContainer.appendChild(defs);

    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('transform', 'translate(250, 250)');
    this.svgContainer.appendChild(group);

    this.petals = [];

    // Layer 1: Outer Calyx Sepals (Lichen / Deep Crimson)
    for (let i = 0; i < 5; i++) {
      const sepal = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const baseAngle = (i * 72);
      sepal.setAttribute('d', 'M 0 0 C -22 -40 -26 -110 0 -145 C 26 -110 22 -40 0 0 Z');
      sepal.setAttribute('fill', '#263024');
      sepal.setAttribute('stroke', '#41523E');
      sepal.setAttribute('stroke-width', '1');
      sepal.setAttribute('opacity', '0.9');
      group.appendChild(sepal);

      this.petals.push({
        el: sepal,
        type: 'sepal',
        baseAngle: baseAngle,
        layer: 0,
        unfoldStart: 0.1,
        unfoldEnd: 0.45,
        maxScale: 1.15,
        maxRotationSpread: 45
      });
    }

    // Layer 2: Main Corolla Petals (Fibonacci spiral)
    for (let i = 0; i < totalPetals; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const baseAngle = (i * goldenAngle) % 360;
      const isInner = i > 12;

      // Realistic petal contour
      path.setAttribute('d', 'M 0 0 C -38 -45 -48 -135 0 -175 C 48 -135 38 -45 0 0 Z');
      path.setAttribute('fill', isInner ? 'url(#petalGradInner)' : 'url(#petalGradOuter)');
      path.setAttribute('stroke', 'rgba(255, 220, 225, 0.25)');
      path.setAttribute('stroke-width', '0.75');
      path.setAttribute('filter', 'url(#bloomGlow)');
      group.appendChild(path);

      this.petals.push({
        el: path,
        type: 'corolla',
        baseAngle: baseAngle,
        layer: isInner ? 2 : 1,
        unfoldStart: 0.2 + (i / totalPetals) * 0.45,
        unfoldEnd: 0.55 + (i / totalPetals) * 0.40,
        maxScale: isInner ? 0.85 : 1.35,
        distFromCenter: isInner ? 12 : 24
      });
    }

    // Layer 3: Central Stamen & Pistils Core
    this.coreStamenGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.coreStamenGroup.setAttribute('id', 'flower-stamen-core');

    // 16 golden stamen needles
    for (let s = 0; s < 18; s++) {
      const angle = (s * (360 / 18)) * (Math.PI / 180);
      const needle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      needle.setAttribute('x1', '0');
      needle.setAttribute('y1', '0');
      needle.setAttribute('x2', Math.sin(angle) * 35);
      needle.setAttribute('y2', -Math.cos(angle) * 35);
      needle.setAttribute('stroke', '#E8AF55');
      needle.setAttribute('stroke-width', '1.5');
      needle.setAttribute('stroke-linecap', 'round');
      this.coreStamenGroup.appendChild(needle);

      // Gold tip
      const tip = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      tip.setAttribute('cx', Math.sin(angle) * 38);
      tip.setAttribute('cy', -Math.cos(angle) * 38);
      tip.setAttribute('r', '2.5');
      tip.setAttribute('fill', '#FFF2D6');
      this.coreStamenGroup.appendChild(tip);
    }

    // Center jewel
    const corePistil = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    corePistil.setAttribute('cx', '0');
    corePistil.setAttribute('cy', '0');
    corePistil.setAttribute('r', '16');
    corePistil.setAttribute('fill', 'url(#stamenGlow)');
    this.coreStamenGroup.appendChild(corePistil);

    group.appendChild(this.coreStamenGroup);
  }

  initPollenCanvas() {
    if (!this.pollenCanvas) return;
    this.pollenCtx = this.pollenCanvas.getContext('2d');
    this.pollenWidth = this.pollenCanvas.width = this.pollenCanvas.offsetWidth || 500;
    this.pollenHeight = this.pollenCanvas.height = this.pollenCanvas.offsetHeight || 500;

    this.pollenParticles = [];
    for (let i = 0; i < 40; i++) {
      this.pollenParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: 10 + Math.random() * 20,
        maxDist: 70 + Math.random() * 160,
        size: 1 + Math.random() * 2.5,
        speed: 0.02 + Math.random() * 0.04,
        alpha: 0
      });
    }
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.calculateProgress();
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.initPollenCanvas();
      this.calculateProgress();
    });
  }

  calculateProgress() {
    const rect = this.stage.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollable = rect.height - windowH;

    if (totalScrollable <= 0) return;

    // How far the top of the stage has passed the top of the viewport
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
    this.targetProgress = p;
  }

  updateStageUI(progress) {
    if (this.percentEl) {
      this.percentEl.textContent = `${Math.round(progress * 100)}%`;
    }

    let activeStage = this.stages[0];
    for (let s of this.stages) {
      if (progress >= s.threshold) activeStage = s;
    }

    if (this.stageLabelEl && this.stageLabelEl.textContent !== activeStage.name) {
      this.stageLabelEl.textContent = activeStage.name;
      const descEl = document.getElementById('bloom-stage-desc');
      if (descEl) descEl.textContent = activeStage.desc;
    }
  }

  renderLoop() {
    // Smooth dampening for silky scroll feel
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.12;
    const p = this.currentProgress;

    this.updateStageUI(p);

    // 1. Animate Petals
    this.petals.forEach(petal => {
      const { el, type, baseAngle, unfoldStart, unfoldEnd, maxScale, layer } = petal;

      // Local progress for this petal layer
      const localP = Math.max(0, Math.min(1, (p - unfoldStart) / (unfoldEnd - unfoldStart)));
      // Spring cubic ease-out
      const ease = 1 - Math.pow(1 - localP, 3);

      if (type === 'sepal') {
        // Sepals peel outward & down
        const peelAngle = baseAngle;
        const curScale = 0.35 + ease * 0.7;
        const rotateSpread = (1 - ease) * 10;
        const translateY = ease * 35;
        el.setAttribute('transform', `rotate(${peelAngle + rotateSpread}) translate(0, ${translateY}) scale(${curScale})`);
        el.setAttribute('opacity', `${0.9 - ease * 0.4}`);
      } else {
        // Corolla petals unfurl from tight bud to magnificent bloom
        const curScale = 0.22 + ease * (maxScale - 0.22);
        const curAngle = baseAngle + (1 - ease) * (layer === 1 ? -40 : 35);
        const spreadOffset = ease * (petal.distFromCenter || 20);

        el.setAttribute('transform', `rotate(${curAngle}) translate(0, ${-spreadOffset}) scale(${curScale})`);
        el.setAttribute('opacity', `${0.4 + ease * 0.6}`);
      }
    });

    // 2. Animate Stamen Core
    if (this.coreStamenGroup) {
      const coreScale = 0.15 + Math.pow(p, 2) * 1.05;
      const coreOpacity = Math.max(0, (p - 0.35) / 0.65);
      this.coreStamenGroup.setAttribute('transform', `scale(${coreScale})`);
      this.coreStamenGroup.setAttribute('opacity', `${coreOpacity}`);
    }

    // 3. Animate Radiating Pollen
    if (this.pollenCtx && p > 0.45) {
      this.pollenCtx.clearRect(0, 0, this.pollenWidth, this.pollenHeight);
      const pollenAlphaMult = (p - 0.45) / 0.55;
      const cx = this.pollenWidth / 2;
      const cy = this.pollenHeight / 2;

      this.pollenParticles.forEach(pt => {
        const curDist = pt.dist + (pt.maxDist - pt.dist) * p;
        const x = cx + Math.cos(pt.angle) * curDist;
        const y = cy + Math.sin(pt.angle) * curDist;

        this.pollenCtx.fillStyle = `rgba(245, 199, 126, ${pollenAlphaMult * 0.8})`;
        this.pollenCtx.beginPath();
        this.pollenCtx.arc(x, y, pt.size * (0.8 + p * 0.5), 0, Math.PI * 2);
        this.pollenCtx.fill();
      });
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollBloomEngine = new ScrollBloomEngine();
});
