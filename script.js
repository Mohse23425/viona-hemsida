console.log("Viona glow active");

window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

// Glow-effekt
document.querySelectorAll(".glow-follow").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--x", `${e.clientX - r.left}px`);
        btn.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
});

// Autoplay fix för iPhone
document.addEventListener("DOMContentLoaded", () => {
    const vid = document.querySelector("video");
    if (!vid) return;

    vid.muted = true;

    let attempts = 0;

    const tryPlay = () => {
        vid.play().then(() => {
            console.log("🎉 Video autoplay fungerar!");
        }).catch(() => {
            attempts++;
            console.log("Autoplay blockerat (försök " + attempts + ")");

            // Prova igen automatiskt
            if (attempts < 10) {
                setTimeout(tryPlay, 600);
            }
        });
    };

    tryPlay(); // kör direkt

    // Starta så fort användaren klickar eller scrollar
    const unlock = () => {
        tryPlay();
        window.removeEventListener("click", unlock);
        window.removeEventListener("scroll", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("scroll", unlock);
});
