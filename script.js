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
/* --- LOGICA PER ACCORDION "THE GURU" --- */

// Aspetta che il documento sia caricato
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Trova tutti i bottoni dell'accordion
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // 2. Aggiungi un "ascoltatore" di clic a ciascun bottone
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 3. Controlla se il pannello cliccato è già aperto
            const isAlreadyOpen = button.classList.contains('active');

            // 4. Chiudi tutti i pannelli
            accordionButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.style.maxHeight = null;
            });

            // 5. Se NON era già aperto, aprilo
            if (!isAlreadyOpen) {
                button.classList.add('active');
                const content = button.nextElementSibling;
                // 'scrollHeight' calcola l'altezza esatta del contenuto
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Bonus: Apri il primo pannello di default all'avvio
    if (accordionButtons.length > 0) {
        accordionButtons[0].click(); // Simula un clic sul primo bottone
    }
});
