/**
 * =====================================================================
 * DOVA ECOTECH - HERO-3D.JS
 * Hero Showcase: Hạt cà phê 3D trôi nổi (Three.js) làm nền chiều sâu cho
 * sản phẩm thực tế, khiên bảo vệ RFID Blocking & cụm định vị Smart Tag.
 * Tạo hiệu ứng nghiêng parallax mượt mà theo chuột & cuộn trang.
 * =====================================================================
 */

(function () {
  'use strict';

  function initHeroShowcase() {
    const canvasContainer = document.getElementById('hero-3d-canvas-container');
    const canvas = document.getElementById('hero-3d-canvas');
    const stage = document.getElementById('hero-showcase-stage');

    if (!canvasContainer) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const parallaxLayers = stage ? Array.from(stage.querySelectorAll('[data-depth]')) : [];

    // 1. Tương tác chuột & cuộn cho lớp DOM sản phẩm thật (hoạt động độc lập với WebGL)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let scrollOffset = 0;

    if (!prefersReducedMotion) {
      window.addEventListener(
        'mousemove',
        (e) => {
          const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
          const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;
          mouseX = xNorm;
          mouseY = yNorm;
        },
        { passive: true }
      );

      window.addEventListener(
        'scroll',
        () => {
          const heroHeight = canvasContainer.parentElement?.offsetHeight || 800;
          scrollOffset = Math.min(window.scrollY / heroHeight, 1.4);
        },
        { passive: true }
      );
    }

    function updateDomParallax() {
      if (!stage || prefersReducedMotion) return;

      targetRotX += (mouseY * 6 - targetRotX) * 0.06;
      targetRotY += (mouseX * 8 - targetRotY) * 0.06;

      const scrollShiftY = scrollOffset * -18;
      stage.style.transform =
        `perspective(1100px) rotateX(${targetRotX.toFixed(2)}deg) rotateY(${targetRotY.toFixed(2)}deg) translateY(${scrollShiftY.toFixed(1)}px)`;

      parallaxLayers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '0');
        const tx = mouseX * depth * 0.55;
        const ty = -mouseY * depth * 0.4;
        layer.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
      });
    }

    // 2. Nền WebGL nhẹ với các hạt cà phê rang lơ lửng
    function isWebGLAvailable() {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        return false;
      }
    }

    const canRunWebGL =
      canvas && !prefersReducedMotion && isWebGLAvailable() && typeof THREE !== 'undefined';

    if (!canRunWebGL) {
      if (canvas) canvas.style.display = 'none';
      if (!prefersReducedMotion && stage) {
        function domOnlyLoop() {
          updateDomParallax();
          requestAnimationFrame(domOnlyLoop);
        }
        domOnlyLoop();
      }
      return;
    }

    const scene = new THREE.Scene();
    const width = canvasContainer.clientWidth || 600;
    const height = canvasContainer.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Ánh sáng ấm nhấn viền hạt cà phê trong nền tối
    const ambientLight = new THREE.AmbientLight(0xefe5cf, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd69a4b, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x7dd3fc, 0.65);
    fillLight.position.set(-5, 1, 3);
    scene.add(fillLight);

    // Hạt cà phê 3D bao quanh ngoại vi khung trưng bày
    const beanGroup = new THREE.Group();
    const isMobile = window.innerWidth <= 768;
    const beanCount = isMobile ? 7 : 13;

    const beanGeo = new THREE.SphereGeometry(0.15, 14, 14);
    beanGeo.scale(1, 1.42, 0.7);

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x3b1f12,
      roughness: 0.55,
      metalness: 0.14
    });

    const beanItems = [];
    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      const angle = (i / beanCount) * Math.PI * 2;
      const radius = 2.6 + Math.random() * 1.9;
      bean.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4.4,
        -1.2 - Math.random() * 2.2
      );
      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const rotSpeed = 0.006 + Math.random() * 0.01;
      beanItems.push({
        mesh: bean,
        rotSpeed,
        initX: bean.position.x,
        initY: bean.position.y,
        phase: Math.random() * Math.PI * 2
      });
      beanGroup.add(bean);
    }
    scene.add(beanGroup);

    function onResize() {
      const newW = canvasContainer.clientWidth;
      const newH = canvasContainer.clientHeight;
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    }
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      updateDomParallax();

      beanItems.forEach((b) => {
        b.mesh.rotation.x += b.rotSpeed;
        b.mesh.rotation.y += b.rotSpeed * 0.75;
        b.mesh.position.x = b.initX + mouseX * 0.25;
        b.mesh.position.y =
          b.initY + Math.sin(elapsedTime * 0.95 + b.phase) * 0.28 + scrollOffset * 0.45;
      });

      camera.position.z = 7.5 + scrollOffset * 1.4;
      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroShowcase);
  } else {
    initHeroShowcase();
  }
})();
