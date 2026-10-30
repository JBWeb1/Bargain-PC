/* Bargain PC's — shared header, footer, cart and page rendering.
   Product data lives in assets/catalog.js. */
(function () {
  'use strict';

  const CATEGORIES = window.CATEGORIES || [];
  const PRODUCTS = window.PRODUCTS || [];
  const FREE_DELIVERY = 2000;
  const EMAIL = 'sales@bargainpcs.co.za';
  const PHONE = '+27 81 234 5678';

  /* ---------- Icons ---------- */
  const ICONS = {
    prebuilt: '<rect x="6" y="2" width="12" height="20" rx="1.5"/><path d="M9 6h6M9 9h6"/><circle cx="12" cy="16" r="2.5"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    gpu: '<rect x="2" y="6" width="20" height="11" rx="1.5"/><circle cx="8" cy="11.5" r="3"/><circle cx="16" cy="11.5" r="3"/><path d="M5 17v3M9 17v2"/>',
    motherboard: '<rect x="3" y="3" width="18" height="18" rx="1.5"/><rect x="7" y="7" width="6" height="6"/><path d="M16 7v10M18.5 7v10M7 16.5h6"/>',
    ram: '<rect x="2" y="7" width="20" height="9" rx="1"/><path d="M6 10v3M10 10v3M14 10v3M18 10v3M4 16v2M20 16v2M11 16v2"/>',
    storage: '<rect x="3" y="7" width="18" height="10" rx="1.5"/><circle cx="17" cy="12" r="1"/><path d="M6 12h6"/>',
    psu: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M13 8l-3 4.5h4L11 17"/>',
    case: '<rect x="6" y="2" width="12" height="20" rx="1.5"/><circle cx="12" cy="15" r="3"/><path d="M9 6h6"/>',
    cooling: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.5"/><path d="M12 10.5c0-3 1-5 3-5.5M13.5 12c3 0 5 1 5.5 3M12 13.5c0 3-1 5-3 5.5M10.5 12c-3 0-5-1-5.5-3"/>',
    monitor: '<rect x="2" y="4" width="20" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="1.5"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    mouse: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v3"/>',
    headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2.5" y="14" width="4" height="6" rx="1.5"/><rect x="17.5" y="14" width="4" height="6" rx="1.5"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    filter: '<path d="M3 5h18M6 12h12M10 19h4"/>',
    truck: '<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7"/><circle cx="5.5" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    returns: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  const icon = (name, cls) => `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.cpu}</svg>`;

  /* ---------- Helpers ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => 'R' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const params = new URLSearchParams(location.search);

  const catById = (id) => CATEGORIES.find((c) => c.id === id);
  const catHref = (c) => encodeURI(c.page);
  const productById = (id) => PRODUCTS.find((p) => p.id === id);
  const productByName = (name) => PRODUCTS.find((p) => p.name === name);
  const productHref = (p) => 'product-details.html?id=' + encodeURIComponent(p.id);
  const countIn = (catId) => PRODUCTS.filter((p) => p.cat === catId).length;

  function mediaHtml(p, eager) {
    const cat = catById(p.cat);
    const ph = `<div class="media placeholder">${icon(p.cat)}<span>${esc(cat ? cat.name : 'Product')}</span></div>`;
    if (!p.img) return ph;
    return `<div class="media" data-cat="${esc(p.cat)}" data-label="${esc(cat ? cat.name : '')}"><img src="${esc(encodeURI(p.img))}" alt="${esc(p.name)}"${eager ? '' : ' loading="lazy"'}></div>`;
  }

  // Swap any image that fails to load for a labelled placeholder
  function watchImages(root) {
    $$('.media img', root).forEach((img) => {
      const fail = () => {
        const media = img.parentElement;
        if (!media) return;
        media.classList.add('placeholder');
        media.innerHTML = `${icon(media.dataset.cat)}<span>${esc(media.dataset.label || 'Image coming soon')}</span>`;
      };
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener('error', fail, { once: true });
    });
  }

  /* ---------- Cart ---------- */
  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem('cart'));
      return Array.isArray(cart) ? cart.filter((i) => i && i.name && i.qty > 0) : [];
    } catch (e) { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
    updateCartCount();
  }
  function cartCount() { return getCart().reduce((n, i) => n + i.qty, 0); }
  function updateCartCount() { $$('[data-cart-count]').forEach((el) => { el.textContent = cartCount(); }); }

  function addToCart(p, qty) {
    qty = qty || 1;
    const cart = getCart();
    const existing = cart.find((i) => (p.id && i.id === p.id) || i.name === p.name);
    if (existing) existing.qty += qty;
    else cart.push({ id: p.id, name: p.name, price: p.price, qty: qty });
    saveCart(cart);
    toast(`${p.name} added to cart`);
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    if (!t) return;
    $('#toast-msg', t).textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  /* ---------- Layout: header & footer ---------- */
  function renderChrome() {
    const page = document.body.dataset.page;
    const current = (name) => (page === name ? ' aria-current="page"' : '');
    const q = esc(params.get('q') || '');
    const search = (extra) => `
      <form class="nav-search${extra || ''}" action="products.html" role="search">
        ${icon('search')}
        <input type="search" name="q" value="${q}" placeholder="Search CPUs, GPUs, monitors…" aria-label="Search products">
      </form>`;

    document.body.insertAdjacentHTML('afterbegin', `
      <div class="topbar">Free delivery on orders over ${money(FREE_DELIVERY)} · Nationwide shipping across South Africa</div>
      <header class="site-header">
        <div class="container nav">
          <a href="index.html" class="logo" aria-label="Bargain PC's home">
            <span class="logo-mark">BP</span><span>Bargain<em>PC's</em></span>
          </a>
          <ul class="nav-links" id="nav-links">
            <li><a href="index.html"${current('home')}>Home</a></li>
            <li><a href="products.html"${current('shop')}>Shop</a></li>
            <li><a href="index.html#deals">Deals</a></li>
            <li><a href="index.html#contact">Contact</a></li>
            <li>${search(' mobile')}</li>
          </ul>
          ${search()}
          <div class="nav-actions">
            <a href="cart.html" class="cart-link" aria-label="View cart"${current('cart')}>
              ${icon('cart')}<span class="label">Cart</span>
              <span class="cart-count" data-cart-count>0</span>
            </a>
            <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">${icon('menu')}</button>
          </div>
        </div>
      </header>`);

    const catLinks = CATEGORIES.slice(1, 9).map((c) => `<li><a href="${catHref(c)}">${esc(c.name)}</a></li>`).join('');
    const moreLinks = CATEGORIES.slice(9).concat(CATEGORIES.slice(0, 1)).map((c) => `<li><a href="${catHref(c)}">${esc(c.name)}</a></li>`).join('');
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a href="index.html" class="logo"><span class="logo-mark">BP</span><span>Bargain<em>PC's</em></span></a>
            <p>High-performance PC parts and gaming gear at prices that don't hurt. Delivered across South Africa.</p>
          </div>
          <div><h4>Components</h4><ul>${catLinks}</ul></div>
          <div><h4>More</h4><ul>${moreLinks}<li><a href="products.html">All products</a></li></ul></div>
          <div><h4>Get in touch</h4><ul>
            <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
            <li><a href="tel:${PHONE.replace(/\s/g, '')}">${PHONE}</a></li>
            <li class="muted">101 Tech Street, Cape Town</li>
            <li><a href="cart.html">Your cart</a></li>
          </ul></div>
        </div>
        <div class="footer-bottom"><div class="container">&copy; ${new Date().getFullYear()} Bargain PC's &amp; Parts. All rights reserved.</div></div>
      </footer>
      <div class="toast" id="toast" role="status" aria-live="polite"><span id="toast-msg"></span><a href="cart.html">View cart →</a></div>`);

    const main = $('main');
    if (main && !main.id) main.id = 'main';

    const toggle = $('#menu-toggle');
    const links = $('#nav-links');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
  }

  /* ---------- Shared pieces ---------- */
  function cardHtml(p) {
    const tag = p.stock ? `<span class="tag">${esc(p.stock)}</span>` : '';
    return `
      <article class="product-card">
        ${tag}${mediaHtml(p)}
        <div class="body">
          <span class="brand">${esc(p.brand)}</span>
          <h3><a href="${productHref(p)}">${esc(p.name)}</a></h3>
          <p>${esc(p.sub)}</p>
          <div class="foot">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" data-add="${esc(p.id)}" aria-label="Add ${esc(p.name)} to cart">${icon('plus')}</button>
          </div>
        </div>
      </article>`;
  }

  function catTileHtml(c, large) {
    const n = countIn(c.id);
    if (large) {
      return `<a class="cat-tile" href="${catHref(c)}">${icon(c.id)}
        <div><strong>${esc(c.name)}</strong><p>${esc(c.blurb)}</p></div>
        <span class="go">${n} product${n === 1 ? '' : 's'} →</span></a>`;
    }
    return `<a class="cat-tile" href="${catHref(c)}">${icon(c.id)}<div><strong>${esc(c.name)}</strong><small>${n} item${n === 1 ? '' : 's'}</small></div></a>`;
  }

  // One click handler for every "add to cart" button on the page
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    e.preventDefault();
    const p = productById(btn.dataset.add);
    if (p) addToCart(p, Number(btn.dataset.qty || 1));
  });

  /* ---------- Home ---------- */
  function initHome() {
    const cats = $('#home-categories');
    if (cats) cats.innerHTML = CATEGORIES.filter((c) => c.id !== 'prebuilt').map((c) => catTileHtml(c)).join('');

    const deals = $('#home-deals');
    if (deals) {
      const ids = (deals.dataset.ids || '').split(',').map((s) => s.trim());
      deals.innerHTML = ids.map(productById).filter(Boolean).map(cardHtml).join('');
      watchImages(deals);
    }
    $$('[data-stat="products"]').forEach((el) => { el.textContent = Math.floor(PRODUCTS.length / 10) * 10 + '+'; });
    $$('[data-stat="categories"]').forEach((el) => { el.textContent = CATEGORIES.length; });
  }

  /* ---------- Shop (category pages & all products) ---------- */
  function initShop() {
    const catId = document.body.dataset.category || params.get('cat') || '';
    const cat = catById(catId);
    const pool = cat ? PRODUCTS.filter((p) => p.cat === cat.id) : PRODUCTS.slice();

    document.title = (cat ? cat.name : 'Shop all products') + " | Bargain PC's";
    $('#shop-title').textContent = cat ? cat.name : (params.get('q') ? 'Search results' : 'Shop all products');
    $('#shop-blurb').textContent = cat ? cat.blurb : 'Every CPU, graphics card, monitor and accessory we stock, in one place.';
    $('#shop-crumb').innerHTML = cat
      ? `<a href="index.html">Home</a><span aria-hidden="true">/</span><a href="products.html">Shop</a><span aria-hidden="true">/</span><span>${esc(cat.name)}</span>`
      : `<a href="index.html">Home</a><span aria-hidden="true">/</span><span>Shop</span>`;

    // Category tiles only on the plain "all products" page
    const tiles = $('#shop-categories');
    if (tiles) {
      if (!cat && !params.get('q')) tiles.innerHTML = CATEGORIES.map((c) => catTileHtml(c, true)).join('');
      else tiles.closest('section').remove();
    }

    const state = {
      q: params.get('q') || '',
      brands: new Set((params.get('brand') || '').split('|').filter(Boolean)),
      facets: new Set((params.get('f') || '').split('|').filter(Boolean)),
      min: params.get('min') || '',
      max: params.get('max') || '',
      sort: params.get('sort') || ''
    };

    const uniq = (arr) => Array.from(new Set(arr)).filter(Boolean);
    const brands = uniq(pool.map((p) => p.brand)).sort((a, b) => a.localeCompare(b));
    const facets = cat && cat.facet ? uniq(pool.map((p) => p.facet)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) : [];

    const checkList = (name, values, chosen, key) => values.map((v) => {
      const n = pool.filter((p) => p[key] === v).length;
      return `<label class="check"><input type="checkbox" name="${name}" value="${esc(v)}"${chosen.has(v) ? ' checked' : ''}>${esc(v)}<small>${n}</small></label>`;
    }).join('');

    $('#filters').innerHTML = `
      <div class="filter-group">
        <h4>Search</h4>
        <input class="field" type="search" id="f-q" placeholder="Search ${esc(cat ? cat.name.toLowerCase() : 'products')}…" value="${esc(state.q)}">
      </div>
      <div class="filter-group">
        <h4>Category</h4>
        <ul class="cat-list">
          <li><a href="products.html"${!cat ? ' aria-current="page"' : ''}><span>All products</span><small>${PRODUCTS.length}</small></a></li>
          ${CATEGORIES.map((c) => `<li><a href="${catHref(c)}"${cat && cat.id === c.id ? ' aria-current="page"' : ''}><span>${esc(c.name)}</span><small>${countIn(c.id)}</small></a></li>`).join('')}
        </ul>
      </div>
      ${brands.length > 1 ? `<div class="filter-group"><h4>Brand</h4>${checkList('brand', brands, state.brands, 'brand')}</div>` : ''}
      ${facets.length > 1 ? `<div class="filter-group"><h4>${esc(cat.facet)}</h4>${checkList('facet', facets, state.facets, 'facet')}</div>` : ''}
      <div class="filter-group">
        <h4>Price (R)</h4>
        <div class="price-range">
          <input class="field" type="number" min="0" inputmode="numeric" id="f-min" placeholder="Min" value="${esc(state.min)}" aria-label="Minimum price">
          <span class="muted">–</span>
          <input class="field" type="number" min="0" inputmode="numeric" id="f-max" placeholder="Max" value="${esc(state.max)}" aria-label="Maximum price">
        </div>
      </div>
      <button class="btn btn-ghost" type="button" id="f-reset">Clear filters</button>`;

    $('#sort').value = state.sort;

    const grid = $('#product-grid');
    const chips = $('#chips');

    function apply() {
      const q = state.q.trim().toLowerCase();
      const min = parseFloat(state.min);
      const max = parseFloat(state.max);
      let list = pool.filter((p) => {
        if (q) {
          const c = catById(p.cat);
          const hay = [p.name, p.brand, p.sub, p.specs, c && c.name].join(' ').toLowerCase();
          if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
        }
        if (state.brands.size && !state.brands.has(p.brand)) return false;
        if (state.facets.size && !state.facets.has(p.facet)) return false;
        if (!isNaN(min) && p.price < min) return false;
        if (!isNaN(max) && p.price > max) return false;
        return true;
      });
      if (state.sort === 'low') list.sort((a, b) => a.price - b.price);
      if (state.sort === 'high') list.sort((a, b) => b.price - a.price);
      if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));

      $('#result-count').textContent = list.length;
      grid.innerHTML = list.length
        ? list.map(cardHtml).join('')
        : `<div class="empty" style="grid-column:1/-1"><h3>No products match</h3><p>Try a different search or clear some filters.</p><button class="btn btn-ghost" type="button" data-clear>Clear filters</button></div>`;
      watchImages(grid);

      // Active filter chips
      const chipList = [];
      if (state.q) chipList.push(['q', '', `“${state.q}”`]);
      state.brands.forEach((b) => chipList.push(['brand', b, b]));
      state.facets.forEach((f) => chipList.push(['facet', f, f]));
      if (state.min) chipList.push(['min', '', 'From ' + money(state.min)]);
      if (state.max) chipList.push(['max', '', 'Up to ' + money(state.max)]);
      chips.innerHTML = chipList.map(([k, v, label]) => `<button class="chip" type="button" data-chip="${k}" data-value="${esc(v)}">${esc(label)} ${icon('close')}</button>`).join('');

      // Keep the URL in sync so filtered views can be shared
      const u = new URLSearchParams();
      if (!document.body.dataset.category && cat) u.set('cat', cat.id);
      if (state.q) u.set('q', state.q);
      if (state.brands.size) u.set('brand', Array.from(state.brands).join('|'));
      if (state.facets.size) u.set('f', Array.from(state.facets).join('|'));
      if (state.min) u.set('min', state.min);
      if (state.max) u.set('max', state.max);
      if (state.sort) u.set('sort', state.sort);
      const qs = u.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
    }

    function reset() {
      state.q = ''; state.min = ''; state.max = '';
      state.brands.clear(); state.facets.clear();
      $('#f-q').value = ''; $('#f-min').value = ''; $('#f-max').value = '';
      $$('#filters input[type=checkbox]').forEach((c) => { c.checked = false; });
      apply();
    }

    const filters = $('#filters');
    filters.addEventListener('input', (e) => {
      const t = e.target;
      if (t.id === 'f-q') state.q = t.value;
      else if (t.id === 'f-min') state.min = t.value;
      else if (t.id === 'f-max') state.max = t.value;
      else if (t.name === 'brand' || t.name === 'facet') {
        const set = t.name === 'brand' ? state.brands : state.facets;
        t.checked ? set.add(t.value) : set.delete(t.value);
      } else return;
      apply();
    });
    $('#f-reset').addEventListener('click', reset);
    $('#sort').addEventListener('change', (e) => { state.sort = e.target.value; apply(); });
    $('#filter-toggle').addEventListener('click', (e) => {
      const open = filters.classList.toggle('open');
      e.currentTarget.setAttribute('aria-expanded', open);
    });
    grid.addEventListener('click', (e) => { if (e.target.closest('[data-clear]')) reset(); });
    chips.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-chip]');
      if (!chip) return;
      const k = chip.dataset.chip, v = chip.dataset.value;
      if (k === 'q') { state.q = ''; $('#f-q').value = ''; }
      if (k === 'min') { state.min = ''; $('#f-min').value = ''; }
      if (k === 'max') { state.max = ''; $('#f-max').value = ''; }
      if (k === 'brand' || k === 'facet') {
        (k === 'brand' ? state.brands : state.facets).delete(v);
        const box = $$(`#filters input[name=${k}]`).find((c) => c.value === v);
        if (box) box.checked = false;
      }
      apply();
    });

    apply();
  }

  /* ---------- Product details ---------- */
  function initProduct() {
    const root = $('#product');
    let p = productById(params.get('id'));
    if (!p) {
      // Older links stored the product name instead of an id
      let legacy = null;
      try { legacy = localStorage.getItem('selectedProduct'); } catch (e) { /* ignore */ }
      p = productByName(params.get('name') || legacy);
    }
    if (!p) {
      document.title = "Product not found | Bargain PC's";
      root.innerHTML = `<div class="empty" style="margin:3rem 0"><h3>We couldn't find that product</h3><p>It may have sold out or moved.</p><a class="btn btn-primary" href="products.html">Browse all products</a></div>`;
      return;
    }
    const cat = catById(p.cat);
    document.title = p.name + " | Bargain PC's";
    $('#crumbs').innerHTML = `<a href="index.html">Home</a><span aria-hidden="true">/</span><a href="products.html">Shop</a><span aria-hidden="true">/</span>${cat ? `<a href="${catHref(cat)}">${esc(cat.name)}</a><span aria-hidden="true">/</span>` : ''}<span>${esc(p.name)}</span>`;

    const specs = (p.sub + ' • ' + (p.specs || '')).split(/\s*[•,·]\s*/).map((s) => s.trim()).filter(Boolean);
    const uniqSpecs = Array.from(new Set(specs));
    const stockClass = p.stock ? ' warn' : '';
    const freeDelivery = p.price >= FREE_DELIVERY;

    root.innerHTML = `
      <div class="detail">
        ${mediaHtml(p, true)}
        <div>
          <span class="eyebrow">${esc(p.brand)}${cat ? ' · ' + esc(cat.name) : ''}</span>
          <h1>${esc(p.name)}</h1>
          <p class="sub">${esc(p.sub)}</p>
          <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap">
            <span class="price">${money(p.price)}</span>
            <span class="stock${stockClass}">${esc(p.stock || 'In stock')}</span>
          </div>
          <div class="buy-row">
            <div class="qty" aria-label="Quantity">
              <button type="button" data-step="-1" aria-label="Decrease quantity">−</button>
              <output id="qty">1</output>
              <button type="button" data-step="1" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary" type="button" data-add="${esc(p.id)}" data-qty="1" id="buy">${icon('cart')} Add to cart</button>
          </div>
          <h3 style="font-size:1rem;margin-bottom:.75rem">Key specs</h3>
          <ul class="spec-list">${uniqSpecs.map((s) => `<li>${icon('check')}${esc(s)}</li>`).join('')}</ul>
          <div class="assurances">
            <div><strong>${freeDelivery ? 'Free delivery' : 'Fast delivery'}</strong>${freeDelivery ? 'This item qualifies' : 'Free over ' + money(FREE_DELIVERY)}</div>
            <div><strong>12-month warranty</strong>On every component</div>
            <div><strong>Need advice?</strong><a href="mailto:${EMAIL}?subject=${encodeURIComponent('Question about ' + p.name)}" style="color:var(--accent)">Email us</a></div>
          </div>
        </div>
      </div>`;
    watchImages(root);

    let qty = 1;
    root.addEventListener('click', (e) => {
      const step = e.target.closest('[data-step]');
      if (!step) return;
      qty = Math.max(1, Math.min(20, qty + Number(step.dataset.step)));
      $('#qty').textContent = qty;
      $('#buy').dataset.qty = qty;
    });

    const related = PRODUCTS.filter((r) => r.cat === p.cat && r.id !== p.id)
      .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
      .slice(0, 4);
    const relSection = $('#related');
    if (related.length) {
      $('#related-grid').innerHTML = related.map(cardHtml).join('');
      if (cat) $('#related-more').href = catHref(cat);
      watchImages(relSection);
    } else {
      relSection.remove();
    }
  }

  /* ---------- Cart page ---------- */
  function initCart() {
    const root = $('#cart');

    function render() {
      const cart = getCart();
      if (!cart.length) {
        root.innerHTML = `<div class="empty" style="margin:2.5rem 0 4.5rem">${icon('cart')}<h3 style="margin-top:.75rem">Your cart is empty</h3><p>Find something good — there are ${PRODUCTS.length}+ parts waiting.</p><a class="btn btn-primary" href="products.html">Start shopping</a></div>`;
        return;
      }
      const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const items = cart.reduce((s, i) => s + i.qty, 0);
      const toFree = Math.max(0, FREE_DELIVERY - subtotal);
      const pct = Math.min(100, (subtotal / FREE_DELIVERY) * 100);

      root.innerHTML = `
        <div class="cart-layout">
          <div class="cart-items">
            ${cart.map((item, idx) => {
              const p = (item.id && productById(item.id)) || productByName(item.name) || { name: item.name, cat: '' };
              const link = p.id ? productHref(p) : null;
              return `
              <div class="cart-item">
                ${mediaHtml(p)}
                <div>
                  <h3>${link ? `<a href="${link}">${esc(item.name)}</a>` : esc(item.name)}</h3>
                  <div class="each">${money(item.price)} each</div>
                  <div class="controls">
                    <div class="qty small" aria-label="Quantity">
                      <button type="button" data-qty-idx="${idx}" data-step="-1" aria-label="Decrease quantity">−</button>
                      <output>${item.qty}</output>
                      <button type="button" data-qty-idx="${idx}" data-step="1" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="link-btn" type="button" data-remove="${idx}">Remove</button>
                  </div>
                </div>
                <div class="line">${money(item.price * item.qty)}</div>
              </div>`;
            }).join('')}
            <div style="display:flex;justify-content:space-between;gap:1rem;margin-top:.5rem;flex-wrap:wrap">
              <a class="btn btn-ghost" href="products.html">← Continue shopping</a>
              <button class="link-btn" type="button" data-clear-cart>Empty cart</button>
            </div>
          </div>
          <aside class="summary">
            <h2>Order summary</h2>
            <div class="progress">
              ${toFree ? `You're <strong style="color:var(--text)">${money(toFree)}</strong> away from free delivery.` : '<strong style="color:var(--ok)">You qualify for free delivery.</strong>'}
              <div class="bar"><i style="width:${pct}%"></i></div>
            </div>
            <dl>
              <div><dt>Items</dt><dd>${items}</dd></div>
              <div><dt>Subtotal</dt><dd>${money(subtotal)}</dd></div>
              <div><dt>Delivery</dt><dd>${toFree ? 'Calculated at checkout' : 'Free'}</dd></div>
              <div class="total"><dt>Total</dt><dd>${money(subtotal)}</dd></div>
            </dl>
            <a class="btn btn-primary btn-block" id="checkout" href="#">${icon('mail')} Place order by email</a>
            <p class="note">We'll email you to confirm stock, delivery and payment. Prices include VAT.</p>
          </aside>
        </div>`;
      watchImages(root);

      const lines = cart.map((i) => `${i.qty} x ${i.name} — ${money(i.price * i.qty)}`).join('\n');
      const body = `Hi Bargain PC's,\n\nI'd like to order:\n\n${lines}\n\nSubtotal: ${money(subtotal)}\n\nName:\nDelivery address:\nPhone:\n`;
      $('#checkout').href = `mailto:${EMAIL}?subject=${encodeURIComponent('New order (' + items + ' items)')}&body=${encodeURIComponent(body)}`;
    }

    root.addEventListener('click', (e) => {
      const cart = getCart();
      const step = e.target.closest('[data-qty-idx]');
      const rm = e.target.closest('[data-remove]');
      if (step) {
        const i = Number(step.dataset.qtyIdx);
        cart[i].qty += Number(step.dataset.step);
        if (cart[i].qty <= 0) cart.splice(i, 1);
      } else if (rm) {
        cart.splice(Number(rm.dataset.remove), 1);
      } else if (e.target.closest('[data-clear-cart]')) {
        if (!confirm('Remove everything from your cart?')) return;
        cart.length = 0;
      } else return;
      saveCart(cart);
      render();
    });
    window.addEventListener('storage', render);
    render();
  }

  /* ---------- Boot ---------- */
  renderChrome();
  const page = document.body.dataset.page;
  if (page === 'home') initHome();
  if (page === 'shop') initShop();
  if (page === 'product') initProduct();
  if (page === 'cart') initCart();
  watchImages(document);
})();
