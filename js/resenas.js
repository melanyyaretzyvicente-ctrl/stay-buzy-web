/* Reseñas de ejemplo (nombres inventados). Cada producto tiene 12 reseñas distintas, con promedio de 4.8. */
const RASGOS = {
  'created-to-create': ['El amarillo de la frase contrasta increíble con el negro.', 'La espalda con las letras BUZY cruzadas es lo mejor.', 'El negro no se ha desteñido después de varios lavados.', 'El estampado se siente suave, no pesado.'],
  'buzy-one': ['El efecto de pintura escurrida se ve muy real.', 'El blanco es grueso y no se transparenta.', 'La etiqueta Stay Buzy en el dobladillo es un detalle genial.', 'Combina con todo, la uso de básico diario.'],
  'buzy-one-vino': ['El corazón difuminado de la espalda llama mucho la atención.', 'El vino del grafiti se ve profundo y elegante.', 'Las estrellas rojas de atrás están muy bien logradas.', 'El estampado aerógrafo se ve artesanal.'],
  'playera-morat': ['Las flores de colores están preciosas, soy fan de Morat y la amé.', 'La espalda con cartas y dados está increíble.', 'El corte oversize cae perfecto.', 'La frase Eres mi nuevo vicio quedó hermosa.'],
  'playera-danado': ['El lavado vintage azul se ve auténtico.', 'La imagen del guitarrista en la espalda tiene mucho estilo.', 'Soy fan de Iván Cornejo y esta edición es oro.', 'La estrella tenue del frente es sutil y bonita.'],
  'playera-blanca': ['El color crema es más bonito en persona.', 'El disco de vinilo con rosas de la espalda es arte.', 'El logo Costa Oeste en el pecho se ve limpio.', 'La tela es fresca, ideal para el calor.'],
  'playera-badbo': ['El ojo con estrella del pecho es muy original.', 'El texto en rojo carmesí de la espalda resalta mucho.', 'Edición Benito muy bien lograda, de colección.', 'El blanco con el carmesí combina perfecto.'],
  'manga-larga-baezino': ['El degradado de beige a negro está espectacular.', 'Las cruces cromadas con llamas verdes son únicas.', 'La doble capa abriga justo lo necesario.', 'Las letras góticas le dan un aire muy pesado.'],
  'jersey-la-odisea': ['La malla es ligera y se siente deportiva.', 'Las llamas crema y vino en las mangas son lo máximo.', 'La letra gótica de La Odisea se ve brutal.', 'El cuello en V le queda muy bien.'],
  'jersey-abz-32': ['Las rayas finas se ven muy elegantes.', 'Las mangas de camuflaje le dan un contraste genial.', 'El círculo plateado con el 32 es lo más padre.', 'La etiqueta Primera es un detalle que se agradece.'],
  'set-dei-v': ['El café oscuro con el estampado crema se ve premium.', 'El short con cordón es comodísimo.', 'Puedo usar el set completo o separado.', 'La playera oversize y el short combinan perfecto.'],
  'hoodie-shifu': ['El lavado ácido quedó distinto en cada hoodie, es único.', 'Las llamas en las mangas son un súper detalle.', 'La placa metálica se siente de buena calidad.', 'Es pesado y abriga muchísimo.'],
  'jeans-negro': ['El lavado desgastado se ve increíble.', 'Las estrellas en los muslos son lo que más me gusta.', 'Las tachuelas de atrás están firmes, bien puestas.', 'El baggy cae justo como lo quería.'],
  'jeans-baggy': ['El azul hielo es un tono que no había visto.', 'La estrella metálica es un detalle espectacular.', 'La mezclilla es gruesa pero no rígida.', 'Quedan holgados, justo el estilo que buscaba.'],
  'bandolera-buzy': ['La piel texturizada se siente resistente.', 'El nombre Stay Buzy en relieve es muy fino.', 'La estrella plateada le da mucho carácter.', 'Le cabe lo necesario: celular, cartera y llaves.'],
  'chamarra-street-mob': ['Los parches bordados están muy bien hechos.', 'El cuello y los vivos en vino se ven elegantes.', 'Soy fan de Fuerza Regida y esta chamarra es una joya.', 'La piel se siente de calidad y te hace ver pesado.']
};
const ABRE = ['Llegó en 3 días y bien empacado.', 'Pedí talla {t} y me quedó perfecta.', 'La calidad me sorprendió.', 'Es mi segunda compra en Stay Buzy y no me falla.', 'Se la regalé a mi novio y no se la quiere quitar.', 'Súper recomendada la tienda.', 'Las fotos no le hacen justicia.', 'El envío fue rápido y el trato muy amable.', 'El material se siente de calidad desde que lo sacas de la bolsa.', 'Compré {n} para un concierto y todos me preguntaron dónde la conseguí.', 'Tardé en decidirme y valió la pena.', 'Llegó tal cual como en la página.'];
const CIERRA = ['Muy recomendable.', 'Ya quiero la siguiente.', '5 estrellas sin dudarlo.', 'Sí la volvería a comprar.', 'Cultura pura.', 'Gran trabajo, Stay Buzy.', 'Excelente por el precio.', 'Mis amigos ya me pidieron el link.', 'La uso cada fin de semana.', 'Mejor de lo que esperaba.', 'Se nota que cuidan los detalles.', 'Vale cada peso.'];
const NOMBRES = ['Valeria', 'Diego', 'Camila', 'Mateo', 'Ximena', 'Santiago', 'Regina', 'Emiliano', 'Daniela', 'Sebastián', 'Renata', 'Leonardo', 'Fernanda', 'Joaquín', 'Paola', 'Iker', 'Andrea', 'Rodrigo', 'Mariana', 'Alan', 'Jimena', 'Axel', 'Lucía', 'Bruno'];
const INIC = 'ACDFGHJLMOPRSTVZBNEK';
const CUANDO = ['hace 2 días', 'hace 4 días', 'hace 1 semana', 'hace 9 días', 'hace 2 semanas', 'hace 3 semanas', 'hace 1 mes', 'hace 5 días', 'hace 12 días', 'hace 1 mes', 'hace 6 semanas', 'hace 2 meses'];
function reseñasDe(p) {
  const s = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0), r = RASGOS[p.id];
  return Array.from({ length: 12 }, (_, i) => ({
    nombre: NOMBRES[(s + i * 5) % 24] + ' ' + INIC[(s * 3 + i * 7) % 20] + '.',
    estrellas: i % 6 === 3 ? 4 : 5, cuando: CUANDO[(i + s) % 12],
    texto: [ABRE[(s + i * 5) % 12], r[i % 4], CIERRA[(s * 2 + i * 7) % 12]].join(' ').replace('{t}', p.tallas[(i + s) % p.tallas.length]).replace('{n}', p.nombre)
  }));
}
const estrellas = n => `<span class="est" aria-label="${n} de 5 estrellas"><b>${'★'.repeat(n)}</b><i>${'★'.repeat(5 - n)}</i></span>`;
(() => {
  const p = PRODUCTOS.find(x => x.id === new URLSearchParams(location.search).get('id')), cont = document.getElementById('resenas');
  if (!p || !cont) return;
  const rs = reseñasDe(p);
  cont.innerHTML = `<div class="contenido"><h2>Reseñas de ${p.nombre}</h2>
    <div class="res__res"><p class="res__nota">4.8</p><div>${estrellas(5)}<p>Calificación de Stay Buzy · ${rs.length} reseñas de este producto</p></div></div>
    <div class="res__lista">${rs.map(r => `<article class="res"><div class="res__c"><div><b>${r.nombre}</b>${estrellas(r.estrellas)}</div><span>${r.cuando}</span></div><p>${r.texto}</p><small>Compra verificada</small></article>`).join('')}</div></div>`;
})();
