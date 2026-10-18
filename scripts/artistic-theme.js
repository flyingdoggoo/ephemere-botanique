/**
 * ÉPHÉMÈRE // LIVING BOTANICAL AMBIENT & SCROLL SPY ENGINE
 * High-performance, zero-jank watercolor ambient light & theme engine.
 *
 * Performance features:
 * - IntersectionObserver for zero-reflow scroll palette detection (replaces getBoundingClientRect on scroll)
 * - Hardware-accelerated translate3d cursor light with direct DOM transform
 * - Self-sleeping lerp loop (stops RAF when mouse is stationary)
 * - Passive, throttled silhouette parallax
 */

(function () {
  'use strict';

  const BOTANICAL_PALETTES = {
    peony: {
      name: 'Paeonia Suffruticosa',
      common: 'Royal Peony Blush',
      primary: 'rgba(235, 145, 165, 0.35)',
      secondary: 'rgba(180, 215, 195, 0.30)',
      accent: 'rgba(245, 215, 140, 0.28)',
      glow: 'rgba(186, 68, 92, 0.40)',
      wavelength: 'NUANCE DAMAS // VELVET CRIMSON'
    },
    rose: {
      name: 'Rosa Gallica Officinalis',
      common: 'Velvet Damask Rosette',
      primary: 'rgba(195, 55, 80, 0.36)',
      secondary: 'rgba(240, 195, 175, 0.28)',
      accent: 'rgba(235, 185, 95, 0.25)',
      glow: 'rgba(155, 30, 55, 0.45)',
      wavelength: 'NUANCE SANGUINE // CRIMSON RESERVE'
    },
    anthurium: {
      name: 'Anthurium Andraeanum',
      common: 'Obsidian Lacquered Spathe',
      primary: 'rgba(145, 45, 75, 0.32)',
      secondary: 'rgba(85, 95, 80, 0.28)',
      accent: 'rgba(235, 170, 110, 0.25)',
      glow: 'rgba(125, 25, 50, 0.42)',
      wavelength: 'NUANCE OBSIDIENNE // VOLCANIC LACQUER'
    },
    ikebana: {
      name: 'Moribana Ikebana',
      common: 'Charred Plum & Summer Moss',
      primary: 'rgba(75, 115, 90, 0.32)',
      secondary: 'rgba(215, 205, 175, 0.30)',
      accent: 'rgba(220, 160, 75, 0.28)',
      glow: 'rgba(55, 95, 70, 0.38)',
      wavelength: 'NUANCE WABI-SABI // CHARRED HINOKI'
    },
    poppy: {
      name: 'Papaver Somniferum',
      common: 'Pollen & Silk Poppy',
      primary: 'rgba(235, 160, 60, 0.34)',
      secondary: 'rgba(245, 215, 180, 0.28)',
      accent: 'rgba(205, 75, 60, 0.25)',
      glow: 'rgba(215, 140, 35, 0.42)',
      wavelength: 'NUANCE SAFRAN // GOLDEN AMBER'
    },
    'blue-poppy': {
      name: 'Meconopsis Betonicifolia',
      common: 'Himalayan Celestial Azure',
      primary: 'rgba(45, 135, 195, 0.35)',
      secondary: 'rgba(185, 225, 245, 0.32)',
      accent: 'rgba(245, 225, 175, 0.25)',
      glow: 'rgba(40, 115, 165, 0.45)',
      wavelength: 'NUANCE CÉLESTE // HIMALAYAN DAWN'
    },
    camellia: {
      name: 'Camellia Japonica Alba',
      common: 'Porcelain White Solitude',
      primary: 'rgba(120, 155, 135, 0.30)',
      secondary: 'rgba(235, 245, 240, 0.35)',
      accent: 'rgba(245, 230, 175, 0.26)',
      glow: 'rgba(105, 135, 115, 0.35)',
      wavelength: 'NUANCE PORCELAINE // WHITE ALBA'
    },
    dahlia: {
      name: 'Dahlia Imperialis Sanguis',
      common: 'Midnight Burgundy Rosette',
      primary: 'rgba(145, 30, 75, 0.35)',
      secondary: 'rgba(240, 190, 210, 0.28)',
      accent: 'rgba(225, 160, 90, 0.24)',
      glow: 'rgba(120, 20, 60, 0.45)',
      wavelength: 'NUANCE SANGUIS // MIDNIGHT PLUM'
    }
  };

  class BotanicalThemeEngine {
    constructor() {
      this.root = document.documentElement;
      this.ambientSystem = document.getElementById('botanical-ambient-system');
      this.cursorLight = document.querySelector('.ambient-cursor-light');
      this.activeThemeKey = 'peony';
      this.targetThemeKey = 'peony';

      // Mouse tracking for ambient light focal point
      this.currentFocal = { x: 50, y: 30 };
      this.targetFocal = { x: 50, y: 30 };
      this.isFocalLoopRunning = false;

      // HUD elements
      this.hudSpecimenName = document.getElementById('resonance-specimen-name');
      this.hudSpectrumBadge = document.getElementById('resonance-spectrum-badge');
      this.hudSwatches = document.querySelectorAll('.resonance-swatch');

      this.init();
    }

    init() {
      this.bindMouseTracking();
      this.bindSpecimenInteractions();
      this.bindResonanceHud();
      this.bind3DFramePhysics();
      this.bindScrollSpyPalettes();
      this.bindScrollParallax();
      this.wakeRenderLoop();
    }

    bindMouseTracking() {
      let mouseTicking = false;

      window.addEventListener('mousemove', (e) => {
        // Direct GPU translate on cursor light (zero layout recalculation)
        if (this.cursorLight) {
          this.cursorLight.style.transform = `translate3d(${e.clientX - 325}px, ${e.clientY - 325}px, 0)`;
        }

        if (!mouseTicking) {
          requestAnimationFrame(() => {
            this.targetFocal.x = (e.clientX / window.innerWidth) * 100;
            this.targetFocal.y = (e.clientY / window.innerHeight) * 100;
            this.wakeRenderLoop();
            mouseTicking = false;
          });
          mouseTicking = true;
        }
      }, { passive: true });
    }

    setBotanicalTheme(key) {
      if (!BOTANICAL_PALETTES[key] || this.targetThemeKey === key) return;
      this.targetThemeKey = key;
      const palette = BOTANICAL_PALETTES[key];

      this.root.style.setProperty('--ambient-aura-primary', palette.primary);
      this.root.style.setProperty('--ambient-aura-secondary', palette.secondary);
      this.root.style.setProperty('--ambient-aura-accent', palette.accent);
      this.root.style.setProperty('--card-active-glow', palette.glow);

      if (this.hudSpecimenName) {
        this.hudSpecimenName.textContent = palette.common;
      }
      if (this.hudSpectrumBadge) {
        this.hudSpectrumBadge.textContent = palette.wavelength;
      }

      this.hudSwatches.forEach(swatch => {
        if (swatch.dataset.palette === key) {
          swatch.classList.add('active');
        } else {
          swatch.classList.remove('active');
        }
      });
    }

    bindSpecimenInteractions() {
      const cards = document.querySelectorAll('.specimen-card, .hero-visual-frame, .scent-card, .alchemy-card');

      cards.forEach(card => {
        const themeKey = card.dataset.botanicalHue || 'peony';
        card.addEventListener('mouseenter', () => {
          this.setBotanicalTheme(themeKey);
        }, { passive: true });
      });
    }

    bindResonanceHud() {
      this.hudSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
          const key = swatch.dataset.palette;
          this.setBotanicalTheme(key);

          const targetCard = document.querySelector(`.specimen-card[data-botanical-hue="${key}"]`);
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('pulse-highlight');
            setTimeout(() => targetCard.classList.remove('pulse-highlight'), 1200);
          }
        });
      });
    }

    // High-performance IntersectionObserver replaces heavy getBoundingClientRect on scroll
    bindScrollSpyPalettes() {
      const sectionPaletteMap = {
        'hero': 'peony',
        'bloom-stage': 'rose',
        'florilegium': 'blue-poppy',
        'alchemy': 'poppy',
        'living-garden': 'ikebana',
        'sanctuary-stage': 'camellia',
        'manifesto': 'dahlia',
        'scents': 'rose',
        'concierge': 'anthurium'
      };

      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const key = sectionPaletteMap[entry.target.id];
            if (key) this.setBotanicalTheme(key);
          }
        });
      }, {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1
      });

      Object.keys(sectionPaletteMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }

    // Emil Kowalski 3D Tactile Frame Tilt Physics
    bind3DFramePhysics() {
      const tiltElements = document.querySelectorAll('.specimen-card, .hero-visual-frame, .manifesto-image-wrapper, .alchemy-card, .scent-card, .garden-bloom-card');

      tiltElements.forEach(el => {
        let isHovered = false;
        let bounds = null;
        let rotX = 0;
        let rotY = 0;
        let targetRotX = 0;
        let targetRotY = 0;

        const updateTilt = () => {
          if (!isHovered && Math.abs(rotX) < 0.05 && Math.abs(rotY) < 0.05) {
            el.style.transform = '';
            return;
          }

          rotX += (targetRotX - rotX) * 0.16;
          rotY += (targetRotY - rotY) * 0.16;

          el.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;
          requestAnimationFrame(updateTilt);
        };

        el.addEventListener('mouseenter', () => {
          isHovered = true;
          bounds = el.getBoundingClientRect();
          requestAnimationFrame(updateTilt);
        }, { passive: true });

        el.addEventListener('mousemove', (e) => {
          if (!bounds) bounds = el.getBoundingClientRect();
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;

          const pctX = (mouseX / bounds.width) - 0.5;
          const pctY = (mouseY / bounds.height) - 0.5;

          targetRotX = -pctY * 6;
          targetRotY = pctX * 6;
        }, { passive: true });

        el.addEventListener('mouseleave', () => {
          isHovered = false;
          bounds = null;
          targetRotX = 0;
          targetRotY = 0;
        }, { passive: true });
      });
    }

    // Parallax drifting for botanical foliage silhouettes in margins
    bindScrollParallax() {
      const silhouettes = document.querySelectorAll('.botanical-silhouette');
      if (!silhouettes.length) return;

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            silhouettes.forEach((sil, idx) => {
              const speed = (idx % 2 === 0 ? 0.06 : -0.05);
              sil.style.transform = `translate3d(0, ${(scrollY * speed).toFixed(1)}px, 0)`;
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // Self-sleeping render loop: Stops RAF when mouse stops moving
    wakeRenderLoop() {
      if (this.isFocalLoopRunning) return;
      this.isFocalLoopRunning = true;

      const render = () => {
        const dx = this.targetFocal.x - this.currentFocal.x;
        const dy = this.targetFocal.y - this.currentFocal.y;

        // If settled, sleep the loop to save CPU & GPU
        if (Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08) {
          this.currentFocal.x = this.targetFocal.x;
          this.currentFocal.y = this.targetFocal.y;
          this.updateFocalStyle();
          this.isFocalLoopRunning = false;
          return;
        }

        this.currentFocal.x += dx * 0.08;
        this.currentFocal.y += dy * 0.08;
        this.updateFocalStyle();

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    }

    updateFocalStyle() {
      const target = this.ambientSystem || this.root;
      target.style.setProperty('--ambient-focal-x', `${this.currentFocal.x.toFixed(1)}%`);
      target.style.setProperty('--ambient-focal-y', `${this.currentFocal.y.toFixed(1)}%`);
    }
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__botanicalThemeInstance = new BotanicalThemeEngine();
    });
  } else {
    window.__botanicalThemeInstance = new BotanicalThemeEngine();
  }
})();
