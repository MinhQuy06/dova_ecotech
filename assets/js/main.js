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

  // 2.5. Đổ nội dung từ content.js (DOVA_CONTENT) vào các vùng neo trên trang
  function initContentHydration() {
    const content = window.DOVA_CONTENT;
    if (!content) return;

    const tech = content.technology;
    const col = content.collection;

    // Đổ bảng thông số bấm mở ra theo từng lớp công nghệ
    if (tech && Array.isArray(tech.layers)) {
      tech.layers.forEach((layer) => {
        const valueEl = document.querySelector(`[data-layer-value="${layer.id}"]`);
        if (valueEl && layer.valueHighlight) {
          valueEl.textContent = layer.valueHighlight;
        }

        const specsHost = document.querySelector(`[data-specs-layer="${layer.id}"]`);
        if (specsHost && Array.isArray(layer.specsRows)) {
          const rowsHtml = layer.specsRows
            .map((row) => `<tr><td>${row.label}</td><td>${row.value}</td></tr>`)
            .join('');
          specsHost.innerHTML = `
            <details class="tech-specs-accordion">
              <summary>${tech.specsHeading}</summary>
              <div class="tech-specs-body">
                <p class="tech-specs-note">${tech.specsNote}</p>
                <table class="specs-table">
                  <tbody>${rowsHtml}</tbody>
                </table>
              </div>
            </details>
          `;
        }
      });
    }

    // Đổ khối lưu ý nổi bật iPhone/iOS (Apple Find My)
    const iosText = (tech && tech.iosNotice) || (col && col.iosNotice);
    if (iosText) {
      document.querySelectorAll('[data-ios-notice]').forEach((el) => {
        el.innerHTML = `<strong>Lưu ý tương thích:</strong> ${iosText}`;
        el.classList.add('ios-notice-banner');
      });
    }

    // Đổ tiêu đề phụ bộ sưu tập từ content.js
    if (col && col.subtitle) {
      document.querySelectorAll('[data-collection-subtitle]').forEach((el) => {
        el.textContent = col.subtitle;
      });
    }

    // Đổ tiêu đề + ghi chú nhỏ & bảng thông số sản phẩm từ content.js
    if (col && col.specsHeading) {
      document.querySelectorAll('[data-specs-heading]').forEach((el) => {
        el.innerHTML = `
          <div class="specs-heading-wrap">
            <div class="specs-heading-title">${col.specsHeading}</div>
            <p class="tech-specs-note">${col.specsNote}</p>
          </div>
        `;
      });
    }

    if (col && Array.isArray(col.products)) {
      col.products.forEach((product) => {
        if (!Array.isArray(product.targetSpecsRows)) return;
        document.querySelectorAll(`[data-product-specs="${product.id}"] tbody`).forEach((tbody) => {
          tbody.innerHTML = product.targetSpecsRows
            .map((row) => `<tr><td>${row.label}</td><td>${row.value}</td></tr>`)
            .join('');
        });
      });
    }

    initTierSwitchers(col);
    initColorSelectors(col);
  }

  // 2.6b. Chọn màu sản phẩm (Nâu Espresso / Đen Than) -> tự động đổi ảnh & mô hình 3D tương ứng
  function initColorSelectors(col) {
    const selectors = document.querySelectorAll('.color-selector-wrap[data-color-product]');
    if (!selectors.length || !col || !Array.isArray(col.products)) return;

    function swapImgSrc(img, nextSrc) {
      if (!img || !nextSrc || img.getAttribute('src') === nextSrc) return;
      img.style.opacity = '0.35';
      const preloaderImg = new Image();
      preloaderImg.onload = () => {
        img.src = nextSrc;
        img.style.opacity = '1';
      };
      preloaderImg.onerror = () => {
        img.src = nextSrc;
        img.style.opacity = '1';
      };
      preloaderImg.src = nextSrc;
    }

    function applyColorForProduct(productId, colorId) {
      const product = col.products.find((p) => p.id === productId);
      if (!product || !Array.isArray(product.colors)) return;
      const colorObj = product.colors.find((c) => c.id === colorId) || product.colors[0];
      if (!colorObj) return;

      // Đồng bộ trạng thái nút màu cho tất cả khối của cùng sản phẩm trên trang
      document.querySelectorAll(`.color-selector-wrap[data-color-product="${productId}"]`).forEach((wrap) => {
        wrap.querySelectorAll('.color-swatch-btn').forEach((btn) => {
          const isMatch = btn.getAttribute('data-color') === colorObj.id;
          btn.classList.toggle('active', isMatch);
          btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
        });
      });

      // 1) Đổi ảnh studio (trên mini-zip.html / bifold.html)
      document.querySelectorAll(`.studio-photo-card img[data-color-target="${productId}"]`).forEach((img) => {
        swapImgSrc(img, colorObj.studioImage);
      });

      // 2) Đổi ảnh popout cutout (trên collection.html / index.html)
      document.querySelectorAll(`.popout-layer-wallet img[data-color-target="${productId}"]`).forEach((img) => {
        swapImgSrc(img, colorObj.popoutImage);
      });

      // 3) Đổi ảnh chi tiết bề mặt vật liệu composite của sản phẩm tương ứng
      document.querySelectorAll(`.detail-photo-card img[data-color-composite="${productId}"]`).forEach((img) => {
        swapImgSrc(img, colorObj.compositeImage);
      });

      // 4) Đổi màu mô hình 3D tương tác
      document.querySelectorAll(`.product-canvas-holder[data-product="${productId}"]`).forEach((holder) => {
        holder.dispatchEvent(new CustomEvent('dova:colorchange', { detail: { hex: colorObj.threeHex, colorId: colorObj.id } }));
      });
    }

    selectors.forEach((wrap) => {
      const productId = wrap.getAttribute('data-color-product');
      const product = col.products.find((p) => p.id === productId);
      if (!product || !Array.isArray(product.colors)) return;

      if (!wrap.querySelector('.color-swatch-btn')) {
        wrap.innerHTML = `
          <span class="color-selector-label">Màu sắc:</span>
          <div class="color-swatch-group" role="group" aria-label="Chọn màu sản phẩm">
            ${product.colors
              .map(
                (c, idx) => `
              <button type="button" class="color-swatch-btn ${idx === 0 ? 'active' : ''}" data-color="${c.id}" aria-pressed="${idx === 0 ? 'true' : 'false'}">
                <span class="color-swatch-dot" style="background:${c.swatch};" aria-hidden="true"></span>
                <span>${c.label}</span>
              </button>
            `
              )
              .join('')}
          </div>
        `;
      }

      wrap.querySelectorAll('.color-swatch-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const colorId = btn.getAttribute('data-color');
          applyColorForProduct(productId, colorId);
        });
      });
    });
  }

  // 2.6. Xử lý chuyển đổi dòng Essential / Smart trên mọi trang (Collection, Home, Mini Zip, Bifold)
  function initTierSwitchers(col) {
    const switchers = document.querySelectorAll('.tier-switcher');
    if (!switchers.length) return;

    function resolveProduct(block) {
      if (!col || !Array.isArray(col.products)) return null;
      const canvasHolder = block.querySelector('.product-canvas-holder[data-product]');
      const dataProd = canvasHolder ? canvasHolder.getAttribute('data-product') : '';
      const path = window.location.pathname.toLowerCase();
      const id =
        dataProd ||
        (block.id && block.id.includes('bifold') ? 'bifold' : '') ||
        (block.id && block.id.includes('mini-zip') ? 'mini-zip' : '') ||
        (path.includes('bifold') ? 'bifold' : 'mini-zip');
      return col.products.find((p) => p.id === id) || col.products[0];
    }

    function getLineIconSvg(iconName) {
      const icons = {
        layers:
          '<svg class="tier-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>',
        shield:
          '<svg class="tier-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        pin:
          '<svg class="tier-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        ruler:
          '<svg class="tier-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="8" rx="1.5"/><line x1="7" y1="8" x2="7" y2="11"/><line x1="11" y1="8" x2="11" y2="11"/><line x1="15" y1="8" x2="15" y2="11"/><line x1="19" y1="8" x2="19" y2="11"/></svg>'
      };
      return icons[iconName] || icons.layers;
    }

    function buildTierCardHtml(tierData) {
      const bulletsHtml = Array.isArray(tierData.bullets)
        ? `<ul class="tier-bullets-list">${tierData.bullets
            .map((item) => `<li>${getLineIconSvg(item.icon)}<span>${item.text}</span></li>`)
            .join('')}</ul>`
        : `<p style="margin:0; font-size:0.93rem;">${tierData.desc}</p>`;

      return `
        <div class="tier-detail-card">
          <div class="tier-card-header">
            <span class="tier-card-title">${tierData.title}</span>
            <span class="tier-sku-pill">SKU: ${tierData.sku}</span>
          </div>
          ${bulletsHtml}
          <div class="tier-card-footer">
            <div class="tier-price-line">${tierData.price}</div>
            <div class="tier-warranty-line">${tierData.warranty}</div>
          </div>
        </div>
      `;
    }

    function applyTier(block, tier) {
      const product = resolveProduct(block);
      const tierButtons = block.querySelectorAll('.tier-btn');
      tierButtons.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-tier') === tier);
      });

      const descEssential = block.querySelector('.tier-desc-essential');
      const descSmart = block.querySelector('.tier-desc-smart');

      if (product && product.tiers) {
        const essentialData = product.tiers.essential;
        const smartData = product.tiers.smart;
        const activeData = tier === 'essential' ? essentialData : smartData;

        if (descEssential && essentialData) {
          descEssential.innerHTML = buildTierCardHtml(essentialData);
        }
        if (descSmart && smartData) {
          descSmart.innerHTML = buildTierCardHtml(smartData);
        }

        // Cập nhật riêng cho khối Bifold ở trang Collection (tiêu đề trên công tắc, câu mô tả đầu, SKU góc)
        const leadEl = block.querySelector('[data-bifold-lead]');
        if (leadEl && activeData && activeData.leadDesc) {
          leadEl.textContent = activeData.leadDesc;
        }

        const switcherHeading = block.querySelector('[data-bifold-switcher-title]');
        if (switcherHeading && activeData && activeData.switcherHeading) {
          switcherHeading.textContent = activeData.switcherHeading;
        }

        const cornerSku = block.querySelector('[data-bifold-corner-sku]');
        if (cornerSku && activeData) {
          cornerSku.textContent = `SKU: ${activeData.sku}`;
        }

        const badge = block.querySelector('.badge-tier');
        if (badge && activeData) {
          badge.textContent = activeData.badge;
          badge.classList.toggle('smart', tier === 'smart');
        }

        const rfidFeature = block.querySelector('[data-rfid-feature]');
        if (rfidFeature && activeData && activeData.rfidFeatureText) {
          rfidFeature.innerHTML = activeData.rfidFeatureText;
        }

        const skuEl = block.querySelector('[data-tier-spec="sku"]');
        if (skuEl && activeData) skuEl.textContent = activeData.sku;

        const priceEl = block.querySelector('[data-tier-spec="price"]');
        if (priceEl && activeData) priceEl.textContent = activeData.price;

        const rfidSpecEl = block.querySelector('[data-tier-spec="rfid"]');
        if (rfidSpecEl && activeData) rfidSpecEl.textContent = activeData.rfidSpecValue;

        const weightSpecEl = block.querySelector('[data-tier-spec="weight"]');
        if (weightSpecEl && activeData && activeData.weightSpecValue) {
          weightSpecEl.textContent = activeData.weightSpecValue;
        }

        const smarttagSpecEl = block.querySelector('[data-tier-spec="smarttag"]');
        if (smarttagSpecEl && activeData && activeData.smarttagSpecValue) {
          smarttagSpecEl.textContent = activeData.smarttagSpecValue;
        }
      }

      if (descEssential) descEssential.style.display = tier === 'essential' ? 'block' : 'none';
      if (descSmart) descSmart.style.display = tier === 'smart' ? 'block' : 'none';
    }

    switchers.forEach((switcher) => {
      const block =
        switcher.closest('.collection-product-block') ||
        switcher.closest('.product-showcase-grid') ||
        switcher.closest('.product-detail-section') ||
        switcher.parentElement;
      if (!block) return;

      const activeBtn = switcher.querySelector('.tier-btn.active') || switcher.querySelector('.tier-btn');
      const initialTier = activeBtn ? activeBtn.getAttribute('data-tier') || 'smart' : 'smart';
      applyTier(block, initialTier);

      switcher.querySelectorAll('.tier-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const tier = btn.getAttribute('data-tier') || 'smart';
          applyTier(block, tier);
        });
      });
    });
  }

  // 3. Khởi tạo toàn bộ
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPreloader();
      initGrainOverlay();
      initContentHydration();
    });
  } else {
    initPreloader();
    initGrainOverlay();
    initContentHydration();
  }
})();
