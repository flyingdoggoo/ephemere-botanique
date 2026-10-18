/**
 * ÉPHÉMÈRE BOTANICAL INTERACTION SUITE
 * 1. Anatomical Dissection Node Explorer
 * 2. Florilegium Filter System
 * 3. Interactive Commission Estimation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Anatomical Dissection Explorer
  // --------------------------------------------------------------------------
  const anatomyNodes = document.querySelectorAll('[data-anatomy-node]');
  const anatomyTitle = document.getElementById('anatomy-focus-title');
  const anatomyLatin = document.getElementById('anatomy-focus-latin');
  const anatomyDesc = document.getElementById('anatomy-focus-desc');
  const anatomyStat = document.getElementById('anatomy-focus-stat');

  const anatomyData = {
    corolla: {
      title: 'Velvety Petal Cellular Matrix',
      latin: 'Epidermis Cellularis & Anthocyanin',
      desc: 'Each petal contains microscopic conical epidermal cells that absorb light and create the tactile sensation of heavy silk velvet. Replaced with vegetal polymer to prevent oxidation.',
      stat: '0.04mm Cell Thickness &bull; 99.8% Color Permanence'
    },
    stamen: {
      title: 'Golden Saffron Pollen Reservoir',
      latin: 'Anthera Aurea & Microspores',
      desc: 'The delicate pollen grains are vacuum-sealed in a micro-ionized nitrogen cushion, freezing the volatile essential oils and preventing pollen drop.',
      stat: '18 Individual Filaments &bull; Sealed at -196°C'
    },
    capsule: {
      title: 'Borosilicate Glass Flacon',
      latin: 'Vessel Hermeticum Siliceus',
      desc: 'Hand-blown by master glassblowers in Murano. Optically pure glass with zero iron impurity, filtering 100% of ambient UV radiation.',
      stat: 'UV-Cut 400nm &bull; Zero Degasification'
    },
    stem: {
      title: 'Lignified Vascular Conduit',
      latin: 'Xylem & Phloem Lignificatus',
      desc: 'The fibrous structural spine of the plant is infused with bio-identical glycerin and tree sap resin, ensuring physical flexibility without brittleness.',
      stat: '3.8MPa Tensile Strength &bull; 15+ Year Elasticity'
    }
  };

  anatomyNodes.forEach(node => {
    node.addEventListener('click', () => {
      const key = node.getAttribute('data-anatomy-node');
      const data = anatomyData[key];
      if (!data) return;

      anatomyNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      if (anatomyTitle) anatomyTitle.textContent = data.title;
      if (anatomyLatin) anatomyLatin.textContent = data.latin;
      if (anatomyDesc) anatomyDesc.textContent = data.desc;
      if (anatomyStat) anatomyStat.innerHTML = data.stat;
    });
  });

  // --------------------------------------------------------------------------
  // 2. Florilegium Filter System
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('[data-florilegium-filter]');
  const specimenCards = document.querySelectorAll('[data-florilegium-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-florilegium-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      specimenCards.forEach(card => {
        const category = card.getAttribute('data-florilegium-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.classList.add('animate-bloom');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 3. Interactive Commission Estimation Engine
  // --------------------------------------------------------------------------
  const commissionScaleRadios = document.querySelectorAll('input[name="commission-scale"]');
  const estStems = document.getElementById('est-stems');
  const estDuration = document.getElementById('est-duration');
  const estLeadTime = document.getElementById('est-lead-time');

  const scaleSpecs = {
    single: { stems: '1–3 Master Stems', duration: '12+ Years Stable', lead: '3–4 Weeks Curation' },
    residence: { stems: '12–24 Botanical Studies', duration: '15+ Years Guaranteed', lead: '6–8 Weeks Architectural Integration' },
    runway: { stems: '50+ Suspended Sculptures', duration: 'Installation Specific', lead: '8–12 Weeks Haute Couture Cycle' },
    museum: { stems: 'Curated Retrospective Series', duration: 'Permanent Archival', lead: '16+ Weeks Museum Dossier' }
  };

  commissionScaleRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const spec = scaleSpecs[radio.value];
      if (!spec) return;

      if (estStems) estStems.textContent = spec.stems;
      if (estDuration) estDuration.textContent = spec.duration;
      if (estLeadTime) estLeadTime.textContent = spec.lead;
    });
  });
});
