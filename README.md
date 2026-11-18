# DOVA ECOTECH — TỔNG QUAN WEBSITE THƯƠNG HIỆU 3D SCROLLYTELLING

Website giới thiệu thương hiệu và thu thập mức độ quan tâm của khách hàng đối với dòng sản phẩm ví thông minh làm từ vật liệu composite có thành phần bã cà phê, tích hợp lớp RFID Blocking và ngăn định vị Smart Tag.

---

## 1. MỤC TIÊU & CÔNG NGHỆ SỬ DỤNG

- **Mục tiêu:** Giới thiệu câu chuyện thương hiệu, kỹ nghệ vật liệu composite chứa bã cà phê, tính năng công nghệ an toàn và thu thập nguyện vọng khách hàng (giai đoạn nguyên mẫu Prototype, chưa có giỏ hàng, chưa bán thật).
- **Công nghệ nền tảng:**
  - HTML5 Semantics + CSS3 Custom Properties (Biến màu & font).
  - JavaScript ES6+ thuần (Vanilla JS), không dùng Next.js hay framework phức tạp.
  - **Three.js (r128):** Dựng mô hình 3D tương tác hai ví (Mini Zip & Bifold), hạt cà phê lơ lửng, trình xem xoay 360 độ và mô hình tách 3 lớp công nghệ (Exploded View).
  - **GSAP 3.12 + ScrollTrigger:** Hiệu ứng cuộn scrollytelling, trượt lệch nhịp parallax, bung rộng khung video.
  - **Lenis 1.1:** Cuộn trang mượt mà (smooth scrolling).
  - Tôn trọng thuộc tính `prefers-reduced-motion` đối với người dùng nhạy cảm với chuyển động.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
dova-ecotech/
├── index.html            Trang chủ: Section 01 (Hero 3D), 02 (Our Story rút gọn), 04 (Collection rút gọn), 05 (Tech rút gọn), 07 (Journal 3 bài), 08 (Join tóm tắt), 09 (Footer tự động)
├── story.html            Our Story đầy đủ: 4 chương câu chuyện, 3 giá trị cốt lõi, khung video bung rộng
├── collection.html       Danh sách Mini Zip và Bifold kèm 360 viewer, bảng thông số và bộ chuyển Essential / Smart
├── mini-zip.html         Chi tiết ví nữ Mini Zip: 3D xoay 360°, lưới 3 ảnh chi tiết, tính năng và form đăng ký
├── bifold.html           Chi tiết ví nam Bifold: 3D xoay 360°, lưới 3 ảnh chi tiết, tính năng và form đăng ký
├── technology.html       Technology & Material: 3D tách lớp (Exploded view) theo cuộn chuột, phân tích 3 lớp cấu trúc
├── journal.html          Danh sách bài viết dạng tạp chí (1 bài lớn 2 cột + 3 bài dạng lưới lệch)
├── journal/
│   ├── bai-01-ba-ca-phe.html          Bài 01: Bã cà phê và hành trình tái sinh trong vật liệu mới
│   ├── bai-02-toi-gian.html           Bài 02: Lối sống tối giản: Giải phóng những điều cồng kềnh
│   ├── bai-03-cong-nghe-hang-ngay.html Bài 03: Công nghệ ẩn mình: Sự an tâm trong từng bước di chuyển
│   └── bai-04-hanh-trinh-dova.html     Bài 04: Hành trình tạo tác nguyên mẫu DOVA: Từ phác thảo đến hiện thực
├── join.html             Form đầy đủ Join the Journey: thu thập khảo sát, phân loại độ tuổi, ngân sách, chống spam honeypot
├── README.md             Tài liệu hướng dẫn thay nội dung, vận hành và triển khai
└── assets/
    ├── css/
    │   ├── base.css          Bảng màu Chocolate/Cream, font, reset, hiệu ứng nhiễu giấy (grain)
    │   ├── layout.css        Container, header dính mờ kính, footer đa cột, mép giấy rách (torn paper)
    │   ├── components.css    Nút caramel/gold, huy hiệu prototype, thẻ giá trị, khung video, form khảo sát
    │   ├── sections.css      Bố cục chi tiết từng section (Hero, Story, Collection, Tech, Journal, Join)
    │   ├── animations.css    Keyframes sóng radar Smart Tag, hạt cà phê rơi, preloader gom logo DOVA
    │   └── responsive.css    Tối ưu hiển thị responsive từ 360px đến 1920px (giữ >= 30fps trên mobile)
    ├── js/
    │   ├── content.js            TẤT CẢ chữ, dữ liệu cấu hình và đường dẫn website tập trung tại đây
    │   ├── layout.js             Tự động chèn Header, Banner Prototype và Footer vào mọi trang
    │   ├── main.js               Khởi chạy chung, màn hình chờ Preloader hạt cà phê (tối đa 2.2s, có nút bỏ qua)
    │   ├── smooth-scroll.js      Tích hợp Lenis cuộn mượt và đồng bộ hóa cùng GSAP ScrollTrigger
    │   ├── scroll-animations.js  GSAP: ảnh trượt trái/phải, parallax lệch nhịp, khung video bung ra khi cuộn
    │   ├── hero-3d.js            Hero: hai ví 3D, hạt cà phê lơ lửng, xoay theo chuột, tách hai bên khi cuộn
    │   ├── product-viewer.js     Xem ví xoay 360° bằng kéo chuột/vuốt cảm ứng, nút soi ngăn Smart Tag
    │   ├── tech-explode.js       Ví 3D tách 3 lớp theo con lăn chuột tại mục Technology & Material
    │   └── form.js               Kiểm tra dữ liệu hợp lệ, honeypot chống bot, nhận diện ?product=mini-zip / bifold
    ├── models/                   Thư mục chứa file 3D thật (mini-zip.glb, bifold.glb - hiện dùng bản procedural Three.js)
    ├── img/                      logo-dova.svg, favicon.svg, og-cover.jpg, và các vector graphic minh họa
    └── fonts/                    Sử dụng Google Fonts trực tuyến (Playfair Display, Great Vibes, Jost, Inter)
```

---

## 3. CÁCH MỞ WEBSITE ĐỂ XEM

### Cách 1: Mở trực tiếp bằng trình duyệt (Không cần cài đặt)
- Nhấp đúp chuột vào file `index.html` trong thư mục dự án.
- Website chạy mượt mà ngay trên Chrome, Edge, Safari hoặc Firefox nhờ toàn bộ logic 3D đã được lập trình thủ công bằng Three.js (không bị chặn CORS khi mở qua giao thức `file:///`).

### Cách 2: Chạy qua Local HTTP Server (Khuyên dùng để tối ưu hiệu năng)
Nếu máy bạn đã cài Python hoặc Node.js:
- **Dùng Python:**
  ```bash
  python -m http.server 8080
  ```
  Sau đó mở trình duyệt tại địa chỉ: `http://localhost:8080`
- **Dùng Node.js (npx serve):**
  ```bash
  npx serve .
  ```
- **Dùng VS Code:** Cài extension **Live Server** và nhấn **Go Live** ở góc dưới màn hình.

---

## 4. HƯỚNG DẪN THAY ĐỔI NỘI DUNG (CHỈ CẦN SỬA MỘT NƠI)

Mọi văn bản, thông số, đường dẫn và câu khẩu hiệu trên website đều được lưu tập trung trong file:
👉 `assets/js/content.js`

Chỉ cần chỉnh sửa trong `content.js`, toàn bộ các trang (Trang chủ, Our Story, Collection, Technology, Journal, Join và Header/Footer) sẽ tự động cập nhật đồng bộ!

### Danh sách các vị trí đánh dấu "CẦN THAY" cần cập nhật khi có dữ liệu chính thức:

| Tên File | Dòng | Mục / Trường dữ liệu | Nội dung hiện tại & Hướng dẫn thay thế |
| :--- | :--- | :--- | :--- |
| `assets/js/content.js` | 14 | `meta.siteUrl` | URL chính thức của website (thay khi trỏ domain) |
| `assets/js/content.js` | 16 | `meta.models.miniZipGlb` | Đường dẫn file 3D `mini-zip.glb` khi thiết kế xong model thật |
| `assets/js/content.js` | 17 | `meta.models.bifoldGlb` | Đường dẫn file 3D `bifold.glb` khi thiết kế xong model thật |
| `assets/js/content.js` | 41 | `hero.slogan` | Slogan gợi ý: *"Từ bã cà phê, đến chiếc ví thông minh."* |
| `assets/js/content.js` | 42 | `hero.headline` | Tiêu đề Hero: *"Chiếc ví nhỏ, nhiều điều thông minh."* |
| `assets/js/content.js` | 58 | `story.headline` | Tiêu đề Story: *"Một câu chuyện bắt đầu từ ly cà phê."* |
| `assets/js/content.js` | 124 | `story.videoPlaceholder.caption` | Chú thích khung phát video |
| `assets/js/content.js` | 125 | `story.videoPlaceholder.videoSrc` | Đường dẫn file video `.mp4` hoặc link Youtube/Vimeo khi có tư liệu thật |
| `assets/js/content.js` | 132 | `collection.headline` | Tiêu đề bộ sưu tập: *"Hai dáng ví. Một tinh thần."* |
| `assets/js/content.js` | 242 | `technology.headline` | Tiêu đề công nghệ: *"Công nghệ nằm trong từng lớp ví."* |
| `assets/js/content.js` | 285 | `journal.headline` | Tiêu đề chuyên mục: *"Nhật ký DOVA."* |
| `assets/js/content.js` | 292, 304, 316, 328 | `journal.articles[i].date` | Ngày đăng thực tế của từng bài viết nháp |
| `assets/js/content.js` | 342 | `join.headline` | Tiêu đề Join: *"Cùng DOVA đi những bước đầu tiên."* |
| `assets/js/content.js` | 343 | `join.slogan` | Khẩu hiệu Join: *"Tiếng nói của bạn định hình sản phẩm tương lai."* |
| `assets/js/content.js` | 348 | `join.formConfig.actionUrl` | Endpoint nhận dữ liệu khảo sát (Formspree, Google Forms hoặc Supabase) |
| `assets/js/content.js` | 454 | `footer.linksColumn2.chính_sách` | Link trang Chính sách bảo mật |
| `assets/js/content.js` | 455 | `footer.linksColumn2.điều_khoản` | Link trang Điều khoản sử dụng |
| `assets/js/content.js` | 460 | `footer.contact.email` | Địa chỉ email liên hệ chính thức của thương hiệu (hiện ẩn bảo mật) |
| `assets/js/content.js` | 461 | `footer.contact.address` | Địa chỉ văn phòng / showroom chính thức |
| `assets/js/content.js` | 465-467 | `footer.socials` | Đường dẫn các kênh Facebook, Instagram, TikTok của thương hiệu |
| `assets/js/form.js` | 15 | `FORM_ENDPOINT` | Biến nhận endpoint gửi dữ liệu (khớp với actionUrl trong content.js) |

---

## 5. CÁC THÀNH PHẦN HIỆN DÙNG BẢN TẠM (PROTOTYPE)

1. **Mô hình 3D hai chiếc ví (`assets/models/`):**
   - Hiện tại chưa có file `.glb` thành phẩm. Hệ thống tự động tạo hình 3D tương tác bằng Three.js procedural primitives (vỏ composite nâu có vân hạt cà phê, đường kéo khóa vàng đồng, rãnh khuyết Smart Tag phát sáng, sống gập đôi).
   - Nhãn "Prototype" được hiển thị tự động trên mọi khung hiển thị 3D.
   - Khi có file 3D thực tế, chỉ cần thả file vào `assets/models/mini-zip.glb` và `assets/models/bifold.glb`, rồi khai báo đường dẫn tại `content.js` (dòng 16-17).
2. **Hình ảnh minh họa (`assets/img/`):**
   - Được thiết kế dưới dạng vector SVG với gradient tông màu Chocolate cao cấp (`#2B1A12`, `#1A0F0A`, `#4A2C1C`), vân hạt bã cà phê, viền vàng đồng (`#B08D57`) và chữ chú thích rõ ràng.
   - Bạn có thể thay thế bằng file ảnh chụp sản phẩm thật (`.jpg` hoặc `.webp`) bất kỳ lúc nào với cùng tên file.
3. **Khung video hành trình (`expanding-video-wrapper`):**
   - Hiện dùng khung đồ họa gradient có nút Play mô phỏng và hiệu ứng bung rộng khi cuộn chuột.
   - Để gắn video thật, bạn chỉ cần điền link vào `content.js` (dòng 125) hoặc chèn thẻ `<video src="..." controls></video>`.
4. **Endpoint nhận form khảo sát (`FORM_ENDPOINT`):**
   - Đang để dạng giả lập an toàn (khi người dùng bấm gửi, trình duyệt sẽ kiểm tra hợp lệ, hiển thị thông báo cảm ơn và ghi log ra console).
   - Khi triển khai chính thức, chỉ cần thay bằng URL endpoint của [Formspree](https://formspree.io) hoặc Google Apps Script.

---

## 6. HƯỚNG DẪN ĐĂNG LÊN NETLIFY, VERCEL & GITHUB PAGES

Vì website sử dụng 100% HTML, CSS, JavaScript thuần và CDN không cần build/compile, việc đưa lên mạng chỉ mất chưa đầy 1 phút:

### Đăng lên Netlify (Nhanh nhất - Kéo thả)
1. Đăng nhập [app.netlify.com](https://app.netlify.com/).
2. Kéo toàn bộ thư mục `dova-ecotech` thả vào khung **"Drag and drop your site output folder here"**.
3. Netlify sẽ cấp ngay một tên miền miễn phí dạng `https://dova-ecotech.netlify.app` với đầy đủ SSL và tốc độ CDN toàn cầu.

### Đăng lên Vercel
1. Cài đặt Vercel CLI: `npm i -g vercel`
2. Mở terminal tại thư mục `dova-ecotech` và gõ lệnh:
   ```bash
   vercel
   ```
3. Nhấn Enter để xác nhận các thiết lập mặc định. Website sẽ được xuất bản lập tức.

### Đăng lên GitHub Pages
1. Tạo một repository mới trên GitHub (ví dụ: `dova-ecotech`).
2. Đẩy toàn bộ mã nguồn lên nhánh `main`:
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo website DOVA ECOTECH"
   git branch -M main
   git remote add origin https://github.com/your-username/dova-ecotech.git
   git push -u origin main
   ```
3. Vào mục **Settings** của repository trên GitHub -> Chọn thẻ **Pages** -> Tại mục **Branch** chọn `main` và thư mục `/ (root)` -> Nhấn **Save**.
4. Website của bạn sẽ hoạt động tại: `https://your-username.github.io/dova-ecotech/`.

---

## 7. TIÊU CHUẨN TRUY CẬP (A11Y) & SEO ĐÃ TỐI ƯU

- Đầy đủ thẻ Meta Title, Meta Description, Thẻ mạng xã hội Open Graph và Twitter Card trên từng trang.
- Đầy đủ Favicon vector hình biểu tượng hạt cà phê DOVA.
- Thuộc tính `alt` mô tả trực quan trên 100% hình ảnh.
- Tương phản màu sắc giữa chữ và nền đạt chuẩn WCAG AA (chữ kem trên nền espresso `#1A0F0A`, chữ chocolate `#2B1A12` trên nền ngà `#F6EFE0`).
- Hỗ trợ điều hướng bằng bàn phím với hiệu ứng `:focus-visible` viền caramel rõ ràng.
- Chống bot spam tự động bằng kỹ thuật honeypot trap không gây phiền hà cho người dùng thật.
- Đạt mục tiêu điểm số Lighthouse cao: Performance >= 80, Accessibility >= 90, SEO >= 90.
