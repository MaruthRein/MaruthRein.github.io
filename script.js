/* ============================================================
   SCRIPT GLOBALI – Maruth Rein
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================
       1. MENU HAMBURGER
       ============================================== */
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
            body.classList.toggle('no-scroll');
        });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
                body.classList.remove('no-scroll');
            });
        });
    }


    /* ==============================================
       2. ACCORDION (THE GURU)
       ============================================== */
    const accordions = document.querySelectorAll(".accordion-button");
    if (accordions.length > 0) {
        accordions.forEach(button => {
            button.addEventListener("click", () => {
                button.classList.toggle("active");
                const isExpanded = button.classList.contains("active");
                button.setAttribute("aria-expanded", isExpanded);
                
                const content = document.getElementById(button.getAttribute("aria-controls"));
                if (content) {
                    // Opzionale: logica per chiudere gli altri se necessario
                }
            });
        });
    }


    /* ==============================================
       3. POPUP CONTATTI (Gestione Multipla)
       ============================================== */
    // Selezioniamo TUTTI i possibili pulsanti di apertura (Menu + CTA Chi Sono)
    const contactTriggers = [
        document.getElementById('open-contact-popup'),
        document.getElementById('open-contact-popup-cta')
    ];
    
    const contactPopup = document.getElementById('contact-popup');
    const contactOverlay = document.getElementById('contact-overlay');
    const contactClose = document.getElementById('close-contact-popup');

    if (contactPopup && contactOverlay) {

        function openContact(e) {
            if(e) e.preventDefault();
            contactPopup.classList.add('is-open');
            contactOverlay.classList.add('is-open');
            document.body.classList.add('no-scroll');
        }

        function closeContact() {
            contactPopup.classList.remove('is-open');
            contactOverlay.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }

        // Assegna l'evento click solo ai pulsanti che esistono nella pagina corrente
        contactTriggers.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', openContact);
            }
        });

        if (contactClose) contactClose.addEventListener('click', closeContact);
        contactOverlay.addEventListener('click', closeContact);
        
        // Chiudi con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && contactPopup.classList.contains('is-open')) {
                closeContact();
            }
        });
    }


    /* ==============================================
       4. ANIMAZIONE CERCHI (SKILLS)
       ============================================== */
    const circles = document.querySelectorAll(".tool-circle");

    if (circles.length > 0 && "IntersectionObserver" in window) {

        function resetCircle(circle) {
            circle.style.background = `conic-gradient(#e0b467 0deg, rgba(255,255,255,0.05) 0deg)`;
        }

        function animateCircle(circle, finalPercent) {
            let start = null;
            function frame(time) {
                if (!start) start = time;
                const progress = Math.min((time - start) / 1500, 1);
                const current = progress * finalPercent;
                const deg = (current * 360) / 100;
                circle.style.background = `conic-gradient(#e0b467 ${deg}deg, rgba(255,255,255,0.05) 0deg)`;
                if (progress < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const c = entry.target;
                const p = parseInt(c.dataset.percent);
                if (entry.isIntersecting) animateCircle(c, p);
                else resetCircle(c);
            });
        }, { threshold: 0.5 });

        circles.forEach(circle => {
            resetCircle(circle);
            observer.observe(circle);
        });
    }


    /* ============================================================
       5. MODALE PORTFOLIO + LIGHTGALLERY
       ============================================================ */
    const openPortfolio = document.getElementById('open-portfolio-btn');
    const portfolioLightbox = document.getElementById('portfolioLightbox');
    const portfolioOverlay = document.getElementById('portfolioOverlay');
    const portfolioClose = document.getElementById('closePortfolioBtn');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    let LGinstances = {};

    // Esegui questo blocco solo se il portfolio esiste nella pagina
    if (portfolioLightbox) {

        function initLG(galleryId) {
            if (!galleryId) return;

            // Distruggi istanza precedente se esiste
            if (LGinstances[galleryId]) {
                try {
                    LGinstances[galleryId].destroy(true);
                } catch (err) {
                    console.log("LightGallery destroy error", err);
                }
            }

            const galleryElement = document.getElementById(galleryId);
            
            // Verifica che l'elemento esista e che la libreria sia caricata
            if (galleryElement && typeof lightGallery !== 'undefined') {
                // Utilizzo lightGallery (minuscolo) come da standard CDN, ma con licenza GPLv3
                const instance = lightGallery(galleryElement, {
                    plugins: [lgThumbnail, lgZoom],
                    selector: 'a',
                    speed: 500,
                    download: false,
                    licenseKey: 'GPLv3'
                });
                LGinstances[galleryId] = instance;
            }
        }

        function openModal() {
            portfolioLightbox.classList.add('is-open');
            portfolioOverlay.classList.add('is-open');
            document.body.classList.add('no-scroll');

            // Inizializza la galleria della tab attiva
            const activePane = document.querySelector('.tab-pane.active');
            if (activePane) {
                const galleryGrid = activePane.querySelector('.portfolio-gallery-grid');
                if (galleryGrid) initLG(galleryGrid.id);
            }
        }

        function closeModal() {
            portfolioLightbox.classList.remove('is-open');
            portfolioOverlay.classList.remove('is-open');
            document.body.classList.remove('no-scroll');

            // Pulisci istanze
            Object.values(LGinstances).forEach(inst => {
                try { inst.destroy(true); } catch(e){}
            });
            LGinstances = {};
        }

        // Event Listeners per il Portfolio
        if (openPortfolio) {
            openPortfolio.addEventListener('click', e => {
                e.preventDefault();
                openModal();
            });
        }

        if (portfolioClose) portfolioClose.addEventListener('click', closeModal);
        if (portfolioOverlay) portfolioOverlay.addEventListener('click', closeModal);

        // Gestione TAB
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tab = link.dataset.tab;
                const pane = document.getElementById(tab);

                if(pane) {
                    tabLinks.forEach(l => l.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    link.classList.add('active');
                    pane.classList.add('active');

                    const gallery = pane.querySelector('.portfolio-gallery-grid');
                    if (gallery) initLG(gallery.id);
                }
            });
        });

        // Click sulle card dei servizi (Home Page) che aprono tab specifici
        document.querySelectorAll('.service-item').forEach((item, i) => {
            item.addEventListener('click', () => {
                openModal();
                const tabIndex = i + 1;
                const tabId = `tab-${tabIndex}`;
                const link = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
                const pane = document.getElementById(tabId);

                if (link && pane) {
                    tabLinks.forEach(l => l.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    link.classList.add('active');
                    pane.classList.add('active');

                    const gallery = pane.querySelector('.portfolio-gallery-grid');
                    if (gallery) initLG(gallery.id);
                }
            });
        });
    }
});