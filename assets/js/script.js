// Operation Constantine — case site interactions
document.addEventListener('DOMContentLoaded', () => {
  // Tactic filter for MITRE badge wall
  const filters = document.querySelectorAll('.tfilter');
  const chips = document.querySelectorAll('.mchip');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tactic = btn.dataset.tactic;
      chips.forEach(chip => {
        const show = tactic === 'all' || chip.dataset.tactic === tactic;
        chip.style.display = show ? 'flex' : 'none';
      });
    });
  });

  // Reveal-on-scroll for section headers (subtle, respects reduced motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.section-head, .kc-node, .gcard').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      io.observe(el);
    });
  }

  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
