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
