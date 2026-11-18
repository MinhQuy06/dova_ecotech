/**
 * =====================================================================
 * DOVA ECOTECH - MAIN.JS
 * Khởi chạy chung toàn site, màn hình chờ (Preloader tối đa 2.5s)
 * =====================================================================
 */

(function () {
  'use strict';

  // 1. Tạo và quản lý màn hình chờ Preloader
  function initPreloader() {
    let preloader = document.getElementById('preloader');
    if (!preloader) {
      preloader = document.createElement('div');
      preloader.id = 'preloader';
      preloader.setAttribute('role', 'status');
      preloader.setAttribute('aria-label', 'Đang tải DOVA ECOTECH');
      preloader.innerHTML = `
        <div class="preloader-icon-wrap">
          <svg viewBox="0 0 80 80" width="80" height="80">
            <defs>
              <linearGradient id="pGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#D69A4B" />
                <stop offset="100%" stop-color="#B5712F" />
              </linearGradient>
            </defs>
            <ellipse cx="40" cy="40" rx="34" ry="30" stroke="url(#pGold)" stroke-width="2" fill="none" opacity="0.6"/>
            <path d="M 40 12 C 24 12, 14 26, 14 40 C 14 54, 24 68, 40 68 C 36 54, 36 26, 40 12 Z" fill="url(#pGold)" />
            <path d="M 40 12 C 56 12, 66 26, 66 40 C 66 54, 56 68, 40 68 C 44 54, 44 26, 40 12 Z" fill="url(#pGold)" />
            <circle cx="40" cy="40" r="4.5" fill="#F6EFE0" />
          </svg>
        </div>
        <div class="preloader-brand-text">DOVA ECOTECH</div>
        <div class="preloader-subtext">COFFEE COMPOSITE &bull; SMART WALLET</div>
        <button class="preloader-skip-btn" id="preloader-skip-btn">Bỏ qua</button>
      `;
      document.body.insertAdjacentElement('afterbegin', preloader);
    }

    const removePreloader = () => {
      if (preloader && !preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.remove();
        }, 800);
      }
    };

    // Nút bỏ qua preloader ngay lập tức
    const skipBtn = document.getElementById('preloader-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', removePreloader);
    }

    // Tự động kết thúc sau tối đa 2.2 giây (yêu cầu <= 2.5s)
    const maxTimer = setTimeout(removePreloader, 2200);

    window.addEventListener('load', () => {
      // Cho animation chạy tối thiểu 600ms để người dùng cảm nhận hạt cà phê gom thành logo
      setTimeout(removePreloader, 700);
      clearTimeout(maxTimer);
    });
  }

  // 2. Chèn Grain Overlay nếu chưa có
  function initGrainOverlay() {
    if (!document.querySelector('.grain-overlay')) {
      const grain = document.createElement('div');
      grain.className = 'grain-overlay';
      grain.setAttribute('aria-hidden', 'true');
      document.body.appendChild(grain);
    }
  }

  // 3. Khởi tạo toàn bộ
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPreloader();
      initGrainOverlay();
    });
  } else {
    initPreloader();
    initGrainOverlay();
  }
})();
