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
      const isSubdir = window.location.pathname.includes('/journal/') ||
        window.location.pathname.includes('\\journal\\');
      const emblemPath = isSubdir ? '../assets/img/logo-emblem.png' : 'assets/img/logo-emblem.png';
      preloader.innerHTML = `
        <div class="preloader-icon-wrap">
          <img src="${emblemPath}" alt="DOVA ECOTECH Logo" class="preloader-logo-emblem" width="92" height="66" />
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
