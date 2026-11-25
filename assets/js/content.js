/**
 * =====================================================================
 * DOVA ECOTECH - CONTENT.JS
 * TẤT CẢ chữ, dữ liệu cấu hình, mô tả và đường dẫn của website nằm ở đây.
 * Các vị trí nội dung gợi ý tạm thời hoặc cần bổ sung được đánh dấu bằng:
 * // CẦN THAY NỘI DUNG hoặc chuỗi "[CẦN THAY NỘI DUNG]".
 * =====================================================================
 */

const DOVA_CONTENT = {
  // Cấu hình chung và đường dẫn 3D Model (Chỉ khai báo tại MỘT chỗ duy nhất)
  meta: {
    brandName: "DOVA ECOTECH",
    siteUrl: "https://dova-ecotech.vn", // CẦN THAY NỘI DUNG
    models: {
      miniZipGlb: "assets/models/mini-zip.glb", // CẦN THAY NỘI DUNG khi có file 3D thực tế
      bifoldGlb: "assets/models/bifold.glb"     // CẦN THAY NỘI DUNG khi có file 3D thực tế
    },
    prototypeLabel: "Prototype"
  },

  // Header & Menu Điều hướng toàn site
  navigation: {
    links: [
      { id: "nav-home", label: "Trang chủ", href: "index.html" },
      { id: "nav-story", label: "Our Story", href: "story.html" },
      { id: "nav-collection", label: "Collection", href: "collection.html" },
      { id: "nav-tech", label: "Technology", href: "technology.html" },
      { id: "nav-journal", label: "Journal", href: "journal.html" },
      { id: "nav-join", label: "Join the Journey", href: "join.html" }
    ],
    ctaButton: {
      label: "Đăng ký quan tâm",
      href: "join.html"
    }
  },

  // SECTION 01 - HERO / BRAND INTRODUCTION
  hero: {
    eyebrow: "Khởi nguyên từ phụ phẩm cà phê",
    slogan: "Từ bã cà phê, đến chiếc ví thông minh.", // CẦN THAY NỘI DUNG
    headline: "Chiếc ví nhỏ, nhiều điều thông minh.", // CẦN THAY NỘI DUNG
    description: "DOVA ECOTECH kết hợp vật liệu composite có thành phần bã cà phê cùng công nghệ RFID Blocking và ngăn định vị Smart Tag, tạo nên phụ kiện tối giản, thanh lịch và an tâm cho nhịp sống hiện đại.",
    primaryCta: {
      label: "Khám phá bộ sưu tập",
      href: "collection.html"
    },
    secondaryCta: {
      label: "Câu chuyện DOVA",
      href: "story.html"
    },
    canvasHint: "Kéo để tương tác 3D • Bản thử nghiệm Prototype"
  },

  // SECTION 02 - OUR STORY
  story: {
    eyebrow: "Hành trình khởi sinh",
    headline: "Một câu chuyện bắt đầu từ ly cà phê.", // CẦN THAY NỘI DUNG
    subtitle: "Mỗi ngày trôi qua với hàng triệu tách cà phê được thưởng thức, để lại nguồn bã cà phê dồi dào. Chúng tôi trăn trở: Liệu những phụ phẩm này có thể tái sinh thành một phụ kiện bền đẹp, thông minh và hữu ích cho đời sống thường nhật?",
    
    // 4 Chương câu chuyện
    chapters: [
      {
        number: "01",
        badge: "Chương 01",
        title: "Ý tưởng từ ly cà phê thường nhật",
        description: "Hành trình bắt đầu từ những buổi sáng bên tách cà phê đậm đà. Nhận thấy lượng bã cà phê khổng lồ bị loại bỏ mỗi ngày sau khi pha chế, đội ngũ sáng lập DOVA tự hỏi: Tại sao không khai thác kết cấu sợi tự nhiên của bã cà phê để tạo nên một chất liệu mới mẻ, mang hơi thở ấm áp của đất trời vào những vật dụng cầm tay hàng ngày?",
        image: "assets/img/story/coffee-concept.jpg",
        imageAlt: "Ý tưởng khởi nguồn DOVA ECOTECH từ bã cà phê"
      },
      {
        number: "02",
        badge: "Chương 02",
        title: "Nghiên cứu composite có thành phần bã cà phê",
        description: "Không chạy theo những lời tuyên bố dễ dãi, chúng tôi tập trung vào nghiên cứu vật liệu composite có thành phần bã cà phê kết hợp nền polymer tuyển chọn. Mục tiêu là mang lại bề mặt xúc giác mịn màng, dẻo dai và vân hạt cà phê tự nhiên độc bản, đồng thời tiến hành các bài kiểm tra độ bền cơ học nghiêm ngặt.",
        image: "assets/img/story/chapter-02.jpg",
        imageAlt: "Vật liệu composite chứa bã cà phê độc bản"
      },
      {
        number: "03",
        badge: "Chương 03",
        title: "Tích hợp công nghệ kín đáo & tiện ích",
        description: "Một chiếc ví đương đại không chỉ cần đẹp mà còn phải giải tỏa những âu lo thường trực. DOVA nghiên cứu tích hợp lớp màng hỗ trợ hạn chế việc đọc thẻ không tiếp xúc trái phép (RFID Blocking) và bố trí một ngăn chuyên biệt đặt Smart Tag, giúp bạn dễ dàng định vị chiếc ví qua thiết bị tương thích.",
        image: "assets/img/story/chapter-03.jpg",
        imageAlt: "Công nghệ RFID Blocking và Smart Tag kín đáo"
      },
      {
        number: "04",
        badge: "Chương 04",
        title: "Tầm nhìn & Định hướng tương lai",
        description: "Chiếc ví Mini Zip và Bifold là bước khởi đầu. Định hướng dài hạn của DOVA ECOTECH là hoàn thiện dòng sản phẩm phụ kiện cá nhân, vươn tới túi xách, balo và các giải pháp phụ kiện thông minh từ vật liệu có thành phần bã cà phê, đồng hành cùng thế hệ tiêu dùng có ý thức.",
        image: "assets/img/story/chapter-04.jpg",
        imageAlt: "Định hướng dài hạn với túi xách và balo DOVA"
      }
    ],

    // 3 Giá trị cốt lõi (3 thẻ kem trên nền nâu)
    coreValues: [
      {
        id: "reuse",
        icon: "coffee-seed",
        title: "Reuse — Tái sử dụng",
        summary: "Khai thác giá trị mới từ nguồn bã cà phê sau pha chế.",
        detail: "Tận dụng nguồn phụ phẩm cà phê dồi dào, định hướng tạo nên chuỗi vật liệu thẩm mỹ và giảm tải áp lực chất thải hữu cơ."
      },
      {
        id: "protect",
        icon: "shield-rfid",
        title: "Protect — Hạn chế rủi ro",
        summary: "Bảo vệ thông tin thẻ trong từng bước di chuyển.",
        detail: "Lớp màng chuyên dụng hỗ trợ hạn chế việc đọc thẻ không tiếp xúc trái phép, bảo vệ thẻ thanh toán chạm của bạn ở nơi đông người."
      },
      {
        id: "find",
        icon: "pin-radar",
        title: "Find — Tìm kiếm dễ dàng",
        summary: "Ngăn Smart Tag tương thích để an tâm định vị.",
        detail: "Thiết kế ngăn ẩn vừa vặn thiết bị định vị tương thích, giúp bạn nhanh chóng xác định vị trí chiếc ví khi vô tình để quên."
      }
    ],

    videoPlaceholder: {
      title: "Xem video hành trình DOVA ECOTECH",
      caption: "Khung phát video thử nghiệm • Sẽ được thay thế bằng thước phim tư liệu chính thức", // CẦN THAY NỘI DUNG
      videoSrc: "" // CẦN THAY NỘI DUNG: chèn đường dẫn video .mp4 tại đây khi có
    }
  },

  // SECTION 04 - PRODUCT COLLECTION
  collection: {
    eyebrow: "Bộ sưu tập nguyên mẫu",
    headline: "Hai dáng ví. Một tinh thần.", // CẦN THAY NỘI DUNG
    subtitle: "Thiết kế cho người hiện đại từ 26-40 tuổi, đề cao sự tinh tế, độ bền xúc giác và khả năng bảo vệ tài sản thông minh.",
    
    products: [
      {
        id: "mini-zip",
        name: "DOVA Mini Zip",
        target: "Dáng ví nữ",
        slogan: "Nhỏ gọn trong lòng bàn tay, trọn vẹn an tâm.",
        description: "Thiết kế zip-around bo tròn mềm mại, tối ưu cho những chiếc túi xách nữ hiện đại. Cầm nắm êm ái với bề mặt composite có thành phần bã cà phê, ngăn thẻ mở rộng thông minh và khóa kéo kim loại cao cấp.",
        mainImage: "assets/img/products/mini-zip-main.svg",
        gallery: [
          {
            src: "assets/img/products/mini-zip-detail-material.svg",
            caption: "Bề mặt composite bã cà phê mịn ấm"
          },
          {
            src: "assets/img/products/mini-zip-detail-stitch.svg",
            caption: "Đường may gia cố chỉ đôi tỉ mỉ"
          },
          {
            src: "assets/img/products/mini-zip-detail-slot.svg",
            caption: "Khe Smart Tag và lớp ngăn RFID"
          }
        ],
        specs: {
          dimensions: "~11 × 8,5 × 2 cm (mục tiêu)",
          weight: "Đang hoàn thiện trên nguyên mẫu",
          capacity: "Ngăn thẻ/tiền gấp, 1 khe ẩn lắp Smart Tag",
          colors: "Nâu Espresso & Đen Than (hoặc tùy chỉnh)",
          material: "Vật liệu composite có thành phần bã cà phê (độ dày mục tiêu 1,0–1,3 mm)",
          rfidShield: "Chỉ có trên dòng Smart — Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), thử nghiệm 13,56 MHz",
          smartTagCompatibility: "Bluetooth Low Energy (BLE) • Tương thích iPhone/iOS (Apple Find My), tháo lắp được, tách biệt lớp RFID",
          zipper: "Kim loại mạ đồng mờ chống oxy hóa"
        },
        targetSpecsRows: [
          { label: "Mã SKU", value: "<span data-tier-spec=\"sku\">DOVA-SM-MZ</span>" },
          { label: "Giá tham khảo", value: "<span data-tier-spec=\"price\">Trực tiếp Web/FB: 599.000đ (Sàn TMĐT: 659.000đ)</span>" },
          { label: "Kích thước mục tiêu", value: "~11 × 8,5 × 2 cm" },
          { label: "Trọng lượng", value: "<span class=\"badge-pending\">Đang hoàn thiện trên nguyên mẫu</span>" },
          { label: "Sức chứa mục tiêu", value: "Ngăn thẻ/tiền gấp, 1 khe ẩn lắp Smart Tag" },
          { label: "Màu sắc đề xuất", value: "Nâu Espresso & Đen Than (hoặc tùy chỉnh)" },
          { label: "Vỏ ngoài (Lớp 1)", value: "Composite bã cà phê (độ dày mục tiêu 1,0–1,3 mm)" },
          { label: "Bảo vệ RFID", value: "<span data-tier-spec=\"rfid\">Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), thử nghiệm 13,56 MHz</span>" },
          { label: "Smart Tag (Lớp 3)", value: "Bluetooth BLE • Apple Find My (iOS), tháo lắp được, tách biệt lớp RFID" },
          { label: "Khóa kéo", value: "Kim loại mạ đồng mờ chống oxy hóa" },
          { label: "Bao bì & Bảo hành", value: "Hộp cứng thương hiệu + thiệp tái chế; đổi mới 1–1 trong 15 ngày, BH Smart Tag 06 tháng, BH may/khóa kéo/bề mặt 12 tháng" }
        ],
        features: [
          "Bề mặt composite có thành phần bã cà phê mịn màng, màu nâu cà phê ấm áp.",
          "Dòng Smart tích hợp thêm lớp vải dẫn điện hỗ trợ hạn chế đọc thẻ không tiếp xúc trái phép (RFID Blocking).",
          "Khoang chứa Smart Tag thiết kế riêng biệt, tháo lắp được và tách lớp khỏi RFID.",
          "Khóa kéo trơn tru, bảo vệ đồ đạc không rơi rớt khi di chuyển."
        ],
        tiers: {
          essential: {
            sku: "DOVA-ES-MZ",
            badge: "Dòng Essential",
            title: "Phiên bản Essential (DOVA-ES-MZ)",
            desc: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu) + Khoang tích hợp Smart Tag (Bluetooth BLE • Apple Find My trên iOS) + Hộp cứng thương hiệu. Không đi kèm lớp RFID Blocking.",
            bullets: [
              { icon: "layers", text: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu)" },
              { icon: "pin", text: "Khoang Smart Tag tách biệt (Bluetooth BLE • Apple Find My iOS)" },
              { icon: "ruler", text: "Gấp gọn ~11 × 8,5 × 2 cm • Màu: Nâu Espresso, Đen Than • Hộp cứng thương hiệu" }
            ],
            price: "Trực tiếp Web/FB: 459.000đ (Sàn TMĐT: 499.000đ)",
            warranty: "Bảo hành dự kiến: Đổi mới 1–1 trong 15 ngày • Smart Tag 06 tháng • Đường may, khóa kéo & bề mặt 12 tháng.",
            note: "Dành cho người yêu thích sự gọn gàng thuần túy kèm tiện ích định vị.",
            rfidFeatureText: "<strong>Phiên bản Essential</strong> tập trung vào composite bã cà phê + khoang tích hợp Smart Tag (chưa tích hợp lớp RFID Blocking; chọn dòng Smart để có thêm bảo vệ RFID).",
            rfidSpecValue: "Không đi kèm trên dòng Essential (chỉ trang bị ở dòng Smart)"
          },
          smart: {
            sku: "DOVA-SM-MZ",
            badge: "Dòng Smart",
            title: "Phiên bản Smart (DOVA-SM-MZ)",
            desc: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu) + Lớp vải dẫn điện chắn sóng RFID Blocking (13,56 MHz) tại ngăn thẻ + Khoang Smart Tag tách lớp hoàn toàn + Hộp cứng thương hiệu.",
            bullets: [
              { icon: "layers", text: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu)" },
              { icon: "shield", text: "Lớp vải dẫn điện chắn sóng RFID Blocking tại ngăn thẻ" },
              { icon: "pin", text: "Khoang Smart Tag tách biệt (Bluetooth BLE • Apple Find My iOS)" },
              { icon: "ruler", text: "Gấp gọn ~11 × 8,5 × 2 cm • Màu: Nâu Espresso, Đen Than • Hộp cứng thương hiệu" }
            ],
            price: "Trực tiếp Web/FB: 599.000đ (Sàn TMĐT: 659.000đ)",
            warranty: "Bảo hành dự kiến: Đổi mới 1–1 trong 15 ngày • Smart Tag 06 tháng • Đường may, khóa kéo & bề mặt 12 tháng.",
            note: "Hỗ trợ hạn chế đọc trộm thẻ từ bên ngoài và định vị ví qua Apple Find My.",
            rfidFeatureText: "<strong>Dòng Smart</strong> tích hợp thêm lớp vải dẫn điện hỗ trợ hạn chế khả năng đọc thông tin thẻ không tiếp xúc từ bên ngoài (13,56 MHz). Hiệu quả sẽ được kiểm tra trên nguyên mẫu.",
            rfidSpecValue: "Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), thử nghiệm 13,56 MHz"
          }
        },
        colors: [
          {
            id: "espresso",
            label: "Nâu Espresso",
            swatch: "#4E2F20",
            threeHex: "#382015",
            studioImage: "assets/img/products/mini-zip-photo.jpg",
            popoutImage: "assets/img/products/mini-zip-popout.png",
            compositeImage: "assets/img/products/detail-composite.jpg"
          },
          {
            id: "charcoal",
            label: "Đen Than",
            swatch: "#22201F",
            threeHex: "#1E1D1C",
            studioImage: "assets/img/products/mini-zip-black.jpg",
            popoutImage: "assets/img/products/mini-zip-popout-black.png",
            compositeImage: "assets/img/products/detail-composite-black.jpg"
          }
        ],
        cta: "Đăng ký nhận thông tin Mini Zip"
      },
      {
        id: "bifold",
        name: "DOVA Bifold",
        target: "Dáng ví nam",
        slogan: "Dáng gập kinh điển, công nghệ ẩn sâu.",
        description: "Kiểu dáng ví gập đôi truyền thống được tái định nghĩa với độ mỏng ấn tượng. Vừa vặn trong túi quần âu hay áo vest mà không gây cộm, giữ trọn vẻ lịch lãm của quý ông hiện đại.",
        mainImage: "assets/img/products/bifold-main.svg",
        gallery: [
          {
            src: "assets/img/products/bifold-detail-material.svg",
            caption: "Bề mặt hạt cà phê ép phẳng chống mài mòn"
          },
          {
            src: "assets/img/products/bifold-detail-stitch.svg",
            caption: "Mép gập xử lý nhiệt tăng độ bền uốn"
          },
          {
            src: "assets/img/products/bifold-detail-slot.svg",
            caption: "Ngăn Smart Tag chìm không làm dày cộm ví"
          }
        ],
        specs: {
          dimensions: "Gấp ~11,5 × 9,5 × 1,5 cm (mở ~23 × 9,5 cm, mục tiêu)",
          weight: "Đang hoàn thiện trên nguyên mẫu",
          capacity: "2 ngăn tiền mặt, 4–6 khe thẻ ATM, 1 khe ẩn lắp Smart Tag",
          colors: "Nâu Espresso & Đen Than (hoặc tùy chỉnh)",
          material: "Vật liệu composite có thành phần bã cà phê (độ dày mục tiêu 1,0–1,3 mm)",
          rfidShield: "Chỉ có trên dòng Smart — Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), thử nghiệm 13,56 MHz",
          smartTagCompatibility: "Bluetooth Low Energy (BLE) • Tương thích iPhone/iOS (Apple Find My), tháo lắp được, tách biệt lớp RFID",
          closure: "Dạng gập hai cánh thanh thoát"
        },
        targetSpecsRows: [
          { label: "Mã SKU", value: "<span data-tier-spec=\"sku\">DOVA-SM-BF</span>" },
          { label: "Giá tham khảo", value: "<span data-tier-spec=\"price\">Giá dự kiến: 639.000đ</span>" },
          { label: "Kích thước mục tiêu", value: "Gấp khoảng 11,5 × 9,5 × 1,5 cm (mở ~23 × 9,5 cm)" },
          { label: "Trọng lượng", value: "<span class=\"badge-pending\">Đang hoàn thiện trên nguyên mẫu</span>" },
          { label: "Sức chứa mục tiêu", value: "2 ngăn tiền mặt, 4–6 khe thẻ ATM, 1 khe ẩn lắp Smart Tag" },
          { label: "Màu sắc đề xuất", value: "Nâu Espresso, Đen Than" },
          { label: "Vỏ ngoài (Lớp 1)", value: "Composite bã cà phê (độ dày mục tiêu 1,0–1,3 mm)" },
          { label: "Bảo vệ RFID", value: "<span data-tier-spec=\"rfid\">Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), tần số mục tiêu 13,56 MHz</span>" },
          { label: "Smart Tag (Lớp 3)", value: "Bluetooth BLE • Apple Find My (iOS), tháo lắp được, tách biệt lớp RFID" },
          { label: "Kiểu đóng mở", value: "Dạng gập hai cánh cổ điển" },
          { label: "Bao bì & Bảo hành", value: "Hộp cứng thương hiệu + thiệp tái chế; bảo hành dự kiến: đổi mới 1–1 trong 15 ngày, Smart Tag 06 tháng, đường may & bề mặt 12 tháng" }
        ],
        features: [
          "Vật liệu composite chứa bã cà phê nhẹ, bền bỉ và tạo ấn tượng độc đáo.",
          "Dòng Smart tích hợp thêm lớp vải dẫn điện hỗ trợ hạn chế việc đọc trộm thông tin thẻ từ bên ngoài.",
          "Khoang ẩn chuyên biệt cho Smart Tag có thể tháo lắp, tách biệt lớp RFID.",
          "Cấu trúc rãnh thẻ vát nghiêng giúp thao tác rút và cất thẻ dễ dàng."
        ],
        tiers: {
          essential: {
            sku: "DOVA-ES-BF",
            badge: "Dòng Essential",
            switcherHeading: "DOVA Bifold · Essential",
            leadDesc: "Dáng ví gập đôi kinh điển, tối ưu độ mỏng. Có khoang đặt Smart Tag để hỗ trợ tìm ví.",
            title: "Phiên bản Essential",
            desc: "Composite bã cà phê + Khoang Smart Tag tách biệt + Hộp cứng thương hiệu.",
            bullets: [
              { icon: "layers", text: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu)" },
              { icon: "pin", text: "Khoang Smart Tag tách biệt (Bluetooth BLE • Apple Find My)" },
              { icon: "ruler", text: "Gấp khoảng 11,5 x 9,5 x 1,5 cm • Màu: Nâu Espresso, Đen Than • Hộp cứng thương hiệu" }
            ],
            price: "Giá dự kiến: 489.000đ",
            warranty: "Bảo hành dự kiến: Đổi mới 1–1 trong 15 ngày • Smart Tag 06 tháng • Đường may & bề mặt 12 tháng.",
            note: "Phong cách tối giản kèm tiện ích định vị cho nhu cầu hàng ngày.",
            rfidFeatureText: "<strong>Phiên bản Essential</strong> tập trung vào composite bã cà phê + khoang tích hợp Smart Tag (chưa tích hợp lớp RFID Blocking; chọn dòng Smart để có thêm bảo vệ RFID).",
            rfidSpecValue: "Không đi kèm trên dòng Essential (chỉ trang bị ở dòng Smart)"
          },
          smart: {
            sku: "DOVA-SM-BF",
            badge: "Dòng Smart",
            switcherHeading: "DOVA Bifold · Smart",
            leadDesc: "Dáng ví gập đôi kinh điển, tối ưu độ mỏng. Có khoang đặt Smart Tag để hỗ trợ tìm ví. Lớp RFID Blocking hỗ trợ hạn chế việc đọc thẻ không tiếp xúc trái phép.",
            title: "Phiên bản Smart",
            desc: "Composite bã cà phê + Lớp RFID Blocking + Khoang Smart Tag tách biệt + Hộp cứng thương hiệu.",
            bullets: [
              { icon: "layers", text: "Vật liệu composite bã cà phê (1,0–1,3 mm mục tiêu)" },
              { icon: "shield", text: "Lớp vải dẫn điện chắn sóng RFID Blocking tại ngăn thẻ" },
              { icon: "pin", text: "Khoang Smart Tag tách biệt (Bluetooth BLE • Apple Find My)" },
              { icon: "ruler", text: "Gấp khoảng 11,5 x 9,5 x 1,5 cm • Màu: Nâu Espresso, Đen Than • Hộp cứng thương hiệu" }
            ],
            price: "Giá dự kiến: 639.000đ",
            warranty: "Bảo hành dự kiến: Đổi mới 1–1 trong 15 ngày • Smart Tag 06 tháng • Đường may & bề mặt 12 tháng.",
            note: "Hỗ trợ hạn chế đọc trộm thẻ từ bên ngoài và định vị ví qua Apple Find My.",
            rfidFeatureText: "<strong>Dòng Smart</strong> tích hợp thêm lớp vải dẫn điện hỗ trợ hạn chế khả năng đọc thông tin thẻ không tiếp xúc từ bên ngoài (tần số mục tiêu 13,56 MHz). Hiệu quả sẽ được kiểm tra trên nguyên mẫu.",
            rfidSpecValue: "Vải dẫn điện nền polyester (mục tiêu đồng-niken, 0,08–0,12 mm), tần số mục tiêu 13,56 MHz"
          }
        },
        collectionGallery: [
          {
            currentSrc: "assets/img/products/detail-composite.jpg",
            techReplaceSrc: "assets/img/tech/tech-composite.jpg", // [CẦN THAY NỘI DUNG]: thay ảnh tại assets/img/tech/ nếu muốn dùng ảnh riêng
            tag: "Ảnh minh họa",
            caption: "Minh họa bề mặt vật liệu"
          },
          {
            currentSrc: "assets/img/products/detail-stitch.jpg",
            techReplaceSrc: "assets/img/tech/[CẦN THAY NỘI DUNG: anh-duong-may.jpg]", // [CẦN THAY NỘI DUNG]
            tag: "Ảnh minh họa",
            caption: "Minh họa đường may"
          },
          {
            currentSrc: "assets/img/products/detail-smarttag.jpg",
            techReplaceSrc: "assets/img/tech/tech-smarttag.jpg", // [CẦN THAY NỘI DUNG]: thay ảnh tại assets/img/tech/ nếu muốn dùng ảnh riêng
            tag: "Ảnh minh họa",
            caption: "Minh họa thiết bị Smart Tag"
          }
        ],
        colors: [
          {
            id: "espresso",
            label: "Nâu Espresso",
            swatch: "#4E2F20",
            threeHex: "#2D190F",
            studioImage: "assets/img/products/bifold-photo.jpg",
            popoutImage: "assets/img/products/bifold-popout.png",
            compositeImage: "assets/img/products/detail-composite.jpg"
          },
          {
            id: "charcoal",
            label: "Đen Than",
            swatch: "#22201F",
            threeHex: "#1E1D1C",
            studioImage: "assets/img/products/bifold-black.jpg",
            popoutImage: "assets/img/products/bifold-popout-black.png",
            compositeImage: "assets/img/products/detail-composite-black.jpg"
          }
        ],
        cta: "Đăng ký nhận thông tin Bifold"
      }
    ],
    specsHeading: "Thông số mục tiêu thiết kế",
    specsNote: "Có thể điều chỉnh khi hoàn thiện nguyên mẫu",
    iosNotice: "Smart Tag hiện tương thích với iPhone/iOS (Apple Find My). Chưa hỗ trợ Android."
  },

  // SECTION 05 - TECHNOLOGY & MATERIAL
  technology: {
    eyebrow: "Kỹ nghệ & Vật liệu",
    headline: "Công nghệ nằm trong từng lớp ví.", // CẦN THAY NỘI DUNG
    subtitle: "Mỗi chiếc ví DOVA là sự đúc kết của 3 lớp cấu trúc riêng biệt, kết nối hài hòa giữa phụ phẩm tự nhiên và công nghệ an toàn đời thường.",
    specsHeading: "Thông số mục tiêu thiết kế",
    specsNote: "Có thể điều chỉnh khi hoàn thiện nguyên mẫu",
    iosNotice: "Smart Tag hiện tương thích với iPhone/iOS (Apple Find My). Chưa hỗ trợ Android.",
    
    layers: [
      {
        id: "composite",
        index: "01",
        name: "Coffee-Based Composite",
        vietnameseName: "Vật liệu composite chứa bã cà phê",
        tag: "Lớp vỏ ngoài",
        headline: "Từ bã cà phê đến bề mặt phụ kiện dẻo dai",
        content: "Vật liệu được tạo ra bằng cách kết hợp bã cà phê đã qua sử dụng với polymer hoặc chất kết dính phù hợp. Lớp composite này mang sắc nâu tự nhiên cùng những đốm vân hữu cơ không trùng lặp.",
        valueHighlight: "Giá trị: Tận dụng phụ phẩm cà phê, hạn chế lãng phí tài nguyên, gia tăng giá trị cho nguyên liệu sau sử dụng.",
        note: "Có thể điều chỉnh khi hoàn thiện nguyên mẫu.",
        graphic: "assets/img/tech/tech-composite.jpg",
        specsRows: [
          { label: "Dạng vật liệu", value: "Tấm hoặc cuộn composite mềm" },
          { label: "Thành phần", value: "Bã cà phê đã qua sử dụng kết hợp polymer/chất kết dính phù hợp" },
          { label: "Tỷ lệ bã cà phê", value: "Theo công bố của nhà cung cấp (% khối lượng) [CẦN THAY NỘI DUNG]" },
          { label: "Độ dày", value: "1,0–1,3 mm" },
          { label: "Màu sắc", value: "Nâu cà phê, nâu đất hoặc màu tùy chỉnh" },
          { label: "Độ linh hoạt", value: "Gấp, uốn theo cấu trúc ví" },
          { label: "Bề mặt", value: "Hạn chế bong tróc, nứt, bám bẩn" },
          { label: "Gia công", value: "Cắt, dập, may, ép hoặc dán" },
          { label: "Chống thấm", value: "Cần kiểm nghiệm trong điều kiện sử dụng thực tế" },
          { label: "Độ bền", value: "Không nứt, biến dạng bất thường khi dùng" }
        ]
      },
      {
        id: "rfid",
        index: "02",
        name: "RFID Blocking Shield",
        vietnameseName: "Lớp chắn sóng RFID",
        tag: "Chỉ có trên dòng Smart",
        headline: "Hỗ trợ hạn chế khả năng đọc thông tin thẻ không tiếp xúc từ bên ngoài",
        content: "Chỉ hiển thị là tính năng của dòng Smart: tại khu vực chứa thẻ thanh toán, ví tích hợp một lớp vải dẫn điện nhằm hỗ trợ hạn chế khả năng đọc thông tin thẻ không tiếp xúc từ bên ngoài.",
        note: "Hiệu quả sẽ được kiểm tra trên nguyên mẫu. Bố trí tách biệt khỏi ngăn Smart Tag để không cản trở tín hiệu Bluetooth.",
        graphic: "assets/img/tech/tech-rfid.svg",
        specsRows: [
          { label: "Loại vật liệu", value: "Vải dẫn điện hoặc vật liệu chắn EMI dạng mềm" },
          { label: "Vật liệu nền", value: "Polyester" },
          { label: "Lớp dẫn điện tham khảo", value: "Đồng-niken (mục tiêu)" },
          { label: "Độ dày mục tiêu", value: "0,08–0,12 mm" },
          { label: "Tần số thử nghiệm chính", value: "13,56 MHz" },
          { label: "Độ linh hoạt", value: "Gấp, uốn, may được" },
          { label: "Độ bền", value: "Hạn chế bong lớp phủ sau khi uốn và may" },
          { label: "Vị trí", value: "Ngăn chứa thẻ thanh toán (chỉ trang bị ở dòng Smart)" }
        ]
      },
      {
        id: "smarttag",
        index: "03",
        name: "Smart Tag Integration",
        vietnameseName: "Ngăn định vị Smart Tag chuyên dụng",
        tag: "Tiện ích thông minh",
        headline: "Khoang riêng đặt thiết bị định vị Bluetooth tách biệt lớp RFID",
        content: "Khoang chứa riêng đặt thiết bị định vị Bluetooth có thể tháo lắp khi cần thiết, được bố trí tách biệt hoàn toàn với lớp RFID Blocking nhằm hạn chế ảnh hưởng đến khả năng truyền tín hiệu.",
        note: "Smart Tag hiện tương thích với iPhone/iOS (Apple Find My). Chưa hỗ trợ Android.",
        graphic: "assets/img/tech/tech-smarttag.jpg",
        specsRows: [
          { label: "Công nghệ kết nối", value: "Bluetooth Low Energy (BLE)" },
          { label: "Hệ sinh thái", value: "Apple Find My" },
          { label: "Hệ điều hành", value: "iOS" },
          { label: "Kích thước & Trọng lượng", value: "Nhỏ gọn, nhẹ, không làm cộm ví" },
          { label: "Tìm gần", value: "Phát âm thanh" },
          { label: "Tìm khi thất lạc", value: "Hỗ trợ mạng định vị Find My" },
          { label: "Pin", value: "Có thể thay thế hoặc sạc lại [CẦN THAY NỘI DUNG: chốt loại pin]" },
          { label: "Thời lượng pin", value: "Theo công bố của nhà sản xuất" }
        ]
      }
    ]
  },

  // SECTION 07 - BRAND JOURNAL
  journal: {
    eyebrow: "Góc nhìn & Chia sẻ",
    headline: "Nhật ký DOVA.", // CẦN THAY NỘI DUNG
    subtitle: "Nơi chúng tôi ghi lại những câu chuyện về chất liệu mới, phong cách sống gọn gàng và hành trình tạo tác nguyên mẫu.",
    articles: [
      {
        id: "bai-01-ba-ca-phe",
        title: "Bã cà phê và hành trình tái sinh trong vật liệu mới",
        slug: "journal/bai-01-ba-ca-phe.html",
        date: "14/11/2026", // CẦN THAY NỘI DUNG
        readTime: "4 phút đọc",
        status: "Bản nháp",
        featured: true,
        image: "assets/img/journal/bai-01.jpg",
        category: "Vật liệu bền vững",
        excerpt: "Sau tách espresso hay ly phin đậm vị, những hạt bã cà phê thô mộc có thể đi về đâu? Cùng tìm hiểu cách các kỹ sư vật liệu biến phụ phẩm hữu cơ thành tấm composite mịn màng cho chiếc ví của bạn."
      },
      {
        id: "bai-02-toi-gian",
        title: "Lối sống tối giản: Giải phóng những điều cồng kềnh",
        slug: "journal/bai-02-toi-gian.html",
        date: "10/11/2026", // CẦN THAY NỘI DUNG
        readTime: "3 phút đọc",
        status: "Bản nháp",
        featured: false,
        image: "assets/img/journal/bai-02.jpg",
        category: "Phong cách sống",
        excerpt: "Khi chiếc ví của bạn chỉ giữ lại những tấm thẻ thiết yếu và một vài đồng tiền kỷ niệm, bạn sẽ ngạc nhiên khi thấy tâm trí mình trở nên nhẹ nhõm đến nhường nào."
      },
      {
        id: "bai-03-cong-nghe-hang-ngay",
        title: "Công nghệ ẩn mình: Sự an tâm trong từng bước di chuyển",
        slug: "journal/bai-03-cong-nghe-hang-ngay.html",
        date: "06/11/2026", // CẦN THAY NỘI DUNG
        readTime: "5 phút đọc",
        status: "Bản nháp",
        featured: false,
        image: "assets/img/journal/bai-03.jpg",
        category: "Công nghệ đời sống",
        excerpt: "Không cần màn hình nhấp nháy hay đèn LED phô trương. Công nghệ thông minh đích thực là những lớp màng bảo vệ vô hình hoạt động thầm lặng khi bạn dạo bước trên phố đông."
      },
      {
        id: "bai-04-hanh-trinh-dova",
        title: "Hành trình phát triển sản phẩm DOVA: Từ phác thảo đến nguyên mẫu",
        slug: "journal/bai-04-hanh-trinh-dova.html",
        date: "01/11/2026", // CẦN THAY NỘI DUNG
        readTime: "4 phút đọc",
        status: "Bản nháp",
        featured: false,
        image: "assets/img/journal/bai-04.jpg",
        category: "Hậu trường DOVA",
        excerpt: "Những ngày đầu thử nghiệm ép nhiệt, những đường may thử nghiệm đầu tiên và bài học khi kết hợp vật liệu composite bã cà phê cùng các chi tiết cơ học."
      }
    ]
  },

  // SECTION 08 - CUSTOMER INSIGHT / JOIN THE JOURNEY
  join: {
    eyebrow: "Đồng hành cùng dự án",
    headline: "Cùng DOVA đi những bước đầu tiên.", // CẦN THAY NỘI DUNG
    slogan: "Tiếng nói của bạn định hình sản phẩm tương lai.", // CẦN THAY NỘI DUNG
    description: "DOVA ECOTECH đang trong giai đoạn hoàn thiện nguyên mẫu. Những chia sẻ chân thành của bạn về nhu cầu, thói quen và mong muốn sẽ giúp chúng tôi tinh chỉnh chiếc ví ngày một tiện dụng hơn.",
    
    // Cấu hình form gửi dữ liệu
    formConfig: {
      actionUrl: "https://script.google.com/macros/s/AKfycbxgle4V_wQgi3YCfbJBz29TGMqE-DBYSkraSApXR1J1GWpfeZDCNxEojRsQW-VgQ9SkNg/exec",
      method: "POST"
    },

    // Các trường câu hỏi khảo sát
    fields: {
      name: {
        label: "Họ và tên của bạn",
        placeholder: "Ví dụ: Nguyễn Minh Thảo",
        required: true
      },
      email: {
        label: "Địa chỉ Email nhận tin dự án",
        placeholder: "name@example.com",
        required: true
      },
      ageGroup: {
        label: "Nhóm độ tuổi của bạn",
        options: [
          { value: "under26", label: "Dưới 26 tuổi" },
          { value: "26-40", label: "Từ 26 đến 40 tuổi (Nhóm trọng tâm)", checked: true },
          { value: "over40", label: "Trên 40 tuổi" }
        ]
      },
      productShape: {
        label: "Kiểu dáng ví bạn quan tâm nhất",
        options: [
          { value: "mini-zip", label: "DOVA Mini Zip (Dáng ví nữ khóa kéo)" },
          { value: "bifold", label: "DOVA Bifold (Dáng ví nam gập đôi)" },
          { value: "both", label: "Quan tâm cả hai kiểu dáng" }
        ]
      },
      tierInterest: {
        label: "Dòng phiên bản bạn muốn trải nghiệm",
        options: [
          { value: "essential", label: "Essential (Vật liệu bã cà phê + Ngăn Smart Tag)" },
          { value: "smart", label: "Smart (Bã cà phê + RFID Blocking + Ngăn Smart Tag)", checked: true }
        ]
      },
      phoneOs: {
        label: "Điện thoại bạn đang dùng?",
        options: [
          { value: "ios", label: "iPhone/iOS", checked: true },
          { value: "android", label: "Android" },
          { value: "other", label: "Khác" }
        ]
      },
      priceRange: {
        label: "Mức giá dự kiến bạn thấy hợp lý cho dòng ví này",
        options: [
          { value: "p1", label: "Khoảng 450.000đ - 650.000đ" },
          { value: "p2", label: "Khoảng 650.000đ - 900.000đ" },
          { value: "p3", label: "Khoảng 900.000đ - 1.300.000đ" },
          { value: "p4", label: "Trên 1.300.000đ (Dành cho bản hoàn thiện cao cấp)" }
        ]
      },
      keyInterests: {
        label: "Điều gì ở DOVA ECOTECH khiến bạn quan tâm nhất? (Chọn nhiều mục)",
        options: [
          { value: "material", label: "Vật liệu có thành phần bã cà phê độc đáo" },
          { value: "rfid", label: "Lớp che chắn RFID Blocking an toàn" },
          { value: "smarttag", label: "Khả năng đặt Smart Tag định vị ví" },
          { value: "design", label: "Thiết kế tối giản, thanh lịch" },
          { value: "eco-conscious", label: "Ý nghĩa tận dụng phụ phẩm tuần hoàn" }
        ]
      },
      shoppingChannels: {
        label: "Kênh mua sắm phụ kiện bạn thường sử dụng",
        options: [
          { value: "shopee", label: "Shopee Mall" },
          { value: "tiktok", label: "TikTok Shop" },
          { value: "website", label: "Trang web chính hãng" },
          { value: "store", label: "Trải nghiệm trực tiếp tại cửa hàng đối tác" },
          { value: "other", label: "Kênh khác" }
        ]
      },
      feedback: {
        label: "Góp ý hoặc mong muốn bổ sung cho DOVA",
        placeholder: "Hãy chia sẻ thêm về màu sắc bạn thích, kích thước mong muốn, hoặc điều bạn băn khoăn...",
        required: false
      },
      agreement: {
        label: "Tôi đồng ý nhận thông tin cập nhật tiến độ nguyên mẫu và thư mời trải nghiệm từ DOVA ECOTECH.",
        required: true
      }
    },

    submitButton: {
      label: "Đăng ký đồng hành (Join the Journey)"
    },

    successMessage: {
      title: "Cảm ơn bạn đã đồng hành cùng DOVA ECOTECH!",
      desc: "Thông tin của bạn đã được ghi nhận. Chúng tôi sẽ gửi thông báo đến email của bạn ngay khi có bước tiến mới trên hành trình hoàn thiện sản phẩm."
    }
  },

  // SECTION 09 - FOOTER
  footer: {
    brandStatement: "DOVA ECOTECH — Nâng tầm phụ phẩm cà phê thành phụ kiện thông minh. Khởi sắc từ chất liệu tự nhiên, bền bỉ qua từng đường chỉ và đồng hành an tâm cùng cuộc sống hiện đại.",
    linksColumn1: {
      title: "Khám phá",
      links: [
        { label: "Trang chủ", href: "index.html" },
        { label: "Our Story", href: "story.html" },
        { label: "Collection", href: "collection.html" },
        { label: "Technology & Material", href: "technology.html" }
      ]
    },
    linksColumn2: {
      title: "Tài nguyên & Kết nối",
      links: [
        { label: "DOVA Journal", href: "journal.html" },
        { label: "Join the Journey", href: "join.html" },
        { label: "Chính sách bảo mật", href: "[CẦN THAY NỘI DUNG]" }, // CẦN THAY NỘI DUNG
        { label: "Điều khoản sử dụng", href: "[CẦN THAY NỘI DUNG]" }  // CẦN THAY NỘI DUNG
      ]
    },
    contact: {
      title: "Thông tin liên hệ",
      email: "[CẦN THAY NỘI DUNG]", // CẦN THAY NỘI DUNG: Chưa dùng email cá nhân
      address: "Hà Nội, Việt Nam [CẦN THAY NỘI DUNG]", // CẦN THAY NỘI DUNG
      note: "Dự án đang trong giai đoạn hoàn thiện nguyên mẫu (Prototype Stage)."
    },
    socials: [
      { name: "Facebook", href: "[CẦN THAY NỘI DUNG]", icon: "facebook" }, // CẦN THAY NỘI DUNG
      { name: "Instagram", href: "[CẦN THAY NỘI DUNG]", icon: "instagram" }, // CẦN THAY NỘI DUNG
      { name: "TikTok", href: "[CẦN THAY NỘI DUNG]", icon: "tiktok" }       // CẦN THAY NỘI DUNG
    ],
    copyright: "© 2026 DOVA ECOTECH. Tất cả quyền được bảo lưu. Dự án đang trong giai đoạn nguyên mẫu thử nghiệm."
  }
};

// Đảm bảo truy cập toàn cục trong trình duyệt
if (typeof window !== "undefined") {
  window.DOVA_CONTENT = DOVA_CONTENT;
}
