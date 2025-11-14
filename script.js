console.log('clean loaded');
document.querySelectorAll('.glow-follow').forEach(btn=>{
 btn.addEventListener('mousemove',e=>{
  const r=btn.getBoundingClientRect();
  btn.style.setProperty('--x',`${e.clientX-r.left}px`);
  btn.style.setProperty('--y',`${e.clientY-r.top}px`);
 });
});
