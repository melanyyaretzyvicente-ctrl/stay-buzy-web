/* Funciones compartidas por el inicio y la página de producto */
const precio = n => '$' + n.toLocaleString('es-MX');

// Tarjeta cuadrada: foto de frente, nombre y precio (sin descripción). Al tocarla abre producto.html
function tarjeta(p) {
  return `<a class="tarjeta" href="producto.html?id=${p.id}">
    <div class="tarjeta__foto"><img src="assets/catalogo/${p.id}.jpg" alt="${p.nombre}" loading="lazy"></div>
    <div class="tarjeta__info">
      <h3>${p.nombre}</h3>
      <p class="precio">${precio(p.precio)} MXN</p>
    </div>
  </a>`;
}
