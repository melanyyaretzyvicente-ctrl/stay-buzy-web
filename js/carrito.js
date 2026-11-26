/* Carrito: botón vino flotante (esquina inferior derecha) + panel lateral. Se guarda en el navegador. */
/* ===== AJUSTES DE LA TIENDA (cambia aquí precios de envío, cupones y datos de pago) ===== */
const TIENDA = {
  demo: true,                         // true = pagos de prueba (no cobra nada). Pon false al conectar tu pasarela
  envioGratisDesde: 999,              // envío estándar gratis desde este monto
  cupones: { BUZY10: 10 },            // código: % de descuento
  envios: [
    { id: 'std', nombre: 'Envío estándar', dias: [3, 6], precio: 99 },
    { id: 'exp', nombre: 'Envío exprés', dias: [1, 3], precio: 169 },
    { id: 'rec', nombre: 'Recoger en punto de entrega', dias: [1, 2], precio: 0 }
  ],
  cargoContraEntrega: 0,
  whatsappGrupo: 'https://chat.whatsapp.com/C8NnMgLd0lBEJoIrv0CNPh?s=cl&p=a&iam=2',
  instagram: 'https://www.instagram.com/stay_.buzy?bqrl=ZXJnYjdxdmVkM3R6',
  clabe: '000000000000000000'         // tu CLABE real para SPEI
};

const Carrito = (() => {
  const K = 'stayBuzyCarrito';
  let items = [];
  try { items = (JSON.parse(localStorage.getItem(K)) || []).filter(i => PRODUCTOS.some(p => p.id === i.id)); } catch (e) {}
  const prod = id => PRODUCTOS.find(p => p.id === id);
  const lineas = () => items.map(i => ({ ...i, p: prod(i.id) }));
  const cuenta = () => items.reduce((s, i) => s + i.cant, 0);
  const subtotal = () => lineas().reduce((s, l) => s + l.p.precio * l.cant, 0);
  const guardar = () => { try { localStorage.setItem(K, JSON.stringify(items)); } catch (e) {} pintar(); };
  const buscar = (id, talla) => items.find(i => i.id === id && i.talla === talla);
  function agregar(id, talla, cant = 1) {
    const l = buscar(id, talla);
    if (l) l.cant = Math.min(10, l.cant + cant); else items.push({ id, talla, cant });
    guardar();
  }
  function cambiar(id, talla, d) {
    const l = buscar(id, talla); if (!l) return;
    l.cant += d;
    if (l.cant < 1) items = items.filter(i => i !== l);
    l.cant = Math.min(l.cant, 10);
    guardar();
  }
  const quitar = (id, talla) => { items = items.filter(i => !(i.id === id && i.talla === talla)); guardar(); };
  const vaciar = () => { items = []; guardar(); };

  /* ----- Panel y botón ----- */
  const sin = document.body.dataset.sinCarrito !== undefined;
  let fab, panel;
  const bolsa = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
  function montar() {
    if (sin) return;
    document.body.insertAdjacentHTML('beforeend', `
      <button class="cb-fab" id="cbFab" aria-label="Abrir carrito">${bolsa}<b id="cbN"></b></button>
      <div class="cb-vel" id="cbVel"></div>
      <aside class="cb" id="cbPanel" role="dialog" aria-modal="true" aria-label="Tu carrito"></aside>`);
    fab = document.getElementById('cbFab'); panel = document.getElementById('cbPanel');
    fab.onclick = abrir;
    document.getElementById('cbVel').onclick = cerrar;
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
    panel.addEventListener('click', e => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const { a, id, t } = b.dataset;
      if (a === 'mas') cambiar(id, t, 1); else if (a === 'menos') cambiar(id, t, -1);
      else if (a === 'quitar') quitar(id, t); else if (a === 'cerrar') cerrar();
    });
    pintar();
  }
  const abrir = () => { document.body.classList.add('cb-abierto'); panel.querySelector('button').focus(); };
  const cerrar = () => { document.body.classList.remove('cb-abierto'); };

  function pintar() {
    if (!panel) { document.dispatchEvent(new Event('carrito:cambio')); return; }
    const n = cuenta(), sub = subtotal(), falta = TIENDA.envioGratisDesde - sub;
    document.getElementById('cbN').textContent = n || '';
    fab.classList.toggle('vacio', !n);
    fab.setAttribute('aria-label', 'Abrir carrito, ' + n + ' productos');
    const filas = lineas().map(l => `
      <li class="cb__fila">
        <img src="assets/catalogo/${l.id}.jpg" alt="${l.p.nombre}">
        <div>
          <p class="cb__nom">${l.p.nombre}</p>
          <p class="cb__sub">Talla ${l.talla === 'Única' ? 'única' : l.talla} · ${precio(l.p.precio)}</p>
          <div class="cb__cant">
            <button data-a="menos" data-id="${l.id}" data-t="${l.talla}" aria-label="Quitar una pieza">−</button>
            <span>${l.cant}</span>
            <button data-a="mas" data-id="${l.id}" data-t="${l.talla}" aria-label="Agregar una pieza">+</button>
            <button class="cb__quitar" data-a="quitar" data-id="${l.id}" data-t="${l.talla}">Quitar</button>
          </div>
        </div>
        <p class="cb__imp">${precio(l.p.precio * l.cant)}</p>
      </li>`).join('');
    panel.innerHTML = `
      <div class="cb__cab"><h2>Tu carrito${n ? ' (' + n + ')' : ''}</h2><button data-a="cerrar" aria-label="Cerrar carrito">✕</button></div>
      ${n ? `
        <div class="cb__envio">${falta > 0 ? `Te faltan <b>${precio(falta)}</b> para envío gratis` : 'Tu envío estándar es gratis'}
          <div class="cb__barra"><i style="width:${Math.min(100, sub / TIENDA.envioGratisDesde * 100)}%"></i></div></div>
        <ul class="cb__lista">${filas}</ul>
        <div class="cb__pie">
          <p class="cb__tot"><span>Subtotal</span><span>${precio(sub)} MXN</span></p>
          <p class="cb__nota">Precios con IVA. El envío y los descuentos se calculan al pagar.</p>
          <a class="btn btn--lleno" href="pago.html">Finalizar compra</a>
          <button class="btn btn--borde" data-a="cerrar">Seguir comprando</button>
        </div>` : `
        <div class="cb__vacio"><p>Aún no hay nada aquí.</p><a class="btn btn--lleno" href="index.html#catalogo">Ver catálogo</a></div>`}`;
    document.dispatchEvent(new Event('carrito:cambio'));
  }
  const salta = () => { fab && (fab.classList.remove('salta'), void fab.offsetWidth, fab.classList.add('salta')); };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', montar) : montar();
  return { agregar, cambiar, quitar, vaciar, lineas, cuenta, subtotal, abrir, cerrar, salta };
})();
