/* Perfil: foto, nombre, apodo, pedidos y seguimiento con simulación de GPS */
const pf = document.getElementById('pf');
let filtro = 'todos', abierto = null;
const PASOS = [['Recibido', 0], ['Preparando', 40], ['En camino', 90], ['Entregado', 300]];   // segundos (demo acelerada)
const seg = p => (Date.now() - p.fecha) / 1000;
const fase = p => seg(p) < 90 ? 'recibido' : seg(p) < 300 ? 'camino' : 'entregado';
const NOMF = { recibido: 'Recibido', camino: 'En camino', entregado: 'Entregado' }, CLS = { recibido: 'r', camino: 'c', entregado: 'e' };
const hora = t => new Date(t).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function vista() {
  const s = Cuenta.sesion();
  if (!s) { pf.innerHTML = '<div class="pf__vacio"><h1>Mi perfil</h1><p>Inicia sesión para ver tu perfil y el seguimiento de tus pedidos.</p><button id="ent">Iniciar sesión o crear cuenta</button></div>'; document.getElementById('ent').onclick = () => Cuenta.abrir(); return; }
  pf.innerHTML = `<div class="pf__cab"><div><div class="foto-p" id="fp">${s.foto ? `<img src="${esc(s.foto)}" alt="Tu foto">` : esc((s.apodo || s.nombre)[0].toUpperCase())}</div>
      <label class="cambiar">Cambiar foto<input type="file" id="ft" accept="image/*" hidden></label></div>
    <form class="pf__form" id="pfF"><h1 style="grid-column:1/-1">${esc(s.apodo || s.nombre)}</h1>
      <label>Nombre<input name="nombre" value="${esc(s.nombre)}" required></label><label>Apodo<input name="apodo" value="${esc(s.apodo)}" required></label>
      <label style="grid-column:1/-1">Correo<input value="${esc(s.email)}" disabled></label>
      <button class="guardar">Guardar cambios</button><span class="ok" role="status" id="ok"></span></form></div>
    <h2 id="pedidos">Mis pedidos</h2>
    <div class="filtros" id="fl">${[['todos', 'Todos'], ['recibido', 'Recibido'], ['camino', 'En camino'], ['entregado', 'Entregado']].map(([k, n]) => `<button data-f="${k}" class="${k === filtro ? 'on' : ''}">${n}</button>`).join('')}</div>
    <div id="lista"></div>`;
  document.getElementById('pfF').onsubmit = e => { e.preventDefault(); const f = e.target.elements; if (!f.nombre.value.trim() || !f.apodo.value.trim()) return; Cuenta.guardar({ nombre: f.nombre.value.trim(), apodo: f.apodo.value.trim() }); document.getElementById('ok').textContent = 'Cambios guardados.'; };
  document.getElementById('ft').onchange = e => foto(e.target.files[0]);
  document.getElementById('fl').onclick = e => { if (e.target.dataset.f) { filtro = e.target.dataset.f; document.querySelectorAll('#fl button').forEach(b => b.classList.toggle('on', b === e.target)); lista(); } };
  document.getElementById('lista').onclick = e => { const b = e.target.closest('[data-n]'); if (b) { abierto = abierto === b.dataset.n ? null : b.dataset.n; lista(); } };
  lista();
}
function foto(file) {
  if (!file) return; const r = new FileReader();
  r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = c.height = 240; const m = Math.min(im.width, im.height);
    c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, 240, 240); Cuenta.guardar({ foto: c.toDataURL('image/jpeg', .85) }); vista(); }; im.src = r.result; };
  r.readAsDataURL(file);
}
function lista() {
  const ps = Cuenta.pedidos().filter(p => filtro === 'todos' || fase(p) === filtro);
  document.getElementById('lista').innerHTML = ps.length ? ps.map(p => `<article class="ped"><div class="ped__c"><div><b>Pedido ${esc(p.n)}</b><small>${hora(p.fecha)} · ${precio(p.t.total)} MXN</small></div><span class="etq ${CLS[fase(p)]}" data-b="${p.n}">${NOMF[fase(p)]}</span></div>
    <p class="ped__i">${p.items.map(i => `${i.cant} × ${esc(i.nombre)} (${i.talla === 'Única' ? 'única' : esc(i.talla)})`).join(' · ')}</p>
    <button class="ver" data-n="${p.n}">${abierto === p.n ? 'Ocultar seguimiento' : 'Seguir pedido'}</button>${abierto === p.n ? `<div class="trk" data-t="${p.n}"></div>` : ''}</article>`).join('')
    : '<p class="pf__vacio" style="padding:30px 0">No hay pedidos en esta sección. <a href="index.html#catalogo">Ver catálogo</a></p>';
  tick();
}
function tick() {
  Cuenta.pedidos().forEach(p => { const b = document.querySelector(`[data-b="${p.n}"]`); if (b) { b.textContent = NOMF[fase(p)]; b.className = 'etq ' + CLS[fase(p)]; } });
  const d = document.querySelector('.trk'); if (!d) return;
  const p = Cuenta.pedidos().find(x => x.n === d.dataset.t); if (p) trk(d, p);
}
function trk(d, p) {
  const t = seg(p), prog = Math.max(0, Math.min(1, (t - 90) / 210)), km = Math.round(520 * (1 - prog));
  const dest = esc(p.datos.ciudad), ruta = 'M70 280 C190 310 210 130 350 165 S530 60 580 72';
  if (!d.firstChild) d.innerHTML = `<svg viewBox="0 0 640 340" role="img" aria-label="Mapa simulado del recorrido de tu pedido"><rect width="640" height="340" fill="#141414"/>
    ${[40, 110, 190, 260, 330].map(y => `<path d="M0 ${y}H640" stroke="rgba(255,255,255,.06)" stroke-width="12"/>`).join('')}${[90, 200, 310, 430, 540].map(x => `<path d="M${x} 0V340" stroke="rgba(255,255,255,.06)" stroke-width="12"/>`).join('')}
    <path d="${ruta}" fill="none" stroke="rgba(245,239,230,.3)" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/>
    <path id="rec" d="${ruta}" fill="none" stroke="#962626" stroke-width="5" stroke-linecap="round"/>
    <rect x="62" y="272" width="16" height="16" fill="#F5EFE6"/><text x="86" y="300" fill="#F5EFE6" font-size="13" font-family="Georgia">Centro de envíos Stay Buzy</text>
    <circle cx="580" cy="72" r="9" fill="#F5EFE6"/><text x="580" y="52" fill="#F5EFE6" font-size="13" text-anchor="end" font-family="Georgia">Tu casa · ${dest}</text>
    <circle id="rp" r="16" fill="#962626" opacity=".35"><animate attributeName="r" values="10;22;10" dur="1.6s" repeatCount="indefinite"/></circle><circle id="pt" r="8" fill="#7A1E1E" stroke="#F5EFE6" stroke-width="2.5"/></svg>
    <p class="trk__info" id="ti" role="status"></p><ol id="to"></ol><p class="sim">Simulación de demostración: el recorrido completo dura unos 5 minutos.</p>`;
  const r = d.querySelector('#rec'), L = r.getTotalLength(), pt = r.getPointAtLength(L * prog);
  r.setAttribute('stroke-dasharray', `${L * prog} ${L}`);
  ['#pt', '#rp'].forEach(s => { const e = d.querySelector(s); e.setAttribute('cx', pt.x); e.setAttribute('cy', pt.y); });
  d.querySelector('#ti').innerHTML = t >= 300 ? '<b>Entregado.</b> Tu pedido llegó a su destino.' : t < 90 ? `<b>${t < 40 ? 'Pedido recibido.' : 'Preparando tu pedido.'}</b> Sale del centro de envíos en un momento.` : `<b>En camino.</b> Está a unos ${km} km de ti. Llegada estimada: ${p.envio.nombre.toLowerCase()}.`;
  d.querySelector('#to').innerHTML = PASOS.map(([n, s], i) => { const hecho = t >= s, act = hecho && (i === 3 || t < PASOS[i + 1][1]); return `<li class="${act ? 'ya' : hecho ? 'ok' : ''}">${n}<small>${hecho ? hora(p.fecha + s * 1000) : 'Pendiente'}</small></li>`; }).join('');
}
vista();
document.addEventListener('cuenta:cambio', vista);
setInterval(tick, 1000);
