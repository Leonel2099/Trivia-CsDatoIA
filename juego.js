/* ============================================================
   PREGUNTADOS - Lógica del juego
   Acá está todo el funcionamiento: el menú, la ruleta, las
   preguntas, los turnos, las conquistas y los puntos.
   ============================================================ */

// ---------- ESTADO DEL JUEGO ----------

let modo = null;              // "equipos" o "individual"
let equipoActual = 1;         // De quién es el turno (1 o 2)
let puntos = { 1: 0, 2: 0 };  // Puntaje de cada equipo

// conquistadas[1] y conquistadas[2]: qué asignaturas conquistó
// cada equipo (índice de la asignatura → true / false)
let conquistadas = { 1: [], 2: [] };

// pools[1][i] y pools[2][i]: preguntas disponibles de la
// asignatura i para cada equipo (se van sacando al usarlas)
let pools = { 1: [], 2: [] };

let girando = false;          // Para no poder girar 2 veces seguidas
let asignaturaElegida = null; // Índice de la asignatura donde cayó
let partidaGanada = false;    // Para saber si hay que ir al final

// ---------- ELEMENTOS DE LA PANTALLA ----------

const canvas = document.getElementById("ruleta");
const ctx = canvas.getContext("2d");

const pantallaMenu = document.getElementById("pantalla-menu");
const pantallaRuleta = document.getElementById("pantalla-ruleta");
const pantallaPregunta = document.getElementById("pantalla-pregunta");
const pantallaFinal = document.getElementById("pantalla-final");

const marcador = document.getElementById("marcador");
const btnEquipos = document.getElementById("btn-equipos");
const btnIndividual = document.getElementById("btn-individual");
const btnGirar = document.getElementById("btn-girar");
const btnSeguir = document.getElementById("btn-seguir");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnJugarOtra = document.getElementById("btn-jugar-otra");
const btnCambiarModo = document.getElementById("btn-cambiar-modo");

const resultadoRuleta = document.getElementById("resultado-ruleta");
const categoriaTag = document.getElementById("categoria-tag");
const textoPregunta = document.getElementById("texto-pregunta");
const cajaOpciones = document.getElementById("opciones");
const feedback = document.getElementById("feedback");
const infoRuleta = document.getElementById("preguntas-restantes");

// ============================================================
//  UTILIDADES
// ============================================================

// Mezcla un array de forma aleatoria (para las preguntas)
function mezclar(array) {
  const copia = array.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// El equipo que está jugando (en modo individual siempre es 1)
function equipoEnJuego() {
  return modo === "individual" ? 1 : equipoActual;
}

// Preguntas originales de una asignatura para un equipo
// (en modo individual se usan las 8 juntas)
function preguntasOriginales(indice, team) {
  const p = asignaturas[indice].preguntas;
  if (modo === "individual") {
    return p.equipo1.concat(p.equipo2);
  }
  return p["equipo" + team];
}

// ============================================================
//  DIBUJAR LA RULETA
//  (las que el equipo de turno ya conquistó se ven grises ✓)
// ============================================================

function dibujarRuleta() {
  const team = equipoEnJuego();
  const total = asignaturas.length;
  const radio = canvas.width / 2;
  const angulo = (Math.PI * 2) / total;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  asignaturas.forEach((asig, i) => {
    const inicio = i * angulo;
    const conquistada = conquistadas[team][i];

    // Sector de color (o gris si ya está conquistada)
    ctx.beginPath();
    ctx.moveTo(radio, radio);
    ctx.arc(radio, radio, radio, inicio, inicio + angulo);
    ctx.closePath();
    ctx.fillStyle = conquistada ? "#3d3d3d" : asig.color;
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Nombre de la asignatura (escrito hacia adentro)
    ctx.save();
    ctx.translate(radio, radio);
    ctx.rotate(inicio + angulo / 2);
    ctx.fillStyle = conquistada ? "#777" : "#fff";
    ctx.font = "bold 12px Segoe UI, Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    // Corta el nombre si es muy largo para que entre en la sección
    let nombre = asig.nombre;
    if (nombre.length > 22) nombre = nombre.slice(0, 20) + "…";
    ctx.fillText(nombre, radio - 15, 0);

    // Palomita de conquistada
    if (conquistada) {
      ctx.textAlign = "left";
      ctx.font = "bold 16px Segoe UI, Arial";
      ctx.fillStyle = "#2ecc71";
      ctx.fillText("✓", 20, 0);
    }
    ctx.restore();
  });

  // Centro de la ruleta
  ctx.beginPath();
  ctx.arc(radio, radio, 22, 0, Math.PI * 2);
  ctx.fillStyle = "#1a1a2e";
  ctx.fill();
  ctx.strokeStyle = "#f1c40f";
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ============================================================
//  GIRAR LA RULETA
//  (solo se puede caer en las asignaturas que el equipo de
//   turno todavía NO conquistó)
// ============================================================

let anguloActual = 0; // Rotación actual de la ruleta (en radianes)

function girarRuleta() {
  if (girando) return;

  const team = equipoEnJuego();

  // Asignaturas disponibles para este equipo
  const disponibles = [];
  for (let i = 0; i < asignaturas.length; i++) {
    if (!conquistadas[team][i]) disponibles.push(i);
  }

  // Si no queda ninguna, terminó la partida
  if (disponibles.length === 0) {
    mostrarPantallaFinal();
    return;
  }

  girando = true;
  btnGirar.disabled = true;
  resultadoRuleta.textContent = "Girando...";

  const total = asignaturas.length;
  const anguloSector = (Math.PI * 2) / total;

  // Elegimos al azar entre las disponibles
  const sectorAzar = disponibles[Math.floor(Math.random() * disponibles.length)];

  // Cuántas vueltas completas da (más vueltas = más emoción)
  const vueltas = 5 + Math.floor(Math.random() * 3);

  // Centro del sector elegido (ángulo de la ruleta SIN rotar)
  const centroSector = sectorAzar * anguloSector + anguloSector / 2;

  // La flecha está ARRIBA de la ruleta, y en canvas eso es -PI/2
  // (el ángulo 0 apunta a la derecha y +PI/2 hacia abajo).
  // Este es el ángulo al que tendría que rotar la ruleta para
  // que el centro del sector elegido quede bajo la flecha.
  const anguloObjetivo = -Math.PI / 2 - centroSector;

  // Giro RELATIVO: partimos desde donde está ahora la ruleta y
  // avanzamos siempre hacia adelante hasta llegar al objetivo.
  const desde = anguloActual;
  let delta = (anguloObjetivo - desde) % (Math.PI * 2);
  if (delta < 0) delta += Math.PI * 2; // siempre positivo

  const anguloFinal = desde + vueltas * Math.PI * 2 + delta;

  const inicio = performance.now();
  const duracion = 4000; // 4 segundos de giro

  function animar(now) {
    const t = Math.min((now - inicio) / duracion, 1);
    // Fórmula de desaceleración (ease-out): rápido al principio,
    // lento al final
    const eased = 1 - Math.pow(1 - t, 3);

    // Interpolamos desde el ángulo de partida hasta el final
    // (si no, en el arranque la ruleta "saltaría" a la posición 0)
    anguloActual = desde + (anguloFinal - desde) * eased;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(anguloActual);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    dibujarRuleta();
    ctx.restore();

    if (t < 1) {
      requestAnimationFrame(animar);
    } else {
      // Terminó: guardamos el ángulo y mostramos la asignatura
      anguloActual = anguloFinal % (Math.PI * 2);
      asignaturaElegida = sectorAzar;
      mostrarAsignatura();
    }
  }

  requestAnimationFrame(animar);
}

// ============================================================
//  MOSTRAR LA ASIGNATURA ELEGIDA Y PASAR A LA PREGUNTA
// ============================================================

function mostrarAsignatura() {
  const asig = asignaturas[asignaturaElegida];
  resultadoRuleta.textContent = "¡Cayó en " + asig.nombre + "!";

  // Pasamos a la pantalla de pregunta después de un momento
  setTimeout(() => {
    pantallaRuleta.classList.add("oculto");
    pantallaPregunta.classList.remove("oculto");
    mostrarPregunta();
  }, 1400);
}

// ============================================================
//  MOSTRAR LA PREGUNTA
// ============================================================

function mostrarPregunta() {
  const team = equipoEnJuego();
  const asig = asignaturas[asignaturaElegida];

  // Si se quedó sin preguntas de esa asignatura, se reciclan
  // (así el juego nunca se traba aunque fallen 4 veces seguidas)
  if (pools[team][asignaturaElegida].length === 0) {
    pools[team][asignaturaElegida] = mezclar(
      preguntasOriginales(asignaturaElegida, team)
    );
  }

  // Sacamos una pregunta al azar de las disponibles
  const lista = pools[team][asignaturaElegida];
  const indice = Math.floor(Math.random() * lista.length);
  const preg = lista.splice(indice, 1)[0];

  // Título con el color de la asignatura
  categoriaTag.textContent = asig.nombre;
  categoriaTag.style.background = asig.color;
  textoPregunta.textContent = preg.pregunta;
  cajaOpciones.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  btnSeguir.textContent = "Continuar";
  btnSeguir.classList.add("oculto");
  partidaGanada = false;

  // Creamos un botón por cada opción
  preg.opciones.forEach((texto, i) => {
    const btn = document.createElement("button");
    btn.className = "opcion";
    btn.textContent = texto;
    btn.onclick = () => responder(i, preg.correcta, btn);
    cajaOpciones.appendChild(btn);
  });
}

// ============================================================
//  RESPONDER
//  - Si acierta: +100 y conquista la asignatura
//  - Si falla: no suma nada
//  - En ambos casos pasa el turno (en modo equipos)
// ============================================================

function responder(elegida, correcta, boton) {
  const team = equipoEnJuego();
  const botones = document.querySelectorAll(".opcion");

  // Desactivamos todos los botones
  botones.forEach(b => (b.disabled = true));

  if (elegida === correcta) {
    // ¡ACERTÓ! Suma puntos y conquista la asignatura
    puntos[team] += 100;
    conquistadas[team][asignaturaElegida] = true;
    boton.classList.add("correcta");
    feedback.textContent = "¡Correcto! +100 puntos 🎉";
    feedback.classList.add("ok");

    // ¿Conquistó la última? ¡Ganó la partida!
    if (conquistadas[team].every(c => c)) {
      partidaGanada = true;
      feedback.textContent = "¡Conquistaste la última asignatura! 🏆";
      btnSeguir.textContent = "Ver resultado 🏆";
    }
  } else {
    // FALLÓ: marcamos la que estaba bien
    botones[correcta].classList.add("correcta");
    boton.classList.add("incorrecta");
    feedback.textContent =
      modo === "individual"
        ? "¡Fallaste! 😞 Volvé a girar"
        : "¡Fallaste! 😞 Pasás el turno";
    feedback.classList.add("mal");
  }

  actualizarMarcador();
  btnSeguir.classList.remove("oculto");
}

// ============================================================
//  VOLVER A LA RULETA (o terminar el juego)
// ============================================================

function volverARuleta() {
  if (partidaGanada) {
    mostrarPantallaFinal();
    return;
  }

  // Pasa el turno en modo equipos (gane o pierda)
  if (modo === "equipos") {
    equipoActual = equipoActual === 1 ? 2 : 1;
  }

  pantallaPregunta.classList.add("oculto");
  pantallaRuleta.classList.remove("oculto");

  girando = false;
  btnGirar.disabled = false;

  actualizarMarcador();
  actualizarInfo();
  dibujarRuleta();
}

// ============================================================
//  PANTALLA FINAL
// ============================================================

function mostrarPantallaFinal() {
  pantallaRuleta.classList.add("oculto");
  pantallaPregunta.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");

  const ganador = document.getElementById("ganador");
  const final = document.getElementById("marcador-final");

  if (modo === "individual") {
    ganador.textContent = "¡Conquistaste las 8 asignaturas! 🎉";
    final.innerHTML =
      "<p>Puntaje final: <strong>" + puntos[1] + "</strong> puntos</p>";
  } else {
    if (puntos[1] > puntos[2]) {
      ganador.textContent = "🏆 ¡Gana el Equipo 1!";
    } else if (puntos[2] > puntos[1]) {
      ganador.textContent = "🏆 ¡Gana el Equipo 2!";
    } else {
      ganador.textContent = "🤝 ¡Empate!";
    }
    final.innerHTML =
      "<p>Equipo 1: <strong>" + puntos[1] + "</strong> puntos (8/8 asignaturas)</p>" +
      "<p>Equipo 2: <strong>" + puntos[2] + "</strong> puntos (8/8 asignaturas)</p>";
  }
}

// ============================================================
//  ACTUALIZAR LA PANTALLA
// ============================================================

function actualizarMarcador() {
  document.getElementById("puntos1").textContent = puntos[1];
  document.getElementById("puntos2").textContent = puntos[2];

  const hechas1 = conquistadas[1].filter(c => c).length;
  const hechas2 = conquistadas[2].filter(c => c).length;
  document.getElementById("conquistas1").textContent = hechas1 + "/8 asignaturas";
  document.getElementById("conquistas2").textContent = hechas2 + "/8 asignaturas";

  if (modo === "equipos") {
    document.getElementById("nombre1").textContent = "EQUIPO 1";
    document.getElementById("turno").textContent = "Turno: Equipo " + equipoActual;
  } else {
    document.getElementById("nombre1").textContent = "TU PUNTAJE";
  }
}

function actualizarInfo() {
  const team = equipoEnJuego();
  const quedan = conquistadas[team].filter(c => !c).length;

  if (modo === "individual") {
    infoRuleta.textContent = "Te quedan " + quedan + " asignaturas por conquistar";
  } else {
    infoRuleta.textContent =
      "Equipo " + equipoActual + ": te quedan " + quedan +
      " asignaturas por conquistar";
  }
}

// ============================================================
//  MENÚ Y MODO DE JUEGO
// ============================================================

function iniciarPartida(tipo) {
  modo = tipo;
  equipoActual = 1;
  puntos = { 1: 0, 2: 0 };
  partidaGanada = false;
  anguloActual = 0;
  asignaturaElegida = null;
  girando = false;

  // Estado vacío: ninguna asignatura conquistada todavía
  conquistadas = {
    1: asignaturas.map(() => false),
    2: asignaturas.map(() => false)
  };

  // Preparamos los mazos de preguntas de cada equipo
  pools = { 1: [], 2: [] };
  asignaturas.forEach((_, i) => {
    pools[1][i] = mezclar(preguntasOriginales(i, 1));
    pools[2][i] = mezclar(preguntasOriginales(i, 2));
  });

  // Clase del body para ocultar el equipo 2 en modo individual
  document.body.classList.toggle("modo-individual", modo === "individual");

  // Cambiamos de pantalla
  pantallaMenu.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  pantallaPregunta.classList.add("oculto");
  pantallaRuleta.classList.remove("oculto");
  marcador.classList.remove("oculto");
  btnReiniciar.classList.remove("oculto");

  resultadoRuleta.textContent = "¡Girá la ruleta para empezar!";
  btnGirar.disabled = false;

  actualizarMarcador();
  actualizarInfo();
  dibujarRuleta();
}

function mostrarMenu() {
  pantallaMenu.classList.remove("oculto");
  pantallaRuleta.classList.add("oculto");
  pantallaPregunta.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  marcador.classList.add("oculto");
  btnReiniciar.classList.add("oculto");
  document.body.classList.remove("modo-individual");
  modo = null;
}

// ============================================================
//  BOTONES
// ============================================================

btnEquipos.onclick = () => iniciarPartida("equipos");
btnIndividual.onclick = () => iniciarPartida("individual");
btnGirar.onclick = girarRuleta;
btnSeguir.onclick = volverARuleta;
btnReiniciar.onclick = () => iniciarPartida(modo);
btnJugarOtra.onclick = () => iniciarPartida(modo);
btnCambiarModo.onclick = mostrarMenu;

// ============================================================
//  EMPIEZA EL JUEGO (en el menú)
// ============================================================

mostrarMenu();
