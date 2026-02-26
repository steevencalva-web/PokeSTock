// ============================================
// POKECOINS SYSTEM
// ============================================

// --- Card Pool (Mega Evolution from pokemontcg.io, Surging Sparks & Ascended Heroes from PTCG Pocket CDN) ---
const cardPool = [
  // ===== COMMON =====
  // Mega Evolution (pokemontcg.io - XY Flashfire)
  { url: 'https://images.pokemontcg.io/xy2/1.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/3.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/5.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/7.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/9.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/15.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/20.png', rarity: 'common' },
  { url: 'https://images.pokemontcg.io/xy2/25.png', rarity: 'common' },
  // Surging Sparks (PTCG Pocket CDN - verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_1-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_5-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_10-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_15-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_20-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_25-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_30-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_35-2x.png', rarity: 'common' },
  // Ascended Heroes (PTCG Pocket CDN - verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_1-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_5-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_10-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_15-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_20-2x.png', rarity: 'common' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_25-2x.png', rarity: 'common' },

  // ===== UNCOMMON =====
  // Mega Evolution (pokemontcg.io - XY Flashfire + Furious Fists)
  { url: 'https://images.pokemontcg.io/xy2/30.png', rarity: 'uncommon' },
  { url: 'https://images.pokemontcg.io/xy2/40.png', rarity: 'uncommon' },
  { url: 'https://images.pokemontcg.io/xy2/50.png', rarity: 'uncommon' },
  { url: 'https://images.pokemontcg.io/xy3/20.png', rarity: 'uncommon' },
  { url: 'https://images.pokemontcg.io/xy3/55.png', rarity: 'uncommon' },
  // Surging Sparks (verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_57-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_91-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_40-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_50-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_60-2x.png', rarity: 'uncommon' },
  // Ascended Heroes (verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_47-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_61-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_100-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_120-2x.png', rarity: 'uncommon' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_150-2x.png', rarity: 'uncommon' },

  // ===== RARE =====
  // Mega Evolution (pokemontcg.io - XY Flashfire Mega EX + Full Art)
  { url: 'https://images.pokemontcg.io/xy2/12.png', rarity: 'rare' },
  { url: 'https://images.pokemontcg.io/xy2/13.png', rarity: 'rare' },
  { url: 'https://images.pokemontcg.io/xy2/69.png', rarity: 'rare' },
  { url: 'https://images.pokemontcg.io/xy2/107.png', rarity: 'rare' },
  // Surging Sparks (verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_119-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_133-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_192-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/surging-sparks/es-es/SV08_ES_208-2x.png', rarity: 'rare' },
  // Ascended Heroes (verified)
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_221-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_266-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_268-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_269-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_270-2x.png', rarity: 'rare' },
  { url: 'https://dz3we2x72f7ol.cloudfront.net/expansions/ascended-heroes/es-es/M7XJ_ES_275-2x.png', rarity: 'rare' },
];

// --- Booster Pack Cover Images (local) ---
const boosterCovers = [
  '../Imagenes/Sobre1.png',
  '../Imagenes/Sobre2.png',
  '../Imagenes/Sobre3.png',
  '../Imagenes/Sobre4.png',
  '../Imagenes/Sobre5.png',
];

function getRandomBoosterCover() {
  return boosterCovers[Math.floor(Math.random() * boosterCovers.length)];
}

// --- State ---
let pokeCoins = 0;
let activeDiscount = null; // { amount, code }

function loadPokeCoins() {
  try { pokeCoins = parseInt(localStorage.getItem('pokestock_coins') || '0'); }
  catch { pokeCoins = 0; }
}

function savePokeCoins() {
  localStorage.setItem('pokestock_coins', pokeCoins.toString());
}

function loadDiscount() {
  try { activeDiscount = JSON.parse(localStorage.getItem('pokestock_discount')); }
  catch { activeDiscount = null; }
}

function saveDiscount() {
  if (activeDiscount) {
    localStorage.setItem('pokestock_discount', JSON.stringify(activeDiscount));
  } else {
    localStorage.removeItem('pokestock_discount');
  }
}

function addPokeCoins(amount) {
  pokeCoins += amount;
  savePokeCoins();
  updateCoinsBadge();
}

function spendPokeCoins(amount) {
  if (pokeCoins < amount) return false;
  pokeCoins -= amount;
  savePokeCoins();
  updateCoinsBadge();
  return true;
}

// Coins earned per euro spent
function coinsForPurchase(totalEuros) {
  return Math.floor(totalEuros * 10); // 10 coins per euro
}

// --- UI Updates ---
function updateCoinsBadge() {
  const badges = document.querySelectorAll('.fab-badge');
  badges.forEach(b => b.textContent = pokeCoins);

  const balanceEls = document.querySelectorAll('.balance-amount');
  balanceEls.forEach(el => el.textContent = pokeCoins);

  // Update redeem buttons
  document.querySelectorAll('.reward-redeem-btn').forEach(btn => {
    const cost = parseInt(btn.dataset.cost);
    btn.disabled = pokeCoins < cost;
  });

  // Update mystery box button
  const mysteryBtn = document.querySelector('.mystery-buy-btn');
  if (mysteryBtn) {
    const cost = parseInt(mysteryBtn.dataset.cost);
    mysteryBtn.disabled = pokeCoins < cost;
  }
}

// --- PokeCoins Panel ---
function openPokeCoinsPanel() {
  const panel = document.getElementById('pokecoinsPanel');
  const overlay = document.getElementById('pokecoinsPanelOverlay');
  if (panel) panel.classList.add('active');
  if (overlay) overlay.classList.add('active');
  updateCoinsBadge();
}

function closePokeCoinsPanel() {
  const panel = document.getElementById('pokecoinsPanel');
  const overlay = document.getElementById('pokecoinsPanelOverlay');
  if (panel) panel.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

function redeemReward(amount, cost) {
  if (!spendPokeCoins(cost)) {
    mostrarToast('✗ No tienes suficientes PokeCoins', 'error');
    return;
  }
  activeDiscount = { amount: amount, code: 'POKE' + amount };
  saveDiscount();
  mostrarToast(`✓ ¡Descuento de €${amount} canjeado! Se aplicará en el carrito`, 'success');
  updateCoinsBadge();
  renderCartPanel();
}

// --- Mystery Box ---
const MYSTERY_BOX_COST = 150;
const CARDS_PER_PACK = 10;

function buyMysteryBox() {
  if (!spendPokeCoins(MYSTERY_BOX_COST)) {
    mostrarToast('✗ No tienes suficientes PokeCoins', 'error');
    return;
  }
  mostrarToast('✓ ¡Mystery Box comprada! Preparando sobre...', 'success');
  closePokeCoinsPanel();

  // Generate random cards for this pack
  const packCards = generatePackCards();

  // Start opening animation after brief delay
  setTimeout(() => {
    startCardOpening(packCards);
  }, 600);
}

function generatePackCards() {
  const cards = [];
  const commons = cardPool.filter(c => c.rarity === 'common');
  const uncommons = cardPool.filter(c => c.rarity === 'uncommon');
  const rares = cardPool.filter(c => c.rarity === 'rare');

  // 5 common, 3 uncommon, 2 rare = 10 cards
  for (let i = 0; i < 5; i++) {
    cards.push(commons[Math.floor(Math.random() * commons.length)]);
  }
  for (let i = 0; i < 3; i++) {
    cards.push(uncommons[Math.floor(Math.random() * uncommons.length)]);
  }
  for (let i = 0; i < 2; i++) {
    cards.push(rares[Math.floor(Math.random() * rares.length)]);
  }

  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

// ============================================
// CARD OPENING ANIMATION
// ============================================

let currentPackCards = [];
let currentCardIndex = 0;
let openingState = 'pack'; // 'pack', 'cutting', 'revealing', 'summary'
let cutProgress = 0;
let isDragging = false;

function startCardOpening(cards) {
  currentPackCards = cards;
  currentCardIndex = 0;
  openingState = 'pack';
  cutProgress = 0;

  const overlay = document.getElementById('cardOpeningOverlay');
  if (!overlay) return;

  overlay.innerHTML = `
    <button class="opening-close-btn" id="openingCloseBtn">✕</button>
    <div class="booster-pack-container ready-to-cut" id="boosterContainer">
      <div class="booster-cut-line" id="boosterCutLine"></div>
      <div class="booster-pack">
        <img class="booster-pack-cover" src="${getRandomBoosterCover()}" alt="Sobre Pokémon">
      </div>
    </div>
    <p class="booster-cut-hint" id="cutHint">✂️ Desliza hacia abajo sobre el sobre para abrirlo</p>
    <div class="card-reveal-container" id="cardRevealContainer">
      <div class="card-counter" id="cardCounter"></div>
      <div class="revealed-card" id="revealedCard">
        <img class="revealed-card-img" src="" alt="Carta Pokémon" id="cardFrontImg">
      </div>
      <p class="card-hint" id="cardHint">Haz clic en la carta para ver la siguiente</p>
    </div>
    <div class="card-summary" id="cardSummary">
      <h2>¡Tus Cartas!</h2>
      <div class="card-summary-grid" id="cardSummaryGrid"></div>
      <button class="summary-close-btn" id="summaryCloseBtn">CERRAR</button>
    </div>
  `;

  overlay.classList.add('active');

  // Setup event listeners
  setupOpeningEvents();
}

function setupOpeningEvents() {
  // Close button
  const closeBtn = document.getElementById('openingCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCardOpening);
  }

  // Pack cutting - mouse/touch drag from top
  const container = document.getElementById('boosterContainer');
  if (container) {
    let startY = 0;
    const packHeight = container.offsetHeight || 320;

    const onStart = (e) => {
      if (openingState !== 'pack') return;
      isDragging = true;
      startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      e.preventDefault();
    };

    const onMove = onMoveHandler = (e) => {
      if (!isDragging || openingState !== 'pack') return;
      const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      const diff = currentY - startY;

      if (diff > 0) {
        cutProgress = Math.min(diff / (packHeight * 0.6), 1);

        // Visual feedback: clip the top of the pack
        const clipPercent = cutProgress * 30;
        const pack = container.querySelector('.booster-pack');
        if (pack) {
          pack.style.clipPath = `inset(${clipPercent}% 0 0 0)`;
          pack.style.transform = `scale(${1 + cutProgress * 0.05}) rotate(${cutProgress * 3}deg)`;
        }

        // Create tear particles
        if (cutProgress > 0.3 && Math.random() > 0.7) {
          createTearParticle(container, currentY - container.getBoundingClientRect().top);
        }
      }
    };

    const onEnd = onEndHandler = () => {
      if (!isDragging) return;
      isDragging = false;

      if (cutProgress > 0.6) {
        // Successfully cut open
        openingState = 'cutting';
        container.classList.add('tearing');
        container.classList.remove('ready-to-cut');

        const hint = document.getElementById('cutHint');
        if (hint) hint.style.display = 'none';

        setTimeout(() => {
          container.style.display = 'none';
          startCardRevealing();
        }, 900);
      } else {
        // Reset
        cutProgress = 0;
        const pack = container.querySelector('.booster-pack');
        if (pack) {
          pack.style.clipPath = '';
          pack.style.transform = '';
        }
      }
    };

    container.addEventListener('mousedown', onStart);
    container.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
  }

  // Summary close
  const summaryClose = document.getElementById('summaryCloseBtn');
  if (summaryClose) {
    summaryClose.addEventListener('click', closeCardOpening);
  }
}

function createTearParticle(container, y) {
  const particle = document.createElement('div');
  particle.className = 'tear-particle';
  const colors = ['#4a1a6b', '#1a3a6b', '#ffcb05', '#e8722a'];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = y + 'px';
  container.appendChild(particle);

  const xDir = (Math.random() - 0.5) * 100;
  const yDir = Math.random() * 60 + 20;

  particle.animate([
    { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
    { transform: `translate(${xDir}px, ${yDir}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-out'
  }).onfinish = () => particle.remove();
}

function startCardRevealing() {
  openingState = 'revealing';
  currentCardIndex = 0;

  const revealContainer = document.getElementById('cardRevealContainer');
  if (revealContainer) {
    revealContainer.classList.add('active');
  }

  showCard(currentCardIndex);
}

function showCard(index) {
  if (index >= currentPackCards.length) {
    showSummary();
    return;
  }

  const card = currentPackCards[index];
  const counterEl = document.getElementById('cardCounter');
  const revealedCard = document.getElementById('revealedCard');
  const cardFrontImg = document.getElementById('cardFrontImg');
  const cardHint = document.getElementById('cardHint');

  if (counterEl) counterEl.textContent = `Carta ${index + 1} de ${currentPackCards.length}`;

  if (revealedCard) {
    revealedCard.classList.remove('rare');
    if (card.rarity === 'rare') revealedCard.classList.add('rare');

    // Re-trigger enter animation
    revealedCard.style.animation = 'none';
    revealedCard.offsetHeight; // Force reflow
    revealedCard.style.animation = '';

    if (cardHint) {
      if (index < currentPackCards.length - 1) {
        cardHint.textContent = 'Haz clic en la carta para ver la siguiente';
      } else {
        cardHint.textContent = 'Haz clic para ver el resumen';
      }
    }

    // Click to advance to next card
    const clickHandler = () => {
      revealedCard.removeEventListener('click', clickHandler);
      currentCardIndex++;
      showCard(currentCardIndex);
    };

    // Remove previous listeners by replacing element
    const newCard = revealedCard.cloneNode(true);
    revealedCard.parentNode.replaceChild(newCard, revealedCard);
    newCard.id = 'revealedCard';

    // Set image on the new cloned element
    const newFrontImg = newCard.querySelector('#cardFrontImg');
    if (newFrontImg) newFrontImg.src = card.url;

    if (card.rarity === 'rare') newCard.classList.add('rare');

    newCard.addEventListener('click', clickHandler);
  }
}

function showSummary() {
  openingState = 'summary';

  const revealContainer = document.getElementById('cardRevealContainer');
  const summary = document.getElementById('cardSummary');
  const grid = document.getElementById('cardSummaryGrid');

  if (revealContainer) revealContainer.classList.remove('active');
  if (summary) summary.classList.add('active');

  if (grid) {
    grid.innerHTML = currentPackCards.map(card =>
      `<img src="${card.url}" alt="Carta Pokémon" class="${card.rarity === 'rare' ? 'rare-card' : ''}">`
    ).join('');
  }
}

// Global references for drag handlers (set in setupOpeningEvents)
let onMoveHandler = null;
let onEndHandler = null;

function closeCardOpening() {
  const overlay = document.getElementById('cardOpeningOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => { overlay.innerHTML = ''; }, 500);
  }
  // Reset all state for next opening
  openingState = 'pack';
  currentPackCards = [];
  currentCardIndex = 0;
  cutProgress = 0;
  isDragging = false;

  // Remove any lingering document-level listeners
  if (onMoveHandler) {
    document.removeEventListener('mousemove', onMoveHandler);
    document.removeEventListener('touchmove', onMoveHandler);
  }
  if (onEndHandler) {
    document.removeEventListener('mouseup', onEndHandler);
    document.removeEventListener('touchend', onEndHandler);
  }
  onMoveHandler = null;
  onEndHandler = null;
}

// ============================================
// MYSTERY BOX IN SHOP
// ============================================

function renderMysteryBox() {
  const shopGrid = document.getElementById('tiendaGrid');
  if (!shopGrid) return;

  // Check if already rendered
  if (shopGrid.querySelector('.mystery-box-card')) return;

  const mysteryCard = document.createElement('div');
  mysteryCard.className = 'mystery-box-card';
  mysteryCard.innerHTML = `
    <h3>Mystery Box</h3>
    <p>Abre un sobre con 10 cartas aleatorias de Pokémon TCG. ¡Incluye al menos 2 cartas raras!</p>
    <div class="mystery-price">${MYSTERY_BOX_COST} PokeCoins</div>
    <button class="mystery-buy-btn" data-cost="${MYSTERY_BOX_COST}" ${pokeCoins < MYSTERY_BOX_COST ? 'disabled' : ''}>
      ABRIR MYSTERY BOX
    </button>
  `;

  shopGrid.appendChild(mysteryCard);

  mysteryCard.querySelector('.mystery-buy-btn').addEventListener('click', buyMysteryBox);
}

// ============================================
// INTEGRATE POKECOINS WITH CART (discount in panel)
// ============================================

// ============================================
// SETUP POKECOINS
// ============================================

function setupPokeCoins() {
  loadPokeCoins();
  loadDiscount();

  // FAB button
  const fab = document.getElementById('pokecoinsFab');
  if (fab) {
    fab.addEventListener('click', openPokeCoinsPanel);
  }

  // Panel close
  const panelClose = document.getElementById('pokecoinsPanelClose');
  if (panelClose) panelClose.addEventListener('click', closePokeCoinsPanel);

  const panelOverlay = document.getElementById('pokecoinsPanelOverlay');
  if (panelOverlay) panelOverlay.addEventListener('click', closePokeCoinsPanel);

  // Redeem buttons
  document.querySelectorAll('.reward-redeem-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = parseFloat(btn.dataset.amount);
      const cost = parseInt(btn.dataset.cost);
      redeemReward(amount, cost);
    });
  });

  // Mystery box button (in panel)
  const mysteryPanelBtn = document.getElementById('mysteryBoxPanelBtn');
  if (mysteryPanelBtn) {
    mysteryPanelBtn.addEventListener('click', buyMysteryBox);
  }

  // Update badge
  updateCoinsBadge();

  // Patch cart rendering
  if (typeof renderCartPanel !== 'undefined') {
    const origFn = renderCartPanel;
    window.renderCartPanel = function() {
      origFn();
      // Add discount UI
      const footer = document.getElementById('cartPanelFooter');
      const totalEl = document.getElementById('cartTotal');
      if (!footer || !totalEl || cart.length === 0) return;

      const oldDiscount = footer.querySelector('.cart-discount');
      if (oldDiscount) oldDiscount.remove();

      if (activeDiscount) {
        const discountDiv = document.createElement('div');
        discountDiv.className = 'cart-discount';
        discountDiv.innerHTML = `
          <span>🪙 Descuento: -€${activeDiscount.amount.toFixed(2)}</span>
          <button class="cart-discount-remove" id="removeDiscountBtn">✕</button>
        `;

        const payBtn = footer.querySelector('.cart-pay-btn');
        footer.insertBefore(discountDiv, payBtn);

        discountDiv.querySelector('#removeDiscountBtn').addEventListener('click', () => {
          activeDiscount = null;
          saveDiscount();
          renderCartPanel();
        });

        const originalTotal = getCartTotal();
        const finalTotal = Math.max(0, originalTotal - activeDiscount.amount);
        totalEl.textContent = `€${finalTotal.toFixed(2)}`;
      }
    };
  }

  // If on shop page, render mystery box
  if (window.location.pathname.includes('tienda.html')) {
    setTimeout(renderMysteryBox, 100);
  }
}
