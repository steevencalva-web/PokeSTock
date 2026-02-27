// ============================================
// STATE MANAGEMENT
// ============================================

let cart = [];
let currentUser = null;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('pokestock_cart') || '[]');
    cart = saved.map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { product, qty: item.qty } : null;
    }).filter(Boolean);
  } catch { cart = []; }
}

function saveCart() {
  const toSave = cart.map(item => ({ productId: item.product.id, qty: item.qty }));
  localStorage.setItem('pokestock_cart', JSON.stringify(toSave));
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem('pokestock_users') || '[]'); }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('pokestock_users', JSON.stringify(users));
}

function loadCurrentUser() {
  try { currentUser = JSON.parse(localStorage.getItem('pokestock_current_user')); }
  catch { currentUser = null; }
}

function saveCurrentUser() {
  if (currentUser) {
    localStorage.setItem('pokestock_current_user', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('pokestock_current_user');
  }
}

function getOrders() {
  try { return JSON.parse(localStorage.getItem('pokestock_orders') || '[]'); }
  catch { return []; }
}

function saveOrderToStorage(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem('pokestock_orders', JSON.stringify(orders));
}

// Detect page
const isShopPage = window.location.pathname.includes('tienda.html');

// ============================================
// CAROUSEL
// ============================================

let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalSlides = carouselItems.length;

function updateCarouselDots() {
  const dotsContainer = document.getElementById('carouselDots');
  if (!dotsContainer) return;
  if (!dotsContainer.children.length) {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function goToSlide(n) {
  if (!carouselTrack) return;
  currentSlide = (n + totalSlides) % totalSlides;
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateCarouselDots();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function initCarousel() {
  if (document.getElementById('nextBtn')) {
    document.getElementById('nextBtn').addEventListener('click', nextSlide);
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    updateCarouselDots();
    setInterval(nextSlide, 5000);
  }
}

// ============================================
// PRODUCTS - SHOWCASE MODE (Main Page)
// ============================================

function renderShowcase(lista = products, gridEl = null) {
  const grid = gridEl || document.getElementById('productosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  lista.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card producto-card--showcase';
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <div class="producto-info">
        <p class="producto-categoria">${producto.categoria}</p>
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <a href="tienda.html" class="btn btn-comprar">COMPRAR</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderBestsellers() {
  const bestsellersGrid = document.getElementById('bestsellersGrid');
  if (!bestsellersGrid) return;
  const bestsellersList = [...products].sort((a, b) => b.precio - a.precio).slice(0, 3);
  renderShowcase(bestsellersList, bestsellersGrid);
}

// ============================================
// PRODUCTS - SHOP MODE (Tienda Page)
// ============================================

function renderShopProducts(lista = products, gridEl = null) {
  const grid = gridEl || document.getElementById('tiendaGrid');
  if (!grid) return;
  grid.innerHTML = '';

  // Update results count
  const countEl = document.getElementById('shopResultsCount');
  if (countEl) countEl.textContent = `${lista.length} producto${lista.length !== 1 ? 's' : ''}`;

  lista.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card';

    const stockText = producto.stock > 0 ? `${producto.stock} en stock` : 'Agotado';
    const stockClass = producto.stock > 0 ? '' : ' agotado';

    card.innerHTML = `
      <div class="producto-card-inner">
        ${producto.stock === 0 ? '<span class="producto-badge agotado-badge">AGOTADO</span>' : ''}
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
          <p class="producto-categoria">${producto.categoria}</p>
          <h3 class="producto-nombre">${producto.nombre}</h3>
          <p class="producto-stock${stockClass}">${stockText}</p>
          <p class="producto-precio">€${producto.precio.toFixed(2)}</p>
          <button class="btn btn-anadir" data-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>
            Añadir al carrito
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.btn-anadir').forEach(btn => {
    btn.addEventListener('click', handleAnadirProducto);
  });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function mostrarToast(mensaje, tipo = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// CART SYSTEM
// ============================================

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.product.precio * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const countEl = document.getElementById('cartCount');
  if (countEl) {
    const count = getCartCount();
    countEl.textContent = count;
    countEl.style.transform = 'scale(1.4)';
    setTimeout(() => { countEl.style.transform = 'scale(1)'; }, 200);
  }
}

function handleAnadirProducto(e) {
  const btn = e.target;
  const productId = parseInt(btn.dataset.id);
  const producto = products.find(p => p.id === productId);
  if (!producto) return;

  if (btn.classList.contains('adding')) return;
  btn.classList.add('adding');
  btn.textContent = '✓ Añadido';

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ product: producto, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  renderCartPanel();
  mostrarToast(`✓ ${producto.nombre} añadido al carrito`, 'success');

  setTimeout(() => {
    btn.textContent = 'Añadir al carrito';
    btn.classList.remove('adding');
  }, 1200);
}

// ============================================
// CART PANEL (Sidebar)
// ============================================

function openCart() {
  document.getElementById('cartPanel').classList.add('active');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderCartPanel();
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('active');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderCartPanel() {
  const body = document.getElementById('cartPanelBody');
  const footer = document.getElementById('cartPanelFooter');
  const totalEl = document.getElementById('cartTotal');
  const paymentEl = document.getElementById('cartPayment');
  const successEl = document.getElementById('cartSuccess');

  if (!body) return;

  paymentEl.style.display = 'none';
  successEl.style.display = 'none';

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  totalEl.textContent = `€${getCartTotal().toFixed(2)}`;

  body.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.product.imagen}" alt="${item.product.nombre}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.product.nombre}</div>
        <div class="cart-item-price">€${(item.product.precio * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button data-action="minus" data-index="${index}">−</button>
        <span>${item.qty}</span>
        <button data-action="plus" data-index="${index}">+</button>
      </div>
      <button class="cart-item-remove" data-index="${index}" title="Eliminar">🗑</button>
    </div>
  `).join('');

  body.querySelectorAll('[data-action="minus"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      if (cart[idx].qty > 1) cart[idx].qty -= 1;
      else cart.splice(idx, 1);
      saveCart();
      updateCartBadge();
      renderCartPanel();
    });
  });

  body.querySelectorAll('[data-action="plus"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart[idx].qty += 1;
      saveCart();
      updateCartBadge();
      renderCartPanel();
    });
  });

  body.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart.splice(idx, 1);
      saveCart();
      updateCartBadge();
      renderCartPanel();
    });
  });
}

function setupCart() {
  const toggleBtn = document.getElementById('cartToggle');
  const closeBtn = document.getElementById('cartClose');
  const overlay = document.getElementById('cartOverlay');
  const payBtn = document.getElementById('cartPayBtn');
  const paymentForm = document.getElementById('paymentForm');
  const successCloseBtn = document.getElementById('cartSuccessClose');

  if (toggleBtn) toggleBtn.addEventListener('click', openCart);
  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      document.getElementById('cartPanelFooter').style.display = 'none';
      document.getElementById('cartPayment').style.display = 'block';
    });
  }

  // Card number formatting
  const cardInput = document.getElementById('payCard');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  // Expiry formatting
  const expiryInput = document.getElementById('payExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length > 2) val = val.substring(0, 2) + '/' + val.substring(2);
      e.target.value = val;
    });
  }

  // CVV only numbers
  const cvvInput = document.getElementById('payCvv');
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  // Payment form
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('payName').value.trim();
      const card = document.getElementById('payCard').value.replace(/\s/g, '');
      const expiry = document.getElementById('payExpiry').value;
      const cvv = document.getElementById('payCvv').value;
      const email = document.getElementById('payEmail').value.trim();

      if (name.length < 3) { mostrarToast('✗ Ingresa un nombre válido', 'error'); return; }
      if (card.length < 13) { mostrarToast('✗ Número de tarjeta inválido', 'error'); return; }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) { mostrarToast('✗ Fecha de expiración inválida', 'error'); return; }
      if (cvv.length < 3) { mostrarToast('✗ CVV inválido', 'error'); return; }

      const paySubmitBtn = paymentForm.querySelector('button[type="submit"]');
      paySubmitBtn.textContent = 'PROCESANDO...';
      paySubmitBtn.disabled = true;

      setTimeout(() => {
        // Save order
        const order = {
          id: Date.now(),
          date: new Date().toLocaleDateString('es-ES'),
          items: cart.map(item => ({
            nombre: item.product.nombre,
            precio: item.product.precio,
            qty: item.qty,
            imagen: item.product.imagen
          })),
          total: getCartTotal(),
          email: email,
          nombre: name
        };
        saveOrderToStorage(order);

        // Show success
        document.getElementById('cartPanelBody').style.display = 'none';
        document.getElementById('cartPayment').style.display = 'none';
        document.getElementById('cartSuccess').style.display = 'block';

        // Award PokeCoins
        if (typeof addPokeCoins === 'function' && typeof coinsForPurchase === 'function') {
          const earned = coinsForPurchase(order.total);
          if (earned > 0) {
            addPokeCoins(earned);
            setTimeout(() => {
              mostrarToast(`🪙 ¡Has ganado ${earned} PokeCoins!`, 'success');
            }, 500);
          }
        }

        // Clear discount after use
        if (typeof activeDiscount !== 'undefined' && activeDiscount) {
          activeDiscount = null;
          if (typeof saveDiscount === 'function') saveDiscount();
        }

        // Clear cart
        cart = [];
        saveCart();
        updateCartBadge();

        // Reset form
        paymentForm.reset();
        paySubmitBtn.textContent = 'PAGAR AHORA';
        paySubmitBtn.disabled = false;

        mostrarToast('✓ ¡Pago procesado con éxito!', 'success');
      }, 1500);
    });
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      document.getElementById('cartSuccess').style.display = 'none';
      document.getElementById('cartPanelBody').style.display = 'block';
      renderCartPanel();
      closeCart();
    });
  }
}

// ============================================
// AUTH SYSTEM
// ============================================

function openAuthModal(mode = 'login') {
  const overlay = document.getElementById('authOverlay');
  const modal = document.getElementById('authModal');
  const loginForm = document.getElementById('loginFormContainer');
  const registerForm = document.getElementById('registerFormContainer');

  if (!overlay || !modal) return;

  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (mode === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }

  // Close user dropdown
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('active');
}

function closeAuthModal() {
  const overlay = document.getElementById('authOverlay');
  const modal = document.getElementById('authModal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = { name: user.name, email: user.email };
    saveCurrentUser();
    closeAuthModal();
    updateAuthUI();
    mostrarToast(`✓ ¡Bienvenido, ${user.name}!`, 'success');
    document.getElementById('loginFormEl').reset();
  } else {
    mostrarToast('✗ Email o contraseña incorrectos', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const password2 = document.getElementById('registerPassword2').value;

  if (name.length < 2) { mostrarToast('✗ Nombre demasiado corto', 'error'); return; }
  if (password.length < 6) { mostrarToast('✗ La contraseña debe tener al menos 6 caracteres', 'error'); return; }
  if (password !== password2) { mostrarToast('✗ Las contraseñas no coinciden', 'error'); return; }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    mostrarToast('✗ Ya existe una cuenta con ese email', 'error');
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);

  currentUser = { name, email };
  saveCurrentUser();
  closeAuthModal();
  updateAuthUI();
  mostrarToast(`✓ ¡Cuenta creada! Bienvenido, ${name}`, 'success');
  document.getElementById('registerFormEl').reset();
}

function logout() {
  currentUser = null;
  saveCurrentUser();
  updateAuthUI();
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) dropdown.classList.remove('active');
  mostrarToast('✓ Sesión cerrada', 'success');
}

function updateAuthUI() {
  const userBtn = document.getElementById('userBtn');
  if (!userBtn) return;

  if (currentUser) {
    const initial = currentUser.name.charAt(0).toUpperCase();
    userBtn.textContent = '';
    userBtn.innerHTML = `<span class="user-initial">${initial}</span>`;
    userBtn.classList.add('logged-in');
  } else {
    userBtn.textContent = '👤';
    userBtn.innerHTML = '👤';
    userBtn.classList.remove('logged-in');
  }
  renderUserDropdown();
}

function setupAuth() {
  const loginForm = document.getElementById('loginFormEl');
  const registerForm = document.getElementById('registerFormEl');
  const authOverlay = document.getElementById('authOverlay');
  const authCloseLogin = document.getElementById('authCloseLogin');
  const authCloseRegister = document.getElementById('authCloseRegister');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (authOverlay) authOverlay.addEventListener('click', closeAuthModal);
  if (authCloseLogin) authCloseLogin.addEventListener('click', closeAuthModal);
  if (authCloseRegister) authCloseRegister.addEventListener('click', closeAuthModal);

  if (showRegister) {
    showRegister.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('register');
    });
  }
  if (showLogin) {
    showLogin.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal('login');
    });
  }
}

// ============================================
// USER DROPDOWN MENU
// ============================================

function renderUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (!dropdown) return;

  if (currentUser) {
    dropdown.innerHTML = `
      <div class="user-dropdown-header">
        <span class="user-dropdown-name">${currentUser.name}</span>
        <span class="user-dropdown-email">${currentUser.email}</span>
      </div>
      <div class="user-dropdown-divider"></div>
      <button class="user-dropdown-item" id="ddAccount">Mi Cuenta</button>
      <button class="user-dropdown-item" id="ddOrders">Mis Pedidos</button>
      <button class="user-dropdown-item" id="ddCart">Mi Carrito <span class="dd-cart-count">${getCartCount()}</span></button>
      <div class="user-dropdown-divider"></div>
      <button class="user-dropdown-item user-dropdown-logout" id="ddLogout">Cerrar Sesión</button>
    `;

    const ddAccount = dropdown.querySelector('#ddAccount');
    const ddOrders = dropdown.querySelector('#ddOrders');
    const ddCart = dropdown.querySelector('#ddCart');
    const ddLogout = dropdown.querySelector('#ddLogout');

    if (ddAccount) ddAccount.addEventListener('click', () => { dropdown.classList.remove('active'); openAccountModal(); });
    if (ddOrders) ddOrders.addEventListener('click', () => { dropdown.classList.remove('active'); openOrdersModal(); });
    if (ddCart) ddCart.addEventListener('click', () => { dropdown.classList.remove('active'); openCart(); });
    if (ddLogout) ddLogout.addEventListener('click', logout);
  } else {
    dropdown.innerHTML = `
      <div class="user-dropdown-header">
        <span class="user-dropdown-name">Mi Cuenta</span>
      </div>
      <div class="user-dropdown-divider"></div>
      <button class="user-dropdown-item" id="ddLogin">Iniciar Sesión</button>
      <button class="user-dropdown-item" id="ddRegister">Registrarse</button>
    `;

    const ddLogin = dropdown.querySelector('#ddLogin');
    const ddRegister = dropdown.querySelector('#ddRegister');

    if (ddLogin) ddLogin.addEventListener('click', () => { dropdown.classList.remove('active'); openAuthModal('login'); });
    if (ddRegister) ddRegister.addEventListener('click', () => { dropdown.classList.remove('active'); openAuthModal('register'); });
  }
}

function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (!dropdown) return;
  renderUserDropdown();
  dropdown.classList.toggle('active');
}

function setupUserMenu() {
  const userBtn = document.getElementById('userBtn');
  if (userBtn) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleUserDropdown();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    const wrapper = document.querySelector('.user-menu-wrapper');
    if (dropdown && wrapper && !wrapper.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

// ============================================
// ACCOUNT SETTINGS MODAL
// ============================================

function openAccountModal() {
  if (!currentUser) { openAuthModal('login'); return; }

  const overlay = document.getElementById('accountOverlay');
  const modal = document.getElementById('accountModal');
  if (!overlay || !modal) return;

  // Populate fields
  const nameInput = document.getElementById('accountName');
  const emailInput = document.getElementById('accountEmail');
  if (nameInput) nameInput.value = currentUser.name;
  if (emailInput) emailInput.value = currentUser.email;

  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAccountModal() {
  const overlay = document.getElementById('accountOverlay');
  const modal = document.getElementById('accountModal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleAccountUpdate(e) {
  e.preventDefault();
  if (!currentUser) return;

  const newName = document.getElementById('accountName').value.trim();
  const oldPassword = document.getElementById('accountOldPassword').value;
  const newPassword = document.getElementById('accountNewPassword').value;

  if (newName.length < 2) { mostrarToast('✗ Nombre demasiado corto', 'error'); return; }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentUser.email);
  if (userIndex === -1) { mostrarToast('✗ Error: usuario no encontrado', 'error'); return; }

  // Update name
  users[userIndex].name = newName;
  currentUser.name = newName;

  // Change password if provided
  if (oldPassword || newPassword) {
    if (users[userIndex].password !== oldPassword) {
      mostrarToast('✗ Contraseña actual incorrecta', 'error');
      return;
    }
    if (newPassword.length < 6) {
      mostrarToast('✗ La nueva contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }
    users[userIndex].password = newPassword;
  }

  saveUsers(users);
  saveCurrentUser();
  updateAuthUI();
  closeAccountModal();

  // Clear password fields
  document.getElementById('accountOldPassword').value = '';
  document.getElementById('accountNewPassword').value = '';

  mostrarToast('✓ Datos actualizados correctamente', 'success');
}

function setupAccountModal() {
  const overlay = document.getElementById('accountOverlay');
  const closeBtn = document.getElementById('accountClose');
  const form = document.getElementById('accountFormEl');

  if (closeBtn) closeBtn.addEventListener('click', closeAccountModal);
  if (overlay) overlay.addEventListener('click', closeAccountModal);
  if (form) form.addEventListener('submit', handleAccountUpdate);
}

// ============================================
// ORDERS MODAL
// ============================================

function openOrdersModal() {
  if (!currentUser) { openAuthModal('login'); return; }

  const overlay = document.getElementById('ordersOverlay');
  const modal = document.getElementById('ordersModal');
  if (!overlay || !modal) return;

  renderOrdersContent();
  overlay.classList.add('active');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrdersModal() {
  const overlay = document.getElementById('ordersOverlay');
  const modal = document.getElementById('ordersModal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function renderOrdersContent() {
  const body = document.getElementById('ordersModalBody');
  if (!body) return;

  const orders = getOrders();

  // Current cart section
  let html = '<div class="orders-section">';
  html += '<h3 class="orders-section-title">En tu carrito</h3>';

  if (cart.length > 0) {
    html += '<div class="orders-cart-items">';
    cart.forEach(item => {
      html += `
        <div class="order-item">
          <img src="${item.product.imagen}" alt="${item.product.nombre}" class="order-item-img">
          <div class="order-item-info">
            <span class="order-item-name">${item.product.nombre}</span>
            <span class="order-item-detail">x${item.qty} — €${(item.product.precio * item.qty).toFixed(2)}</span>
          </div>
        </div>
      `;
    });
    html += `<div class="orders-cart-total">Total: €${getCartTotal().toFixed(2)}</div>`;
    html += '</div>';
  } else {
    html += '<p class="orders-empty-text">Tu carrito está vacío</p>';
  }
  html += '</div>';

  // Past orders section
  html += '<div class="orders-section">';
  html += '<h3 class="orders-section-title">Pedidos realizados</h3>';

  if (orders.length > 0) {
    orders.forEach(order => {
      html += `
        <div class="order-card">
          <div class="order-card-header">
            <span class="order-card-date">${order.date}</span>
            <span class="order-card-total">€${order.total.toFixed(2)}</span>
          </div>
          <div class="order-card-items">
      `;
      order.items.forEach(item => {
        html += `
          <div class="order-item">
            <img src="${item.imagen}" alt="${item.nombre}" class="order-item-img">
            <div class="order-item-info">
              <span class="order-item-name">${item.nombre}</span>
              <span class="order-item-detail">x${item.qty} — €${(item.precio * item.qty).toFixed(2)}</span>
            </div>
          </div>
        `;
      });
      html += `
          </div>
          <div class="order-card-footer">
            <span class="order-status">Completado</span>
          </div>
        </div>
      `;
    });
  } else {
    html += '<p class="orders-empty-text">No has realizado ningún pedido todavía</p>';
  }
  html += '</div>';

  body.innerHTML = html;
}

function setupOrdersModal() {
  const overlay = document.getElementById('ordersOverlay');
  const closeBtn = document.getElementById('ordersClose');

  if (closeBtn) closeBtn.addEventListener('click', closeOrdersModal);
  if (overlay) overlay.addEventListener('click', closeOrdersModal);
}

// ============================================
// EMAIL VALIDATION & NEWSLETTER
// ============================================

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleSuscripcion(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const email = input.value.trim();
  if (validarEmail(email)) {
    mostrarToast(`✓ Suscripción exitosa: ${email}`, 'success');
    input.value = '';
  } else {
    mostrarToast('✗ Por favor, ingresa un email válido', 'error');
  }
}

// ============================================
// SCROLL SUAVE Y NAVEGACIÓN ACTIVA
// ============================================

function setupNavegacion() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    // Skip page links (external pages)
    if (link.classList.contains('nav-link-page')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (!isShopPage) {
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        if (link.classList.contains('nav-link-page')) return;
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
  }
}

// ============================================
// SHOP PAGE FILTERS
// ============================================

function setupShopFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      const searchInput = document.getElementById('searchInput');
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

      let filtered = products;
      if (cat !== 'todos') {
        filtered = filtered.filter(p => p.categoria.toLowerCase() === cat);
      }
      if (searchTerm) {
        filtered = filtered.filter(p => p.nombre.toLowerCase().includes(searchTerm));
      }
      renderShopProducts(filtered);
    });
  });
}

// ============================================
// COOKIE BANNER
// ============================================

function setupCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const cookiePolicyLink = document.getElementById('cookiePolicyLink');

  if (!banner || !acceptBtn) return;

  if (!localStorage.getItem('cookiesAccepted')) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }

  acceptBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem('cookiesAccepted', 'true');
  });

  if (cookiePolicyLink) {
    cookiePolicyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyModal();
    });
  }
}

// ============================================
// MODAL DE PRIVACIDAD
// ============================================

function openPrivacyModal() {
  const overlay = document.getElementById('privacyOverlay');
  const modal = document.getElementById('privacyModal');
  if (overlay) overlay.classList.add('active');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  const overlay = document.getElementById('privacyOverlay');
  const modal = document.getElementById('privacyModal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function setupPrivacyModal() {
  const overlay = document.getElementById('privacyOverlay');
  const closeBtn = document.getElementById('privacyClose');

  const triggers = ['privacyLink', 'privacyLink2', 'cookiesLink'];
  triggers.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacyModal();
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closePrivacyModal);
  if (overlay) overlay.addEventListener('click', closePrivacyModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePrivacyModal();
      closeTermsModal();
      closeAuthModal();
      closeAccountModal();
      closeOrdersModal();
    }
  });
}

// ============================================
// TERMS & CONDITIONS MODAL
// ============================================

function openTermsModal() {
  const overlay = document.getElementById('termsOverlay');
  const modal = document.getElementById('termsModal');
  if (overlay) overlay.classList.add('active');
  if (modal) modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTermsModal() {
  const overlay = document.getElementById('termsOverlay');
  const modal = document.getElementById('termsModal');
  if (overlay) overlay.classList.remove('active');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function setupTermsModal() {
  const overlay = document.getElementById('termsOverlay');
  const closeBtn = document.getElementById('termsClose');
  const termsLink = document.getElementById('termsLink');

  if (termsLink) {
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openTermsModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTermsModal);
  if (overlay) overlay.addEventListener('click', closeTermsModal);
}

// ============================================
// HAMBURGER MENU (MOBILE)
// ============================================

function setupHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('mainNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when clicking a nav link (exclude expansiones toggle)
  nav.querySelectorAll('.nav-link:not(.expansiones-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// ============================================
// EXPANSIONES DROPDOWN
// ============================================

function setupExpansionesDropdown() {
  const toggles = document.querySelectorAll('.expansiones-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dropdown = toggle.nextElementSibling;
      const isOpen = dropdown.classList.contains('show');

      // Close all dropdowns first
      document.querySelectorAll('.expansiones-dropdown.show').forEach(d => d.classList.remove('show'));
      document.querySelectorAll('.expansiones-toggle.open').forEach(t => t.classList.remove('open'));

      if (!isOpen) {
        dropdown.classList.add('show');
        toggle.classList.add('open');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.expansiones-wrapper')) {
      document.querySelectorAll('.expansiones-dropdown.show').forEach(d => d.classList.remove('show'));
      document.querySelectorAll('.expansiones-toggle.open').forEach(t => t.classList.remove('open'));
    }
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Load state
  loadCart();
  loadCurrentUser();

  // Common setup
  updateCartBadge();
  updateAuthUI();
  setupCart();
  setupAuth();
  setupUserMenu();
  setupAccountModal();
  setupOrdersModal();
  setupNavegacion();

  setupCookieBanner();
  setupPrivacyModal();
  setupTermsModal();
  setupHamburger();
  setupExpansionesDropdown();

  // PokeCoins system
  if (typeof setupPokeCoins === 'function') setupPokeCoins();

  if (isShopPage) {
    // Shop page: render full product cards
    renderShopProducts();
    setupShopFilters();
  } else {
    // Main page: render showcase cards + carousel
    initCarousel();
    renderShowcase();
    renderBestsellers();

    const mainForm = document.getElementById('formSuscripcion');
    if (mainForm) mainForm.addEventListener('submit', handleSuscripcion);
  }
});
