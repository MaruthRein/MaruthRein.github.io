document.addEventListener('DOMContentLoaded', () => {

    /* =================================== */
    /* 1. COPYRIGHT DINAMICO NEL FOOTER    */
    /* =================================== */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* =================================== */
    /* 2. MENU HAMBURGER                   */
    /* =================================== */

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', String(!expanded));

            navToggle.classList.toggle('is-active');
            mainNav.classList.toggle('is-open');
            body.classList.toggle('no-scroll');
        });

        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('is-active');
                mainNav.classList.remove('is-open');
                body.classList.remove('no-scroll');
            });
        });
    }

    /* ======================================= */
    /* 3. ACCORDION "THE GURU"                 */
    /* ======================================= */

    const accordionButtons = document.querySelectorAll('.accordion-button');
    console.log('Accordion: bottoni trovati =', accordionButtons.length);

    if (accordionButtons.length > 0) {

        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {

                const panelId = button.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);

                if (!panel) {
                    console.warn('Accordion: pannello non trovato per', panelId);
                    return;
                }

                const isOpen = button.getAttribute('aria-expanded') === 'true';
                console.log('Click su', button.id, ' | era aperto?', isOpen);

                // Chiudi tutti i pannelli
                accordionButtons.forEach(btn => {
                    const otherPanelId = btn.getAttribute('aria-controls');
                    const otherPanel = document.getElementById(otherPanelId);

                    btn.setAttribute('aria-expanded', 'false');
                    btn.classList.remove('active');

                    if (otherPanel) {
                        otherPanel.hidden = true;
                    }
                });

                // Se questo non era aperto → aprilo
                if (!isOpen) {
                    button.setAttribute('aria-expanded', 'true');
                    button.classList.add('active');
                    panel.hidden = false;
                }
            });
        });

        // Apri il primo pannello di default
        const firstButton = accordionButtons[0];
        const firstPanelId = firstButton.getAttribute('aria-controls');
        const firstPanel = document.getElementById(firstPanelId);

        if (firstPanel) {
            firstButton.setAttribute('aria-expanded', 'true');
            firstButton.classList.add('active');
            firstPanel.hidden = false;
        }
    }

    /* ========================================= */
    /* 4. LIGHTBOX PORTFOLIO (SE PRESENTE)       */
    /* ========================================= */

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

});
