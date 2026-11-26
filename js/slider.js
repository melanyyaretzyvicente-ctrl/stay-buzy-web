/* Carrusel de looks: solo imágenes, cambia solo cada TIEMPO ms con fundido suave */
const TIEMPO = 1000;   // 2000 = 2 segundos. Pon 1000 para 1 segundo.

const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
let actual = 0, reloj = null;

// Muestra el slide n (vuelve al primero si se pasa del último)
function mostrar(n) {
  actual = (n + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('slide--activo', i === actual));
}

function iniciar() { detener(); reloj = setInterval(() => mostrar(actual + 1), TIEMPO); }
function detener() { clearInterval(reloj); }

// Pausa con el mouse y deslizar con el dedo
slider.addEventListener('mouseenter', detener);
slider.addEventListener('mouseleave', iniciar);
let x0 = 0;
slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; detener(); }, { passive: true });
slider.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) mostrar(actual + (dx < 0 ? 1 : -1));
  iniciar();
}, { passive: true });

// Arrancar: primero se cargan y preparan TODAS las fotos, y hasta entonces empieza el temporizador.
// Así no hay esperas raras entre un cambio y otro.
mostrar(0);
const fotos = [...slider.querySelectorAll('.slide__foto')];
Promise.all(fotos.map(f => f.decode ? f.decode().catch(() => {}) : Promise.resolve()))
  .then(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) iniciar();
  });
