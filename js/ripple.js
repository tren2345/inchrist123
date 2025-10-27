// js/ripple.js
export function initRipple() {
  document.addEventListener('click', (e) => {
    const ripple = document.getElementById('ripple');
    ripple.classList.remove('hidden');
    ripple.style.left = `${e.clientX - 50}px`;
    ripple.style.top = `${e.clientY - 50}px`;
    ripple.style.transform = 'scale(0)';
    setTimeout(() => {
      ripple.classList.add('hidden');
    }, 600);
  });

  document.addEventListener('touchstart', (e) => {
    const ripple = document.getElementById('ripple');
    ripple.classList.remove('hidden');
    ripple.style.left = `${e.touches[0].clientX - 50}px`;
    ripple.style.top = `${e.touches[0].clientY - 50}px`;
    ripple.style.transform = 'scale(0)';
    setTimeout(() => {
      ripple.classList.add('hidden');
    }, 600);
  });
}
