/**
 * =====================================================================
 * DOVA ECOTECH - SMOOTH-SCROLL.JS
 * Khởi tạo cuộn mượt Lenis và đồng bộ với GSAP ScrollTrigger
 * =====================================================================
 */

(function () {
  'use strict';

  function initSmoothScroll() {
    // Tôn trọng thiết lập prefers-reduced-motion của người dùng
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      console.log('Phát hiện prefers-reduced-motion: Vô hiệu hóa smooth scroll.');
      return;
    }

    if (typeof Lenis === 'undefined') {
      console.warn('Lenis chưa được nạp từ CDN. Sử dụng cuộn trình duyệt mặc định.');
      return;
    }

    // Khởi tạo Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing mượt mà
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false
    });

    window.dovaLenis = lenis;

    // Đồng bộ Lenis với GSAP ScrollTrigger nếu có
    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      // Nếu không có GSAP ticker thì dùng requestAnimationFrame độc lập
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Khởi động khi trang nạp
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();
