// js/animations.js
export function initAnimations() {
  // Preloader hide after window load
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  });

  // Scroll-triggered animations
  const animated = document.querySelectorAll('[data-animate], section');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const effect = el.getAttribute('data-animate') || 'animate__fadeInUp';
      el.classList.add('animate__animated', effect);
      obs.unobserve(el);
    });
  }, { threshold: 0.1 });
  animated.forEach(el => io.observe(el));

  // Microinteraction on buttons
  document.querySelectorAll('.interaction-button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('scale-110');
      setTimeout(() => btn.classList.remove('scale-110'), 150);
    });
  });

  // Lazy-load iframes (fallback for browsers without iframe loading)
  const supportsIframeLoading = 'loading' in HTMLIFrameElement.prototype;
  const lazyIframes = Array.from(document.querySelectorAll('iframe.lazy-iframe'));
  function loadIframe(el) {
    const src = el.getAttribute('data-src');
    if (src && !el.src) el.src = src;
  }
  if (supportsIframeLoading) {
    lazyIframes.forEach(loadIframe);
  } else if ('IntersectionObserver' in window) {
    const iof = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadIframe(entry.target);
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '200px 0px' });
    lazyIframes.forEach(el => iof.observe(el));
  } else {
    // Ultimate fallback
    lazyIframes.forEach(loadIframe);
  }

  // Lottie animation init with inline data (no external fetch needed)
  const lottieContainer = document.getElementById('lottie-container');
  if (window.lottie && lottieContainer) {
    window.lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: {
        v: "5.6.10",
        fr: 60,
        ip: 0,
        op: 120,
        w: 200,
        h: 200,
        nm: "pulse circle",
        ddd: 0,
        assets: [],
        layers: [
          {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "circle",
            sr: 1,
            ks: {
              o: { a: 0, k: 100 },
              r: { a: 0, k: 0 },
              p: { a: 0, k: [100, 100, 0] },
              a: { a: 0, k: [0, 0, 0] },
              s: {
                a: 1,
                k: [
                  { t: 0, s: [80, 80, 100] },
                  { t: 60, s: [100, 100, 100] },
                  { t: 120, s: [80, 80, 100] }
                ]
              }
            },
            shapes: [
              {
                ty: 'el',
                p: { a: 0, k: [0, 0] },
                s: { a: 0, k: [120, 120] },
                nm: 'Ellipse Path 1'
              },
              {
                ty: 'st',
                c: { a: 0, k: [0.231, 0.533, 0.988, 1] },
                o: { a: 0, k: 100 },
                w: { a: 0, k: 8 },
                lc: 2,
                lj: 2,
                nm: 'Stroke 1'
              }
            ],
            ip: 0,
            op: 120,
            st: 0,
            bm: 0
          }
        ]
      }
    });
  }
}

// Auto-init when module is loaded via main.js as well
document.addEventListener('DOMContentLoaded', initAnimations);

