/**
 * ÉPHÉMÈRE // LA DANSE DES FLEURS: THE FLOATING BOTANICAL SANCTUARY
 * Scroll-driven 3D multi-plane parallax gallery featuring REAL floral sculptures.
 * Purely scroll-driven — ZERO mouse tracking, completely natural asynchronous drift.
 *
 * Performance optimizations:
 * - IntersectionObserver pauses RAF loop when sanctuary section is off-screen
 * - Zero getBoundingClientRect calls inside the 120 FPS animation loop
 * - Uses hardware-accelerated translate3d transforms
 */

(function () {
  'use strict';

  class FloatingSanctuaryEngine {
    constructor() {
      this.section = document.getElementById('sanctuary-stage');
      this.cards = document.querySelectorAll('.sanctuary-floating-item');

      if (!this.section || !this.cards.length) return;

      this.scrollY = 0;
      this.targetScrollY = 0;
      this.isInView = false;
      this.isLoopRunning = false;

      // Gentle organic trajectories for each floral sculpture
      this.trajectories = [
        { waveFreq: 0.0022, ampY: 10, ampX: 6, phase: 0.0 },
        { waveFreq: 0.0019, ampY: -11, ampX: -7, phase: 1.6 },
        { waveFreq: 0.0025, ampY: 12, ampX: 8, phase: 3.2 },
        { waveFreq: 0.0018, ampY: -10, ampX: -6, phase: 4.8 }
      ];

      this.initObserver();
      this.bindScroll();
    }

    initObserver() {
      if (!('IntersectionObserver' in window)) {
        this.isInView = true;
        this.startLoop();
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isInView = entry.isIntersecting;
          if (this.isInView && !this.isLoopRunning) {
            this.startLoop();
          }
        });
      }, {
        rootMargin: '200px 0px 200px 0px',
        threshold: 0
      });

      observer.observe(this.section);
    }

    bindScroll() {
      let scrollTicking = false;

      const updateScroll = () => {
        if (!this.isInView) return;
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            const rect = this.section.getBoundingClientRect();
            this.targetScrollY = window.innerHeight - rect.top;
            if (!this.isLoopRunning) this.startLoop();
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      };

      window.addEventListener('scroll', updateScroll, { passive: true });
      window.addEventListener('resize', updateScroll, { passive: true });
    }

    startLoop() {
      if (this.isLoopRunning) return;
      this.isLoopRunning = true;

      const render = () => {
        if (!this.isInView) {
          this.isLoopRunning = false;
          return;
        }

        const delta = this.targetScrollY - this.scrollY;
        this.scrollY += delta * 0.08;

        this.cards.forEach((card, index) => {
          const traj = this.trajectories[index % this.trajectories.length];

          const yShift = Math.sin(this.scrollY * traj.waveFreq + traj.phase) * traj.ampY;
          const xShift = Math.cos(this.scrollY * traj.waveFreq * 0.85 + traj.phase) * traj.ampX;
          const rotation = Math.sin(this.scrollY * traj.waveFreq + traj.phase) * 1.2;
          const scale = 1 + Math.sin(this.scrollY * traj.waveFreq + traj.phase) * 0.012;

          card.style.transform = `translate3d(${xShift.toFixed(1)}px, ${yShift.toFixed(1)}px, 0px) rotate(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        });

        // If movement has settled, sleep loop until next scroll
        if (Math.abs(delta) < 0.1) {
          this.isLoopRunning = false;
          return;
        }

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FloatingSanctuaryEngine());
  } else {
    new FloatingSanctuaryEngine();
  }
})();
