/**
 * =====================================================================
 * DOVA ECOTECH - SCROLL-ANIMATIONS.JS
 * GSAP + ScrollTrigger: hiệu ứng trượt trái/phải, parallax lệch nhịp,
 * khung video bung rộng khi cuộn, tôn trọng prefers-reduced-motion
 * =====================================================================
 */

(function () {
  'use strict';

  function initScrollAnimations() {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP chưa được nạp. Hiển thị các phần tử bình thường.');
      document.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Chỉ dùng fade-in đơn giản, không parallax, không trượt mạnh
      gsap.utils.toArray('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        });
      });
      return;
    }

    // 1. Fade up với easing power3.out (0.8 - 1.2s)
    gsap.utils.toArray('.gsap-reveal').forEach((el, index) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    // 2. Trượt vào từ bên trái (Ảnh hoặc nội dung Story / Collection)
    gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    // 3. Trượt vào từ bên phải
    gsap.utils.toArray('.gsap-reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });

    // 4. Parallax lệch nhịp cho các khung ảnh chương truyện
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.chapter-img-box img').forEach(img => {
        gsap.to(img, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      // 5. Khung video bung rộng dần khi cuộn tới
      const videoWrapper = document.querySelector('.expanding-video-wrapper');
      if (videoWrapper) {
        gsap.fromTo(videoWrapper,
          { maxWidth: '780px', scale: 0.94, borderRadius: '24px' },
          {
            maxWidth: '1240px',
            scale: 1,
            borderRadius: '14px',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoWrapper,
              start: 'top 80%',
              end: 'center 45%',
              scrub: 1.2
            }
          }
        );
      }

      // 6. Stagger cho 3 giá trị cốt lõi
      const valueCards = document.querySelectorAll('.values-grid .value-card');
      if (valueCards.length > 0) {
        gsap.fromTo(valueCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.values-grid',
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
