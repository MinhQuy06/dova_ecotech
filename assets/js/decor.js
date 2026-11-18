/* =====================================================================
   DOVA ECOTECH - DECOR.JS
   Decorative Green Leaves, GSAP 3-Layer Parallax & Pop-out Mouse Tilt
   ===================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize Pop-out Showcase Block Parallax & Interactive Tilt
   */
  function initPopoutShowcase() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.popout-card');
    if (!cards.length) return;

    const hasGSAP = typeof gsap !== 'undefined';
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

    cards.forEach((card) => {
      const splash = card.querySelector('.popout-layer-splash');
      const wallet = card.querySelector('.popout-layer-wallet');
      const front = card.querySelector('.popout-layer-front');

      // 1. GSAP ScrollTrigger 3-Layer Subtle Parallax
      if (hasGSAP && hasScrollTrigger && window.innerWidth > 800) {
        gsap.registerPlugin(ScrollTrigger);

        if (splash) {
          gsap.fromTo(
            splash,
            { yPercent: -45 },
            {
              yPercent: -55,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
              }
            }
          );
        }

        if (wallet) {
          gsap.fromTo(
            wallet,
            { y: 12 },
            {
              y: -12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8
              }
            }
          );
        }

        if (front) {
          gsap.fromTo(
            front,
            { y: 8 },
            {
              y: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5
              }
            }
          );
        }
      }

      // 2. Desktop Mouse Move Micro-tilt (Nhẹ nhàng, giữ ví trọn vẹn trong thẻ)
      if (window.innerWidth > 800 && wallet) {
        let isHovered = false;

        card.addEventListener('mouseenter', () => {
          isHovered = true;
        });

        card.addEventListener('mousemove', (e) => {
          if (!isHovered) return;

          const rect = card.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
          const relY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

          if (hasGSAP) {
            gsap.to(wallet, {
              x: relX * 18,
              y: relY * 14,
              rotation: -6 + relX * 3,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: 'auto'
            });

            if (splash) {
              gsap.to(splash, {
                x: -relX * 12,
                y: -relY * 10,
                duration: 0.6,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }

            if (front) {
              gsap.to(front, {
                x: relX * 15,
                y: relY * 12,
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          } else {
            wallet.style.transform = `translate(${relX * 18}px, ${relY * 14}px) rotate(${-6 + relX * 3}deg)`;
          }
        });

        card.addEventListener('mouseleave', () => {
          isHovered = false;
          if (hasGSAP) {
            gsap.to(wallet, {
              x: 0,
              y: 0,
              rotation: -6,
              duration: 0.8,
              ease: 'power2.out',
              overwrite: 'auto'
            });

            if (splash) {
              gsap.to(splash, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }

            if (front) {
              gsap.to(front, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          } else {
            wallet.style.transform = 'translate(0px, 0px) rotate(-6deg)';
          }
        });
      }
    });
  }

  /**
   * Initialize Leaf Subtle Parallax
   */
  function initLeafParallax() {
    if (prefersReducedMotion || window.innerWidth <= 800) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const clusters = document.querySelectorAll('.decor-leaf-cluster[data-parallax]');
    clusters.forEach((leaf) => {
      const speed = parseFloat(leaf.getAttribute('data-parallax')) || 0.15;
      gsap.to(leaf, {
        y: speed * 80,
        ease: 'none',
        scrollTrigger: {
          trigger: leaf.parentElement || leaf,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPopoutShowcase();
      initLeafParallax();
    });
  } else {
    initPopoutShowcase();
    initLeafParallax();
  }
})();
