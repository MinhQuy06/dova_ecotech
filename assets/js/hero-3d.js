/**
 * =====================================================================
 * DOVA ECOTECH - HERO-3D.JS
 * Hero Section: Hai ví 3D (Mini Zip & Bifold) lơ lửng chéo, xoay chậm,
 * nghiêng theo chuột, hạt cà phê bay lơ lửng, cuộn tách hai bên.
 * Tự dựng bản 3D bằng Three.js với nhãn Prototype, có fallback khi không có WebGL.
 * =====================================================================
 */

(function () {
  'use strict';

  function initHero3D() {
    const canvasContainer = document.getElementById('hero-3d-canvas-container');
    const canvas = document.getElementById('hero-3d-canvas');
    const fallback = document.getElementById('hero-canvas-fallback');

    if (!canvasContainer || !canvas) return;

    // Kiểm tra hỗ trợ WebGL
    function isWebGLAvailable() {
      try {
        const c = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    if (!isWebGLAvailable() || typeof THREE === 'undefined') {
      if (fallback) fallback.style.display = 'flex';
      canvas.style.display = 'none';
      return;
    }

    // 1. Khởi tạo Three.js Scene, Camera, Renderer
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
    renderer.toneMappingExposure = 1.15;

    // 2. Hệ thống Ánh sáng ấm phong cách Chocolate cao cấp
    const ambientLight = new THREE.AmbientLight(0xEFE5CF, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xD69A4B, 2.4); // Vàng caramel ấm
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xB08D57, 1.2);
    fillLight.position.set(-5, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xD69A4B, 1.8, 12);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // 3. Tạo vật liệu da composite bã cà phê bằng Canvas Texture
    function createCoffeeTexture(baseColorHex, grainOpacity) {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      ctx.fillStyle = baseColorHex;
      ctx.fillRect(0, 0, 512, 512);

      // Thêm đốm hạt bã cà phê ngẫu nhiên
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 2 + 0.5;
        const alpha = Math.random() * grainOpacity;
        ctx.fillStyle = Math.random() > 0.5 ? `rgba(214, 154, 75, ${alpha})` : `rgba(20, 11, 7, ${alpha * 1.5})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(c);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    }

    const coffeeLeatherMat1 = new THREE.MeshStandardMaterial({
      color: 0x3D2316,
      map: createCoffeeTexture('#3D2316', 0.22),
      roughness: 0.55,
      metalness: 0.12
    });

    const coffeeLeatherMat2 = new THREE.MeshStandardMaterial({
      color: 0x24140C,
      map: createCoffeeTexture('#24140C', 0.25),
      roughness: 0.52,
      metalness: 0.14
    });

    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xD69A4B,
      roughness: 0.25,
      metalness: 0.85
    });

    const glowingCaramelMat = new THREE.MeshBasicMaterial({
      color: 0xD69A4B
    });

    // 4. Dựng mô hình Mini Zip (Ví nữ khóa kéo bo góc)
    const miniZipGroup = new THREE.Group();

    // Thân ví chính
    const zipGeo = new THREE.BoxGeometry(2.1, 2.5, 0.42);
    const zipMesh = new THREE.Mesh(zipGeo, coffeeLeatherMat1);
    miniZipGroup.add(zipMesh);

    // Dải khóa kéo kim loại quanh 3 cạnh
    const trackGeo = new THREE.BoxGeometry(2.18, 2.58, 0.08);
    const trackMesh = new THREE.Mesh(trackGeo, goldMetalMat);
    miniZipGroup.add(trackMesh);

    // Khóa kéo kim loại nhỏ (Zipper pull)
    const pullGeo = new THREE.BoxGeometry(0.12, 0.35, 0.06);
    const pullMesh = new THREE.Mesh(pullGeo, goldMetalMat);
    pullMesh.position.set(1.1, 1.1, 0.15);
    miniZipGroup.add(pullMesh);

    // Ngăn Smart Tag tròn có rãnh viền phát sáng nhẹ
    const tagRingGeo = new THREE.RingGeometry(0.28, 0.34, 32);
    const tagRingMesh = new THREE.Mesh(tagRingGeo, glowingCaramelMat);
    tagRingMesh.position.set(0, 0, 0.22);
    miniZipGroup.add(tagRingMesh);

    miniZipGroup.position.set(-1.3, 0.35, 0.5);
    miniZipGroup.rotation.set(0.25, 0.45, -0.15);
    scene.add(miniZipGroup);

    // 5. Dựng mô hình Bifold (Ví nam gập đôi kinh điển)
    const bifoldGroup = new THREE.Group();

    // Cánh trái
    const flapGeo = new THREE.BoxGeometry(1.6, 2.3, 0.2);
    const flapLeft = new THREE.Mesh(flapGeo, coffeeLeatherMat2);
    flapLeft.position.set(-0.82, 0, 0);
    flapLeft.rotation.y = 0.22;
    bifoldGroup.add(flapLeft);

    // Cánh phải
    const flapRight = new THREE.Mesh(flapGeo, coffeeLeatherMat2);
    flapRight.position.set(0.82, 0, 0);
    flapRight.rotation.y = -0.22;
    bifoldGroup.add(flapRight);

    // Sống ví ở giữa
    const spineGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.3, 16);
    const spineMesh = new THREE.Mesh(spineGeo, goldMetalMat);
    bifoldGroup.add(spineMesh);

    // Vòng phát sáng Smart Tag chìm ở cánh phải
    const bfTagGeo = new THREE.RingGeometry(0.26, 0.32, 32);
    const bfTagMesh = new THREE.Mesh(bfTagGeo, glowingCaramelMat);
    bfTagMesh.position.set(0.82, 0.2, 0.12);
    bfTagMesh.rotation.y = -0.22;
    bifoldGroup.add(bfTagMesh);

    bifoldGroup.position.set(1.4, -0.3, -0.2);
    bifoldGroup.rotation.set(-0.2, -0.4, 0.18);
    scene.add(bifoldGroup);

    // 6. Tạo các hạt cà phê 3D lơ lửng xung quanh
    const beanGroup = new THREE.Group();
    const isMobile = window.innerWidth <= 768;
    const beanCount = isMobile ? 8 : 16; // Giảm số hạt trên mobile để giữ >= 30fps

    const beanGeo = new THREE.SphereGeometry(0.16, 14, 14);
    beanGeo.scale(1, 1.4, 0.7); // Bóp thành hình bầu dục hạt cà phê

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2A150D,
      roughness: 0.6,
      metalness: 0.1
    });

    const beanItems = [];
    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(beanGeo, beanMat);
      const angle = (i / beanCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 2.2;
      bean.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4.2,
        (Math.random() - 0.5) * 3
      );
      bean.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const speed = 0.004 + Math.random() * 0.008;
      const rotSpeed = 0.01 + Math.random() * 0.015;
      beanItems.push({ mesh: bean, speed, rotSpeed, initY: bean.position.y });
      beanGroup.add(bean);
    }
    scene.add(beanGroup);

    // 7. Tương tác chuột & con trỏ (Nghiêng theo chuột)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    window.addEventListener('mousemove', (e) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = xNorm * 0.35;
      mouseY = yNorm * 0.35;
    }, { passive: true });

    // 8. Tương tác cuộn trang (Camera lùi & hai ví tách dần khi cuộn)
    let scrollOffset = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = canvasContainer.parentElement?.offsetHeight || 800;
      scrollOffset = Math.min(scrollY / heroHeight, 1.5);
    }, { passive: true });

    // 9. Resize Responsive
    function onResize() {
      const newW = canvasContainer.clientWidth;
      const newH = canvasContainer.clientHeight;
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    }
    window.addEventListener('resize', onResize);

    // 10. Vòng lặp Render (RequestAnimationFrame)
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Nội suy độ nghiêng theo chuột mượt mà
      targetRotX += (mouseY - targetRotX) * 0.05;
      targetRotY += (mouseX - targetRotY) * 0.05;

      // Xoay tự nhiên nhẹ nhàng
      miniZipGroup.rotation.y = 0.45 + targetRotY + Math.sin(elapsedTime * 0.6) * 0.08;
      miniZipGroup.rotation.x = 0.25 - targetRotX + Math.cos(elapsedTime * 0.5) * 0.06;
      miniZipGroup.position.y = 0.35 + Math.sin(elapsedTime * 0.8) * 0.08;

      bifoldGroup.rotation.y = -0.4 + targetRotY + Math.sin(elapsedTime * 0.55 + 1) * 0.08;
      bifoldGroup.rotation.x = -0.2 - targetRotX + Math.cos(elapsedTime * 0.6 + 1) * 0.06;
      bifoldGroup.position.y = -0.3 + Math.sin(elapsedTime * 0.75 + 1) * 0.08;

      // Hiệu ứng cuộn: hai ví tách xa dần sang hai bên và camera lùi
      if (scrollOffset > 0) {
        miniZipGroup.position.x = -1.3 - (scrollOffset * 1.8);
        bifoldGroup.position.x = 1.4 + (scrollOffset * 1.8);
        camera.position.z = 7.5 + (scrollOffset * 2.5);
      } else {
        miniZipGroup.position.x = -1.3;
        bifoldGroup.position.x = 1.4;
        camera.position.z = 7.5;
      }

      // Hạt cà phê bay trôi
      beanItems.forEach(b => {
        b.mesh.rotation.x += b.rotSpeed;
        b.mesh.rotation.y += b.rotSpeed * 0.8;
        b.mesh.position.y = b.initY + Math.sin(elapsedTime * 1.2 + b.initY) * 0.35;
      });

      renderer.render(scene, camera);
    }

    animate();
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero3D);
  } else {
    initHero3D();
  }
})();
