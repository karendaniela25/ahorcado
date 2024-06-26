const palabras = [
    { palabra: 'princesa', imagen: 'imagenes/princesa.png' },
    { palabra: 'unicornios', imagen: 'imagenes/unicornio.png' },
    { palabra: 'arcoiris', imagen: 'imagenes/arcoiris.png' },
    { palabra: 'mariposas', imagen: 'imagenes/mariposas.png' },
    { palabra: 'dulces', imagen: 'imagenes/dulces.png' },
    { palabra: 'hadas', imagen: 'imagenes/hadas.png' },
    { palabra: 'flores', imagen: 'imagenes/flores.png' }
];

let palabraObj;
let palabraAdivinada;
let intentos;
const maxIntentos = 6;

const imagenPalabra = document.getElementById('imagen_palabra');
const imagenAhorcado = document.getElementById('imagen_ahorcado');
const palabraAdivinarDiv = document.getElementById('palabra_a_adivinar');
const erroresDiv = document.getElementById('errores');
const letraInput = document.getElementById('letra');
const adivinarBtn = document.getElementById('adivinar');
const reiniciarBtn = document.getElementById('reiniciar');

function iniciarJuego() {
    palabraObj = palabras[Math.floor(Math.random() * palabras.length)];
    palabraAdivinada = Array(palabraObj.palabra.length).fill('_');
    intentos = 0;
    letraInput.value = '';
    letraInput.focus();
    imagenPalabra.src = palabraObj.imagen;
    actualizarJuego();
}

function actualizarJuego() {
    palabraAdivinarDiv.innerHTML = palabraAdivinada.join(' ');
    imagenAhorcado.src = `imagenes/ahorcado${intentos}.png`;
    erroresDiv.innerHTML = `Errores: ${intentos}`;
}

function adivinarLetra() {
    const letra = letraInput.value.toLowerCase();
    letraInput.value = '';
    letraInput.focus();
    if (!letra || palabraAdivinada.includes(letra)) return;

    if (palabraObj.palabra.includes(letra)) {
        for (let i = 0; i < palabraObj.palabra.length; i++) {
            if (palabraObj.palabra[i] === letra) {
                palabraAdivinada[i] = letra;
            }
        }
    } else {
        intentos++;
    }

    actualizarJuego();

    if (!palabraAdivinada.includes('_')) {
        alert('¡Ganaste! La palabra era ' + palabraObj.palabra);
        reiniciarJuego();
    } else if (intentos >= maxIntentos) {
        alert('Perdiste. La palabra era ' + palabraObj.palabra);
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    iniciarJuego();
}

adivinarBtn.addEventListener('click', adivinarLetra);
reiniciarBtn.addEventListener('click', reiniciarJuego);

iniciarJuego();
