/* Página de un solo producto: lee ?id=... de la dirección y muestra galería, descripción, precio y tallas */
const id = new URLSearchParams(location.search).get('id');
const p = PRODUCTOS.find(x => x.id === id);
const cont = document.getElementById('producto');

if (!p) {
  cont.innerHTML = '<p class="vacio">No encontramos ese producto. <a href="index.html#catalogo">Volver al catálogo</a></p>';
} else {
  document.title = p.nombre + ' | Stay Buzy';

  // 1) Las fotos del producto: prenda sola (frente y espalda) y puesta (frente y espalda; la bandolera trae una sola)
  const nombres = ['Prenda sola, frente', 'Prenda sola, espalda', 'Puesta, frente', 'Puesta, espalda'];
  if (p.fotos.length === 3) nombres[2] = 'Puesta';
  const vistas = p.fotos.map((src, i) => ({ src, txt: nombres[i], clase: '' }));
  const foto = (v, alt) => `<div class="foto ${v.clase}"><img src="${v.src}" alt="${alt}"></div>`;

  // 2) Armar la página
  cont.innerHTML = `
    <div class="galeria ${vistas.length === 1 ? 'galeria--una' : ''}">
      <div class="galeria__mini">
        ${vistas.length === 1 ? '' : vistas.map((v, i) => `<button class="mini ${i === 0 ? 'on' : ''}" data-i="${i}" aria-label="Ver: ${v.txt}">${foto(v, v.txt)}</button>`).join('')}
      </div>
      <div class="galeria__grande" id="principal">${foto(vistas[0], p.nombre + ': ' + vistas[0].txt)}</div>
      <p class="nota">Imágenes ilustrativas generadas con IA.</p>
    </div>
    <div class="info">
      <p class="info__linea">${p.linea}</p>
      <h1>${p.nombre}</h1>
      <p class="info__precio">${precio(p.precio)} MXN</p>
      <p class="info__desc">${p.descripcion}</p>
      <p class="info__etq">Talla</p>
      <div class="tallas" id="tallas">
        ${p.tallas.map(t => `<button data-t="${t}">${t === 'Única' ? 'Talla única' : t}</button>`).join('')}
      </div>
      <div class="acciones">
        <button class="btn btn--lleno" data-accion="comprar">Comprar ahora</button>
        <button class="btn btn--borde" data-accion="carrito">Agregar al carrito</button>
      </div>
      <p class="aviso" id="aviso" role="status"></p>
      <p class="hecho">Hecho en México</p>
      <p class="lema">No hacemos moda. Hacemos cultura.</p>
    </div>`;

  // 3) Cambiar la foto grande al tocar una miniatura
  const principal = document.getElementById('principal');
  cont.querySelector('.galeria__mini').addEventListener('click', e => {
    const b = e.target.closest('.mini');
    if (!b) return;
    const v = vistas[+b.dataset.i];
    cont.querySelectorAll('.mini').forEach(x => x.classList.toggle('on', x === b));
    principal.innerHTML = foto(v, p.nombre + ': ' + v.txt);
  });

  // 4) Elegir talla (si solo hay una, ya queda elegida)
  let talla = p.tallas.length === 1 ? p.tallas[0] : null;
  const tallas = document.getElementById('tallas');
  const aviso = document.getElementById('aviso');
  if (talla) tallas.querySelector('button').classList.add('on');
  tallas.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;
    talla = e.target.dataset.t;
    tallas.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target));
    aviso.textContent = '';
  });

  // 5) Botones de compra: agregan al carrito (y "Comprar ahora" sigue directo al pago)
  cont.querySelector('.acciones').addEventListener('click', e => {
    const a = e.target.dataset.accion;
    if (!a) return;
    if (!talla) { aviso.textContent = 'Elige tu talla para continuar.'; return; }
    Carrito.agregar(p.id, talla, 1);
    if (a === 'comprar') { location.href = 'pago.html'; return; }
    aviso.textContent = '';
    Carrito.salta(); Carrito.abrir();
  });

  // 6) También te puede gustar: primero los de la misma categoría
  const otros = PRODUCTOS.filter(x => x.id !== p.id)
    .sort((a, b) => (b.categoria === p.categoria) - (a.categoria === p.categoria)).slice(0, 4);
  document.getElementById('relacionados').innerHTML = otros.map(tarjeta).join('');
}
