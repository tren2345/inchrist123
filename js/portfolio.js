// js/portfolio.js
export function initPortfolio() {
  const modes = document.querySelectorAll('.portfolio-mode');
  const tiled = document.getElementById('portfolio-tiled');
  const slideshow = document.getElementById('portfolio-slideshow');
  const vertical = document.getElementById('portfolio-vertical');

  function setMode(mode) {
    if (!tiled || !slideshow || !vertical) return;
    tiled.classList.add('hidden');
    slideshow.classList.add('hidden');
    vertical.classList.add('hidden');
    if (mode === 'tiled') tiled.classList.remove('hidden');
    if (mode === 'slideshow') slideshow.classList.remove('hidden');
    if (mode === 'vertical') vertical.classList.remove('hidden');
  }

  modes.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  // default
  setMode('tiled');

  // Simple slideshow
  const slides = Array.from(document.querySelectorAll('#portfolio-slideshow .slide'));
  let index = 0;
  function render() {
    slides.forEach((s, i) => s.classList.toggle('hidden', i !== index));
  }
  document.getElementById('prev-slide')?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  document.getElementById('next-slide')?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });
  render();
}

document.addEventListener('DOMContentLoaded', initPortfolio);

