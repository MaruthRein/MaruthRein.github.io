document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.main-nav').classList.toggle('active');
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
});

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MENU MOBILE (Hamburger)
       ========================================= */
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const icon = this.querySelector('i') || this.querySelector('span'); // Gestisce sia <i> che <span>
            mainNav.classList.toggle('active');
            
            // Se usi FontAwesome
            if(icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else if (icon.classList.contains('fa-xmark')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            // Se usi hamburger span CSS puro
            if(icon.classList.contains('hamburger')) {
                this.classList.toggle('active');
            }
        });
    }

    /* =========================================
       2. POPUP CONTATTI
       ========================================= */
    const contactPopup = document.getElementById('contact-popup');
    const contactOverlay = document.getElementById('contact-overlay'); // Se usi un overlay separato
    const closeContactBtn = document.getElementById('close-contact-popup') || document.querySelector('.contact-close');
    
    // Funzione per aprire
    function openContact() {
        if(contactPopup) contactPopup.classList.add('active');
        if(contactOverlay) contactOverlay.classList.add('active');
    }

    // Funzione per chiudere
    function closeContact() {
        if(contactPopup) contactPopup.classList.remove('active');
        if(contactOverlay) contactOverlay.classList.remove('active');
    }

    // Attiva su tutti i link che puntano a #contact
    document.querySelectorAll('a[href="#contact"], #open-contact-popup').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openContact();
        });
    });

    if(closeContactBtn) closeContactBtn.addEventListener('click', closeContact);
    if(contactOverlay) contactOverlay.addEventListener('click', closeContact);


   /* ============================================================
       3. SLIDING DOOR (Event Delegation - FIX PER SWIPER LOOP)
       ============================================================ */
    const sliderPanel = document.getElementById('book-slider');
    const sliderOverlay = document.getElementById('slider-overlay');
    const closeSliderBtn = document.querySelector('.slider-close');
    const contentArea = document.getElementById('dynamic-content-area');
    const loader = document.getElementById('slider-loader');

    if (sliderPanel) {
        
        // MODIFICA: Usiamo "Event Delegation" sul document invece di un loop sui pulsanti.
        // Questo intercetta i click anche sulle slide clonate da Swiper.
        document.addEventListener('click', function(e) {
            
            // Cerca se l'elemento cliccato (o un suo genitore) ha la classe .open-slider
            const btn = e.target.closest('.open-slider');
            const contactBtnFromSlider = e.target.closest('.open-contact-from-slider');
            const portfolioCard = e.target.closest('.portfolio-card');

            
            if (btn) {
                e.preventDefault();
                
                // Recupera attributi
                const fileUrl = btn.getAttribute('data-url');
                const targetId = btn.getAttribute('data-book');
                const layoutMode = btn.getAttribute('data-layout'); 

                // --- GESTIONE LARGHEZZA ---
                if (layoutMode === 'wide') {
                    sliderPanel.classList.add('wide-mode');
                } else {
                    sliderPanel.classList.remove('wide-mode');
                }

                // 1. APRI PANNELLO
                sliderPanel.classList.add('active');
                if(sliderOverlay) sliderOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';

                // CASO A: FILE ESTERNO (data-url)
                if (fileUrl) {
                    if(contentArea) {
                        contentArea.innerHTML = '';
                        contentArea.style.opacity = '0';
                    }
                    if(loader) loader.style.display = 'block';

                    fetch(fileUrl)
                        .then(res => {
                            if(!res.ok) throw new Error("Errore fetch");
                            return res.text();
                        })
                        .then(html => {
                            if(loader) loader.style.display = 'none';
                            if(contentArea) {
                                contentArea.innerHTML = html;
                                setTimeout(() => {
                                    contentArea.style.transition = 'opacity 0.5s ease';
                                    contentArea.style.opacity = '1';
                                }, 50);
                            }
                            // Non serve ri-bindare i bottoni grazie all'Event Delegation!
                        })
                        .catch(err => {
                            console.error(err);
                            if(loader) loader.style.display = 'none';
                        });
                } 
                
                // CASO B: CONTENUTO INTERNO (data-book)
                else if (targetId) {
                    if(loader) loader.style.display = 'none';
                    // Nascondi tutti i contenuti interni
                    document.querySelectorAll('.book-content').forEach(el => el.style.display = 'none');
                    // Mostra quello giusto
                    const targetDiv = document.getElementById(targetId);
                    if(targetDiv) targetDiv.style.display = 'block';
                }
            }
        });

       

        

        // CHIUSURA
        function closeSlider() {
            sliderPanel.classList.remove('active');
            if(sliderOverlay) sliderOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Pulizia opzionale
            setTimeout(() => {
                if(contentArea) contentArea.innerHTML = '';
            }, 500);
        }

        if(closeSliderBtn) closeSliderBtn.addEventListener('click', closeSlider);
        if(sliderOverlay) sliderOverlay.addEventListener('click', closeSlider);
    }
    /* =========================================
       4. SCROLL REVEAL (Animazioni Luxury)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Focus centrale
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Elementi da animare: Blocchi Chi Sono, Immagini, ecc.
    const revealElements = document.querySelectorAll('.chi-block, .reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

});

/* ============================================================
       6. ANIMAZIONE STRUMENTI (Hybrid: Mobile Scroll + Desktop Hover)
       ============================================================ */
    const toolsSection = document.querySelector('#strumenti');
    const toolCards = document.querySelectorAll('.tool-card');

    // --- 1. FUNZIONE RESET (Svuota cerchio istantaneamente) ---
    function resetCard(card) {
        const circle = card.querySelector('.progress-ring__circle');
        const text = card.querySelector('.tool-percentage-text');
        
        if (!circle || !text) return;

        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        // Tolgo la transizione per rendere il reset invisibile e immediato
        circle.style.transition = 'none'; 
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference; // Stato vuoto
        text.textContent = "0%";
        
        // Pulisco il timer del contatore se stava girando
        if (card.dataset.timer) clearInterval(card.dataset.timer);
    }

    // --- 2. FUNZIONE ANIMA (Riempi cerchio) ---
    function animateCard(card) {
        // PROTEZIONE MOBILE: Se è già animata, fermati (evita scatti mentre scorri)
        // Questa protezione verrà "aggirata" dall'hover desktop
        if (card.classList.contains('animated')) return;

        const percent = card.getAttribute('data-percent');
        const circle = card.querySelector('.progress-ring__circle');
        const text = card.querySelector('.tool-percentage-text');

        if (!circle || !text) return;

        // Segno la card come "animata" per bloccare ripetizioni involontarie su mobile
        card.classList.add('animated'); 

        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        // Riattivo la transizione CSS per l'animazione fluida
        setTimeout(() => {
            circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
            circle.style.strokeDashoffset = offset;
        }, 50);

        // Animazione Numero (Counter)
        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / percent));

        if (card.dataset.timer) clearInterval(card.dataset.timer);

        const timer = setInterval(() => {
            if (start >= percent) {
                text.textContent = percent + "%";
                clearInterval(timer);
            } else {
                start++;
                text.textContent = start + "%";
            }
        }, stepTime);

        card.dataset.timer = timer;
    }

    // --- 3. LOGICA SCROLL (Per tutti i dispositivi) ---
    const toolsObserverOptions = {
        root: null,
        rootMargin: '0px', 
        threshold: 0.15 // Parte quando il 15% è visibile
    };

    const toolsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ENTRA: Anima
                animateCard(entry.target);
            } else {
                // ESCE: Resetta tutto (così al prossimo scroll riparte)
                entry.target.classList.remove('animated'); // Rimuovo il blocco
                resetCard(entry.target);
            }
        });
    }, toolsObserverOptions);

    // Osservo ogni card singolarmente
    toolCards.forEach(card => {
        toolsObserver.observe(card);
    });

    // --- 4. LOGICA HOVER (Solo Desktop) ---
    // Verifica se il dispositivo ha un mouse (evita di attivarsi al tocco su mobile)
    if (window.matchMedia("(hover: hover)").matches) {
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // TRUCCO: Rimuovo la classe 'animated' per forzare l'animazione
                card.classList.remove('animated'); 
                
                resetCard(card); // Resetta a 0
                
                // Faccio ripartire l'animazione dopo un micro-ritardo
                setTimeout(() => animateCard(card), 50);
            });
        });
    }

    /* ============================================================
       7. 3D CAROUSEL (Swiper.js)
       ============================================================ */
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true, // La slide attiva è al centro
        slidesPerView: "auto", // Permette larghezze variabili
        initialSlide: 2, // Parte dalla terza card (opzionale)
        loop: true, // Gira all'infinito
        
        // CONFIGURAZIONE EFFETTO 3D
        coverflowEffect: {
            rotate: 25,       // Rotazione delle card laterali (es. 25 gradi)
            stretch: 0,       // Spaziatura (0 va bene)
            depth: 150,       // Profondità (quanto vanno "dietro" le card laterali)
            modifier: 1,      // Moltiplicatore effetto
            slideShadows: true, // Ombre scure sulle card laterali
        },
        
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        
        // Autoplay lento per effetto "vetrina"
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Velocità transizione
        speed: 800,
    });

    document.addEventListener("DOMContentLoaded", () => {

    // seleziona tutte le card che aprono una gallery
    const cards = document.querySelectorAll(".portfolio-card");

    cards.forEach(card => {
        card.addEventListener("click", () => {

            const galleryDataEl = card.querySelector(".gallery-data");
            if (!galleryDataEl) return;

            // Legge il JSON contenuto nel div nascosto
            let galleryItems = [];
            try {
                galleryItems = JSON.parse(galleryDataEl.textContent);
            } catch (e) {
                console.error("Errore JSON nella gallery:", e);
                return;
            }

            // Crea un container temporaneo
            const tempGallery = document.createElement("div");
            document.body.appendChild(tempGallery);

            // Avvia la gallery
            const gallery = lightGallery(tempGallery, {
                dynamic: true,
                dynamicEl: galleryItems,
                plugins: [lgZoom, lgThumbnail],
                closable: true,
                download: false
            });

            gallery.openGallery();

            // Rimuove il container quando chiudi la gallery
            gallery.on('lgAfterClose', () => {
                tempGallery.remove();
            });

        });
    });

});



/* ============================
   GURU SLIDER
   ============================ */

const guruImages = [
    "assets/images/Guru/The Guru.png",
    "assets/images/Guru/Guru_mente.jpg",
     "assets/images/Guru/guru_universo.png"
];

let guruIndex = 0;
const guruImg = document.getElementById("guru-image");

function updateGuruImage() {
    guruImg.style.opacity = 0;

    setTimeout(() => {
        guruImg.src = guruImages[guruIndex];
        guruImg.style.opacity = 1;
    }, 200);
}

function nextGuru() {
    guruIndex = (guruIndex + 1) % guruImages.length;
    updateGuruImage();
}

function prevGuru() {
    guruIndex = (guruIndex - 1 + guruImages.length) % guruImages.length;
    updateGuruImage();
}

document.addEventListener("DOMContentLoaded", function() {

    /* =================================================================
       QUI INCOLLI IL MIO "CONTROLLER UNIVERSALE SLIDER" 
       (Quello del messaggio precedente con il FIX ANIMAZIONE)
       ================================================================= */
    // ... codice del messaggio precedente ...


    /* =========================================
       4. SCROLL REVEAL (Questo tienilo, va bene!)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.chi-block, .reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

});

/* --- NUOVO PLAYER UNIVERSALE (Gestisce più video) --- */

// Sostituisci la vecchia funzione playReel con questa:
window.playUniversal = function(clickedOverlay) {
    // 1. Trova il contenitore genitore dell'overlay cliccato
    const wrapper = clickedOverlay.closest('.video-container');
    
    if (!wrapper) {
        console.error("Errore: Contenitore video non trovato.");
        return;
    }

    // 2. Trova il tag <video> DENTRO quel contenitore specifico
    const video = wrapper.querySelector('video');

    if (!video) {
        console.error("Errore: Tag video non trovato nel contenitore.");
        return;
    }
    
    // 3. Avvia quel video specifico
    var playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Nascondi SOLO l'overlay cliccato
            clickedOverlay.style.opacity = "0";
            setTimeout(() => { clickedOverlay.style.display = "none"; }, 500);
            
            // Opzionale: Ferma gli altri video se stanno andando
            document.querySelectorAll('video').forEach(otherVideo => {
                if (otherVideo !== video) otherVideo.pause();
            });
            
        }).catch(error => {
            console.error("Errore Play:", error);
            alert("Impossibile avviare il video. Controlla il percorso del file.");
        });
    }
};