/**
 * =====================================================================
 * DOVA ECOTECH - PRODUCT-VIEWER.JS
 * Trình xem sản phẩm xoay 360° tương tác bằng kéo chuột/cảm ứng,
 * nút bật/tắt xem vị trí ngăn Smart Tag, chuyển đổi dòng Essential / Smart.
 * Áp dụng cho trang Collection, mini-zip.html và bifold.html.
 * =====================================================================
 */

(function () {
  'use strict';

  function initProductViewers() {
    const viewerContainers = document.querySelectorAll('.product-canvas-holder');
    if (!viewerContainers.length || typeof THREE === 'undefined') return;

    viewerContainers.forEach(container => {
      setupSingleViewer(container);
    });
  }

  function setupSingleViewer(container) {
    const productType = container.getAttribute('data-product') || 'mini-zip';
    const canvas = container.querySelector('canvas') || document.createElement('canvas');
    if (!canvas.parentElement) container.appendChild(canvas);

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights
    const ambLight = new THREE.AmbientLight(0xF6EFE0, 1.4);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xD69A4B, 2.0);
    dirLight1.position.set(3, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xB08D57, 1.0);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    // 3. Materials
    function createTexture(color) {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1500; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(214, 154, 75, 0.2)' : 'rgba(15, 8, 5, 0.3)';
        ctx.beginPath();
        ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(c);
    }

    const baseColor = productType === 'mini-zip' ? '#382015' : '#23140C';
    const bodyMat = new THREE.MeshStandardMaterial({
      color: productType === 'mini-zip' ? 0x382015 : 0x23140C,
      map: createTexture(baseColor),
      roughness: 0.52,
      metalness: 0.15
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xD69A4B,
      roughness: 0.3,
      metalness: 0.8
    });

    const tagGlowMat = new THREE.MeshBasicMaterial({
      color: 0xD69A4B,
      transparent: true,
      opacity: 0.95
    });

    // 4. Build Wallet Mesh
    const productGroup = new THREE.Group();
    let smartTagMarker;

    if (productType === 'mini-zip') {
      // Mini zip body
      const bodyGeo = new THREE.BoxGeometry(1.8, 2.2, 0.38);
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      productGroup.add(bodyMesh);

      // Gold zipper track
      const trackGeo = new THREE.BoxGeometry(1.86, 2.26, 0.06);
      const trackMesh = new THREE.Mesh(trackGeo, goldMat);
      productGroup.add(trackMesh);

      // Zipper pull
      const pullGeo = new THREE.BoxGeometry(0.1, 0.3, 0.04);
      const pullMesh = new THREE.Mesh(pullGeo, goldMat);
      pullMesh.position.set(0.95, 0.95, 0.12);
      productGroup.add(pullMesh);

      // Smart Tag Slot Marker
      const tagGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.05, 32);
      smartTagMarker = new THREE.Mesh(tagGeo, tagGlowMat);
      smartTagMarker.rotation.x = Math.PI / 2;
      smartTagMarker.position.set(0, 0, 0.21);
      productGroup.add(smartTagMarker);

    } else {
      // Bifold body
      const leftFlap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.0, 0.18), bodyMat);
      leftFlap.position.set(-0.72, 0, 0);
      leftFlap.rotation.y = 0.25;
      productGroup.add(leftFlap);

      const rightFlap = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.0, 0.18), bodyMat);
      rightFlap.position.set(0.72, 0, 0);
      rightFlap.rotation.y = -0.25;
      productGroup.add(rightFlap);

      const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.0, 16), goldMat);
      productGroup.add(spine);

      // Smart Tag Slot Marker
      const tagGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32);
      smartTagMarker = new THREE.Mesh(tagGeo, tagGlowMat);
      smartTagMarker.rotation.x = Math.PI / 2;
      smartTagMarker.position.set(0.72, 0.15, 0.12);
      smartTagMarker.rotation.y = -0.25;
      productGroup.add(smartTagMarker);
    }

    scene.add(productGroup);

    // Initial slight angle
    productGroup.rotation.y = 0.35;
    productGroup.rotation.x = 0.15;

    // 5. Interactive Dragging 360° Rotation
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let velX = 0;
    let velY = 0;

    canvas.style.cursor = 'grab';

    const onPointerDown = (x, y) => {
      isDragging = true;
      previousMouseX = x;
      previousMouseY = y;
      velX = 0;
      velY = 0;
      canvas.style.cursor = 'grabbing';
    };

    const onPointerMove = (x, y) => {
      if (!isDragging) return;
      const deltaX = x - previousMouseX;
      const deltaY = y - previousMouseY;

      velX = deltaX * 0.007;
      velY = deltaY * 0.007;

      productGroup.rotation.y += velX;
      productGroup.rotation.x += velY;

      previousMouseX = x;
      previousMouseY = y;
    };

    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    // Mouse Listeners
    canvas.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onPointerUp);

    // Touch Listeners
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);

    // 6. Nút Bật / Tắt xem vị trí Smart Tag
    const parentBlock = container.closest('.collection-product-block') || container.closest('.product-detail-section') || container.parentElement;
    const toggleTagBtn = parentBlock ? parentBlock.querySelector('.btn-toggle-tag') : null;

    let showTagSlot = true;
    if (toggleTagBtn) {
      toggleTagBtn.addEventListener('click', () => {
        showTagSlot = !showTagSlot;
        smartTagMarker.visible = showTagSlot;
        toggleTagBtn.classList.toggle('active', showTagSlot);
        toggleTagBtn.textContent = showTagSlot ? '✓ Ẩn ngăn Smart Tag' : '○ Xem ngăn Smart Tag';
      });
    }

    // 7. Nút chuyển đổi dòng Essential / Smart
    const tierButtons = parentBlock ? parentBlock.querySelectorAll('.tier-btn') : [];
    tierButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tierButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tier = btn.getAttribute('data-tier');
        
        // Cập nhật hiển thị tính năng theo dòng
        const descEssential = parentBlock.querySelector('.tier-desc-essential');
        const descSmart = parentBlock.querySelector('.tier-desc-smart');
        if (tier === 'essential') {
          if (descEssential) descEssential.style.display = 'block';
          if (descSmart) descSmart.style.display = 'none';
          smartTagMarker.visible = false;
          if (toggleTagBtn) toggleTagBtn.style.opacity = '0.4';
        } else {
          if (descEssential) descEssential.style.display = 'none';
          if (descSmart) descSmart.style.display = 'block';
          smartTagMarker.visible = showTagSlot;
          if (toggleTagBtn) toggleTagBtn.style.opacity = '1';
        }
      });
    });

    // 8. Resize Handler
    window.addEventListener('resize', () => {
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });

    // 9. Animation Loop
    let clock = new THREE.Clock();

    function render() {
      requestAnimationFrame(render);

      const elapsedTime = clock.getElapsedTime();

      // Quán tính tự xoay nhẹ khi không kéo
      if (!isDragging) {
        velX *= 0.95;
        velY *= 0.95;
        productGroup.rotation.y += velX + 0.003;
        productGroup.rotation.x += velY;
      }

      // Nhấp nháy nhẹ vị trí Smart Tag
      if (smartTagMarker && smartTagMarker.visible) {
        tagGlowMat.opacity = 0.65 + Math.sin(elapsedTime * 4) * 0.35;
      }

      renderer.render(scene, camera);
    }

    render();
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductViewers);
  } else {
    initProductViewers();
  }
})();
