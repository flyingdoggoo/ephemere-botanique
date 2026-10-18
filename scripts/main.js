/**
 * ÉPHÉMÈRE MAIN CONTROLLER
 * Concierge inquiry form handling and global interaction polish
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('concierge-form');
  const feedback = document.getElementById('concierge-feedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('concierge-name');
      const emailInput = document.getElementById('concierge-email');
      const notesInput = document.getElementById('concierge-notes');
      const scaleInput = document.querySelector('input[name="commission-scale"]:checked');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const notes = notesInput ? notesInput.value.trim() : '';
      const scale = scaleInput ? scaleInput.nextElementSibling.textContent.trim() : 'Private Salon';

      if (!name || !email || !email.includes('@')) {
        if (feedback) {
          feedback.innerHTML = `<span style="color:var(--accent-botanical);">Please provide your name and a valid communication address.</span>`;
        }
        return;
      }

      if (feedback) {
        feedback.innerHTML = `
          <div style="padding:1.5rem; background:var(--bg-surface); border:1px solid var(--accent-pollen); border-radius:4px; margin-top:1.5rem; box-shadow:var(--shadow-editorial);">
            <div style="font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.12em; color:var(--accent-pollen); margin-bottom:0.4rem; text-transform:uppercase;">
              SALON PRIVÉ &bull; CONCIERGE CONFIRMATION
            </div>
            <div style="font-family:var(--font-display); font-size:1.5rem; color:var(--text-primary); margin-bottom:0.5rem; font-style:italic;">
              Merci infiniment, ${name}.
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
              Our master florists at Atelier Rue Saint-Honoré have received your commission thoughts for <em>${scale}</em>. We look forward to composing a tailored curatorial portfolio for you at <strong>${email}</strong>.
            </p>
            ${notes ? `<div style="font-size:0.825rem; font-style:italic; color:var(--text-primary); margin-top:0.75rem; padding:0.6rem 0.85rem; background:rgba(212,154,61,0.08); border-left:2px solid var(--frame-gold-bright); border-radius:2px;">"${notes}"</div>` : ''}
          </div>
        `;
      }

      form.reset();
    });
  }
});
