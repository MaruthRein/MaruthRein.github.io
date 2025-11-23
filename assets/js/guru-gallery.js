// Lista delle immagini del Guru
const guruImages = [
    "assets/images/The Guru.png",
    "assets/images/guru_universo.jpg.png",
    "assets/images/Guru_mente.jpg"
    // aggiungi quante immagini vuoi
];

let currentGuruIndex = 0;

// Riferimento all'immagine
const guruImgElement = document.getElementById("guru-image");

// Mostra immagine in base all’indice
function showGuru(index) {
    if (index < 0) {
        currentGuruIndex = guruImages.length - 1;
    } else if (index >= guruImages.length) {
        currentGuruIndex = 0;
    } else {
        currentGuruIndex = index;
    }

    guruImgElement.src = guruImages[currentGuruIndex];
}

// Freccia sinistra
function prevGuru() {
    showGuru(currentGuruIndex - 1);
}

// Freccia destra
function nextGuru() {
    showGuru(currentGuruIndex + 1);
}
