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

// Stabil autoplay fix för iPhone
document.addEventListener("DOMContentLoaded", () => {
    const vid = document.getElementById("bgVideo"); 
    if (!vid) return;

    vid.muted = true;
    vid.setAttribute("playsinline", "");
    vid.setAttribute("webkit-playsinline", "");

    let tries = 0;

    const attemptPlay = () => {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("🎉 Autoplay fungerar!");
                })
                .catch(() => {
                    tries++;
                    console.log("Blockerat (försök " + tries + ")");
                    if (tries < 15) setTimeout(attemptPlay, 500);
                });
        }
    };

    attemptPlay();

    const unlock = () => {
        vid.muted = true;
        attemptPlay();
        window.removeEventListener("touchstart", unlock);
        window.removeEventListener("click", unlock);
    };

    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("click", unlock);
});
