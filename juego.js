/* ============================================================
   CS-datos & IA TRIVIA - Lógica del juego
   Cinta que elige la materia, la materia se muestra en grande
   y se juzga con los botones de Correcta / Incorrecta.
   Las preguntas se leen de una tarjeta física.
   ============================================================ */

// ============================================================
//  IMÁGENES DE CADA ASIGNATURA
//  (mismo orden que en asignaturas.js; si agregás una materia,
//   agregá acá su imagen en la misma posición)
// ============================================================

const imagenes = [
  { btn: "src/images/asignaturas/AlgebraBtn.png",           personaje: "src/images/personajes/Maty.png" },   // 0) Álgebra
  { btn: "src/images/asignaturas/AnalisisMatematicoBtn.png", personaje: "src/images/personajes/Lim.png" },   // 1) Análisis Matemático
  { btn: "src/images/asignaturas/RedesBtn.png",             personaje: "src/images/personajes/Ping.png" },   // 2) Redes
  { btn: "src/images/asignaturas/BasedeDatosBtn.png",       personaje: "src/images/personajes/Sql.png" },    // 3) Base de Datos
  { btn: "src/images/asignaturas/CienciasYTICBtn.png",      personaje: "src/images/personajes/Techy.png" },  // 4) Ciencia y TIC
  { btn: "src/images/asignaturas/PPBtn.png",                personaje: "src/images/personajes/Palmer.png" }, // 5) Práctica Profesionalizante
  { btn: "src/images/asignaturas/Edi1Btn.png",              personaje: "src/images/personajes/Edi.png" },    // 6) EDI 1
  { btn: "src/images/asignaturas/ProgramacionBtn.png",      personaje: "src/images/personajes/Codee.png" }   // 7) Programación
];

// ============================================================
//  ESTADO DEL JUEGO
// ============================================================

let modo = null;              // "equipos" o "individual"
let equipoActual = 1;         // De quién es el turno (1 o 2)

// conquistadas[1] y conquistadas[2]: qué asignaturas conquistó
// cada equipo (índice de la asignatura → true / false)
let conquistadas = { 1: [], 2: [] };

let girando = false;          // Para no poder tirar 2 veces seguidas
let asignaturaElegida = null; // Índice de la asignatura elegida
let partidaGanada = false;    // Para saber si hay que ir al final

// ============================================================
//  ESTADO DE LA CINTA
// ============================================================

const viewport = document.getElementById("cinta-viewport");
const strip = document.getElementById("cinta-strip");

let cintaCard = 0; // Índice de la tarjeta que está en el centro
let cintaX = 0;    // Desplazamiento actual (translateX en px)

const COPIAS_CINTA = 10; // Cuántas veces se repiten las materias

// ============================================================
//  ELEMENTOS DE LA PANTALLA
// ============================================================

const pantallaMenu = document.getElementById("pantalla-menu");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaAsignatura = document.getElementById("pantalla-asignatura");
const pantallaFinal = document.getElementById("pantalla-final");

const barraJugador = document.getElementById("barra-jugador");
const avatarInicial = document.getElementById("avatar-inicial");
const jugadorNombre = document.getElementById("jugador-nombre");
const pill1 = document.getElementById("pill1");
const pill2 = document.getElementById("pill2");
const puntos1 = document.getElementById("puntos1");
const puntos2 = document.getElementById("puntos2");
const progreso = document.getElementById("progreso");

const btnEquipos = document.getElementById("btn-equipos");
const btnIndividual = document.getElementById("btn-individual");
const btnGirar = document.getElementById("btn-girar");
const btnCorrecta = document.getElementById("btn-correcta");
const btnIncorrecta = document.getElementById("btn-incorrecta");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnJugarOtra = document.getElementById("btn-jugar-otra");
const btnCambiarModo = document.getElementById("btn-cambiar-modo");

const resultadoCinta = document.getElementById("resultado-cinta");
const infoJuego = document.getElementById("info-juego");
const imagenAsignatura = document.getElementById("imagen-asignatura");
const nombreAsignatura = document.getElementById("nombre-asignatura");

// ============================================================
//  UTILIDADES
// ============================================================

// El equipo que está jugando (en modo individual siempre es 1)
function equipoEnJuego() {
  return modo === "individual" ? 1 : equipoActual;
}

// Asignaturas que el jugador de turno todavía NO conquistó
function disponibles() {
  const team = equipoEnJuego();
  const lista = [];
  for (let i = 0; i < asignaturas.length; i++) {
    if (!conquistadas[team][i]) lista.push(i);
  }
  return lista;
}

// Cuántas conquistó un equipo
function conquistadasDe(team) {
  return conquistadas[team].filter(c => c).length;
}

// ============================================================
//  FICHAS DE PROGRESO (silueta negra → personaje en color)
// ============================================================

function renderProgreso() {
  progreso.innerHTML = "";
  asignaturas.forEach((a, i) => {
    const f = document.createElement("div");
    f.className = "ficha";
    f.dataset.i = i;

    // Contenedor con fondo blanco (el filtro NO toca este fondo,
    // así la silueta se recorta bien sobre la ficha blanca)
    const icono = document.createElement("div");
    icono.className = "ficha-icono";

    const img = document.createElement("img");
    img.src = imagenes[i].personaje;
    img.alt = a.nombre;
    icono.appendChild(img);

    const nombre = document.createElement("span");
    nombre.textContent = a.nombre;

    f.appendChild(icono);
    f.appendChild(nombre);
    progreso.appendChild(f);
  });
}

function actualizarProgreso() {
  const team = equipoEnJuego();
  progreso.querySelectorAll(".ficha").forEach(f => {
    const i = Number(f.dataset.i);
    f.classList.toggle("conquistada", conquistadas[team][i]);
  });
}

// ============================================================
//  CINTA
// ============================================================

// Mide el ancho real de las tarjetas (para calcular posiciones)
function metricasCinta() {
  const card = strip.children[0];
  const w = card ? card.offsetWidth : 140;
  const gap = parseFloat(getComputedStyle(strip).gap) || 16;
  return { w: w, pitch: w + gap };
}

// Desplazamiento (translateX) para centrar la tarjeta p
function offsetFor(p) {
  const m = metricasCinta();
  return viewport.clientWidth / 2 - (p * m.pitch + m.w / 2);
}

function aplicarTransform() {
  strip.style.transform = "translateX(" + cintaX + "px)";
}

// Reconstruye la cinta SOLO con las materias disponibles para el
// jugador de turno (las conquistadas ya no aparecen)
function reconstruirCinta() {
  const disp = disponibles();
  strip.innerHTML = "";

  for (let c = 0; c < COPIAS_CINTA; c++) {
    disp.forEach(idx => {
      const div = document.createElement("div");
      div.className = "carta-cinta";
      div.dataset.i = idx;
      const img = document.createElement("img");
      img.src = imagenes[idx].btn;
      img.alt = asignaturas[idx].nombre;
      div.appendChild(img);
      strip.appendChild(div);
    });
  }

  // Empezamos en una tarjeta que tenga espacio hacia ambos lados
  cintaCard = Math.max(disp.length, disp.length * 2);
  cintaX = offsetFor(cintaCard);
  aplicarTransform();
}

// ============================================================
//  TIRAR LA CINTA
// ============================================================

function tirarCinta() {
  if (girando) return;

  const disp = disponibles();
  if (disp.length === 0) {
    mostrarPantallaFinal();
    return;
  }

  girando = true;
  btnGirar.disabled = true;
  resultadoCinta.textContent = "¡Girando!";

  // La cinta solo tiene materias disponibles, así que cualquier
  // parada es válida: avanzamos varios giros y caemos al azar.
  // (La cinta siempre arranca en la tarjeta 2n, con 10n tarjetas:
  //  avanzar entre 4n y 5n deja la parada siempre dentro del rango)
  const avance = disp.length * 4 + Math.floor(Math.random() * disp.length);

  const p = cintaCard + avance;
  const objetivo = Number(strip.children[p].dataset.i);

  const desde = cintaX;
  const hasta = offsetFor(p);
  const inicio = performance.now();
  const duracion = 3800; // 3.8 segundos

  function animar(now) {
    const t = Math.min((now - inicio) / duracion, 1);
    // Desaceleración ease-out: rápido al principio, lento al final
    const eased = 1 - Math.pow(1 - t, 3);

    cintaX = desde + (hasta - desde) * eased;
    aplicarTransform();

    if (t < 1) {
      requestAnimationFrame(animar);
    } else {
      // Terminó: guardamos la posición y mostramos la materia
      cintaCard = p;
      cintaX = hasta;
      asignaturaElegida = objetivo;
      mostrarAsignatura();
    }
  }

  requestAnimationFrame(animar);
}

// ============================================================
//  MOSTRAR LA MATERIA EN GRANDE (para juzgar con la tarjeta)
// ============================================================

function mostrarAsignatura() {
  const i = asignaturaElegida;
  resultadoCinta.textContent = "¡Cayó en " + asignaturas[i].nombre + "!";

  // Pasamos a la pantalla de la materia después de un momento
  setTimeout(() => {
    imagenAsignatura.src = imagenes[i].btn;
    imagenAsignatura.alt = asignaturas[i].nombre;
    nombreAsignatura.textContent = asignaturas[i].nombre;
    pantallaJuego.classList.add("oculto");
    pantallaAsignatura.classList.remove("oculto");
  }, 1400);
}

// ============================================================
//  JUZGAR LA RESPUESTA
//  - Correcta: se conquista (sale de la cinta, la silueta se
//    rellena con el personaje en color)
//  - Incorrecta: la materia sigue en la cinta
//  - En ambos casos pasa el turno (en modo equipos)
// ============================================================

function juzgar(esCorrecta) {
  const team = equipoEnJuego();

  if (esCorrecta) {
    conquistadas[team][asignaturaElegida] = true;
    // ¿Conquistó la última? ¡Ganó la partida!
    if (disponibles().length === 0) {
      partidaGanada = true;
    }
  }

  volverACinta();
}

function volverACinta() {
  if (partidaGanada) {
    mostrarPantallaFinal();
    return;
  }

  // Pasa el turno en modo equipos (gane o pierda)
  if (modo === "equipos") {
    equipoActual = equipoActual === 1 ? 2 : 1;
  }

  pantallaAsignatura.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");

  girando = false;
  btnGirar.disabled = false;

  // La cinta se reconstruye SIN las materias conquistadas
  // por el nuevo jugador de turno
  reconstruirCinta();
  actualizarUI();
}

// ============================================================
//  PANTALLA FINAL
// ============================================================

function mostrarPantallaFinal() {
  pantallaJuego.classList.add("oculto");
  pantallaAsignatura.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");

  const ganador = document.getElementById("ganador");
  const final = document.getElementById("marcador-final");

  if (modo === "individual") {
    ganador.textContent = "¡Conquistaste las 8 materias! 🎉";
    final.innerHTML =
      "<p>Materias conquistadas: <strong>" +
      conquistadasDe(1) + "/8</strong></p>";
  } else {
    const h1 = conquistadasDe(1);
    const h2 = conquistadasDe(2);
    let texto;
    if (h1 === 8) texto = "🏆 ¡Gana el Equipo 1!";
    else if (h2 === 8) texto = "🏆 ¡Gana el Equipo 2!";
    else if (h1 > h2) texto = "🏆 ¡Gana el Equipo 1!";
    else if (h2 > h1) texto = "🏆 ¡Gana el Equipo 2!";
    else texto = "🤝 ¡Empate!";
    ganador.textContent = texto;

    final.innerHTML =
      "<p>Equipo 1: <strong>" + h1 + "/8</strong> materias</p>" +
      "<p>Equipo 2: <strong>" + h2 + "/8</strong> materias</p>";
  }
}

// ============================================================
//  ACTUALIZAR LA PANTALLA
// ============================================================

function actualizarUI() {
  const team = equipoEnJuego();
  const hechas = conquistadasDe(team);

  // Avatar y nombre
  avatarInicial.textContent = modo === "individual" ? "J1" : "J" + equipoActual;
  jugadorNombre.textContent =
    modo === "individual" ? "Jugador 1" : "Jugador " + equipoActual;

  // Pills: materias de cada uno + quién está jugando
  puntos1.textContent = conquistadasDe(1) + "/8";
  puntos2.textContent = conquistadasDe(2) + "/8";
  pill1.classList.toggle("activo", modo === "individual" || equipoActual === 1);
  pill2.classList.toggle("activo", modo === "equipos" && equipoActual === 2);
  pill2.classList.toggle("oculto", modo !== "equipos");

  // Fichas del jugador actual
  actualizarProgreso();

  // Info inferior
  const quedan = 8 - hechas;
  infoJuego.textContent =
    modo === "individual"
      ? "Te quedan " + quedan + " materias por conquistar"
      : "Jugador " + equipoActual + ": te quedan " + quedan +
        " materias por conquistar";
}

// ============================================================
//  MENÚ Y MODO DE JUEGO
// ============================================================

function iniciarPartida(tipo) {
  modo = tipo;
  equipoActual = 1;
  partidaGanada = false;
  girando = false;
  asignaturaElegida = null;

  // Estado vacío: ninguna asignatura conquistada todavía
  conquistadas = {
    1: asignaturas.map(() => false),
    2: asignaturas.map(() => false)
  };

  // Cambiamos de pantalla
  pantallaMenu.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  pantallaAsignatura.classList.add("oculto");
  pantallaJuego.classList.remove("oculto");
  barraJugador.classList.remove("oculto");

  // Fichas de progreso
  renderProgreso();

  // Cinta con todas las materias
  reconstruirCinta();

  resultadoCinta.textContent = "¡Presioná GIRAR!";
  btnGirar.disabled = false;

  actualizarUI();
}

function mostrarMenu() {
  pantallaMenu.classList.remove("oculto");
  pantallaJuego.classList.add("oculto");
  pantallaAsignatura.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  barraJugador.classList.add("oculto");
  modo = null;
}

// ============================================================
//  BOTONES
// ============================================================

btnEquipos.onclick = () => iniciarPartida("equipos");
btnIndividual.onclick = () => iniciarPartida("individual");
btnGirar.onclick = tirarCinta;
btnCorrecta.onclick = () => juzgar(true);
btnIncorrecta.onclick = () => juzgar(false);
btnReiniciar.onclick = () => iniciarPartida(modo);
btnJugarOtra.onclick = () => iniciarPartida(modo);
btnCambiarModo.onclick = mostrarMenu;

// Si cambia el tamaño de la ventana, re-centramos la cinta
window.addEventListener("resize", () => {
  if (strip.children.length > 0 && !girando) {
    cintaX = offsetFor(cintaCard);
    aplicarTransform();
  }
});

// ============================================================
//  EMPIEZA EL JUEGO (en el menú)
// ============================================================

mostrarMenu();
