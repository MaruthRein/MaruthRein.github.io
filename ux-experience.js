// ux-experience.js
document.addEventListener("DOMContentLoaded", () => {

    const panels   = Array.from(document.querySelectorAll(".ux-panel"));
    const contents = Array.from(document.querySelectorAll(".ux-content"));
    const dots     = Array.from(document.querySelectorAll(".ux-dot-nav button"));
    const steps    = Array.from(document.querySelectorAll(".ux-timeline-nav li"));

    if (!panels.length) return;

    /* -------------------------------
       FADE-IN + ACTIVE PANEL
    -------------------------------- */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const panel = entry.target;
                const index = panels.indexOf(panel);
                if (entry.isIntersecting) {
                    panel.classList.add("is-active");
                    if (contents[index]) contents[index].classList.add("visible");

                    // aggiorna nav
                    updateNav(index);
                }
            });
        },
        {
            threshold: 0.55
        }
    );

    panels.forEach(panel => observer.observe(panel));

    function updateNav(activeIndex) {
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === activeIndex);
        });
        steps.forEach((step, i) => {
            step.classList.toggle("active", i === activeIndex);
        });
    }

    /* -------------------------------
       CLICK DOT NAV / TIMELINE
    -------------------------------- */
    function scrollToPanel(index) {
        const panel = panels[index];
        if (!panel) return;
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.dataset.index, 10);
            scrollToPanel(index);
        });
    });

    steps.forEach(step => {
        const btn = step.querySelector("button");
        if (!btn) return;
        btn.addEventListener("click", () => {
            const index = parseInt(step.dataset.index, 10);
            scrollToPanel(index);
        });
    });

    /* -------------------------------
       PARALLAX SFONDI
    -------------------------------- */
    function updateParallax() {
        panels.forEach(panel => {
            const media = panel.querySelector(".ux-bg-media");
            if (!media) return;

            const rect = panel.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;

            // Valore da -1 a 1 in base alla posizione
            const progress = (rect.top + rect.height / 2 - vh / 2) / vh;

            // spostiamo leggermente lo sfondo
            const yPos = 50 + progress * 20; // 50% ± 20
            media.style.backgroundPosition = `center ${yPos}%`;
        });
    }

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

});
