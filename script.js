/* === LOGICA DEL MENU HAMBURGER === */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleziona gli elementi
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    // 2. Controlla se esistono
    if (navToggle && mainNav) {
        
        // --- LOGICA DI APERTURA/CHIUSURA (Pulsante) ---
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
            body.classList.toggle('no-scroll');
        });

        // === [NUOVO] Chiudi il menu quando si clicca un link ===
        
        // 1. Seleziona TUTTI i link dentro il menu
        const navLinks = document.querySelectorAll('.main-nav a');

        // 2. Aggiungi un evento 'click' a ciascun link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                
                // 3. Quando un link è cliccato, FORZA la chiusura del menu
                // (Usiamo .remove() invece di .toggle() perché vogliamo 
                // essere sicuri che si chiuda sempre)
                navToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
                body.classList.remove('no-scroll');
            });
        });
        // === Fine nuova sezione ===
    }
});
/* --- EFFETTO SCINTILLE v3 (Alone circolare attorno all'immagine) --- */

window.addEventListener('load', () => {

    const sparkleContainer = document.querySelector('.hero-image-wrapper');
    
    if (!sparkleContainer) {
        console.warn('Contenitore .hero-image-wrapper non trovato per le scintille.');
        return;
    }

    const templateColors = ['#FFD700', '#F0E68C', '#FFFFFF'];

    const sparkleSVG = `
    <svg width="6" height="20" viewBox="0 0 68 68" fill="none">
        <path d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z"/>
    </svg>
    `;

    function createSparkle() {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = sparkleSVG;

        const randomColor = templateColors[Math.floor(Math.random() * templateColors.length)];
        const sparklePath = sparkle.querySelector('path');
        if (sparklePath) {
            sparklePath.setAttribute('fill', randomColor);
        }

        // --- NUOVE LOGICHE DI POSIZIONAMENTO ---
        const containerRect = sparkleContainer.getBoundingClientRect();
        const containerSize = Math.min(containerRect.width, containerRect.height); // Prende la dimensione più piccola (per il cerchio)
        
        // Centro del contenitore (e quindi del cerchio)
        const centerX = containerSize / 2;
        const centerY = containerSize / 2;

        // Raggio approssimativo del cerchio della tua immagine (puoi aggiustarlo)
        const radius = containerSize / 2; 

        // Angolo casuale (in radianti)
        const angle = Math.random() * 2 * Math.PI;

        // Distanza dal centro (l'alone)
        // Partiamo da un punto leggermente all'interno del raggio e usciamo un po' fuori
        // `0.9` significa partire al 90% del raggio, `1.1` significa finire al 110%
        const distance = radius * (0.9 + Math.random() * 0.3); // Tra 90% e 110% del raggio

        // Calcola la posizione x, y sul cerchio
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);

        // Applica le posizioni (in percentuale rispetto al contenitore)
        sparkle.style.top = (y / containerSize * 100) + '%';
        sparkle.style.left = (x / containerSize * 100) + '%';
        // --- FINE NUOVE LOGICHE DI POSIZIONAMENTO ---


        const randomDuration = Math.random() * 600 + 600;
        sparkle.style.animationDuration = randomDuration + 'ms';

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1200);
    }

    setInterval(createSparkle, 30);

});