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
// Extra autoplay trigger för iPhone
document.addEventListener("DOMContentLoaded", () => {
    const vid = document.getElementById("bgVideo");
    if (!vid) return;

    vid.muted = true;
    vid.playsInline = true;

    // Försök starta direkt
    const tryPlay = () => {
        vid.play().catch(() => {
            // Om blockerat: trigga efter 50ms (behövs ibland på iOS)
            setTimeout(() => vid.play().catch(() => {}), 50);
        });
    };

    tryPlay();

    // Fallback: automatiskt klick-trigger
    setTimeout(() => {
        vid.dispatchEvent(new Event("click"));
        tryPlay();
    }, 100);
});
