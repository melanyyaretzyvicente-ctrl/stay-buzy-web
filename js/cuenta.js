/* Cuentas: registro, inicio de sesión y burbuja de perfil (arriba a la derecha). Datos guardados en el navegador (demo). */
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const OJO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><line class="tacha" x1="4" y1="4" x2="20" y2="20"/></svg>';
const Cuenta = (() => {
  const leer = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const usuarios = () => leer('sbUsuarios', {});
  const sesion = () => { const e = localStorage.getItem('sbSesion'); const u = usuarios()[e]; return u ? { email: e, ...u } : null; };
  const hash = async t => crypto.subtle ? [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode('sb:' + t)))].map(x => x.toString(16).padStart(2, '0')).join('') : btoa(t);
  const cambio = () => { pintar(); document.dispatchEvent(new Event('cuenta:cambio')); };
  async function registrar(d) {
    const us = usuarios(), e = d.email.trim().toLowerCase();
    if (us[e]) throw 'Ese correo ya tiene cuenta. Inicia sesión.';
    us[e] = { nombre: d.nombre.trim(), apodo: d.apodo.trim(), foto: '', pass: await hash(d.pass) };
    localStorage.setItem('sbUsuarios', JSON.stringify(us)); localStorage.setItem('sbSesion', e); cambio();
  }
  async function entrar(email, pass) {
    const e = email.trim().toLowerCase(), u = usuarios()[e];
    if (!u || u.pass !== await hash(pass)) throw 'Correo o contraseña incorrectos. Revísalos e intenta de nuevo.';
    localStorage.setItem('sbSesion', e); cambio();
  }
  const salir = () => { localStorage.removeItem('sbSesion'); cambio(); };
  function guardar(cambios) { const us = usuarios(), s = sesion(); us[s.email] = { ...us[s.email], ...cambios }; localStorage.setItem('sbUsuarios', JSON.stringify(us)); cambio(); }
  const pedidos = () => { const s = sesion(); return s ? leer('stayBuzyPedidos', []).filter(p => (p.email || '').toLowerCase() === s.email).sort((a, b) => b.fecha - a.fecha) : []; };

  let btn, menu, modal;
  function montar() {
    document.body.insertAdjacentHTML('beforeend', `
      <button class="cu-btn" id="cuBtn" aria-haspopup="true" aria-expanded="false"></button>
      <div class="cu-menu" id="cuMenu" hidden></div>
      <div class="cu-modal" id="cuModal" hidden><div class="cu-caja" role="dialog" aria-modal="true" aria-label="Cuenta">
        <button class="cu-x" data-c aria-label="Cerrar">✕</button>
        <div class="cu-tabs"><button data-tab="in" class="on">Iniciar sesión</button><button data-tab="reg">Crear cuenta</button></div>
        <form id="cuIn" novalidate>
          <label>Correo<input name="email" type="email" autocomplete="email"></label>
          <label>Contraseña<span class="cu-pass"><input name="pass" type="password" autocomplete="current-password"><button type="button" class="cu-ojo" aria-label="Mostrar contraseña">${OJO}</button></span></label>
          <p class="cu-err" role="alert"></p>
          <button class="cu-ok">Iniciar sesión</button>
          <p class="cu-cambio">¿No tienes cuenta? <button type="button" data-tab="reg">Regístrate</button></p>
        </form>
        <form id="cuReg" novalidate hidden>
          <label>Nombre<input name="nombre" autocomplete="name"></label>
          <label>Apodo<input name="apodo" autocomplete="nickname"></label>
          <label>Correo<input name="email" type="email" autocomplete="email"></label>
          <label>Contraseña (mínimo 6 caracteres)<span class="cu-pass"><input name="pass" type="password" autocomplete="new-password"><button type="button" class="cu-ojo" aria-label="Mostrar contraseña">${OJO}</button></span></label>
          <p class="cu-err" role="alert"></p>
          <button class="cu-ok">Crear cuenta</button>
          <p class="cu-cambio">¿Ya tienes cuenta? <button type="button" data-tab="in">Inicia sesión</button></p>
        </form>
      </div></div>`);
    btn = document.getElementById('cuBtn'); menu = document.getElementById('cuMenu'); modal = document.getElementById('cuModal');
    btn.onclick = () => { const s = sesion(); if (!s) return abrir(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', !menu.hidden); };
    document.addEventListener('click', e => { if (!e.target.closest('#cuMenu,#cuBtn')) menu.hidden = true; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { menu.hidden = true; cerrar(); } });
    menu.onclick = e => { if (e.target.dataset.salir !== undefined) { salir(); if (/perfil/.test(location.pathname)) location.href = 'index.html'; } };
    modal.onclick = e => {
      if (e.target === modal || e.target.dataset.c !== undefined) cerrar();
      const t = e.target.dataset.tab; if (t) tab(t);
      const o = e.target.closest('.cu-ojo');
      if (o) { const i = o.previousElementSibling, ver = i.type === 'password'; i.type = ver ? 'text' : 'password'; o.classList.toggle('on', ver); o.setAttribute('aria-label', ver ? 'Ocultar contraseña' : 'Mostrar contraseña'); }
    };
    modal.querySelectorAll('.cu-tabs button').forEach(b => b.type = 'button');
    document.getElementById('cuIn').onsubmit = async e => { e.preventDefault(); const f = e.target.elements; try { await entrar(f.email.value, f.pass.value); cerrar(); } catch (x) { e.target.querySelector('.cu-err').textContent = x; } };
    document.getElementById('cuReg').onsubmit = async e => {
      e.preventDefault(); const f = e.target.elements, err = e.target.querySelector('.cu-err');
      if (!f.nombre.value.trim() || !f.apodo.value.trim()) return err.textContent = 'Escribe tu nombre y un apodo.';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim())) return err.textContent = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
      if (f.pass.value.length < 6) return err.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      try { await registrar({ nombre: f.nombre.value, apodo: f.apodo.value, email: f.email.value, pass: f.pass.value }); cerrar(); } catch (x) { err.textContent = x; }
    };
    pintar();
  }
  const tab = t => { document.getElementById('cuIn').hidden = t !== 'in'; document.getElementById('cuReg').hidden = t !== 'reg'; modal.querySelectorAll('.cu-tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === t)); };
  const abrir = (t = 'in') => { tab(t); modal.hidden = false; document.body.classList.add('cu-bloqueo'); modal.querySelector('form:not([hidden]) input').focus(); };
  const cerrar = () => { if (modal) { modal.hidden = true; document.body.classList.remove('cu-bloqueo'); } };
  function pintar() {
    const s = sesion();
    btn.innerHTML = s && s.foto ? `<img src="${esc(s.foto)}" alt="">` : s ? esc((s.apodo || s.nombre || '?')[0].toUpperCase()) : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>';
    btn.setAttribute('aria-label', s ? 'Mi cuenta: ' + (s.apodo || s.nombre) : 'Iniciar sesión o crear cuenta');
    menu.innerHTML = s ? `<p>Hola, <b>${esc(s.apodo || s.nombre)}</b></p><a href="perfil.html">Mi perfil</a><a href="perfil.html#pedidos">Mis pedidos</a><button data-salir>Cerrar sesión</button>` : '';
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', montar) : montar();
  return { sesion, registrar, entrar, salir, guardar, pedidos, abrir };
})();
