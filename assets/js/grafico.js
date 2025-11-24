/* =========================================
   SCRIPT DEDICATO: GRAFICO & ILLUSTRATORE
   ========================================= */

document.addEventListener('click', function (e) {

    // 1. Intercetta il click SOLO sulle card del portfolio
    const card = e.target.closest('.portfolio-card');
    if (!card) return;

    // 2. Cerca i dati JSON nascosti
    const dataDiv = card.querySelector('.gallery-data');
    if (!dataDiv) return;

    // Blocca il link standard
    e.preventDefault();
    e.stopPropagation();

    // 3. Verifica che la libreria LightGallery sia caricata (G maiuscola come richiesto)
    // Supportiamo sia window.LightGallery (tua preferenza) che window.lightGallery
    const lgFactory = window.LightGallery || window.lightGallery;

    if (typeof lgFactory !== "function") {
        console.error("❌ Errore: La libreria LightGallery non è stata caricata nell'index.");
        return;
    }

    let images = [];

    // 4. Parsing dei dati JSON
    try {
        images = JSON.parse(dataDiv.textContent.trim());
    } catch (err) {
        console.error("❌ Errore nel formato JSON della gallery:", err);
        return;
    }

    // 5. Crea un container temporaneo invisibile
    const container = document.createElement('div');
    // Non è strettamente necessario appenderlo al body con le nuove versioni, 
    // ma lo facciamo per sicurezza
    document.body.appendChild(container);

    // 6. INIZIALIZZA LA GALLERIA CON CONFIGURAZIONE LUXURY
    const gallery = lgFactory(container, {
        dynamic: true,
        dynamicEl: images,
        
        // Plugin (devono essere caricati nell'index)
        plugins: [lgZoom, lgThumbnail],
        
        // --- TUA CONFIGURAZIONE PREMIUM ---
        licenseKey: 'GPLv3',      // Licenza corretta
        speed: 600,               // Transizione lenta ed elegante
        counter: true,            // 1 di X
        download: false,          // Nascondi download
        zoom: true,
        actualSize: false,        // Smart zoom
        backdropDuration: 400,    // Sfondo appare gradualmente
        
        mobileSettings: {
            showCloseIcon: true,
            controls: true,
            download: false
        }
    });

    // 7. Apri la galleria
    gallery.openGallery();

    // 8. Pulizia quando chiudi
    container.addEventListener('lgAfterClose', () => {
        container.remove();
    });
});