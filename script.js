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