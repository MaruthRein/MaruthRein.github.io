/* =========================================
   SCRIPT DEDICATO: GRAFICO & ILLUSTRATORE
   ========================================= */

document.addEventListener('click', function (e) {

    const card = e.target.closest('.portfolio-card');
    if (!card) return;

    const dataDiv = card.querySelector('.gallery-data');
    if (!dataDiv) return;

    e.preventDefault();
    e.stopPropagation();

    // Verifica caricamento lightGallery
    if (typeof lightGallery !== "function") {
        console.error("❌ lightGallery non è caricato");
        return;
    }

    let images = [];

    try {
        images = JSON.parse(dataDiv.textContent.trim());
    } catch (err) {
        console.error("❌ Errore JSON:", err);
        return;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    const gallery = lightGallery(container, {
        dynamic: true,
        dynamicEl: images,
        plugins: [lgZoom, lgThumbnail],
        download: false,
        speed: 400
    });

    gallery.openGallery();

    gallery.on('lgAfterClose', () => container.remove());
});
const dynamicGallery = window.LightGallery(dynamicContainer, {
    dynamic: true,
    dynamicEl: images,
    plugins: [lgZoom, lgThumbnail],
    speed: 600, // Un po' più lento ed elegante
    licenseKey: 'GPLv3',
    
    // --- CONFIGURAZIONE LUXURY ---
    counter: true,        // Mostra "1 di 5"
    download: false,      // Nascondi download (più pro)
    zoom: true,           // Abilita zoom
    actualSize: false,    // Disabilita zoom 100% al click (meglio smart zoom)
    
    mobileSettings: {
        showCloseIcon: true,
        controls: true
    }
});