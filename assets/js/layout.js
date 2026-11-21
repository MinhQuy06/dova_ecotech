/**
 * =====================================================================
 * DOVA ECOTECH - LAYOUT.JS
 * Tự động tạo và chèn Header, Banner Prototype và Footer vào mọi trang
 * Nguồn dữ liệu tập trung 100% từ DOVA_CONTENT trong content.js
 * =====================================================================
 */

(function () {
  'use strict';

  function initLayout() {
    if (!window.DOVA_CONTENT) {
      console.warn("DOVA_CONTENT chưa sẵn sàng. Đang chờ tải content.js...");
      setTimeout(initLayout, 50);
      return;
    }

    const content = window.DOVA_CONTENT;
    
    // Xác định độ sâu thư mục để tạo đường dẫn tương đối chính xác (vd: journal/*.html cần ../)
    const currentPath = window.location.pathname.replace(/\\/g, '/');
    const isInSubdir = currentPath.includes('/journal/') && !currentPath.endsWith('journal.html');
    const rootPrefix = isInSubdir ? '../' : '';

    // Hàm chuẩn hóa đường dẫn link
    function fixPath(path) {
      if (!path) return '#';
      if (path.startsWith('http') || path.startsWith('#') || path.includes('CẦN THAY')) return path;
      return rootPrefix + path;
    }

    // 1. Chèn Prototype Disclaimer Bar & Site Header
    injectHeader(content, fixPath, currentPath);

    // 2. Chèn Site Footer
    injectFooter(content, fixPath);

    // 3. Khởi tạo sự kiện cuộn header & mobile menu toggle
    setupHeaderInteractions();
  }

  function injectHeader(content, fixPath, currentPath) {
    let headerPlaceholder = document.getElementById('site-header-root');
    if (!headerPlaceholder) {
      headerPlaceholder = document.createElement('div');
      headerPlaceholder.id = 'site-header-root';
      document.body.insertAdjacentElement('afterbegin', headerPlaceholder);
    }

    const navLinksHtml = content.navigation.links.map(link => {
      const linkHref = fixPath(link.href);
      // Kiểm tra trang hiện tại
      let isActive = false;
      const cleanLink = link.href.replace('.html', '');
      if (currentPath.endsWith(link.href) || (cleanLink !== 'index' && currentPath.includes(cleanLink))) {
        isActive = true;
      } else if (link.href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('index.html') || currentPath === '')) {
        isActive = true;
      }
      return `
        <a href="${linkHref}" class="nav-link ${isActive ? 'active' : ''}">${link.label}</a>
      `;
    }).join('');

    const headerTemplate = `
      <!-- Main Navigation Header -->
      <header class="site-header" id="main-header">
        <div class="container header-inner">
          <a href="${fixPath('index.html')}" class="header-brand" aria-label="${content.meta.brandName} - Trang chủ">
            <img src="${fixPath('assets/img/logo-dova.svg')}" alt="${content.meta.brandName}" class="brand-logo-img" width="260" height="42" />
          </a>

          <nav class="main-nav" id="main-navigation" aria-label="Menu chính">
            ${navLinksHtml}
          </nav>

          <div class="header-cta-group">
            <a href="${fixPath(content.navigation.ctaButton.href)}" class="btn btn-primary btn-sm btn-cta-glow">
              <span class="btn-sparkle" aria-hidden="true">✦</span>
              <span>${content.navigation.ctaButton.label}</span>
            </a>
            <button class="menu-toggle" id="menu-toggle-btn" aria-label="Mở menu điều hướng" aria-expanded="false" aria-controls="main-navigation">
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
              <span class="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>
    `;

    headerPlaceholder.innerHTML = headerTemplate;
  }

  function injectFooter(content, fixPath) {
    let footerPlaceholder = document.getElementById('site-footer-root');
    if (!footerPlaceholder) {
      footerPlaceholder = document.createElement('div');
      footerPlaceholder.id = 'site-footer-root';
      document.body.insertAdjacentElement('beforeend', footerPlaceholder);
    }

    const col1Links = content.footer.linksColumn1.links.map(l => {
      return `<li><a href="${fixPath(l.href)}">${l.label}</a></li>`;
    }).join('');

    const col2Links = content.footer.linksColumn2.links.map(l => {
      const isPlaceholder = l.href.includes('CẦN THAY');
      if (isPlaceholder) {
        return `<li><span style="opacity:0.5; font-size:0.88rem;">${l.label} (Đang cập nhật)</span></li>`;
      }
      return `<li><a href="${fixPath(l.href)}">${l.label}</a></li>`;
    }).join('');

    // Xử lý thông tin liên hệ và mạng xã hội (ẩn hoặc hiện gọn gàng nếu là placeholder)
    const emailText = content.footer.contact.email.includes('CẦN THAY') 
      ? 'Đang cập nhật kênh chính thức' 
      : content.footer.contact.email;

    const addressText = content.footer.contact.address.includes('CẦN THAY')
      ? 'Hà Nội, Việt Nam'
      : content.footer.contact.address;

    const socialIconsHtml = content.footer.socials.map(s => {
      const isPending = s.href.includes('CẦN THAY');
      const hrefAttr = isPending ? 'javascript:void(0)' : s.href;
      const titleAttr = isPending ? `${s.name} (Sắp ra mắt)` : s.name;
      return `
        <a href="${hrefAttr}" class="social-icon-btn" title="${titleAttr}" aria-label="${s.name}" ${isPending ? 'style="opacity:0.5; cursor:default;"' : 'target="_blank" rel="noopener"'}>
          <span style="font-size:0.8rem; font-weight:700;">${s.name.substring(0, 2).toUpperCase()}</span>
        </a>
      `;
    }).join('');

    const footerTemplate = `
      <footer class="site-footer" id="main-footer">
        <div class="container">
          <div class="footer-top-grid">
            <!-- Brand Column -->
            <div class="footer-brand-col">
              <a href="${fixPath('index.html')}" aria-label="${content.meta.brandName}">
                <img src="${fixPath('assets/img/logo-dova.svg')}" alt="${content.meta.brandName}" class="footer-logo" width="260" height="42" />
              </a>
              <div class="footer-slogan">${content.hero.slogan}</div>
              <p class="footer-summary">${content.footer.brandStatement}</p>
            </div>

            <!-- Column 1: Khám phá -->
            <div>
              <h3 class="footer-col-title">${content.footer.linksColumn1.title}</h3>
              <ul class="footer-links">
                ${col1Links}
              </ul>
            </div>

            <!-- Column 2: Tài nguyên -->
            <div>
              <h3 class="footer-col-title">${content.footer.linksColumn2.title}</h3>
              <ul class="footer-links">
                ${col2Links}
              </ul>
            </div>

            <!-- Column 3: Liên hệ -->
            <div>
              <h3 class="footer-col-title">${content.footer.contact.title}</h3>
              <div class="footer-contact-item">
                <span class="footer-contact-icon">✉</span>
                <span>${emailText}</span>
              </div>
              <div class="footer-contact-item">
                <span class="footer-contact-icon">📍</span>
                <span>${addressText}</span>
              </div>
              <p style="font-size:0.82rem; color:var(--aged); margin-top:0.8rem;">
                ${content.footer.contact.note}
              </p>
              <div class="footer-socials">
                ${socialIconsHtml}
              </div>
            </div>
          </div>

          <!-- Footer Bottom -->
          <div class="footer-bottom">
            <div>${content.footer.copyright}</div>
            <div class="footer-legal-links">
              <a href="${fixPath('story.html')}">Our Story</a>
              <span>•</span>
              <a href="${fixPath('technology.html')}">Technology</a>
              <span>•</span>
              <a href="${fixPath('join.html')}">Join the Journey</a>
            </div>
          </div>
        </div>
      </footer>
    `;

    footerPlaceholder.innerHTML = footerTemplate;
  }

  function setupHeaderInteractions() {
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNav = document.getElementById('main-navigation');

    // Sticky header background transition on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Hamburger Menu Toggle
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close menu when clicking outside or on a link
      document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})();
