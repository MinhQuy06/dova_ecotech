/**
 * =====================================================================
 * DOVA ECOTECH - TECH-EXPLODE.JS
 * Khung 3D tách lớp (Exploded View) theo con lăn chuột / thanh trượt
 * 3 Chương: 1. Coffee-Based Composite | 2. RFID Blocking | 3. Smart Tag
 * Ánh sáng caramel quét qua, vòng sóng ping định vị.
 * =====================================================================
 */

(function () {
  'use strict';

  function initTechExplode() {
    const stage = document.getElementById('tech-explode-stage');
    const canvas = document.getElementById('tech-explode-canvas');
    if (!stage || !canvas || typeof THREE === 'undefined') return;

    const width = stage.clientWidth || 550;
    const height = stage.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(2.8, 1.8, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lighting with Caramel Sweep
    const ambientLight = new THREE.AmbientLight(0xF6EFE0, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xD69A4B, 2.2);
    dirLight.position.set(5, 6, 4);
    scene.add(dirLight);

    const caramelSpot = new THREE.PointLight(0xD69A4B, 3.5, 10);
    caramelSpot.position.set(0, 2, 2);
    scene.add(caramelSpot);

    // 3. Materials
    function createGrainTexture() {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#3D2316';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 2000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(214, 154, 75, 0.25)' : 'rgba(15, 8, 5, 0.4)';
        ctx.beginPath();
        ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(c);
    }

    // Lớp 1: Composite bã cà phê
    const compositeMat = new THREE.MeshStandardMaterial({
      color: 0x3D2316,
      map: createGrainTexture(),
      roughness: 0.55,
      metalness: 0.15
    });

    // Lớp 2: Màng chắn RFID hợp kim mỏng
    const rfidShieldMat = new THREE.MeshStandardMaterial({
      color: 0xB08D57,
      roughness: 0.28,
      metalness: 0.9,
      wireframe: false,
      transparent: true,
      opacity: 0.92
    });

    // Lớp 3: Lót bên trong kèm khoang Smart Tag
    const innerLiningMat = new THREE.MeshStandardMaterial({
      color: 0x24140C,
      roughness: 0.6,
      metalness: 0.1
    });

    const smartTagMat = new THREE.MeshStandardMaterial({
      color: 0xF6EFE0,
      roughness: 0.2,
      metalness: 0.5
    });

    const pingWaveMat = new THREE.MeshBasicMaterial({
      color: 0xD69A4B,
      transparent: true,
      opacity: 0.8
    });

    // 4. Build Layers Meshes
    const rootGroup = new THREE.Group();
    rootGroup.rotation.y = 0.5;
    rootGroup.rotation.x = 0.25;
    scene.add(rootGroup);

    // Lớp 1: Outer Shell (Composite cà phê)
    const layer1Group = new THREE.Group();
    const l1Geo = new THREE.BoxGeometry(2.4, 3.2, 0.08);
    const l1Mesh = new THREE.Mesh(l1Geo, compositeMat);
    layer1Group.add(l1Mesh);
    rootGroup.add(layer1Group);

    // Lớp 2: Middle Shield (RFID Blocking)
    const layer2Group = new THREE.Group();
    const l2Geo = new THREE.BoxGeometry(2.2, 3.0, 0.04);
    const l2Mesh = new THREE.Mesh(l2Geo, rfidShieldMat);
    layer2Group.add(l2Mesh);
    rootGroup.add(layer2Group);

    // Lớp 3: Inner Base & Smart Tag Slot
    const layer3Group = new THREE.Group();
    const l3Geo = new THREE.BoxGeometry(2.4, 3.2, 0.08);
    const l3Mesh = new THREE.Mesh(l3Geo, innerLiningMat);
    layer3Group.add(l3Mesh);

    // Khoang Smart Tag
    const tagGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.06, 32);
    tagGeo.rotateX(Math.PI / 2);
    const tagMesh = new THREE.Mesh(tagGeo, smartTagMat);
    tagMesh.position.set(0, 0.4, 0.05);
    layer3Group.add(tagMesh);

    // Vòng sóng Ping định vị phát ra từ Smart Tag
    const pingRingGeo = new THREE.RingGeometry(0.32, 0.38, 32);
    const pingRing = new THREE.Mesh(pingRingGeo, pingWaveMat);
    pingRing.position.set(0, 0.4, 0.08);
    layer3Group.add(pingRing);

    rootGroup.add(layer3Group);

    // 5. Điều khiển Tách lớp theo Tiến trình (Explosion Progress: 0 -> 1)
    let explodeProgress = 0; // 0: Đóng kín, 1: Tách hoàn toàn

    function applyExplode(progress) {
      explodeProgress = Math.max(0, Math.min(1, progress));

      // Lớp 1 dịch ra phía trước (Z dương)
      layer1Group.position.z = explodeProgress * 1.25;

      // Lớp 2 ở giữa
      layer2Group.position.z = 0;

      // Lớp 3 dịch ra phía sau (Z âm)
      layer3Group.position.z = -explodeProgress * 1.25;

      // Cập nhật DOM Layer Active
      updateActiveLayerDOM(explodeProgress);
    }

    function updateActiveLayerDOM(progress) {
      const slices = document.querySelectorAll('.layer-slice-item');
      if (!slices.length) return;

      slices.forEach(s => s.classList.remove('active'));

      if (progress < 0.35) {
        slices[0]?.classList.add('active'); // Composite
      } else if (progress < 0.7) {
        slices[1]?.classList.add('active'); // RFID
      } else {
        slices[2]?.classList.add('active'); // Smart Tag
      }
    }

    // 6. Tích hợp cuộn màn hình (GSAP ScrollTrigger Pinned Animation)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const pinContainer = document.querySelector('.tech-interactive-wrapper');
      if (pinContainer) {
        ScrollTrigger.create({
          trigger: pinContainer,
          start: 'top 20%',
          end: '+=800',
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            applyExplode(self.progress);
          }
        });
      }
    }

    // Hỗ trợ click trực tiếp vào từng thẻ lớp để xem tách lớp tương ứng
    const slices = document.querySelectorAll('.layer-slice-item');
    slices.forEach((slice, idx) => {
      slice.addEventListener('click', () => {
        const targetProgress = idx === 0 ? 0.15 : idx === 1 ? 0.5 : 0.95;
        if (typeof gsap !== 'undefined') {
          gsap.to({ p: explodeProgress }, {
            p: targetProgress,
            duration: 0.8,
            ease: 'power2.out',
            onUpdate: function () {
              applyExplode(this.targets()[0].p);
            }
          });
        } else {
          applyExplode(targetProgress);
        }
      });
    });

    // 7. Resize Handler
    window.addEventListener('resize', () => {
      const newW = stage.clientWidth;
      const newH = stage.clientHeight;
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });

    // 8. Animation Loop
    let clock = new THREE.Clock();

    function render() {
      requestAnimationFrame(render);

      const elapsedTime = clock.getElapsedTime();

      // Caramel Light quét nhẹ qua các lớp
      caramelSpot.position.x = Math.sin(elapsedTime * 1.5) * 2.5;
      caramelSpot.position.y = Math.cos(elapsedTime * 1.2) * 1.5;

      // Vòng ping nở rộng và mờ dần
      const pingScale = 1 + (elapsedTime % 1.5) * 1.2;
      pingRing.scale.set(pingScale, pingScale, 1);
      pingWaveMat.opacity = Math.max(0, 0.8 - (elapsedTime % 1.5) * 0.5);

      // Tự xoay góc nhìn rất chậm để tạo chiều sâu 3D
      rootGroup.rotation.y = 0.5 + Math.sin(elapsedTime * 0.4) * 0.08;

      renderer.render(scene, camera);
    }

    render();
    applyExplode(0.5); // Khởi đầu mở hé 50% để tạo ấn tượng trực quan ngay lập tức
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechExplode);
  } else {
    initTechExplode();
  }
})();
