console.log("Viona glow active");

// Fade-in animation när sidan laddat
window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});

// Glow-effekt på knapparna
document.querySelectorAll(".glow-follow").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--x", `${e.clientX - r.left}px`);
        btn.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
});

// Autoplay + fallback
document.addEventListener("DOMContentLoaded", () => {
    const vid = document.querySelector("video");
    if (!vid) return;

    vid.muted = true;

    const tryPlay = () => {
        vid.play().catch(() => {
            console.log("Autoplay blockerat, väntar på user interaction...");
        });
    };

    // Försök direkt
    tryPlay();

    // Fallback: starta så fort man klickar eller scrollar
    const unlock = () => {
        tryPlay();
        window.removeEventListener("click", unlock);
        window.removeEventListener("scroll", unlock);
    };

    window.addEventListener("click", unlock);
    window.addEventListener("scroll", unlock);
});
