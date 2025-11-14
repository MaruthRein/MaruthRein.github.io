document.addEventListener('DOMContentLoaded', () => {

    /* =================================== */
    /* === 1. GESTIONE COPYRIGHT DINAMICO === */
    /* =================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* =================================== */
    /* === 2. LOGICA DEL MENU HAMBURGER === */
    /* =================================== */
    
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        
        // --- LOGICA DI APERTURA/CHIUSURA (Pulsante) ---
        navToggle.addEventListener('click', () => {
            // Legge lo stato di accessibilità
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', String(!expanded));
            
            // Aggiunge/rimuove le classi per l'animazione e il blocco dello scorrimento
            navToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
            body.classList.toggle('no-scroll');
        });

        // --- Chiudi il menu quando si clicca un link ---
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Forza la chiusura
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
                body.classList.remove('no-scroll');
            });
        });
    }

   /* ======================================= */
    /* === 3. LOGICA PER ACCORDION "THE GURU" === */
    /* ======================================= */
    
    const accordionButtons = document.querySelectorAll('.accordion-button');

    // Esegui questo blocco solo se ci sono bottoni accordion nella pagina
    if (accordionButtons.length > 0) {
        
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const expanded = button.getAttribute('aria-expanded') === 'true' || false;
                
                // === Logica Migliorata ===
                // Trova il pannello di contenuto usando 'aria-controls'
                const panelId = button.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);

                // Se non trova un pannello, non fare nulla
                if (!panel) return;

                // Chiudi tutti gli altri pannelli
                accordionButtons.forEach(btn => {
                    if (btn !== button) {
                        btn.setAttribute('aria-expanded', 'false');
                        btn.classList.remove('active');
                        
                        // Nascondi gli altri pannelli
                        const otherPanelId = btn.getAttribute('aria-controls');
                        const otherPanel = document.getElementById(otherPanelId);
                        if (otherPanel) {
                            otherPanel.hidden = true;
                        }
                    }
                });

                // Apri/Chiudi il pannello corrente
                button.setAttribute('aria-expanded', String(!expanded));
                button.classList.toggle('active');
                
                // Mostra/nascondi il pannello corrente
                // (Questo è il pezzo chiave che mancava)
                panel.hidden = !panel.hidden; 
            });
        });

        // Apri il primo pannello di default
        // (Logica aggiornata per rimuovere 'hidden')
        const firstButton = accordionButtons[0];
        const firstPanelId = firstButton.getAttribute('aria-controls');
        const firstPanel = document.getElementById(firstPanelId);

        if (firstButton && firstPanel) {
             firstButton.setAttribute('aria-expanded', 'true');
             firstButton.classList.add('active');
             firstPanel.hidden = false; // Rimuove 'hidden' dal primo pannello
        }
    }

    /* =========================================
     4. LOGICA LIGHTBOX (Se presente)
    ========================================= */
    // (Questo codice ora è sicuro e funziona solo se trova gli ID)

    const openBtn = document.getElementById('open-portfolio-btn');
    const lightbox = document.getElementById('portfolioLightbox');
    const overlay = document.getElementById('portfolioOverlay');
    const closeBtn = document.getElementById('closePortfolioBtn');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function openLightbox() {
        if (lightbox) lightbox.classList.add('is-open');
        if (overlay) overlay.classList.add('is-open');
        if (body) body.classList.add('no-scroll'); 
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-open');
        if (body) body.classList.remove('no-scroll');
    }

    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            openLightbox();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    if (overlay) {
        overlay.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tabId = link.getAttribute('data-tab');
                tabLinks.forEach(item => item.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                link.classList.add('active');
                const activePane = document.getElementById(tabId);
                if (activePane) {
                    activePane.classList.add('active');
                }
            });
        });
    }

document.querySelectorAll(".tool-circle").forEach(circle => {
    let percent = circle.getAttribute("data-percent");
    circle.style.setProperty("--percent", percent);
});
