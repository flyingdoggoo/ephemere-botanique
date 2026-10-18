/**
 * ÉPHÉMÈRE // LE FOLIO CURATORIAL BOTANIQUE
 * High-Luxury Interactive Botanical Specimen Dossier & Lightbox Suite
 *
 * Implements:
 * - Emil Kowalski sub-250ms spring physics & tactile micro-interactions.
 * - Interactive modal with curated taxonomy, olfactory pyramid, and conservation monograph.
 * - Golden petal ripple burst on click ("hoa lá cành").
 * - Dynamic room resonance synchronization with BotanicalThemeEngine.
 * - Direct bespoke inquiry integration with Concierge.
 */

(function () {
  'use strict';

  const SPECIMEN_DOSSIERS = {
    peony: {
      id: 'peony',
      folio: 'FOLIO I // ARCHIVE PRIVÉE',
      latin: 'Paeonia suffruticosa',
      common: 'Royal Peony Blush',
      poetic: 'L\'Éveil Impérial de Kyoto',
      terroir: 'Temple Hills, Higashiyama, Kyoto (Alt. 480m)',
      harvest: 'First light at 5:15 AM before mist dissolves • Spring Equinox',
      image: 'assets/images/hero-peony.webp',
      alt: 'Paeonia suffruticosa royal peony botanical sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'peony',
      badgeColor: 'var(--accent-pollen)',
      monograph: 'Cultivated behind the 400-year-old stone walls of a Zen temple sanctuary in Kyoto. The velvety crinkled petals unfold in hypnotic tiers, holding crystalline dawn dewdrops that catch the early morning light. Through cryogenic bio-preservation, its living cellular lattice is immortalized without losing a single nuance of its velvet drape.',
      chords: {
        head: { name: 'Brume de Kyoto', note: 'Temple mountain mist, crisp morning bamboo, water pear' },
        heart: { name: 'Pétale de Pivoine', note: 'Imperial peony petal absolute, velvet damask nectar, tea rose' },
        base: { name: 'Cèdre Sacré & Ambre', note: 'Aged Kyoto hinoki cypress, warm incense smoke, golden amber' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Borosilicate museum crystal flacon with gold seal' },
        { label: 'Curatorial Lighting', val: 'Indirect morning radiance or warm 2700K spotlight' },
        { label: 'Climatic Equilibrium', val: '18°C–22°C • 45%–55% Relative Humidity' },
        { label: 'Permanent Guarantee', val: '15+ Years Archival Stability Certified' }
      ]
    },
    rose: {
      id: 'rose',
      folio: 'FOLIO II // RESERVE EXCLUSIVE',
      latin: 'Rosa gallica officinalis',
      common: 'Velvet Damask Rosette',
      poetic: 'La Reine Sanguine de Grasse',
      terroir: 'Terraced Sanctuaries, Grasse, Côte d\'Azur (France)',
      harvest: 'Hand-picked at 6:00 AM before sun evaporation',
      image: 'assets/images/specimen-rose.webp',
      alt: 'Rosa gallica velvet damask rose sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'rose',
      badgeColor: 'var(--pigment-rose-crimson)',
      monograph: 'The historic Apothecary\'s Rose revered by perfumers and royal ateliers since the 13th century. Each petal is a microscopic architecture of conical cells that absorb ambient light, yielding a deep crimson velvet glow. Preserved at the razor-sharp apogee of blooming grace.',
      chords: {
        head: { name: 'Rosée de Grasse', note: 'Dawn dewdrops, sweet wild pear, crushed pink pepper' },
        heart: { name: 'Damascena Absolue', note: 'Centifolia heart, saffron dust, warm honey nectar' },
        base: { name: 'Bois de Santal Fumé', note: 'Aged Mysore sandalwood, patchouli leaf, golden benzoin' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Hermetic nitrogen cushion borosilicate vault' },
        { label: 'Curatorial Lighting', val: 'Soft filtered gallery illumination (CRI > 95)' },
        { label: 'Climatic Equilibrium', val: '17°C–21°C • UV-shielded crystal enclosure' },
        { label: 'Permanent Guarantee', val: 'Permanent French Herbarium Monograph' }
      ]
    },
    anthurium: {
      id: 'anthurium',
      folio: 'FOLIO III // NATURE SCULPTURALE',
      latin: 'Anthurium andraeanum',
      common: 'Obsidian Lacquered Spathe',
      poetic: 'Le Coeur de Basalte',
      terroir: 'Volcanic Cloud Slopes, Piton de la Fournaise (Réunion)',
      harvest: 'Harvested under first tropical warmth after rain',
      image: 'assets/images/specimen-anthurium.webp',
      alt: 'Anthurium andraeanum obsidian lacquered spathe sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'anthurium',
      badgeColor: 'var(--accent-pollen)',
      monograph: 'Nourished by black volcanic basalt, its sculptural cordate spathe exhibits a high-gloss lacquer finish that reflects light like Japanese urushi lacquerware. A masterclass of architectural discipline balancing rigid structural planes with delicate blush veins.',
      chords: {
        head: { name: 'Vapeur de Basalte', note: 'Wet volcanic stone, mineral rain, crisp young palm' },
        heart: { name: 'Sève d\'Anthurium', note: 'Lacquered spathe sap, white ginger flower, green peppercorn' },
        base: { name: 'Obsidienne & Vétiver', note: 'Smoked vetiver root, volcanic obsidian, dark patchouli' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Sculptural patinated bronze pedestal' },
        { label: 'Curatorial Lighting', val: 'Medium directional spotlight highlighting gloss' },
        { label: 'Climatic Equilibrium', val: 'Stable room temperature • 40%–60% Humidity' },
        { label: 'Permanent Guarantee', val: '15+ Years Structural Resilience' }
      ]
    },
    ikebana: {
      id: 'ikebana',
      folio: 'FOLIO IV // MAÎTRISE JAPONAISE',
      latin: 'Moribana Ikebana Series',
      common: 'Heritage Plum Bough & Ephemeral Flora',
      poetic: 'L\'Équilibre Imparfait de Kyoto',
      terroir: 'Uji Heritage Mountain Tea Garden, Kyoto (Japan)',
      harvest: 'Composed by 14th generation Ikebana master',
      image: 'assets/images/specimen-ikebana.webp',
      alt: 'Heritage Japanese Moribana Ikebana arrangement',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'ikebana',
      badgeColor: 'var(--frame-gold-bright)',
      monograph: 'A physical meditation on Wabi-Sabi: the Japanese appreciation of impermanence and asymmetric grace. A centenary plum bough with charred bark anchors ephemeral summer blossoms and preserved mountain moss inside handcrafted porcelain.',
      chords: {
        head: { name: 'Thé Vert Sencha', note: 'First-flush steamed sencha green tea, spring bamboo' },
        heart: { name: 'Fleurs de Prunier', note: 'Wild winter plum blossom, white bellflower, stone dew' },
        base: { name: 'Mousse de Forêt', note: 'Kyoto mountain moss, charred hinoki, river pebble' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Handmade Arita porcelain bowl & internal bio-resin' },
        { label: 'Curatorial Lighting', val: 'Tokonoma alcove indirect natural lighting' },
        { label: 'Climatic Equilibrium', val: 'Shielded from rapid drafts and heating currents' },
        { label: 'Permanent Guarantee', val: 'Permanent Masterwork Archival Stability' }
      ]
    },
    poppy: {
      id: 'poppy',
      folio: 'FOLIO V // ÉCLAT D\'AMBRE',
      latin: 'Papaver somniferum',
      common: 'Pollen & Silk Poppy',
      poetic: 'La Couronne de Safran',
      terroir: 'Pamir Alpine Foothills (Alt. 2,800m)',
      harvest: 'Harvested within 90 minutes of petal unfurling',
      image: 'assets/images/specimen-poppy.webp',
      alt: 'Papaver somniferum golden saffron poppy sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'poppy',
      badgeColor: 'var(--pigment-poppy-saffron)',
      monograph: 'Pleated paper-thin petals cradling an exuberant golden crown of saffron stamens. The fragile geometry of this alpine poppy is frozen in an invisible bio-glycerin cushion, capturing the miraculous second the blossom greets the sun.',
      chords: {
        head: { name: 'Pollen Doré', note: 'Sun-warmed saffron dust, dried apricot flower, clover' },
        heart: { name: 'Soie de Pavot', note: 'Pleated silk petals, creamy almond nectar, sweet pollen' },
        base: { name: 'Ambre Solaire', note: 'Rock amber crystal, golden tree resin, Madagascar tonka' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Ultra-thin optical borosilicate bell jar' },
        { label: 'Curatorial Lighting', val: 'Golden hour sunset or warm gallery spotlight' },
        { label: 'Climatic Equilibrium', val: 'Dry interior equilibrium • 19°C–23°C' },
        { label: 'Permanent Guarantee', val: '12+ Years Archival Preservation' }
      ]
    },
    'blue-poppy': {
      id: 'blue-poppy',
      folio: 'FOLIO VI // TRÉSOR HIMALAYEN',
      latin: 'Meconopsis betonicifolia',
      common: 'Celestial Azure Himalayan Poppy',
      poetic: 'L\'Azur Céleste de l\'Himalaya',
      terroir: 'Glacial Scree Slopes, Eastern Bhutan (Alt. 4,200m)',
      harvest: 'Cryo-harvested in high-altitude sub-zero morning',
      image: 'assets/images/specimen-blue-poppy.webp',
      alt: 'Meconopsis betonicifolia rare Himalayan blue poppy sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'blue-poppy',
      badgeColor: 'var(--pigment-blue-poppy-azure)',
      monograph: 'The fabled blue poppy grows solely in harsh Himalayan winds above the tree line. Its surreal sky-blue hue is synthesized naturally from high-altitude ultraviolet rays. A legendary botanical treasure held in the private conservatories of royal botanists.',
      chords: {
        head: { name: 'Air Glaciaire', note: 'Sub-zero glacial snowmelt, high mountain ozone' },
        heart: { name: 'Pétales Célestes', note: 'Azure poppy petals, wild white edelweiss, blue gentian' },
        base: { name: 'Cèdre de l\'Himalaya', note: 'Himalayan deodar cedar, chilled slate, clean musk' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Cryo-vacuum sealed optical glass capsule' },
        { label: 'Curatorial Lighting', val: 'Cool morning daylight spectrum (4500K)' },
        { label: 'Climatic Equilibrium', val: 'Cool dry salon placement • 16°C–20°C' },
        { label: 'Permanent Guarantee', val: '15+ Years Pigment Permanence Certified' }
      ]
    },
    camellia: {
      id: 'camellia',
      folio: 'FOLIO VII // SILENCE BLANC',
      latin: 'Camellia japonica \'Alba Plena\'',
      common: 'Porcelain White Solitude',
      poetic: 'La Solitude d\'Albâtre',
      terroir: 'Heritage Bamboo Grove, Nagasaki (Japan)',
      harvest: 'Winter harvest during silent snowfall',
      image: 'assets/images/specimen-camellia.webp',
      alt: 'Camellia japonica Alba Plena porcelain white sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'camellia',
      badgeColor: 'var(--accent-pollen)',
      monograph: 'Revered by Edo-period tea masters as the ultimate symbol of purity. Up to 80 pristine alabaster petals are arranged in hypnotic concentric spirals, resembling carved marble while preserving the gentle softness of living silk.',
      chords: {
        head: { name: 'Flocon d\'Hiver', note: 'Chilled winter air, fresh camellia leaf, white tea' },
        heart: { name: 'Porcelaine d\'Alba', note: 'Snow-white camellia petals, sweet rice vapor, magnolia' },
        base: { name: 'Huile de Tsubaki', note: 'Cold-pressed tsubaki seed, creamy sandalwood, sheer musk' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Museum anti-reflective vitrine with gilded rim' },
        { label: 'Curatorial Lighting', val: 'Soft diffuse indirect natural lighting' },
        { label: 'Climatic Equilibrium', val: '18°C–22°C • Constant humidity' },
        { label: 'Permanent Guarantee', val: '20+ Years Pristine White Archival Grade' }
      ]
    },
    dahlia: {
      id: 'dahlia',
      folio: 'FOLIO VIII // GÉOMÉTRIE SACRÉE',
      latin: 'Dahlia imperialis',
      common: 'Midnight Burgundy Rosette',
      poetic: 'La Rosace Nocturne d\'Oaxaca',
      terroir: 'Cloud Forest Canopy, Oaxaca, Mexico (Alt. 2,100m)',
      harvest: 'Selected at full nocturnal expansion under moonlight',
      image: 'assets/images/specimen-dahlia.webp',
      alt: 'Dahlia imperialis midnight burgundy rosette sculpture',
      edition: 'Pièce Unique • Edition 1/1',
      themeKey: 'dahlia',
      badgeColor: 'var(--pigment-rose-crimson)',
      monograph: 'A marvel of sacred mathematics. Scores of velvety wine-colored florets radiate in perfect logarithmic Fibonacci spirals from a golden core. Its majestic architectural presence commands attention in private galleries.',
      chords: {
        head: { name: 'Brumes d\'Oaxaca', note: 'Cloud forest mist, wild cassis, spiced damson plum' },
        heart: { name: 'Velours Impérial', note: 'Deep burgundy dahlia florets, dark carnation, raw cacao' },
        base: { name: 'Copal & Chêne Brûlé', note: 'Mexican copal incense resin, charred oak, earthy patchouli' }
      },
      specs: [
        { label: 'Conservation Vessel', val: 'Cast bronze armillary frame with optical dome' },
        { label: 'Curatorial Lighting', val: 'Warm evening spotlighting (2700K)' },
        { label: 'Climatic Equilibrium', val: '18°C–23°C • 40%–50% Humidity' },
        { label: 'Permanent Guarantee', val: '15+ Years Structural & Color Permanence' }
      ]
    }
  };

  class SpecimenDossierManager {
    constructor() {
      this.modal = null;
      this.activeSpecimen = null;
      this.createModalDOM();
      this.bindTriggers();
      this.bindGlobalKeys();
    }

    createModalDOM() {
      const existing = document.getElementById('botanical-dossier-modal');
      if (existing) existing.remove();

      const modalEl = document.createElement('div');
      modalEl.id = 'botanical-dossier-modal';
      modalEl.className = 'dossier-modal-overlay';
      modalEl.setAttribute('role', 'dialog');
      modalEl.setAttribute('aria-modal', 'true');
      modalEl.setAttribute('aria-hidden', 'true');

      modalEl.innerHTML = `
        <div class="dossier-backdrop" data-close-dossier></div>
        
        <div class="dossier-dialog-window">
          <!-- Climbing Vine SVGs framing the top corners -->
          <svg class="dossier-vine top-left" viewBox="0 0 160 80" fill="none" aria-hidden="true">
            <path d="M0 70 C40 60 70 35 110 30 C130 28 150 15 160 0" stroke="var(--frame-gold-bright)" stroke-width="1.2" opacity="0.55" fill="none"/>
            <path d="M50 50 C58 42 70 44 72 52 C65 58 55 56 50 50 Z" fill="var(--frame-gold-bright)" opacity="0.45"/>
            <path d="M95 32 C104 26 114 30 114 38 C106 42 98 38 95 32 Z" fill="var(--frame-gold-bright)" opacity="0.45"/>
          </svg>
          <svg class="dossier-vine top-right" viewBox="0 0 160 80" fill="none" aria-hidden="true">
            <path d="M0 70 C40 60 70 35 110 30 C130 28 150 15 160 0" stroke="var(--frame-gold-bright)" stroke-width="1.2" opacity="0.55" fill="none"/>
            <path d="M50 50 C58 42 70 44 72 52 C65 58 55 56 50 50 Z" fill="var(--frame-gold-bright)" opacity="0.45"/>
            <path d="M95 32 C104 26 114 30 114 38 C106 42 98 38 95 32 Z" fill="var(--frame-gold-bright)" opacity="0.45"/>
          </svg>

          <!-- Close Button -->
          <button class="dossier-close-btn" data-close-dossier aria-label="Close Botanical Dossier">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="dossier-body-grid">
            <!-- Left Column: Photographic Artwork Museum Plate -->
            <div class="dossier-visual-pane">
              <div class="dossier-plate-frame">
                <!-- Four Corner Filigrees -->
                <svg class="corner-filigree top-left" viewBox="0 0 32 32" fill="none"><path d="M3 29 C3 14 14 3 29 3" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="3" r="2" fill="currentColor"/></svg>
                <svg class="corner-filigree top-right" viewBox="0 0 32 32" fill="none"><path d="M3 29 C3 14 14 3 29 3" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="3" r="2" fill="currentColor"/></svg>
                <svg class="corner-filigree bottom-left" viewBox="0 0 32 32" fill="none"><path d="M3 29 C3 14 14 3 29 3" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="3" r="2" fill="currentColor"/></svg>
                <svg class="corner-filigree bottom-right" viewBox="0 0 32 32" fill="none"><path d="M3 29 C3 14 14 3 29 3" stroke="currentColor" stroke-width="1.2"/><circle cx="3" cy="3" r="2" fill="currentColor"/></svg>

                <div class="dossier-img-matting">
                  <img id="dossier-img" class="dossier-specimen-img" src="" alt="Botanical Specimen">
                  <div class="dossier-embossed-seal">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 7v10M8 11l4-4 4 4"/>
                    </svg>
                  </div>
                </div>

                <div class="dossier-plate-caption">
                  <span id="dossier-edition-badge">EDITION 1/1</span>
                  <span id="dossier-terroir-badge">KYOTO HILLS</span>
                </div>
              </div>

              <!-- Interactive Resonate Button -->
              <button id="dossier-resonate-btn" class="btn btn-botanical-resonate">
                <span class="resonate-icon">✦</span> Resonate Room With This Bloom
              </button>
            </div>

            <!-- Right Column: Curatorial Monograph & Accord -->
            <div class="dossier-info-pane">
              <div class="dossier-header-section">
                <div id="dossier-folio-tag" class="text-taxonomy" style="color:var(--accent-pollen);">FOLIO BOTANIQUE</div>
                <h2 id="dossier-latin-title" class="dossier-title">Paeonia suffruticosa</h2>
                <div id="dossier-poetic-sub" class="dossier-poetic-title">L'Éveil Impérial de Kyoto</div>
                <p id="dossier-harvest-meta" class="dossier-harvest-meta">Harvested at first light</p>
              </div>

              <!-- Literary Curatorial Monograph -->
              <div class="dossier-monograph-box">
                <p id="dossier-monograph-text" class="dossier-monograph-p">
                  Specimen monograph description...
                </p>
              </div>

              <!-- Interactive Olfactory Notes Pyramid -->
              <div class="dossier-chords-section">
                <div class="dossier-section-label">HARMONIE OLFACTIVE // SENSORY NOTES:</div>
                <div class="dossier-chords-list">
                  <div class="dossier-chord-item" data-chord="head">
                    <span class="chord-badge">TÊTE</span>
                    <strong id="dossier-chord-head-name">Brume de Kyoto</strong>
                    <span id="dossier-chord-head-desc" class="chord-desc">Temple mist...</span>
                  </div>
                  <div class="dossier-chord-item" data-chord="heart">
                    <span class="chord-badge">COEUR</span>
                    <strong id="dossier-chord-heart-name">Pétale de Pivoine</strong>
                    <span id="dossier-chord-heart-desc" class="chord-desc">Velvet absolute...</span>
                  </div>
                  <div class="dossier-chord-item" data-chord="base">
                    <span class="chord-badge">FOND</span>
                    <strong id="dossier-chord-base-name">Cèdre Sacré</strong>
                    <span id="dossier-chord-base-desc" class="chord-desc">Kyoto hinoki...</span>
                  </div>
                </div>
              </div>

              <!-- Conservation Specifications -->
              <div class="dossier-specs-grid" id="dossier-specs-container">
                <!-- Populated dynamically -->
              </div>

              <!-- Action Bar -->
              <div class="dossier-actions-bar">
                <button id="dossier-inquire-btn" class="btn btn-botanical-peony">
                  Inquire For Private Acquisition &rarr;
                </button>
                <button class="btn btn-botanical-outline" data-close-dossier>
                  Return to Florilegium
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modalEl);
      this.modal = modalEl;

      // Bind close events
      this.modal.querySelectorAll('[data-close-dossier]').forEach(el => {
        el.addEventListener('click', () => this.closeDossier());
      });

      // Bind Resonate button
      const resonateBtn = document.getElementById('dossier-resonate-btn');
      if (resonateBtn) {
        resonateBtn.addEventListener('click', () => this.handleResonateClick());
      }

      // Bind Inquire button
      const inquireBtn = document.getElementById('dossier-inquire-btn');
      if (inquireBtn) {
        inquireBtn.addEventListener('click', () => this.handleInquireClick());
      }
    }

    bindTriggers() {
      // 1. Florilegium cards
      document.querySelectorAll('.specimen-card').forEach(card => {
        this.attachCardTrigger(card, card.dataset.botanicalHue);
      });

      // 2. Hero visual frame (dynamically resolves active specimen)
      const heroFrame = document.querySelector('.hero-visual-frame');
      if (heroFrame) {
        heroFrame.style.cursor = 'pointer';
        heroFrame.setAttribute('title', 'Click to contemplate curatorial folio');
        heroFrame.addEventListener('click', (e) => {
          const activeKey = heroFrame.getAttribute('data-specimen-id') || 'peony';
          this.spawnTinyFlower(e.clientX, e.clientY);
          this.openDossier(activeKey);
        });
      }

      // Initialize Hero Specimen Selector
      this.initHeroSpecimenSelector();

      // 3. Alchemy cards
      const alchemyMap = ['rose', 'poppy', 'rose', 'ikebana'];
      document.querySelectorAll('.alchemy-card').forEach((card, idx) => {
        const key = alchemyMap[idx % alchemyMap.length];
        this.attachCardTrigger(card, key);
      });

      // 4. Sanctuary floating items
      const sanctuaryMap = ['peony', 'blue-poppy', 'camellia', 'rose'];
      document.querySelectorAll('.sanctuary-floating-item').forEach((card, idx) => {
        const key = sanctuaryMap[idx % sanctuaryMap.length];
        const innerFrame = card.querySelector('.botanical-art-frame') || card;
        this.attachCardTrigger(innerFrame, key);
      });

      // 5. Scent cards
      const scentMap = ['rose', 'ikebana', 'blue-poppy', 'anthurium'];
      document.querySelectorAll('.scent-card').forEach((card, idx) => {
        const key = scentMap[idx % scentMap.length];
        this.attachCardTrigger(card, key);
      });

      // 6. Living Garden items
      document.querySelectorAll('.garden-bloom-item').forEach(item => {
        const key = item.dataset.specimenId || 'peony';
        this.attachCardTrigger(item, key);
      });

      // 7. Global real-time click: single petite flower particle ("bông hoa nho nhỏ")
      let lastTriggerTime = 0;
      const onBloomTrigger = (e) => {
        const now = Date.now();
        if (now - lastTriggerTime < 80) return;
        lastTriggerTime = now;

        if (!e.target.closest('#botanical-dossier-modal, input, textarea, select, button, a')) {
          this.spawnTinyFlower(e.clientX, e.clientY);
        }
      };

      window.addEventListener('pointerdown', onBloomTrigger, { passive: true });
      window.addEventListener('click', onBloomTrigger, { passive: true });
    }

    attachCardTrigger(element, specimenKey) {
      if (!element || !specimenKey) return;
      element.style.cursor = 'pointer';
      element.setAttribute('title', 'Click to contemplate curatorial folio');

      // Add curatorial hover chip if not present
      if (!element.querySelector('.folio-hover-chip')) {
        const chip = document.createElement('div');
        chip.className = 'folio-hover-chip';
        chip.innerHTML = `<span>✦ FOLIO CURATORIAL ✦</span>`;
        element.appendChild(chip);
      }

      element.addEventListener('click', (e) => {
        // Prevent click if clicking an anchor that specifies navigation elsewhere
        if (e.target.tagName === 'A' && e.target.getAttribute('href') !== '#concierge') {
          return;
        }
        e.preventDefault();

        // Trigger gentle petite flower bloom at click coordinates
        this.spawnTinyFlower(e.clientX, e.clientY);

        // Open dossier
        this.openDossier(specimenKey);
      });
    }

    spawnTinyFlower(x, y) {
      const flower = document.createElement('div');
      flower.className = 'click-flower-particle';
      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;

      // Curated Haute Botanical Palettes matching our salon specimens
      const palettes = [
        { outer: '#B32638', inner: '#D85D6E', center: '#E6B05C', shadow: 'rgba(179,38,56,0.4)' }, // Velvet Crimson Rose
        { outer: '#C96876', inner: '#E8A2AC', center: '#F4D06F', shadow: 'rgba(201,104,118,0.38)' }, // Kyoto Peony Blush
        { outer: '#3E7697', inner: '#7EABC4', center: '#F0D289', shadow: 'rgba(62,118,151,0.38)' },  // Himalayan Poppy Azure
        { outer: '#C88735', inner: '#E6B05C', center: '#FAF6EE', shadow: 'rgba(200,135,53,0.38)' }   // Saffron Aurum
      ];
      const p = palettes[Math.floor(Math.random() * palettes.length)];
      flower.style.setProperty('--flower-shadow', p.shadow);

      const randomRot = (Math.random() * 40 - 20).toFixed(1);
      flower.style.setProperty('--initial-rot', `${randomRot}deg`);

      // Delicate 5-petal petite blooming rose/blossom with golden stamen core
      flower.innerHTML = `
        <svg viewBox="0 0 36 36" class="click-flower-svg" fill="none">
          <g fill="${p.outer}" opacity="0.94">
            <circle cx="18" cy="10.5" r="5.2" />
            <circle cx="25" cy="15.5" r="5.2" />
            <circle cx="22.5" cy="24" r="5.2" />
            <circle cx="13.5" cy="24" r="5.2" />
            <circle cx="11" cy="15.5" r="5.2" />
          </g>
          <circle cx="18" cy="18" r="4.6" fill="${p.inner}" opacity="0.9" />
          <circle cx="18" cy="18" r="3" fill="${p.center}" />
          <circle cx="18" cy="18" r="1.3" fill="#FFFDF8" />
        </svg>
      `;

      document.body.appendChild(flower);
      setTimeout(() => flower.remove(), 520);
    }

    initHeroSpecimenSelector() {
      const pills = document.querySelectorAll('.hero-specimen-selector .specimen-pill');
      const heroFrame = document.querySelector('.hero-visual-frame');
      const heroImg = document.getElementById('hero-plate-image');
      const plaquePrimary = document.getElementById('hero-plaque-primary');
      const plaqueSecondary = document.getElementById('hero-plaque-secondary');

      if (!pills.length || !heroImg) return;

      const SPECIMEN_METAS = {
        peony: {
          key: 'peony',
          src: 'assets/images/hero-peony.webp',
          alt: 'Paeonia suffruticosa royal peony botanical sculpture with crystalline dew droplets in a glass flacon',
          plaquePri: 'PL. 00 // PAEONIA SUFFRUTICOSA',
          plaqueSec: '• KYOTO SALON COLLECTION •',
          theme: 'peony'
        },
        rose: {
          key: 'rose',
          src: 'assets/images/specimen-rose.webp',
          alt: 'Rosa Gallica Velours damask rose petals preserved in crystalline glacial resin',
          plaquePri: 'PL. 01 // ROSA GALLICA VELOURS',
          plaqueSec: '• GRASSE BOTANICAL SANCTUARY •',
          theme: 'damask'
        },
        'blue-poppy': {
          key: 'blue-poppy',
          src: 'assets/images/specimen-blue-poppy.webp',
          alt: 'Meconopsis betonicifolia rare Himalayan blue poppy sculpture',
          plaquePri: 'PL. 03 // MECONOPSIS BETONICIFOLIA',
          plaqueSec: '• HIMALAYAN ALPINE HERBARIUM •',
          theme: 'cryo'
        }
      };

      pills.forEach((pill) => {
        pill.addEventListener('click', (e) => {
          const specKey = pill.getAttribute('data-specimen');
          const meta = SPECIMEN_METAS[specKey];
          if (!meta) return;

          // Update active pill state
          pills.forEach((p) => p.classList.remove('is-active'));
          pill.classList.add('is-active');

          // Soft petite flower click feedback
          this.spawnTinyFlower(e.clientX, e.clientY);

          // Update hero visual frame attribute for dossier trigger
          if (heroFrame) {
            heroFrame.setAttribute('data-specimen-id', meta.key);
          }

          // Smooth image crossfade
          heroImg.classList.add('is-fading');
          setTimeout(() => {
            heroImg.src = meta.src;
            heroImg.alt = meta.alt;
            if (plaquePrimary) plaquePrimary.textContent = meta.plaquePri;
            if (plaqueSecondary) plaqueSecondary.textContent = meta.plaqueSec;

            heroImg.onload = () => {
              heroImg.classList.remove('is-fading');
            };
            setTimeout(() => heroImg.classList.remove('is-fading'), 60);
          }, 180);

          // Synchronize room theme hue
          if (window.__botanicalThemeInstance) {
            window.__botanicalThemeInstance.setBotanicalTheme(meta.theme);
          }
        });
      });
    }

    openDossier(key) {
      const data = SPECIMEN_DOSSIERS[key] || SPECIMEN_DOSSIERS.peony;
      this.activeSpecimen = data;

      // Populate elements
      const img = document.getElementById('dossier-img');
      const latin = document.getElementById('dossier-latin-title');
      const poetic = document.getElementById('dossier-poetic-sub');
      const folioTag = document.getElementById('dossier-folio-tag');
      const harvest = document.getElementById('dossier-harvest-meta');
      const monograph = document.getElementById('dossier-monograph-text');
      const terroirBadge = document.getElementById('dossier-terroir-badge');
      const editionBadge = document.getElementById('dossier-edition-badge');

      if (img) {
        img.src = data.image;
        img.alt = data.alt;
      }
      if (latin) latin.textContent = data.latin;
      if (poetic) poetic.textContent = data.poetic;
      if (folioTag) folioTag.textContent = data.folio;
      if (harvest) harvest.innerHTML = `<strong>TERROIR:</strong> ${data.terroir}<br><strong>RITUAL:</strong> ${data.harvest}`;
      if (monograph) monograph.textContent = data.monograph;
      if (terroirBadge) terroirBadge.textContent = data.terroir.split(',')[0].toUpperCase();
      if (editionBadge) editionBadge.textContent = data.edition.toUpperCase().replace('•', '•');

      // Olfactory Chords
      const hName = document.getElementById('dossier-chord-head-name');
      const hDesc = document.getElementById('dossier-chord-head-desc');
      const cName = document.getElementById('dossier-chord-heart-name');
      const cDesc = document.getElementById('dossier-chord-heart-desc');
      const bName = document.getElementById('dossier-chord-base-name');
      const bDesc = document.getElementById('dossier-chord-base-desc');

      if (hName && data.chords.head) hName.textContent = data.chords.head.name;
      if (hDesc && data.chords.head) hDesc.textContent = data.chords.head.note;
      if (cName && data.chords.heart) cName.textContent = data.chords.heart.name;
      if (cDesc && data.chords.heart) cDesc.textContent = data.chords.heart.note;
      if (bName && data.chords.base) bName.textContent = data.chords.base.name;
      if (bDesc && data.chords.base) bDesc.textContent = data.chords.base.note;

      // Specs
      const specsContainer = document.getElementById('dossier-specs-container');
      if (specsContainer && data.specs) {
        specsContainer.innerHTML = data.specs.map(s => `
          <div class="dossier-spec-item">
            <span class="spec-lbl">${s.label}</span>
            <span class="spec-val">${s.val}</span>
          </div>
        `).join('');
      }

      // Show modal with Emil Kowalski spring entrance
      this.modal.setAttribute('aria-hidden', 'false');
      this.modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    closeDossier() {
      if (!this.modal) return;
      this.modal.classList.remove('is-active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    handleResonateClick() {
      if (!this.activeSpecimen) return;
      const key = this.activeSpecimen.themeKey;

      // Invoke BotanicalThemeEngine if available
      if (window.__botanicalThemeInstance) {
        window.__botanicalThemeInstance.setBotanicalTheme(key);
      } else {
        const swatch = document.querySelector(`.resonance-swatch[data-palette="${key}"]`);
        if (swatch) swatch.click();
      }

      // Visual feedback on button
      const btn = document.getElementById('dossier-resonate-btn');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color:var(--frame-gold-bright);">✓ Atelier Resonance Synchronized!</span>`;
        btn.classList.add('resonate-pulsing');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('resonate-pulsing');
        }, 1800);
      }
    }

    handleInquireClick() {
      if (!this.activeSpecimen) return;
      const specimenName = `${this.activeSpecimen.common} (${this.activeSpecimen.latin})`;

      this.closeDossier();

      // Pre-fill concierge notes
      const notesField = document.getElementById('concierge-notes');
      const typeSelect = document.getElementById('concierge-type');

      if (typeSelect) {
        typeSelect.value = 'Private Installation';
      }
      if (notesField) {
        notesField.value = `Inquiry regarding curatorial acquisition of ${specimenName} [${this.activeSpecimen.folio}].`;
      }

      // Smoothly navigate to concierge section
      const concierge = document.getElementById('concierge');
      if (concierge) {
        concierge.scrollIntoView({ behavior: 'smooth' });
        notesField && notesField.focus();
      }
    }

    bindGlobalKeys() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('is-active')) {
          this.closeDossier();
        }
      });
    }
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__specimenDossierManager = new SpecimenDossierManager();
    });
  } else {
    window.__specimenDossierManager = new SpecimenDossierManager();
  }
})();

