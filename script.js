/* script.js - autoplay debug + page visuals (ERSÄTT HELT) */
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

/* -----------------------------
   Autoplay-manager (diagnostik + retries)
   En enda kontrollerad handler — inga konflikter
   -----------------------------*/
(function() {
    const v = document.getElementById("bgVideo");
    if (!v) {
        console.warn("bgVideo inte hittad");
        return;
    }

    // säkerställ attribut (finns också i HTML, men vi sätter programatiskt)
    v.muted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    let attempts = 0;
    let maxAttempts = 8;
    let retryTimeout = 50;

    const log = (...args) => {
        try { console.log("[autoplay]", ...args); } catch(e){}
    };

    const attemptPlay = () => {
        attempts++;
        log("Attempt", attempts);
        v.play().then(() => {
            log("Playback started (attempt " + attempts + ")");
        }).catch(err => {
            log("Play rejected (attempt " + attempts + ")", err && err.name ? err.name : err);
            if (attempts < maxAttempts) {
                // exponentiell backoff (men begränsad)
                retryTimeout = Math.min(2000, retryTimeout * 2);
                setTimeout(attemptPlay, retryTimeout);
            }
        });
    };

    // försök initialt med små fördröjningar (iOS gillar inte massa samtidiga anrop)
    setTimeout(attemptPlay, 50);
    setTimeout(() => { if (attempts === 0) attemptPlay(); }, 300);
    setTimeout(() => { if (attempts < 2) attemptPlay(); }, 800);

    // Om sidan blir synlig igen — försök spela
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            log("visibilitychange visible — försöker spela");
            attemptPlay();
        }
    });

    // Om användaren scrollar så videon hamnar i viewport — försök spela
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                log("Video i viewport via IntersectionObserver — försöker spela");
                attemptPlay();
            }
        });
    }, { threshold: 0.01 });
    io.observe(v);

    // Touch/click-fallback (en gång)
    const unlock = () => {
        log("Touch/click upptäckt — försöker spela");
        attemptPlay();
        window.removeEventListener("touchstart", unlock);
        window.removeEventListener("click", unlock);
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });

    // Events för felsökning — skriv till konsolen
    v.addEventListener("error", (e) => log("video error", e));
    v.addEventListener("play", () => log("event: play"));
    v.addEventListener("playing", () => log("event: playing"));
    v.addEventListener("pause", () => log("event: pause"));
    v.addEventListener("stalled", () => log("event: stalled"));
    v.addEventListener("waiting", () => log("event: waiting"));

})();
