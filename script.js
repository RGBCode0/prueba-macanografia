const frases = [
  "La programación no se trata solo de escribir código, sino de entender problemas y encontrar soluciones creativas a través de la lógica.",
  "Mientras más practiques mecanografía, mayor será tu velocidad y precisión. La constancia es el verdadero secreto del progreso.",
  "JavaScript es un lenguaje versátil que permite crear desde simples páginas web hasta aplicaciones complejas con interacción en tiempo real.",
  "El error más común de los principiantes es rendirse demasiado pronto. La clave está en equivocarse, aprender, corregir y seguir adelante.",
  "Cada línea de código que escribes es una oportunidad para mejorar. No tengas miedo de borrar, rehacer y optimizar lo que ya hiciste.",
  "Aprender a programar es como aprender un nuevo idioma: toma tiempo, requiere práctica diaria, y cada paso cuenta en tu camino al dominio.",
  "Un buen programador no memoriza todo, sino que sabe cómo buscar, entender documentación y aplicar el conocimiento cuando lo necesita.",
  "En el mundo del desarrollo, la colaboración, la comunicación y la disposición para aprender de otros es tan importante como saber programar.",
  "Cuando sientas que el código no funciona y no sabes por qué, recuerda que incluso los mejores desarrolladores enfrentan esos momentos. Respira y sigue.",
  "Las habilidades técnicas son importantes, pero tu actitud, perseverancia y ganas de mejorar son lo que realmente marcan la diferencia."
];


const campoTexto = document.getElementById("campoTexto");
const inputArea = document.getElementById("inputArea");
const resultado = document.getElementById("resultado");
const siguienteBtn = document.getElementById("siguiente");

let fraseActual = "";
let tiempoInicio = null;
let errores = 0;
let haIniciado = false;

// Función para iniciar todo (inicial o cuando se da clic en siguiente)
function iniciarPrueba() {
  fraseActual = frases[Math.floor(Math.random() * frases.length)];
  renderTexto(fraseActual, "");
  inputArea.value = "";
  resultado.innerHTML = "";
  tiempoInicio = null;
  errores = 0;
  haIniciado = false;
  siguienteBtn.disabled = true;
  inputArea.focus();
}

// Mostrar una frase al cargar
iniciarPrueba();

// Detectar la primera tecla
inputArea.addEventListener("keydown", () => {
  if (!haIniciado) {
    tiempoInicio = new Date();
    haIniciado = true;
  }
});

inputArea.addEventListener("input", () => {
  const entrada = inputArea.value;
  renderTexto(fraseActual, entrada);

  if (entrada.length >= fraseActual.length) {
    const tiempoFin = new Date();
    const tiempoTotal = (tiempoFin - tiempoInicio) / 1000;
    const palabras = fraseActual.split(" ").length;
    const wpm = Math.round((palabras / tiempoTotal) * 60);
    const porcentajeError = Math.min(100, Math.round((errores / fraseActual.length) * 100));

    resultado.innerHTML = `
      🏁 Tiempo: ${tiempoTotal.toFixed(2)}s<br>
      🧠 Velocidad: ${wpm} WPM<br>
      ❌ Errores: ${errores} / ${fraseActual.length} (${porcentajeError}%)
    `;

    siguienteBtn.disabled = false;
  }
});

function renderTexto(objetivo, entrada) {
  let html = "";
  errores = 0;

  for (let i = 0; i < objetivo.length; i++) {
    if (i < entrada.length) {
      if (entrada[i] === objetivo[i]) {
        html += `<span class="correcto">${objetivo[i]}</span>`;
      } else {
        html += `<span class="incorrecto">${objetivo[i]}</span>`;
        errores++;
      }
    } else {
      html += `<span class="pending">${objetivo[i]}</span>`;
    }
  }

  campoTexto.innerHTML = html;
}

// Botón siguiente
siguienteBtn.addEventListener("click", iniciarPrueba);
