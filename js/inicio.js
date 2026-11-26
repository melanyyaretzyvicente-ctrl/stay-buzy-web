/* Inicio: dibuja los 16 productos del catálogo. Los datos están en productos.js */
document.getElementById('rejilla').innerHTML = PRODUCTOS.map(tarjeta).join('');
