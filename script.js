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

// Säkerställer autoplay på video
document.addEventListener("DOMContentLoaded", () => {
  const vid = document.querySelector("video");
  if (vid) {
    vid.muted = true;
    vid.play().catch(() => {
      console.log("Autoplay blockerat, försöker igen...");
    });
  }
});
