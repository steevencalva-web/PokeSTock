// ============================================
// CAROUSEL
// ============================================

let currentSlide = 0;
const carouselTrack = document.getElementById('carouselTrack');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalSlides = carouselItems.length;

function updateCarouselDots() {
  const dotsContainer = document.getElementById('carouselDots');
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
// PRODUCTOS
// ============================================

function renderProductos(lista = products, gridEl = null) {
  const productosGrid = gridEl || document.getElementById('productosGrid');
  productosGrid.innerHTML = '';

  lista.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto-card';
    
    const stock = producto.stock > 0 
      ? `${producto.stock} en stock`
      : 'Agotado';
    
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <div class="producto-info">
        <p class="producto-categoria">${producto.categoria}</p>
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-stock">${stock}</p>
        <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
        <button class="btn btn-anadir" data-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>
          Añadir al carrito
        </button>
      </div>
    `;
    
    productosGrid.appendChild(card);
  });

  productosGrid.querySelectorAll('.btn-anadir').forEach(btn => {
    btn.addEventListener('click', handleAnadirProducto);
  });
}

function renderBestsellers() {
  const bestsellersGrid = document.getElementById('bestsellersGrid');
  if (!bestsellersGrid) return;
  const bestsellersList = [...products].sort((a, b) => b.precio - a.precio).slice(0, 3);
  renderProductos(bestsellersList, bestsellersGrid);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function mostrarToast(mensaje, tipo = 'success') {
  const toastContainer = document.getElementById('toastContainer');
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
// CARRITO - Full Cart System
// ============================================

let cart = []; // Array of { product, qty }

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

  // Add to cart array
  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ product: producto, qty: 1 });
  }

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

  // Hide payment/success if we're re-rendering items
  paymentEl.style.display = 'none';
  successEl.style.display = 'none';

  if (cart.length === 0) {
    body.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  totalEl.textContent = `$${getCartTotal().toFixed(2)}`;

  body.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.product.imagen}" alt="${item.product.nombre}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-name">${item.product.nombre}</div>
        <div class="cart-item-price">$${(item.product.precio * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button data-action="minus" data-index="${index}">−</button>
        <span>${item.qty}</span>
        <button data-action="plus" data-index="${index}">+</button>
      </div>
      <button class="cart-item-remove" data-index="${index}" title="Eliminar">🗑</button>
    </div>
  `).join('');

  // Quantity buttons
  body.querySelectorAll('[data-action="minus"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      if (cart[idx].qty > 1) {
        cart[idx].qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
      updateCartBadge();
      renderCartPanel();
    });
  });

  body.querySelectorAll('[data-action="plus"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart[idx].qty += 1;
      updateCartBadge();
      renderCartPanel();
    });
  });

  // Remove buttons
  body.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      cart.splice(idx, 1);
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

  // "Proceder al pago" button
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      document.getElementById('cartPanelFooter').style.display = 'none';
      document.getElementById('cartPayment').style.display = 'block';
    });
  }

  // Card number formatting (add spaces every 4 digits)
  const cardInput = document.getElementById('payCard');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = val;
    });
  }

  // Expiry formatting (MM/YY)
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

  // Payment form submission
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('payName').value.trim();
      const card = document.getElementById('payCard').value.replace(/\s/g, '');
      const expiry = document.getElementById('payExpiry').value;
      const cvv = document.getElementById('payCvv').value;
      const email = document.getElementById('payEmail').value.trim();

      if (name.length < 3) {
        mostrarToast('✗ Ingresa un nombre válido', 'error');
        return;
      }
      if (card.length < 13) {
        mostrarToast('✗ Número de tarjeta inválido', 'error');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        mostrarToast('✗ Fecha de expiración inválida', 'error');
        return;
      }
      if (cvv.length < 3) {
        mostrarToast('✗ CVV inválido', 'error');
        return;
      }

      // Simulate payment processing
      const payBtn = paymentForm.querySelector('button[type="submit"]');
      payBtn.textContent = 'PROCESANDO...';
      payBtn.disabled = true;

      setTimeout(() => {
        // Show success
        document.getElementById('cartPanelBody').style.display = 'none';
        document.getElementById('cartPayment').style.display = 'none';
        document.getElementById('cartSuccess').style.display = 'block';
        
        // Clear cart
        cart = [];
        updateCartBadge();
        
        // Reset form
        paymentForm.reset();
        payBtn.textContent = 'PAGAR AHORA';
        payBtn.disabled = false;

        mostrarToast('✓ ¡Pago procesado con éxito!', 'success');
      }, 1500);
    });
  }

  // Close success screen
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

function handleFooterNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const email = input.value.trim();
  if (validarEmail(email)) {
    mostrarToast(`✓ ¡Gracias! Recibirás novedades en ${email}`, 'success');
    input.value = '';
  } else {
    mostrarToast('✗ Email inválido', 'error');
  }
}

// ============================================
// SCROLL SUAVE Y NAVEGACIÓN ACTIVA
// ============================================

function setupNavegacion() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 200) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// BÚSQUEDA
// ============================================

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter(p => p.nombre.toLowerCase().includes(term));
    renderProductos(filtered);
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

  // Mostrar banner si no se han aceptado las cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
  }

  acceptBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
    localStorage.setItem('cookiesAccepted', 'true');
  });

  // Link de política de cookies abre el modal de privacidad
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

  // Links que abren el modal
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

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closePrivacyModal());
  }
  if (overlay) {
    overlay.addEventListener('click', () => closePrivacyModal());
  }

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePrivacyModal();
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  renderProductos();
  renderBestsellers();
  setupNavegacion();
  setupSearch();
  setupCart();
  setupCookieBanner();
  setupPrivacyModal();

  const mainForm = document.getElementById('formSuscripcion');
  if (mainForm) mainForm.addEventListener('submit', handleSuscripcion);

  const footerNews = document.getElementById('footerNewsletter');
  if (footerNews) footerNews.addEventListener('submit', handleFooterNewsletter);
});
