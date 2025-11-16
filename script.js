/* SEPARATORE DESCRIZIONE: INIZIO SCRIPT GLOBALI */

/* * Non usiamo 'DOMContentLoaded' qui dentro, perché l'attributo 'defer' 
 * nel tag <script> nell'HTML si occupa già di aspettare il caricamento.
 */

/* ==============================================
   SEPARATORE DESCRIZIONE: 1. SCRIPT MENU HAMBURGER (Mobile)
   ============================================== */

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const body = document.body;

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('is-open'); 
        mainNav.classList.toggle('is-open');
        body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle.classList.contains('is-open')) {
                navToggle.classList.remove('is-open');
                mainNav.classList.remove('is-open');
                body.classList.remove('no-scroll');
            }
        });
    });
} // Fine script Hamburger


/* ==============================================
   SEPARATORE DESCRIZIONE: 2. SCRIPT ACCORDION (The Guru)
   ============================================== */

const accordionButtons = document.querySelectorAll(".accordion-button");

if (accordionButtons.length > 0) {
    accordionButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
            const isExpanded = button.classList.contains("active");
            button.setAttribute("aria-expanded", isExpanded);
        });
    });
} // Fine script Accordion


/* ==============================================
   SEPARATORE DESCRIZIONE: 3. SCRIPT POPUP CONTATTI (CUSTOM)
   ============================================== */

// Seleziona tutti gli elementi necessari per il popup
const contactTrigger = document.getElementById('open-contact-popup');
const contactPopup = document.getElementById('contact-popup');
const contactOverlay = document.getElementById('contact-overlay');
const contactClose = document.getElementById('close-contact-popup');

// Controlla che tutti gli elementi esistano
if (contactTrigger && contactPopup && contactOverlay && contactClose) {

    // Funzione per APRIRE il popup
    function openContactPopup(e) {
        e.preventDefault(); // Evita che il link '#' faccia saltare la pagina
        contactPopup.classList.add('is-open');
        contactOverlay.classList.add('is-open');
        document.body.classList.add('no-scroll'); // Blocca lo scroll dello sfondo
    }

    // Funzione per CHIUDERE il popup
    function closeContactPopup() {
        contactPopup.classList.remove('is-open');
        contactOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll'); // Sblocca lo scroll
    }

    // Associa gli eventi
    contactTrigger.addEventListener('click', openContactPopup);
    contactClose.addEventListener('click', closeContactPopup);
    contactOverlay.addEventListener('click', closeContactPopup); // Chiude anche cliccando sullo sfondo

} // Fine script Popup Contatti

/* ==============================================
   SEPARATORE DESCRIZIONE: 4. SCRIPT ANIMAZIONE CERCHI (per index.html)
   ============================================== */

const circles = document.querySelectorAll(".tool-circle");

if (circles.length > 0 && typeof IntersectionObserver !== 'undefined') {
    
    function resetCircle(circle) {
        circle.style.background = `conic-gradient(#e0b467 0deg, rgba(255,255,255,0.05) 0deg)`;
    }

    function animateCircle(circle, finalPercent) {
        let startTime = null;
        function update(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / 1500, 1);
            const value = progress * finalPercent;
            const degrees = (value * 360) / 100;
            circle.style.background = `conic-gradient(#e0b467 ${degrees}deg, rgba(255,255,255,0.05) 0deg)`;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const circle = entry.target;
            const percent = parseInt(circle.getAttribute("data-percent"));
            if (entry.isIntersecting) {
                animateCircle(circle, percent);
            } else {
                resetCircle(circle);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => {
        resetCircle(circle); 
        observer.observe(circle);
    });
} // Fine script Cerchi


/* ==================================================
   SEPARATORE DESCRIZIONE: 5. SCRIPT MODALE PORTFOLIO (per pagina-grafico.html)
   ================================================== */

const openBtn = document.getElementById('open-portfolio-btn'); 
const lightbox = document.getElementById('portfolioLightbox');
const overlay = document.getElementById('portfolioOverlay');
const closeBtn = document.getElementById('closePortfolioBtn');
const tabLinks = document.querySelectorAll('.tab-link');
const tabPanes = document.querySelectorAll('.tab-pane');
let lightGalleryInstances = {};

if (openBtn && lightbox && typeof LightGallery !== 'undefined' && typeof lgThumbnail !== 'undefined') {

    function initLightGallery(galleryId) {
        if (lightGalleryInstances[galleryId]) {
            lightGalleryInstances[galleryId].destroy();
        }
        const galleryElement = document.getElementById(galleryId);
        if (galleryElement) {
            const instance = LightGallery(galleryElement, {
                plugins: [lgThumbnail, lgZoom],
                selector: 'a',
                speed: 500,
                download: false,
                licenseKey: 'GPLv3'
            });
            lightGalleryInstances[galleryId] = instance;
        }
    }

    function openLightbox() {
        if (lightbox) lightbox.classList.add('is-open');
        if (overlay) overlay.classList.add('is-open');
        document.body.classList.add('no-scroll');
        const firstActiveGallery = document.querySelector('.tab-pane.active .portfolio-gallery-grid');
        if (firstActiveGallery && firstActiveGallery.id) {
            initLightGallery(firstActiveGallery.id);
        }
    }

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
        for (const key in lightGalleryInstances) {
            if (lightGalleryInstances[key]) {
                lightGalleryInstances[key].destroy();
            }
        }
        lightGalleryInstances = {};
    }

    openBtn.addEventListener('click', e => {
        e.preventDefault();
        openLightbox();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (overlay) overlay.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });

    if (tabLinks.length > 0) {
        tabLinks.forEach(link => {
            link.addEventListener('click', () => {
                const tabId = link.getAttribute('data-tab');
                const activePane = document.getElementById(tabId);
                const galleryGridId = activePane?.querySelector('.portfolio-gallery-grid')?.id;

                tabLinks.forEach(item => item.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                link.classList.add('active');
                if (activePane) activePane.classList.add('active');
                if (galleryGridId) initLightGallery(galleryGridId);
            });
        });
    }
    
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length > 0) {
        serviceItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox();
                const targetTab = document.querySelector(`.tab-link[data-tab="tab-${index + 1}"]`);
                const targetPane = document.getElementById(`tab-${index + 1}`);
                
                tabLinks.forEach(link => link.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                if (targetTab && targetPane) {
                    targetTab.classList.add('active');
                    targetPane.classList.add('active');
                    const galleryGridId = targetPane.querySelector('.portfolio-gallery-grid')?.id;
                    if (galleryGridId) initLightGallery(galleryGridId);
                }
            });
        });
    }
} // Fine script Modale Portfolio