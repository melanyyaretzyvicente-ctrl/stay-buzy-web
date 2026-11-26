/* Pago y entrega: paso 1 (entrega), paso 2 (pago), paso 3 (confirmación). Ajustes en TIENDA (carrito.js) */
const $ = s => document.querySelector(s);
const ESTADOS = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','Ciudad de México','Coahuila','Colima','Durango','Estado de México','Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora','Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
const METODOS = [
  { g: 'Tarjeta', id: 'tarjeta', n: 'Tarjeta de crédito o débito', d: 'Visa, Mastercard y American Express', c: ['VISA', 'MC', 'AMEX'] },
  { g: 'Efectivo', id: 'oxxo', n: 'OXXO', d: 'Paga en efectivo en cualquier tienda. Tienes 3 días.', c: ['OXXO'] },
  { id: 'tiendas', n: '7-Eleven, Circle K y farmacias', d: 'Paga en efectivo con una referencia. Tienes 3 días.' },
  { g: 'Transferencia', id: 'spei', n: 'Transferencia SPEI', d: 'Desde la app de tu banco, a cualquier hora.' },
  { g: 'Billeteras digitales', id: 'paypal', n: 'PayPal', d: 'Entra a tu cuenta de PayPal para pagar.' },
  { id: 'mp', n: 'Mercado Pago', d: 'Con tu saldo, tarjeta guardada o efectivo.' },
  { id: 'apple', n: 'Apple Pay', d: 'Disponible en dispositivos Apple.' },
  { id: 'google', n: 'Google Pay', d: 'Paga con las tarjetas de tu cuenta de Google.' },
  { g: 'Compra ahora, paga después', id: 'kueski', n: 'Kueski Pay', d: 'Divide tu pago en quincenas.' },
  { id: 'aplazo', n: 'Aplazo', d: 'Divide tu compra en pagos quincenales.' },
  { g: 'Al recibir', id: 'cod', n: 'Pago contra entrega', d: 'Paga en efectivo cuando llegue tu pedido.' }
];
const st = { envio: 'std', cupon: null, metodo: 'tarjeta', datos: null };
const sumar = (d, n) => { d = new Date(d); while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() % 6) n--; } return d; };
const fecha = d => d.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' });
const envio = () => TIENDA.envios.find(e => e.id === st.envio);
const rango = e => fecha(sumar(new Date(), e.dias[0])) + ' al ' + fecha(sumar(new Date(), e.dias[1]));

function totales() {
  const sub = Carrito.subtotal(), desc = st.cupon ? Math.round(sub * TIENDA.cupones[st.cupon] / 100) : 0, e = envio();
  const env = e.id === 'std' && sub - desc >= TIENDA.envioGratisDesde ? 0 : e.precio;
  const cod = st.metodo === 'cod' ? TIENDA.cargoContraEntrega : 0;
  return { sub, desc, env, cod, total: sub - desc + env + cod };
}
function resumen() {
  const t = totales();
  $('#resumen').innerHTML = Carrito.lineas().map(l => `<div class="ri"><img src="assets/catalogo/${l.id}.jpg" alt="">
    <div><b>${l.p.nombre}</b><small>Talla ${l.talla === 'Única' ? 'única' : l.talla}</small>
    <small><button data-d="-1" data-id="${l.id}" data-t="${l.talla}" aria-label="Quitar una pieza">−</button> ${l.cant} <button data-d="1" data-id="${l.id}" data-t="${l.talla}" aria-label="Agregar una pieza">+</button></small></div>
    <span>${precio(l.p.precio * l.cant)}</span></div>`).join('') + `
    <div class="cupon"><input id="cup" placeholder="Código de descuento" aria-label="Código de descuento"><button type="button" id="cupB">Aplicar</button></div>
    <p class="msj" id="cupM" role="status">${st.cupon ? 'Cupón ' + st.cupon + ' aplicado.' : ''}</p>
    <p class="fila"><span>Subtotal</span><span>${precio(t.sub)}</span></p>
    ${t.desc ? `<p class="fila"><span>Descuento</span><span>−${precio(t.desc)}</span></p>` : ''}
    <p class="fila"><span>Envío</span><span>${t.env ? precio(t.env) : 'Gratis'}</span></p>
    ${t.cod ? `<p class="fila"><span>Cargo contra entrega</span><span>${precio(t.cod)}</span></p>` : ''}
    <p class="fila tot"><span>Total</span><span>${precio(t.total)} MXN</span></p>`;
  $('#resTot').textContent = precio(t.total);
}
function paso(n) {
  ['#f1', '#f2', '#f3'].forEach((s, i) => $(s).hidden = i + 1 !== n);
  document.querySelectorAll('#pasos li').forEach((li, i) => { li.className = i + 1 < n ? 'ok' : i + 1 === n ? 'on' : ''; });
  $('#resumen-caja').hidden = n === 3; scrollTo(0, 0);
}
function pintarEnvios() {
  $('#envios').innerHTML = TIENDA.envios.map(e => `<label class="op"><input type="radio" name="envio" value="${e.id}" ${e.id === st.envio ? 'checked' : ''}>
    <span><b>${e.nombre}</b><small>Llega entre ${rango(e)}</small></span>
    <em>${e.id === 'std' && Carrito.subtotal() >= TIENDA.envioGratisDesde ? 'Gratis' : e.precio ? precio(e.precio) : 'Gratis'}</em></label>`).join('');
}
function pintarMetodos() {
  const t = totales().total;
  const msi = [3, 6, 9, 12].filter(m => t >= m * 100);
  $('#metodos').innerHTML = METODOS.map(m => `${m.g ? `<h3 class="grupo">${m.g}</h3>` : ''}
    <label class="op"><input type="radio" name="metodo" value="${m.id}" ${m.id === st.metodo ? 'checked' : ''}>
      <span><b>${m.n}</b><small>${m.d}</small></span><span class="chips">${(m.c || []).map(c => `<i>${c}</i>`).join('')}</span></label>
    <div class="det" data-m="${m.id}" ${m.id === st.metodo ? '' : 'hidden'}>${m.id === 'tarjeta' ? `<div class="grid">
      <label class="c2">Número de tarjeta<input name="num" inputmode="numeric" autocomplete="cc-number" maxlength="19" placeholder="0000 0000 0000 0000"></label>
      <label class="c2">Nombre como aparece en la tarjeta<input name="tit" autocomplete="cc-name"></label>
      <label>Vencimiento<input name="exp" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/AA"></label>
      <label>CVV<input name="cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="123"></label>
      <label class="c2">Pagos<select name="msi"><option value="1">Un solo pago de ${precio(t)}</option>${msi.map(m => `<option value="${m}">${m} meses sin intereses de ${precio(Math.ceil(t / m))}</option>`).join('')}</select></label>
      <p class="c2">Los meses sin intereses aplican solo a tarjetas de crédito participantes. Tus datos de tarjeta no se guardan.</p></div>`
      : `<p>${{ oxxo: 'Al confirmar te damos una referencia para pagar en caja. Tu pedido sale cuando se acredita el pago.', tiendas: 'Al confirmar te damos una referencia para pagar en caja. Tu pedido sale cuando se acredita el pago.', spei: 'Al confirmar te damos una CLABE y un concepto. Tu pedido sale cuando llega la transferencia.', cod: 'Ten el monto exacto listo. Disponible solo con envío a domicilio.' }[m.id] || 'Te llevamos a ' + m.n + ' para terminar el pago de forma segura.'}</p>`}</div>`).join('');
}
function procesarPago(pedido) {
  /* AQUÍ se conecta tu pasarela real (Mercado Pago, Conekta, Openpay, Stripe…): envía el pedido a tu servidor,
     que crea el cobro y regresa { ok, referencia }. Mientras TIENDA.demo sea true, solo se simula. */
  return new Promise(r => setTimeout(() => r({ ok: true, ref: String(Math.random()).slice(2, 16) }), 900));
}
const luhn = n => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
function marcar(el, malo) { el.classList.toggle('mal', malo); return malo; }

/* ----- Paso 1 ----- */
$('[name=estado]').insertAdjacentHTML('beforeend', ESTADOS.map(e => `<option>${e}</option>`).join(''));
$('[name=tel]').addEventListener('input', e => { const v = e.target.value.replace(/\D/g, '').slice(0, 10); e.target.value = v.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3').trim(); });
$('#envios').addEventListener('change', e => { st.envio = e.target.value; resumen(); });
$('#f1').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = n => f.elements[n].value.trim(); let msg = '';
  const reglas = { email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email')), tel: v('tel').replace(/\D/g, '').length === 10, cp: /^\d{5}$/.test(v('cp')) };
  ['email', 'tel', 'nombre', 'apellidos', 'calle', 'colonia', 'cp', 'ciudad', 'estado'].forEach(n => {
    const malo = marcar(f.elements[n], !v(n) || reglas[n] === false);
    if (malo && !msg) msg = !v(n) ? 'Completa los campos marcados.' : { email: 'Escribe un correo válido, por ejemplo nombre@correo.com.', tel: 'El celular debe tener 10 dígitos.', cp: 'El código postal debe tener 5 dígitos.' }[n];
  });
  $('#e1').textContent = msg;
  if (msg) { f.querySelector('.mal').focus(); return; }
  st.datos = Object.fromEntries(new FormData(f));
  $('#entregaRes').textContent = `Enviamos a ${st.datos.calle}, ${st.datos.colonia}, ${st.datos.cp}, ${st.datos.ciudad}, ${st.datos.estado}. ${envio().nombre}: llega entre ${rango(envio())}.`;
  pintarMetodos(); resumen(); paso(2);
});

/* ----- Paso 2 ----- */
$('#volver').onclick = () => paso(1);
$('#metodos').addEventListener('change', e => {
  if (e.target.name !== 'metodo') return;
  st.metodo = e.target.value; resumen();
  document.querySelectorAll('.det').forEach(d => d.hidden = d.dataset.m !== st.metodo);
  if (st.metodo === 'cod' && st.envio === 'rec') $('#e2').textContent = 'El pago contra entrega solo aplica con envío a domicilio.'; else $('#e2').textContent = '';
});
$('#metodos').addEventListener('input', e => {
  if (e.target.name === 'num') e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  if (e.target.name === 'exp') e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2');
});
$('#f2').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, err = $('#e2'); err.textContent = '';
  if (st.metodo === 'cod' && st.envio === 'rec') { err.textContent = 'El pago contra entrega solo aplica con envío a domicilio. Elige otro método o cambia el envío.'; return; }
  if (st.metodo === 'tarjeta') {
    const num = f.elements.num.value.replace(/\D/g, ''), [mm, aa] = f.elements.exp.value.split('/').map(Number), hoy = new Date();
    const venc = !(mm >= 1 && mm <= 12 && aa && new Date(2000 + aa, mm) > hoy);
    const cvv = f.elements.cvv.value.length < (/^3[47]/.test(num) ? 4 : 3);
    const malos = [marcar(f.elements.num, num.length < 15 || !luhn(num)), marcar(f.elements.tit, !f.elements.tit.value.trim()), marcar(f.elements.exp, venc), marcar(f.elements.cvv, cvv)];
    if (malos.some(Boolean)) { err.textContent = 'Revisa los datos de tu tarjeta: número, nombre, vencimiento (MM/AA) y CVV.'; return; }
  }
  const b = $('#pagar'); b.disabled = true; b.textContent = 'Procesando…';
  const t = totales(), m = METODOS.find(x => x.id === st.metodo);
  const pedido = { n: 'SB-' + Date.now().toString().slice(-7), metodo: m.id, metodoN: m.n, datos: st.datos, envio: envio(), t,
    items: Carrito.lineas().map(l => ({ nombre: l.p.nombre, talla: l.talla, cant: l.cant, p: l.p.precio })), fecha: Date.now() };
  const r = await procesarPago(pedido);
  b.disabled = false; b.textContent = 'Confirmar pedido';
  if (!r.ok) { err.textContent = 'No pudimos procesar el pago. Revisa tus datos o prueba otro método.'; return; }
  pedido.ref = r.ref;
  pedido.email = st.datos.email.trim().toLowerCase();
  try { localStorage.setItem('stayBuzyPedido', JSON.stringify(pedido)); const l = JSON.parse(localStorage.getItem('stayBuzyPedidos') || '[]'); l.push(pedido); localStorage.setItem('stayBuzyPedidos', JSON.stringify(l)); } catch (x) {}
  st.listo = true; Carrito.vaciar(); history.replaceState(null, '', '#listo'); confirmacion(pedido);
});

/* ----- Paso 3 ----- */
function confirmacion(p) {
  const lim = fecha(sumar(new Date(p.fecha), 3)), d = p.datos;
  const caja = {
    oxxo: ['Paga en cualquier OXXO', 'Referencia', p.ref.replace(/(.{4})/g, '$1 ').trim(), `Dile al cajero que es un pago de servicio. Monto exacto: ${precio(p.t.total)}. Vence el ${lim}.`],
    tiendas: ['Paga en 7-Eleven, Circle K o farmacias', 'Referencia', p.ref.replace(/(.{4})/g, '$1 ').trim(), `Monto exacto: ${precio(p.t.total)}. Vence el ${lim}.`],
    spei: ['Haz tu transferencia SPEI', 'CLABE', TIENDA.clabe, `Monto exacto: ${precio(p.t.total)}. Concepto: ${p.n}. Tienes hasta el ${lim}.`],
    cod: ['Paga al recibir', 'Monto a pagar', precio(p.t.total), 'Ten el efectivo listo con el monto exacto.']
  }[p.metodo];
  $('#f3').innerHTML = `<h1 class="ok-t">${caja ? 'Pedido recibido' : '¡Gracias por tu compra!'}</h1>
    <p class="entrega-res">Pedido <b>${p.n}</b>. Te enviamos el detalle a ${d.email}.</p>
    ${TIENDA.demo ? '<p class="demo">Modo de prueba: este pedido y las referencias son de ejemplo y no se cobró nada.</p>' : ''}
    ${caja ? `<div class="caja"><h2 style="font:400 1.5rem var(--f-titulos)">${caja[0]}</h2><small>${caja[1]}</small><code>${caja[2]}</code>${['oxxo', 'tiendas', 'spei'].includes(p.metodo) ? '<button type="button" id="cp">Copiar</button>' : ''}<p>${caja[3]}</p>${p.metodo !== 'cod' ? '<p>Tu pedido sale en cuanto se acredita el pago.</p>' : ''}</div>`
    : `<div class="caja"><p>Pago con ${p.metodoN}: <b>${precio(p.t.total)} MXN</b>.</p></div>`}
    <div class="caja"><h2 style="font:400 1.5rem var(--f-titulos)">Entrega</h2><p>${d.nombre} ${d.apellidos}<br>${d.calle}, ${d.colonia}, ${d.cp}, ${d.ciudad}, ${d.estado}</p>
    <p>${p.envio.nombre}: llega entre ${rango(p.envio)} (desde que se confirma el pago).</p></div>
    <div class="caja"><h2 style="font:400 1.5rem var(--f-titulos)">Tu pedido</h2>${p.items.map(i => `<p class="fila"><span>${i.cant} × ${i.nombre} (${i.talla === 'Única' ? 'única' : i.talla})</span><span>${precio(i.p * i.cant)}</span></p>`).join('')}
    <p class="fila tot"><span>Total</span><span>${precio(p.t.total)} MXN</span></p></div>
    <a class="btn btn--lleno" href="perfil.html#pedidos">Seguir mi pedido</a><a class="btn btn--borde" href="index.html#catalogo">Seguir comprando</a>`;
  $('#demo').hidden = true; paso(3);
  const c = $('#cp'); if (c) c.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(caja[2].replace(/\s/g, '')); c.textContent = 'Copiado'; };
}

/* ----- Resumen, cupón y arranque ----- */
$('#resT').onclick = () => { const r = $('#resumen-caja'); r.classList.toggle('abierto'); $('#resT').setAttribute('aria-expanded', r.classList.contains('abierto')); };
$('#resumen').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.d) Carrito.cambiar(b.dataset.id, b.dataset.t, +b.dataset.d);
  if (b.id === 'cupB') {
    const c = $('#cup').value.trim().toUpperCase();
    if (TIENDA.cupones[c]) { st.cupon = c; resumen(); } else $('#cupM').textContent = 'Ese código no es válido. Revisa que esté bien escrito.';
  }
});
document.addEventListener('carrito:cambio', () => {
  if (st.listo || !$('#f3').hidden) return;
  if (!Carrito.cuenta()) { $('#pg').innerHTML = '<div class="vacio"><h1 class="ok-t">Tu carrito está vacío</h1><p style="margin:14px 0 24px">Agrega una prenda para continuar con tu compra.</p><a class="btn btn--lleno" style="display:inline-block;background:var(--vino);border-color:var(--vino)" href="index.html#catalogo">Ver catálogo</a></div>'; return; }
  pintarEnvios(); resumen(); if (!$('#f2').hidden) pintarMetodos();
});
$('#demo').hidden = !TIENDA.demo;
const ses = Cuenta.sesion(); if (ses) { $('[name=email]').value = ses.email; $('[name=nombre]').value = ses.nombre; }
let previo = null; try { previo = JSON.parse(localStorage.getItem('stayBuzyPedido')); } catch (e) {}
if (location.hash === '#listo' && previo) confirmacion(previo);
else { document.dispatchEvent(new Event('carrito:cambio')); if (Carrito.cuenta()) paso(1); }
