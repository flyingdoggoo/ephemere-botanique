/**
 * ÉPHÉMÈRE LIVING HERBARIUM REEL CONTROLLER
 * Tactile navigation for botanical sculpture gallery
 */

class SpecimenReel {
  constructor() {
    this.reel = document.getElementById('specimen-reel');
    this.btnPrev = document.getElementById('reel-btn-prev');
    this.btnNext = document.getElementById('reel-btn-next');

    if (!this.reel) return;

    this.bindEvents();
  }

  bindEvents() {
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        const scrollAmount = this.reel.firstElementChild ? this.reel.firstElementChild.offsetWidth + 28 : 340;
        this.reel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        const scrollAmount = this.reel.firstElementChild ? this.reel.firstElementChild.offsetWidth + 28 : 340;
        this.reel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.specimenReel = new SpecimenReel();
});
