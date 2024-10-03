
const palabras = [
    "regresion",
    "integracion",
    "unitarias",
    "sistema",
    "aceptacion",
    "automatizacion",
    "usabilidad",
    "validacion",
    "verificacion",
    "cobertura"
];

let palabraOriginal = "";
let palabraDesordenada = "";


const anagramaElement = document.getElementById("anagrama");
const respuestaInput = document.getElementById("respuesta");
const verificarButton = document.getElementById("verificar");
const mensajeElement = document.getElementById("mensaje");
const reiniciarButton = document.getElementById("reiniciar");


function iniciarJuego() {
    
    palabraOriginal = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    
    palabraDesordenada = desordenarPalabra(palabraOriginal);
    
    anagramaElement.textContent = palabraDesordenada;
    
    respuestaInput.value = "";
    mensajeElement.textContent = "";
}


function desordenarPalabra(palabra) {
    const letras = palabra.split("");
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    return letras.join("");
}


verificarButton.onclick = function() {
    const respuesta = respuestaInput.value.toUpperCase();
    if (respuesta === palabraOriginal) {
        mensajeElement.textContent = "¡Correcto! La palabra es: " + palabraOriginal;
        mensajeElement.style.color = "green";
    } else {
        mensajeElement.textContent = "Incorrecto, intenta de nuevo.";
        mensajeElement.style.color = "red";
    }
};


reiniciarButton.onclick = iniciarJuego;


iniciarJuego();
