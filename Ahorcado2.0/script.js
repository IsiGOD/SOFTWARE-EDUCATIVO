const palabras = [
    "regresion",
    "integracion",
    "unitarias",
    "sistema",
    "aceptacion",
    "automatizacion",
    "caja negra",
    "usabilidad",
    "validacion",
    "verificacion"
];

let palabraElegida = "";
let palabraGuiones = [];
let intentos = 0;
const maxIntentos = 6;

const wordElement = document.getElementById("word");
const resultElement = document.getElementById("result");
const keyboardElement = document.getElementById("keyboard");
const hangmanAscii = document.getElementById("hangman-ascii");
const resetButton = document.getElementById("reset");


const dibujosAhorcado = [
    `
     +---+
     |   |
         |
         |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
         |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
     |   |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|   |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
         |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
    /    |
         |
    =========`,
    `
     +---+
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    =========`
];


function iniciarJuego() {
    
    palabraElegida = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    palabraGuiones = Array(palabraElegida.length).fill("_");
    intentos = 0;
    actualizarAhorcado();
    mostrarPalabra();
    generarTeclado();
    resultElement.textContent = "";
    resetButton.style.display = "none";
}


function mostrarPalabra() {
    wordElement.textContent = palabraGuiones.join(" ");
}


function generarTeclado() {
    keyboardElement.innerHTML = "";
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letras.split("").forEach(letra => {
        const button = document.createElement("button");
        button.textContent = letra;
        button.onclick = () => manejarClickLetra(letra);
        keyboardElement.appendChild(button);
    });
}


function manejarClickLetra(letra) {
    const botones = keyboardElement.getElementsByTagName("button");
    for (let boton of botones) {
        if (boton.textContent === letra) {
            boton.disabled = true;
        }
    }

    if (palabraElegida.includes(letra)) {
        actualizarPalabra(letra);
    } else {
        intentos++;
        actualizarAhorcado();
    }
}


function actualizarPalabra(letra) {
    for (let i = 0; i < palabraElegida.length; i++) {
        if (palabraElegida[i] === letra) {
            palabraGuiones[i] = letra;
        }
    }
    mostrarPalabra();
    comprobarVictoria();
}


function actualizarAhorcado() {
    hangmanAscii.textContent = dibujosAhorcado[intentos];
    if (intentos >= maxIntentos) {
        mostrarDerrota();
    }
}


function comprobarVictoria() {
    if (!palabraGuiones.includes("_")) {
        resultElement.textContent = "¡Ganaste! La palabra era: " + palabraElegida;
        deshabilitarTeclado();
        resetButton.style.display = "block";
    }
}


function mostrarDerrota() {
    resultElement.textContent = "Perdiste. La palabra era: " + palabraElegida;
    deshabilitarTeclado();
    resetButton.style.display = "block";
}


function deshabilitarTeclado() {
    const botones = keyboardElement.getElementsByTagName("button");
    for (let boton of botones) {
        boton.disabled = true;
    }
}


resetButton.onclick = iniciarJuego;
resetButton.style.display = "none";


iniciarJuego();
