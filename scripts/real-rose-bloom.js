/**
 * ÉPHÉMÈRE // L'ÉPANOUISSEMENT: 305-FRAME REAL ROSE CINEMATIC BLOOM
 * Ultra-High-Performance Photographic Sequence on HTML5 Canvas.
 *
 * Performance optimizations:
 * - IntersectionObserver pauses 120 FPS RAF loop when bloom stage is off-screen
 * - Deferred background prefetching (does not compete with Hero assets)
 * - Canvas dirty-state caching: skips redraws when progress is static
 * - Sub-frame optical cross-dissolve with Emil Kowalski spring lerp physics
 */

(function () {
  'use strict';

  class RealRoseBloomEngine {
    constructor() {
      this.section = document.getElementById('bloom-stage');
      this.canvas = document.getElementById('bloom-rose-canvas');
      this.pollenCanvas = document.getElementById('bloom-pollen-canvas');
      this.stageDesc = document.getElementById('bloom-stage-desc');
      this.phaseLabel = document.getElementById('bloom-current-stage');
      this.progressBadge = document.getElementById('bloom-progress-percent');

      if (!this.section || !this.canvas) return;

      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.totalFrames = 305;
      this.images = new Array(this.totalFrames);
      this.loadedFlags = new Uint8Array(this.totalFrames);
      this.totalLoaded = 0;
      this.hasRenderedFirstFrame = false;

      this.targetProgress = 0;
      this.progress = 0;
      this.currentFrameFloat = 0;
      this.lastDrawnBaseIdx = -1;
      this.lastDrawnBlend = -1;

      this.isInView = false;
      this.isLoopRunning = false;
      this.hasInitiatedHydration = false;

      // Poetic Floral Movements
      this.phases = [
        {
          threshold: 0.0,
          label: 'PHASE I // LE CALICE DORMANT',
          desc: 'The dormant winter calyx wrapped in cold silence, cradling velvet petals in deep slumber.'
        },
        {
          threshold: 0.28,
          label: 'PHASE II // LE FRÉMISSEMENT DE LA SOIE',
          desc: 'The first breath of dawn. The sepals loosen, surrendering silk Damask layers to the morning light.'
        },
        {
          threshold: 0.60,
          label: 'PHASE III // LA SPIRALE DE VELOURS',
          desc: 'Petal by petal, the architectural spiral unfurls in deep crimson splendour.'
        },
        {
          threshold: 0.88,
          label: 'PHASE IV // L\'APOGÉE DE LA ROSE',
          desc: 'The zenith of botanical grace. Suspended forever at the razor-thin peak of perfection.'
        }
      ];

      this.initFirstFrame();
      this.initPollenCanvas();
      this.initObservers();
      this.bindScroll();
    }

    initFirstFrame() {
      // 1. Immediately load Frame 0 for instant visual presence
      this.loadSingleFrame(0).then(() => {
        if (!this.hasRenderedFirstFrame) {
          this.renderRoseFrame(0, 0, 0, true);
          this.hasRenderedFirstFrame = true;
        }
      });
    }

    initObservers() {
      if (!('IntersectionObserver' in window)) {
        this.isInView = true;
        this.initAllFrames();
        this.wakeLoop();
        return;
      }

      // Observer 1: Preload frames when user scrolls within 600px of section
      const preloadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasInitiatedHydration) {
            this.initAllFrames();
            preloadObserver.disconnect();
          }
        });
      }, {
        rootMargin: '600px 0px 600px 0px',
        threshold: 0
      });
      preloadObserver.observe(this.section);

      // Fallback: If user stays on hero, hydrate in background during idle after 2s
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          if (!this.hasInitiatedHydration) this.initAllFrames();
        }, { timeout: 3000 });
      } else {
        setTimeout(() => {
          if (!this.hasInitiatedHydration) this.initAllFrames();
        }, 2000);
      }

      // Observer 2: Active render loop only runs when section is visible
      const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isInView = entry.isIntersecting;
          if (this.isInView) {
            this.calculateProgress();
            this.wakeLoop();
          }
        });
      }, {
        rootMargin: '200px 0px 200px 0px',
        threshold: 0
      });
      visibilityObserver.observe(this.section);
    }

    initAllFrames() {
      if (this.hasInitiatedHydration) return;
      this.hasInitiatedHydration = true;

      // Phase 1: High-Priority Keyframes (stride of 4: 0, 4, 8, ... 304) -> 77 keyframes
      const keyframes = [];
      for (let i = 0; i < this.totalFrames; i += 4) {
        if (i !== 0) keyframes.push(i);
      }

      // Load keyframes with controlled concurrency (4 workers)
      this.loadBatch(keyframes, 4).then(() => {
        // Phase 2: Full In-Between Hydration (frames: 1, 2, 3, 5, 6...)
        const remaining = [];
        for (let i = 0; i < this.totalFrames; i++) {
          if (i % 4 !== 0) remaining.push(i);
        }
        this.loadBatch(remaining, 6);
      });
    }

    loadSingleFrame(index) {
      if (this.images[index]) return Promise.resolve(this.images[index]);

      const pad = String(index).padStart(3, '0');
      const img = new Image();
      img.src = `assets/rose_frames/frame_${pad}.webp`;

      return new Promise((resolve) => {
        img.onload = () => {
          this.images[index] = img;
          this.loadedFlags[index] = 1;
          this.totalLoaded++;
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    }

    async loadBatch(indices, concurrency) {
      let currentIdx = 0;
      const worker = async () => {
        while (currentIdx < indices.length) {
          const idx = indices[currentIdx++];
          await this.loadSingleFrame(idx);
        }
      };
      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);
    }

    getNearestLoadedFrame(targetIdx) {
      if (this.loadedFlags[targetIdx] === 1) {
        return this.images[targetIdx];
      }
      for (let d = 1; d < this.totalFrames; d++) {
        const left = targetIdx - d;
        const right = targetIdx + d;
        if (left >= 0 && this.loadedFlags[left] === 1) return this.images[left];
        if (right < this.totalFrames && this.loadedFlags[right] === 1) return this.images[right];
      }
      return null;
    }

    calculateProgress() {
      if (!this.section) return;
      const rect = this.section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;

      if (totalDistance <= 0) return;

      const scrolled = -rect.top;
      this.targetProgress = Math.max(0, Math.min(1, scrolled / totalDistance));
    }

    bindScroll() {
      let ticking = false;

      const onScroll = () => {
        if (!this.isInView) return;
        if (!ticking) {
          requestAnimationFrame(() => {
            this.calculateProgress();
            this.wakeLoop();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    renderRoseFrame(baseIdx, nextIdx, blend, forceRedraw = false) {
      if (!this.ctx || !this.canvas) return;

      // Skip identical frame redraws
      if (!forceRedraw && baseIdx === this.lastDrawnBaseIdx && Math.abs(blend - this.lastDrawnBlend) < 0.012) {
        return;
      }

      const w = this.canvas.width;
      const h = this.canvas.height;
      const baseImg = this.getNearestLoadedFrame(baseIdx);
      if (!baseImg) return;

      const nextImg = (nextIdx !== baseIdx) ? this.getNearestLoadedFrame(nextIdx) : null;

      // Draw primary base frame
      this.ctx.globalAlpha = 1.0;
      this.ctx.drawImage(baseImg, 0, 0, w, h);

      // Sub-frame optical crossfade
      if (nextImg && nextImg !== baseImg && blend > 0.01) {
        this.ctx.globalAlpha = blend;
        this.ctx.drawImage(nextImg, 0, 0, w, h);
        this.ctx.globalAlpha = 1.0;
      }

      this.lastDrawnBaseIdx = baseIdx;
      this.lastDrawnBlend = blend;
    }

    initPollenCanvas() {
      if (!this.pollenCanvas) return;
      this.pollenCtx = this.pollenCanvas.getContext('2d');
      this.particles = [];

      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.pollenCanvas.width,
          y: Math.random() * this.pollenCanvas.height,
          radius: 0.8 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -0.2 - Math.random() * 0.45,
          alpha: 0.15 + Math.random() * 0.45,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    renderPollen() {
      if (!this.pollenCtx || !this.pollenCanvas) return;
      const w = this.pollenCanvas.width;
      const h = this.pollenCanvas.height;

      const pollenIntensity = Math.pow(this.progress, 1.4);
      if (pollenIntensity < 0.04) {
        this.pollenCtx.clearRect(0, 0, w, h);
        return;
      }

      this.pollenCtx.clearRect(0, 0, w, h);
      this.pollenCtx.fillStyle = '#E6B05C';

      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.04;

        if (p.y < 0) {
          p.y = h + 8;
          p.x = w * 0.3 + Math.random() * (w * 0.4);
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        const currentAlpha = p.alpha * pollenIntensity * (0.6 + 0.4 * Math.sin(p.pulse));
        this.pollenCtx.save();
        this.pollenCtx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));
        this.pollenCtx.beginPath();
        this.pollenCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.pollenCtx.fill();
        this.pollenCtx.restore();
      });
    }

    updatePoeticHud() {
      let activePhase = this.phases[0];
      for (let i = this.phases.length - 1; i >= 0; i--) {
        if (this.progress >= this.phases[i].threshold) {
          activePhase = this.phases[i];
          break;
        }
      }

      if (this.phaseLabel && this.phaseLabel.textContent !== activePhase.label) {
        this.phaseLabel.textContent = activePhase.label;
      }
      if (this.stageDesc && this.stageDesc.textContent !== activePhase.desc) {
        this.stageDesc.textContent = activePhase.desc;
      }
      if (this.progressBadge) {
        let stateTitle = 'DORMANT';
        if (this.progress > 0.85) stateTitle = 'APOGÉE';
        else if (this.progress > 0.55) stateTitle = 'ÉPANOUIE';
        else if (this.progress > 0.25) stateTitle = 'ÉCLOSION';
        if (this.progressBadge.textContent !== stateTitle) {
          this.progressBadge.textContent = stateTitle;
        }
      }
    }

    wakeLoop() {
      if (this.isLoopRunning || !this.isInView) return;
      this.isLoopRunning = true;

      const tick = () => {
        if (!this.isInView) {
          this.isLoopRunning = false;
          return;
        }

        const deltaProgress = this.targetProgress - this.progress;
        this.progress += deltaProgress * 0.16;

        const targetFrameFloat = this.progress * (this.totalFrames - 1);
        const deltaFrame = targetFrameFloat - this.currentFrameFloat;
        this.currentFrameFloat += deltaFrame * 0.18;

        const baseIdx = Math.floor(this.currentFrameFloat);
        const nextIdx = Math.min(this.totalFrames - 1, baseIdx + 1);
        const blend = this.currentFrameFloat - baseIdx;

        // Draw rose frame with sub-frame interpolation
        this.renderRoseFrame(baseIdx, nextIdx, blend);

        // Draw ambient pollen and update poetic telemetry
        this.renderPollen();
        this.updatePoeticHud();

        // If bloom is stationary, sleep the loop to save CPU & GPU
        if (Math.abs(deltaProgress) < 0.0005 && Math.abs(deltaFrame) < 0.01) {
          this.isLoopRunning = false;
          return;
        }

        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__realRoseBloomEngine = new RealRoseBloomEngine();
    });
  } else {
    window.__realRoseBloomEngine = new RealRoseBloomEngine();
  }
})();
