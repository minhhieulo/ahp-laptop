/* ================================================================
   AHP PRO – SCRIPT.JS
   Phương pháp: Analytic Hierarchy Process (Saaty)
   Ứng dụng: Lựa chọn Laptop cho Sinh Viên IT
   ================================================================ */

/* ================================================================
   1. CẤU HÌNH BÀI TOÁN
   ================================================================ */
const CRITERIA       = ['Hiệu năng', 'Giá cả', 'Độ bền', 'Pin', 'Nâng cấp'];
const CRITERIA_ICONS = ['⚡', '💰', '🛡️', '🔋', '🔧'];
const CRITERIA_DESC  = [
  'CPU, RAM, tốc độ xử lý',
  'Chi phí mua / giá thành',
  'Độ bền vật liệu, chắc chắn',
  'Thời lượng pin, hiệu quả',
  'Khả năng nâng cấp RAM/SSD',
];

/* ── Master danh sách tất cả 5 laptop ── */
const ALL_LAPTOPS = [
  { name: 'MacBook Air M3',    icon: '🍎', color: { bg: 'rgba(79,142,247,.85)',  border: 'rgba(79,142,247,1)'  } },
  { name: 'MacBook Pro M3',    icon: '🔵', color: { bg: 'rgba(99,102,241,.85)',  border: 'rgba(99,102,241,1)'  } },
  { name: 'Dell XPS 13',       icon: '🔷', color: { bg: 'rgba(167,139,250,.78)', border: 'rgba(167,139,250,1)' } },
  { name: 'ASUS ROG Zephyrus', icon: '🎮', color: { bg: 'rgba(0,212,200,.72)',   border: 'rgba(0,212,200,1)'   } },
  { name: 'Lenovo ThinkPad X1',icon: '🖤', color: { bg: 'rgba(244,114,182,.65)', border: 'rgba(244,114,182,1)' } },
];

/* ================================================================
   PRODUCT_DATA (moved from products.html for cross-page access)
   ================================================================ */
const PRODUCT_DATA = [
  {
    id: 0,
    name: 'MacBook Air M3 13"',
    brand: 'apple',
    badge: { text: 'Mới nhất', cls: 'badge-new' },
    price: '~29.990.000đ',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop',
    desc: 'Mỏng nhẹ, hiệu năng chip M3 xuất sắc với GPU tích hợp. Pin 18 giờ, màn hình Liquid Retina 13.6".',
    cpu: 'Apple M3 (8-core)',
    ram: '8GB / 16GB Unified',
    ssd: '256GB – 2TB SSD',
    gpu: 'Apple M3 GPU 10-core',
    pin: '18 giờ (52.6Wh)',
    weight: '1.24 kg',
    os: 'macOS Sonoma',
    category: ["apple"],
    ratings: { performance: 5, battery: 5, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 1,
    name: 'MacBook Air M3 15"',
    brand: 'apple',
    badge: { text: 'Màn lớn', cls: 'badge-new' },
    price: '~35.990.000đ',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop',
    desc: 'Phiên bản 15 inch của MacBook Air M3, màn hình lớn hơn cho trải nghiệm làm việc tốt hơn.',
    cpu: 'Apple M3 (8-core)',
    ram: '8GB / 24GB Unified',
    ssd: '512GB – 2TB SSD',
    gpu: 'Apple M3 GPU 10-core',
    pin: '18 giờ (66.5Wh)',
    weight: '1.51 kg',
    os: 'macOS Sonoma',
    category: ["apple"],
    ratings: { performance: 5, battery: 5, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 2,
    name: 'MacBook Pro M3 14"',
    brand: 'apple',
    badge: { text: 'Pro Choice', cls: 'badge-pro' },
    price: '~44.990.000đ',
    img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop',
    desc: 'Powerhouse cho sinh viên IT chuyên nghiệp. Màn hình Liquid Retina XDR 14.2".',
    cpu: 'Apple M3 Pro (11-core)',
    ram: '18GB / 36GB Unified',
    ssd: '512GB – 4TB SSD',
    gpu: 'Apple M3 Pro GPU 14-core',
    pin: '22 giờ (72.4Wh)',
    weight: '1.61 kg',
    os: 'macOS Sonoma',
    category: ["apple"],
    ratings: { performance: 5, battery: 5, durability: 5, upgrade: 2, value: 2 }
  },
  {
    id: 3,
    name: 'MacBook Pro M3 Max 16"',
    brand: 'apple',
    badge: { text: 'Đỉnh cao', cls: 'badge-pro' },
    price: '~89.990.000đ',
    img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop',
    desc: 'Siêu phẩm M3 Max cho AI/ML, render video 8K, compile lớn. Màn hình 16.2" Liquid Retina XDR.',
    cpu: 'Apple M3 Max (16-core)',
    ram: '48GB / 128GB Unified',
    ssd: '1TB – 8TB SSD',
    gpu: 'Apple M3 Max GPU 40-core',
    pin: '22 giờ (100Wh)',
    weight: '2.14 kg',
    os: 'macOS Sonoma',
    category: ["apple"],
    ratings: { performance: 5, battery: 4, durability: 5, upgrade: 2, value: 1 }
  },
  {
    id: 4,
    name: 'MacBook Air M2 13"',
    brand: 'apple',
    badge: { text: 'Giá tốt', cls: 'badge-popular' },
    price: '~22.990.000đ',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop',
    desc: 'MacBook Air M2 vẫn là lựa chọn cực kỳ đáng tiền cho SV IT năm 1-2.',
    cpu: 'Apple M2 (8-core)',
    ram: '8GB / 24GB Unified',
    ssd: '256GB – 1TB SSD',
    gpu: 'Apple M2 GPU 10-core',
    pin: '18 giờ (52.6Wh)',
    weight: '1.24 kg',
    os: 'macOS Ventura',
    category: ["apple", "budget"],
    ratings: { performance: 4, battery: 5, durability: 4, upgrade: 2, value: 4 }
  },
  {
    id: 5,
    name: 'MacBook Pro M2 Pro 14"',
    brand: 'apple',
    badge: { text: 'Clearance', cls: 'badge-biz' },
    price: '~38.990.000đ',
    img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop',
    desc: 'MacBook Pro M2 Pro vẫn cực mạnh, giá giảm sau khi M3 ra mắt.',
    cpu: 'Apple M2 Pro (10-core)',
    ram: '16GB / 32GB Unified',
    ssd: '512GB – 2TB SSD',
    gpu: 'Apple M2 Pro GPU 16-core',
    pin: '18 giờ (70Wh)',
    weight: '1.60 kg',
    os: 'macOS Sonoma',
    category: ["apple"],
    ratings: { performance: 5, battery: 5, durability: 5, upgrade: 2, value: 3 }
  },
  {
    id: 6,
    name: 'Dell XPS 13 OLED',
    brand: 'dell',
    badge: { text: 'Phổ biến', cls: 'badge-popular' },
    price: '~24.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Thiết kế premium mỏng nhẹ, màn hình OLED 13.4" sắc nét, Intel Core Ultra mạnh mẽ.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB – 1TB NVMe',
    gpu: 'Intel Arc Graphics',
    pin: '12 giờ (54Wh)',
    weight: '1.17 kg',
    os: 'Windows 11 Pro',
    category: ["dell", "budget"],
    ratings: { performance: 4, battery: 3, durability: 4, upgrade: 3, value: 4 }
  },
  {
    id: 7,
    name: 'Dell XPS 15 OLED',
    brand: 'dell',
    badge: { text: 'Màn lớn', cls: 'badge-popular' },
    price: '~38.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Màn hình OLED 15.6" InfinityEdge tuyệt đẹp, RTX 4060 mạnh mẽ cho SV đồ họa.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 64GB DDR5',
    ssd: '512GB – 2TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '13 giờ (86Wh)',
    weight: '1.86 kg',
    os: 'Windows 11 Home',
    category: ["dell"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 4, value: 3 }
  },
  {
    id: 8,
    name: 'Dell Inspiron 15 3520',
    brand: 'dell',
    badge: { text: 'Sinh viên', cls: 'badge-popular' },
    price: '~12.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Laptop phổ thông giá rẻ cho SV mới vào trường, đủ dùng cho học tập hàng ngày.',
    cpu: 'Intel Core i5-1235U',
    ram: '8GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '8 giờ (54Wh)',
    weight: '1.65 kg',
    os: 'Windows 11 Home',
    category: ["dell", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 4, value: 5 }
  },
  {
    id: 9,
    name: 'Dell Latitude 5540',
    brand: 'dell',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~28.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Laptop doanh nghiệp bền bỉ, bảo mật cao, chuẩn MIL-SPEC, lý tưởng cho SV kỹ thuật.',
    cpu: 'Intel Core i7-1365U',
    ram: '16GB / 32GB DDR4',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '12 giờ (65Wh)',
    weight: '1.54 kg',
    os: 'Windows 11 Pro',
    category: ["dell", "business"],
    ratings: { performance: 4, battery: 4, durability: 5, upgrade: 4, value: 4 }
  },
  {
    id: 10,
    name: 'Dell G15 Gaming',
    brand: 'dell',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~20.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Gaming laptop giá tốt nhất phân khúc với RTX 4060, phù hợp SV IT cần GPU mạnh.',
    cpu: 'Intel Core i7-13650HX',
    ram: '16GB DDR5',
    ssd: '512GB NVMe',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '8 giờ (86Wh)',
    weight: '2.81 kg',
    os: 'Windows 11 Home',
    category: ["dell", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 5 }
  },
  {
    id: 11,
    name: 'Dell Vostro 5640',
    brand: 'dell',
    badge: { text: 'Văn phòng', cls: 'badge-biz' },
    price: '~17.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Thiết kế mỏng nhẹ cho môi trường văn phòng và học tập, giá phải chăng.',
    cpu: 'Intel Core i5-1340P',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '10 giờ (54Wh)',
    weight: '1.50 kg',
    os: 'Windows 11 Pro',
    category: ["dell", "business", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 12,
    name: 'ASUS ROG Zephyrus G14',
    brand: 'asus',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~38.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Gaming laptop mạnh nhất cho SV IT cần đồ họa cao. Ryzen 9 + RTX 4070.',
    cpu: 'AMD Ryzen 9 7940HS',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB PCIe 4.0',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '10 giờ (76Wh)',
    weight: '1.65 kg',
    os: 'Windows 11 Home',
    category: ["asus", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 3 }
  },
  {
    id: 13,
    name: 'ASUS ROG Zephyrus G16',
    brand: 'asus',
    badge: { text: 'Màn 16"', cls: 'badge-gaming' },
    price: '~49.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: '16 inch gaming với màn OLED 240Hz, RTX 4080 cho gaming và render chuyên nghiệp.',
    cpu: 'Intel Core i9-14900HX',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4080 12GB',
    pin: '9 giờ (90Wh)',
    weight: '2.20 kg',
    os: 'Windows 11 Home',
    category: ["asus", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 2 }
  },
  {
    id: 14,
    name: 'ASUS ROG Strix G16',
    brand: 'asus',
    badge: { text: 'RTX 4090', cls: 'badge-gaming' },
    price: '~65.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Laptop gaming mạnh nhất với RTX 4090, không có đối thủ cho AI/ML và render.',
    cpu: 'Intel Core i9-14900HX',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4090 16GB',
    pin: '8 giờ (90Wh)',
    weight: '2.50 kg',
    os: 'Windows 11 Home',
    category: ["asus", "gaming"],
    ratings: { performance: 5, battery: 1, durability: 3, upgrade: 4, value: 1 }
  },
  {
    id: 15,
    name: 'ASUS ZenBook 14 OLED',
    brand: 'asus',
    badge: { text: 'Ultrabook', cls: 'badge-new' },
    price: '~22.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Ultrabook mỏng nhẹ với màn OLED 2.8K, Ryzen 7 hiệu quả, pin tốt cho SV di động.',
    cpu: 'AMD Ryzen 7 7745HX',
    ram: '16GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon 780M',
    pin: '12 giờ (75Wh)',
    weight: '1.39 kg',
    os: 'Windows 11 Home',
    category: ["asus", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 16,
    name: 'ASUS ZenBook Pro 16X',
    brand: 'asus',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~52.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Laptop sáng tạo chuyên nghiệp với màn hình OLED 4K, RTX 4060 và bàn phím NumberPad.',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '10 giờ (96Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Pro',
    category: ["asus"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 3, value: 2 }
  },
  {
    id: 17,
    name: 'ASUS VivoBook 15 OLED',
    brand: 'asus',
    badge: { text: 'Sinh viên', cls: 'badge-popular' },
    price: '~14.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Màn OLED sắc nét ở phân khúc giá sinh viên, Ryzen 5 đủ dùng lập trình cơ bản.',
    cpu: 'AMD Ryzen 5 7530U',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '9 giờ (50Wh)',
    weight: '1.50 kg',
    os: 'Windows 11 Home',
    category: ["asus", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 18,
    name: 'ASUS TUF Gaming F15',
    brand: 'asus',
    badge: { text: 'Bền bỉ', cls: 'badge-gaming' },
    price: '~19.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Gaming bền bỉ chuẩn MIL-SPEC, RTX 4060 mạnh mẽ ở mức giá hợp lý nhất.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '8 giờ (90Wh)',
    weight: '2.20 kg',
    os: 'Windows 11 Home',
    category: ["asus", "gaming", "budget"],
    ratings: { performance: 4, battery: 2, durability: 4, upgrade: 4, value: 4 }
  },
  {
    id: 19,
    name: 'ASUS ExpertBook B9',
    brand: 'asus',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~32.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Laptop doanh nghiệp siêu nhẹ chỉ 880g, pin 25 giờ, bảo mật TPM 2.0.',
    cpu: 'Intel Core Ultra 7 165U',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '25 giờ (63Wh)',
    weight: '0.88 kg',
    os: 'Windows 11 Pro',
    category: ["asus", "business"],
    ratings: { performance: 4, battery: 5, durability: 5, upgrade: 3, value: 3 }
  },
  {
    id: 20,
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'lenovo',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~34.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Huyền thoại bàn phím tốt nhất, khung Carbon Fiber, chuẩn MIL-SPEC, bảo mật cao.',
    cpu: 'Intel Core Ultra 5 125U',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '15 giờ (57.5Wh)',
    weight: '1.12 kg',
    os: 'Windows 11 Pro',
    category: ["lenovo", "business"],
    ratings: { performance: 3, battery: 4, durability: 5, upgrade: 5, value: 4 }
  },
  {
    id: 21,
    name: 'Lenovo ThinkPad T14s',
    brand: 'lenovo',
    badge: { text: 'Văn phòng', cls: 'badge-biz' },
    price: '~26.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'ThinkPad tầm trung hoàn hảo, bàn phím cực tốt, pin bền, giá hợp lý hơn X1.',
    cpu: 'AMD Ryzen 7 Pro 7840U',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon 780M',
    pin: '14 giờ (57.5Wh)',
    weight: '1.27 kg',
    os: 'Windows 11 Pro',
    category: ["lenovo", "business", "budget"],
    ratings: { performance: 4, battery: 4, durability: 5, upgrade: 4, value: 4 }
  },
  {
    id: 22,
    name: 'Lenovo Legion 5i Pro',
    brand: 'lenovo',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~29.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Gaming laptop màn 16" 165Hz, RTX 4060 mạnh mẽ, tản nhiệt Legion Coldfront xuất sắc.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 32GB DDR5',
    ssd: '512GB – 1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '9 giờ (80Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 5, value: 4 }
  },
  {
    id: 23,
    name: 'Lenovo Legion Pro 7i',
    brand: 'lenovo',
    badge: { text: 'Flagship', cls: 'badge-gaming' },
    price: '~55.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Flagship gaming với RTX 4090, màn 16" Mini-LED 240Hz, tản nhiệt vô đối.',
    cpu: 'Intel Core i9-14900HX',
    ram: '32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4090 16GB',
    pin: '8 giờ (99.9Wh)',
    weight: '2.80 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "gaming"],
    ratings: { performance: 5, battery: 1, durability: 4, upgrade: 5, value: 2 }
  },
  {
    id: 24,
    name: 'Lenovo IdeaPad Slim 5i',
    brand: 'lenovo',
    badge: { text: 'Giá tốt', cls: 'badge-popular' },
    price: '~13.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Laptop mỏng nhẹ giá rẻ cho SV năm nhất, đủ dùng lập trình Python và văn phòng.',
    cpu: 'Intel Core i5-13420H',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '10 giờ (56Wh)',
    weight: '1.46 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 25,
    name: 'Lenovo Yoga Pro 9i',
    brand: 'lenovo',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~42.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Laptop sáng tạo cao cấp, màn MiniLED 4K 120Hz, RTX 4060 cho SV thiết kế, video.',
    cpu: 'Intel Core i9-13905H',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '11 giờ (84Wh)',
    weight: '1.85 kg',
    os: 'Windows 11 Home',
    category: ["lenovo"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 3, value: 3 }
  },
  {
    id: 26,
    name: 'Lenovo ThinkBook 16 G6',
    brand: 'lenovo',
    badge: { text: 'Văn phòng', cls: 'badge-biz' },
    price: '~21.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Màn 16" IPS lớn, Ryzen 7 mạnh mẽ, bàn phím số full, giá hợp lý cho dân kỹ thuật.',
    cpu: 'AMD Ryzen 7 7730U',
    ram: '16GB / 32GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '9 giờ (60Wh)',
    weight: '1.75 kg',
    os: 'Windows 11 Pro',
    category: ["lenovo", "business", "budget"],
    ratings: { performance: 4, battery: 3, durability: 4, upgrade: 4, value: 4 }
  },
  {
    id: 27,
    name: 'HP Spectre x360 14',
    brand: 'hp',
    badge: { text: '2-in-1', cls: 'badge-new' },
    price: '~39.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: '2-in-1 cao cấp với OLED 2.8K cảm ứng, xoay 360°, bút cảm ứng, hoàn hảo cho thiết kế.',
    cpu: 'Intel Core Ultra 7 165H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '17 giờ (66Wh)',
    weight: '1.36 kg',
    os: 'Windows 11 Pro',
    category: ["hp"],
    ratings: { performance: 4, battery: 4, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 28,
    name: 'HP Envy 16',
    brand: 'hp',
    badge: { text: 'Màn lớn', cls: 'badge-pro' },
    price: '~32.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop 16 inch cao cấp cho sáng tạo nội dung với RTX 4060 và màn OLED 4K.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '12 giờ (83Wh)',
    weight: '2.10 kg',
    os: 'Windows 11 Home',
    category: ["hp"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 3, value: 3 }
  },
  {
    id: 29,
    name: 'HP EliteBook 840 G10',
    brand: 'hp',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~30.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop doanh nghiệp bảo mật cao nhất, chuẩn MIL-SPEC, HP Sure Start, IR camera.',
    cpu: 'Intel Core Ultra 7 165U',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '16 giờ (51Wh)',
    weight: '1.38 kg',
    os: 'Windows 11 Pro',
    category: ["hp", "business"],
    ratings: { performance: 4, battery: 4, durability: 5, upgrade: 4, value: 3 }
  },
  {
    id: 30,
    name: 'HP Pavilion 15',
    brand: 'hp',
    badge: { text: 'Phổ thông', cls: 'badge-popular' },
    price: '~13.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop phổ thông đa năng, giá rẻ cho SV mới, đủ dùng Word, Excel, lập trình nhẹ.',
    cpu: 'AMD Ryzen 5 7530U',
    ram: '8GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '8 giờ (43Wh)',
    weight: '1.75 kg',
    os: 'Windows 11 Home',
    category: ["hp", "budget"],
    ratings: { performance: 3, battery: 2, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 31,
    name: 'HP OMEN 16',
    brand: 'hp',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~28.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Gaming laptop tản nhiệt tốt nhất, màn 165Hz, RTX 4070 cho gaming và AI.',
    cpu: 'AMD Ryzen 7 7745HX',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '8 giờ (83Wh)',
    weight: '2.35 kg',
    os: 'Windows 11 Home',
    category: ["hp", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 4 }
  },
  {
    id: 32,
    name: 'HP ProBook 450 G10',
    brand: 'hp',
    badge: { text: 'Học tập', cls: 'badge-biz' },
    price: '~18.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop học tập bền bỉ, pin dài, giá hợp lý cho SV kỹ thuật cần máy đi học hàng ngày.',
    cpu: 'Intel Core i5-1335U',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '11 giờ (48Wh)',
    weight: '1.74 kg',
    os: 'Windows 11 Pro',
    category: ["hp", "business", "budget"],
    ratings: { performance: 3, battery: 4, durability: 4, upgrade: 3, value: 4 }
  },
  {
    id: 33,
    name: 'MSI Stealth 16 Studio',
    brand: 'msi',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~59.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Laptop creator cao cấp mỏng nhẹ với RTX 4070 và màn 4K Mini-LED 120Hz.',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '9 giờ (99.9Wh)',
    weight: '1.99 kg',
    os: 'Windows 11 Pro',
    category: ["msi"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 4, value: 2 }
  },
  {
    id: 34,
    name: 'MSI Titan GT77',
    brand: 'msi',
    badge: { text: 'Beast', cls: 'badge-gaming' },
    price: '~89.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Laptop gaming không có đối thủ, RTX 4090 + i9, màn 4K 120Hz Mini-LED.',
    cpu: 'Intel Core i9-13980HX',
    ram: '64GB DDR5',
    ssd: '4TB SSD (RAID)',
    gpu: 'NVIDIA RTX 4090 16GB',
    pin: '7 giờ (99.9Wh)',
    weight: '3.30 kg',
    os: 'Windows 11 Home',
    category: ["msi", "gaming"],
    ratings: { performance: 5, battery: 1, durability: 3, upgrade: 5, value: 1 }
  },
  {
    id: 35,
    name: 'MSI Modern 14',
    brand: 'msi',
    badge: { text: 'Mỏng nhẹ', cls: 'badge-popular' },
    price: '~14.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Laptop mỏng nhẹ giá rẻ, Ryzen 5, pin tốt, phù hợp SV cần di chuyển nhiều.',
    cpu: 'AMD Ryzen 5 7530U',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '12 giờ (53Wh)',
    weight: '1.40 kg',
    os: 'Windows 11 Home',
    category: ["msi", "budget"],
    ratings: { performance: 3, battery: 4, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 36,
    name: 'MSI Katana 15',
    brand: 'msi',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~22.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Gaming giá tốt, RTX 4060, màn 144Hz, tản nhiệt Cooler Boost 5 hiệu quả.',
    cpu: 'Intel Core i7-13620H',
    ram: '16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '7 giờ (52.4Wh)',
    weight: '2.25 kg',
    os: 'Windows 11 Home',
    category: ["msi", "gaming", "budget"],
    ratings: { performance: 4, battery: 2, durability: 3, upgrade: 4, value: 4 }
  },
  {
    id: 37,
    name: 'MSI Prestige 16 AI',
    brand: 'msi',
    badge: { text: 'AI Laptop', cls: 'badge-new' },
    price: '~35.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Laptop AI mỏng nhẹ dành cho developer AI/ML, Intel Core Ultra + NPU mạnh.',
    cpu: 'Intel Core Ultra 7 165H',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '13 giờ (82Wh)',
    weight: '1.70 kg',
    os: 'Windows 11 Pro',
    category: ["msi"],
    ratings: { performance: 5, battery: 4, durability: 4, upgrade: 3, value: 3 }
  },
  {
    id: 38,
    name: 'MSI GE76 Raider',
    brand: 'msi',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~45.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Gaming cao cấp màn 17.3" QHD 240Hz, RTX 4080 cực mạnh cho render và game AAA.',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB DDR5',
    ssd: '1TB + 1TB SSD',
    gpu: 'NVIDIA RTX 4080 12GB',
    pin: '8 giờ (99.9Wh)',
    weight: '2.90 kg',
    os: 'Windows 11 Home',
    category: ["msi", "gaming"],
    ratings: { performance: 5, battery: 1, durability: 3, upgrade: 5, value: 2 }
  },
  {
    id: 39,
    name: 'Acer Swift 3 OLED',
    brand: 'acer',
    badge: { text: 'OLED', cls: 'badge-new' },
    price: '~16.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Màn OLED 2.8K ở phân khúc giá rẻ, Ryzen 7 mạnh, nhẹ chỉ 1.25kg.',
    cpu: 'AMD Ryzen 7 7745H',
    ram: '16GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon 780M',
    pin: '12 giờ (65Wh)',
    weight: '1.25 kg',
    os: 'Windows 11 Home',
    category: ["acer", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 40,
    name: 'Acer Predator Helios 16',
    brand: 'acer',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~32.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Gaming mạnh mẽ với màn Mini-LED 250Hz, RTX 4070 và tản nhiệt 5th Gen AeroBlade.',
    cpu: 'Intel Core i7-14700HX',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '9 giờ (90Wh)',
    weight: '2.60 kg',
    os: 'Windows 11 Home',
    category: ["acer", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 3 }
  },
  {
    id: 41,
    name: 'Acer Nitro V 15',
    brand: 'acer',
    badge: { text: 'Giá rẻ', cls: 'badge-popular' },
    price: '~17.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Gaming giá rẻ nhất thị trường với RTX 4050, lý tưởng cho SV ngân sách eo hẹp.',
    cpu: 'AMD Ryzen 5 7535HS',
    ram: '8GB / 16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4050 6GB',
    pin: '7 giờ (57.5Wh)',
    weight: '2.20 kg',
    os: 'Windows 11 Home',
    category: ["acer", "gaming", "budget"],
    ratings: { performance: 4, battery: 2, durability: 3, upgrade: 4, value: 5 }
  },
  {
    id: 42,
    name: 'Acer ConceptD 5',
    brand: 'acer',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~48.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Laptop creator chuyên nghiệp, màn OLED 4K Pantone Validated, RTX 4070 chuẩn màu.',
    cpu: 'Intel Core i9-13900H',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '10 giờ (84Wh)',
    weight: '2.00 kg',
    os: 'Windows 11 Pro',
    category: ["acer"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 3, value: 2 }
  },
  {
    id: 43,
    name: 'Acer Aspire 5',
    brand: 'acer',
    badge: { text: 'Phổ thông', cls: 'badge-popular' },
    price: '~10.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Laptop phổ thông giá tốt nhất thị trường, đủ dùng cho SV học tập cơ bản.',
    cpu: 'AMD Ryzen 5 7530U',
    ram: '8GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '8 giờ (50Wh)',
    weight: '1.70 kg',
    os: 'Windows 11 Home',
    category: ["acer", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 44,
    name: 'Acer Swift X 14',
    brand: 'acer',
    badge: { text: 'GPU rời', cls: 'badge-new' },
    price: '~19.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Ultrabook mỏng nhẹ có GPU rời RTX 4050, lý tưởng cho SV thiết kế di động.',
    cpu: 'AMD Ryzen 7 7745H',
    ram: '16GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4050 6GB',
    pin: '11 giờ (65Wh)',
    weight: '1.40 kg',
    os: 'Windows 11 Home',
    category: ["acer", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 45,
    name: 'Samsung Galaxy Book4 Ultra',
    brand: 'samsung',
    badge: { text: 'AI PC', cls: 'badge-new' },
    price: '~49.990.000đ',
    img: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&auto=format&fit=crop',
    desc: 'Laptop AI với Galaxy AI, màn AMOLED 3K 120Hz, RTX 4070, tích hợp hệ sinh thái Samsung.',
    cpu: 'Intel Core Ultra 9 185H',
    ram: '32GB LPDDR5X',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '11 giờ (76Wh)',
    weight: '1.86 kg',
    os: 'Windows 11 Pro',
    category: ["samsung"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 2, value: 2 }
  },
  {
    id: 46,
    name: 'Samsung Galaxy Book4 Pro',
    brand: 'samsung',
    badge: { text: 'AMOLED', cls: 'badge-pro' },
    price: '~34.990.000đ',
    img: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&auto=format&fit=crop',
    desc: 'Màn AMOLED 3K Dynamic sắc nét tuyệt vời, mỏng nhẹ, pin khủng, camera 1080p.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '16 giờ (76Wh)',
    weight: '1.23 kg',
    os: 'Windows 11 Pro',
    category: ["samsung"],
    ratings: { performance: 4, battery: 5, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 47,
    name: 'Samsung Galaxy Book4 360',
    brand: 'samsung',
    badge: { text: '2-in-1', cls: 'badge-new' },
    price: '~26.990.000đ',
    img: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&auto=format&fit=crop',
    desc: '2-in-1 cảm ứng AMOLED 1080p, S Pen đi kèm, mỏng nhẹ, kết nối tốt với Galaxy phone.',
    cpu: 'Intel Core i7-1355U',
    ram: '16GB LPDDR4X',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '15 giờ (68Wh)',
    weight: '1.50 kg',
    os: 'Windows 11 Home',
    category: ["samsung"],
    ratings: { performance: 3, battery: 5, durability: 3, upgrade: 2, value: 3 }
  },
  {
    id: 48,
    name: 'Samsung Galaxy Book3',
    brand: 'samsung',
    badge: { text: 'Giá tốt', cls: 'badge-popular' },
    price: '~18.990.000đ',
    img: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&auto=format&fit=crop',
    desc: 'Laptop phổ thông tốt của Samsung, mỏng nhẹ đẹp, màn IPS sắc nét.',
    cpu: 'Intel Core i5-1335U',
    ram: '8GB / 16GB DDR4',
    ssd: '256GB – 512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '14 giờ (54Wh)',
    weight: '1.55 kg',
    os: 'Windows 11 Home',
    category: ["samsung", "budget"],
    ratings: { performance: 3, battery: 4, durability: 3, upgrade: 2, value: 4 }
  },
  {
    id: 49,
    name: 'LG Gram 14',
    brand: 'lg',
    badge: { text: 'Siêu nhẹ', cls: 'badge-new' },
    price: '~23.990.000đ',
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    desc: 'Laptop nhẹ nhất thế giới chỉ 999g, chuẩn MIL-SPEC 7 tiêu chí, pin 24 giờ.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '24 giờ (72Wh)',
    weight: '0.99 kg',
    os: 'Windows 11 Home',
    category: ["lg"],
    ratings: { performance: 4, battery: 5, durability: 5, upgrade: 3, value: 3 }
  },
  {
    id: 50,
    name: 'LG Gram 16',
    brand: 'lg',
    badge: { text: 'Màn lớn', cls: 'badge-new' },
    price: '~28.990.000đ',
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    desc: 'Màn 16" IPS lớn nhưng chỉ nặng 1.19kg, pin 24 giờ, chuẩn MIL-SPEC vô đối.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '24 giờ (80Wh)',
    weight: '1.19 kg',
    os: 'Windows 11 Home',
    category: ["lg"],
    ratings: { performance: 4, battery: 5, durability: 5, upgrade: 3, value: 3 }
  },
  {
    id: 51,
    name: 'LG Gram Pro 16 OLED',
    brand: 'lg',
    badge: { text: 'OLED', cls: 'badge-pro' },
    price: '~42.990.000đ',
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    desc: 'Siêu nhẹ 1.25kg với màn OLED 3.2K 120Hz sắc nét tuyệt đối, RTX 3050 cho thiết kế.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 3050 6GB',
    pin: '17 giờ (80Wh)',
    weight: '1.25 kg',
    os: 'Windows 11 Home',
    category: ["lg"],
    ratings: { performance: 4, battery: 5, durability: 5, upgrade: 2, value: 2 }
  },
  {
    id: 52,
    name: 'Razer Blade 14',
    brand: 'razer',
    badge: { text: 'Premium', cls: 'badge-pro' },
    price: '~55.990.000đ',
    img: 'https://images.unsplash.com/photo-1615750173239-c9c3bb86c37c?w=600&auto=format&fit=crop',
    desc: 'Laptop gaming cao cấp nhất với vỏ CNC nhôm, Ryzen 9 + RTX 4070, màn 165Hz.',
    cpu: 'AMD Ryzen 9 7945HX',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '11 giờ (68.1Wh)',
    weight: '1.75 kg',
    os: 'Windows 11 Home',
    category: ["razer", "gaming"],
    ratings: { performance: 5, battery: 3, durability: 5, upgrade: 2, value: 2 }
  },
  {
    id: 53,
    name: 'Razer Blade 16',
    brand: 'razer',
    badge: { text: 'Đỉnh nhất', cls: 'badge-gaming' },
    price: '~79.990.000đ',
    img: 'https://images.unsplash.com/photo-1615750173239-c9c3bb86c37c?w=600&auto=format&fit=crop',
    desc: 'Flagship gaming với màn OLED dual-mode 4K/240Hz, RTX 4090, vỏ nhôm CNC siêu bền.',
    cpu: 'Intel Core i9-14900HX',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4090 16GB',
    pin: '9 giờ (95.2Wh)',
    weight: '2.24 kg',
    os: 'Windows 11 Home',
    category: ["razer", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 5, upgrade: 2, value: 1 }
  },
  {
    id: 54,
    name: 'Microsoft Surface Pro 10',
    brand: 'microsoft',
    badge: { text: 'Tablet PC', cls: 'badge-new' },
    price: '~32.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&auto=format&fit=crop',
    desc: '2-in-1 tablet siêu mỏng của Microsoft, màn 13" 2880x1920 cảm ứng, bút Surface.',
    cpu: 'Intel Core Ultra 7 165U',
    ram: '16GB / 64GB LPDDR5',
    ssd: '256GB – 1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '15 giờ (53Wh)',
    weight: '0.89 kg',
    os: 'Windows 11 Pro',
    category: ["microsoft"],
    ratings: { performance: 4, battery: 4, durability: 4, upgrade: 1, value: 2 }
  },
  {
    id: 55,
    name: 'Microsoft Surface Laptop 6',
    brand: 'microsoft',
    badge: { text: 'Ultrabook', cls: 'badge-new' },
    price: '~36.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&auto=format&fit=crop',
    desc: 'Laptop mỏng nhẹ cao cấp của Microsoft, màn PixelSense 2.5K cảm ứng, pin 19 giờ.',
    cpu: 'Intel Core Ultra 7 165H',
    ram: '16GB / 64GB LPDDR5X',
    ssd: '512GB – 1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '19 giờ (54Wh)',
    weight: '1.34 kg',
    os: 'Windows 11 Pro',
    category: ["microsoft"],
    ratings: { performance: 4, battery: 5, durability: 4, upgrade: 1, value: 2 }
  },
  {
    id: 56,
    name: 'Xiaomi Mi Notebook Pro X 14',
    brand: 'xiaomi',
    badge: { text: 'Giá tốt', cls: 'badge-popular' },
    price: '~20.990.000đ',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
    desc: 'Laptop Trung Quốc chất lượng cao, OLED 2.8K, RTX 3050, giá cực tốt cho SV.',
    cpu: 'Intel Core i7-11390H',
    ram: '16GB LPDDR4X',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 3050Ti 4GB',
    pin: '11 giờ (56Wh)',
    weight: '1.60 kg',
    os: 'Windows 11 Home',
    category: ["xiaomi", "budget"],
    ratings: { performance: 4, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 57,
    name: 'Xiaomi Book Pro 16 2024',
    brand: 'xiaomi',
    badge: { text: 'OLED 4K', cls: 'badge-new' },
    price: '~28.990.000đ',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
    desc: 'Màn OLED 4K 60Hz 16" sắc nét, Core Ultra 7, mỏng nhẹ, giá hợp lý.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '12 giờ (75Wh)',
    weight: '1.68 kg',
    os: 'Windows 11 Home',
    category: ["xiaomi"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 2, value: 4 }
  },
  {
    id: 58,
    name: 'Huawei MateBook X Pro 2024',
    brand: 'huawei',
    badge: { text: 'Mỏng nhất', cls: 'badge-new' },
    price: '~33.990.000đ',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&auto=format&fit=crop',
    desc: 'Laptop mỏng đẹp nhất, màn OLED 3.1K 90Hz True-Color, Core Ultra 9, chỉ 9.9mm.',
    cpu: 'Intel Core Ultra 9 185H',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '16 giờ (70Wh)',
    weight: '1.26 kg',
    os: 'Windows 11 Home',
    category: ["huawei"],
    ratings: { performance: 5, battery: 4, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 59,
    name: 'Huawei MateBook D 16',
    brand: 'huawei',
    badge: { text: 'Học tập', cls: 'badge-popular' },
    price: '~16.990.000đ',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&auto=format&fit=crop',
    desc: 'Laptop học tập màn lớn 16" IPS, Ryzen 7, giá hợp lý, thiết kế đẹp.',
    cpu: 'AMD Ryzen 7 7730U',
    ram: '16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '12 giờ (60Wh)',
    weight: '1.68 kg',
    os: 'Windows 11 Home',
    category: ["huawei", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 2, value: 4 }
  },
  {
    id: 60,
    name: 'Gigabyte AORUS 15X',
    brand: 'gigabyte',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~39.990.000đ',
    img: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&auto=format&fit=crop',
    desc: 'Gaming laptop 15.6" QHD 240Hz, RTX 4070, tản nhiệt Windforce Infinity xuất sắc.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '8 giờ (99Wh)',
    weight: '2.20 kg',
    os: 'Windows 11 Home',
    category: ["gigabyte", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 3 }
  },
  {
    id: 61,
    name: 'Gigabyte Aero 16 OLED',
    brand: 'gigabyte',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~45.990.000đ',
    img: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&auto=format&fit=crop',
    desc: 'Laptop creator OLED 4K X-Rite Pantone chuẩn màu, RTX 4070 cho SV thiết kế chuyên nghiệp.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 64GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '11 giờ (99Wh)',
    weight: '2.00 kg',
    os: 'Windows 11 Pro',
    category: ["gigabyte"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 4, value: 2 }
  },
  {
    id: 62,
    name: 'Dynabook Portégé X30L',
    brand: 'dynabook',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~27.990.000đ',
    img: 'https://images.unsplash.com/photo-1541569863845-93cbdb9b2b79?w=600&auto=format&fit=crop',
    desc: 'Laptop doanh nghiệp Nhật Bản siêu nhẹ 878g, bền bỉ, chuẩn MIL-SPEC, pin 18 giờ.',
    cpu: 'Intel Core i7-1365U',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '18 giờ (65Wh)',
    weight: '0.88 kg',
    os: 'Windows 11 Pro',
    category: ["dynabook", "business"],
    ratings: { performance: 3, battery: 5, durability: 5, upgrade: 3, value: 3 }
  },
  {
    id: 63,
    name: 'Panasonic Toughbook 55',
    brand: 'panasonic',
    badge: { text: 'Rugged', cls: 'badge-biz' },
    price: '~55.990.000đ',
    img: 'https://images.unsplash.com/photo-1541569863845-93cbdb9b2b79?w=600&auto=format&fit=crop',
    desc: 'Laptop siêu bền dành cho điều kiện khắc nghiệt, chống nước IP65, rơi từ 1.8m.',
    cpu: 'Intel Core i5-1145G7',
    ram: '16GB / 64GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '20 giờ (modular)',
    weight: '2.27 kg',
    os: 'Windows 11 Pro',
    category: ["panasonic", "business"],
    ratings: { performance: 3, battery: 5, durability: 5, upgrade: 5, value: 2 }
  },
  {
    id: 64,
    name: 'Honor MagicBook Pro 16',
    brand: 'honor',
    badge: { text: 'Giá tốt', cls: 'badge-popular' },
    price: '~19.990.000đ',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&auto=format&fit=crop',
    desc: 'Màn IPS 2.5K 165Hz, Ryzen 7, pin dài, thiết kế đẹp ở phân khúc giá SV.',
    cpu: 'AMD Ryzen 7 7745H',
    ram: '16GB DDR5',
    ssd: '1TB SSD',
    gpu: 'AMD Radeon 780M',
    pin: '13 giờ (75Wh)',
    weight: '1.75 kg',
    os: 'Windows 11 Home',
    category: ["honor", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 65,
    name: 'Honor MagicBook X16',
    brand: 'honor',
    badge: { text: 'Sinh viên', cls: 'badge-popular' },
    price: '~12.990.000đ',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&auto=format&fit=crop',
    desc: 'Laptop giá rẻ đẹp, Core i5, màn 16" FHD, đủ dùng lập trình và học tập cơ bản.',
    cpu: 'Intel Core i5-12450H',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'Intel UHD Graphics',
    pin: '10 giờ (60Wh)',
    weight: '1.63 kg',
    os: 'Windows 11 Home',
    category: ["honor", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 66,
    name: 'GPD Pocket 3',
    brand: 'gpd',
    badge: { text: 'Mini PC', cls: 'badge-new' },
    price: '~17.990.000đ',
    img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop',
    desc: 'Máy tính mini cầm tay 8", Core i7, nhiều cổng kết nối, độc đáo cho dev di động.',
    cpu: 'Intel Core i7-1195G7',
    ram: '16GB LPDDR4X',
    ssd: '1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '6 giờ (46.2Wh)',
    weight: '0.69 kg',
    os: 'Windows 11 Pro',
    category: ["gpd", "budget"],
    ratings: { performance: 3, battery: 2, durability: 3, upgrade: 3, value: 3 }
  },
  {
    id: 67,
    name: 'ASUS ROG Flow X13',
    brand: 'asus',
    badge: { text: '2-in-1', cls: 'badge-gaming' },
    price: '~34.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Gaming 2-in-1 13.4" xoay 360°, Ryzen 9 + RTX 4060, siêu nhẹ 1.3kg cho gaming di động.',
    cpu: 'AMD Ryzen 9 7940HS',
    ram: '16GB / 32GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '10 giờ (75Wh)',
    weight: '1.30 kg',
    os: 'Windows 11 Home',
    category: ["asus", "gaming"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 3, value: 3 }
  },
  {
    id: 68,
    name: 'Lenovo Legion 5 Pro',
    brand: 'lenovo',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~26.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Gaming 16" QHD 165Hz, Ryzen 7 + RTX 4060, tản nhiệt tốt, giá cực cạnh tranh.',
    cpu: 'AMD Ryzen 7 7745HX',
    ram: '16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '8 giờ (80Wh)',
    weight: '2.45 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "gaming", "budget"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 5, value: 4 }
  },
  {
    id: 69,
    name: 'HP Victus 16',
    brand: 'hp',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~21.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Gaming giá tầm trung, RTX 4060, màn 144Hz, thiết kế gaming nhưng không quá phô.',
    cpu: 'AMD Ryzen 7 7745HX',
    ram: '16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '8 giờ (70.9Wh)',
    weight: '2.29 kg',
    os: 'Windows 11 Home',
    category: ["hp", "gaming", "budget"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 4 }
  },
  {
    id: 70,
    name: 'Acer Predator Triton 500 SE',
    brand: 'acer',
    badge: { text: 'Slim Gaming', cls: 'badge-gaming' },
    price: '~52.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Gaming mỏng nhẹ cao cấp, RTX 4080, màn 16" QHD 240Hz, vỏ kim loại sang trọng.',
    cpu: 'Intel Core i9-13900HX',
    ram: '32GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4080 12GB',
    pin: '9 giờ (90Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Home',
    category: ["acer", "gaming"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 3, value: 2 }
  },
  {
    id: 71,
    name: 'MSI Vector GP68HX',
    brand: 'msi',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~36.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Gaming flagship màn 16" QHD 240Hz, RTX 4080, i9 mạnh mẽ cho gaming và AI.',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB DDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4080 12GB',
    pin: '8 giờ (99.9Wh)',
    weight: '2.60 kg',
    os: 'Windows 11 Home',
    category: ["msi", "gaming"],
    ratings: { performance: 5, battery: 1, durability: 3, upgrade: 5, value: 2 }
  },
  {
    id: 72,
    name: 'Lenovo IdeaPad Gaming 3i',
    brand: 'lenovo',
    badge: { text: 'Giá rẻ', cls: 'badge-popular' },
    price: '~16.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Gaming giá rẻ nhất của Lenovo, RTX 3050, đủ chơi game nhẹ và lập trình.',
    cpu: 'Intel Core i5-12450H',
    ram: '8GB / 16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 3050 4GB',
    pin: '7 giờ (45Wh)',
    weight: '2.20 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "gaming", "budget"],
    ratings: { performance: 3, battery: 2, durability: 3, upgrade: 4, value: 5 }
  },
  {
    id: 73,
    name: 'HP 15s-fq5',
    brand: 'hp',
    badge: { text: 'Sinh viên', cls: 'badge-popular' },
    price: '~11.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop sinh viên giá rẻ nhất HP, Core i3, đủ dùng Office và lập trình cơ bản.',
    cpu: 'Intel Core i3-1215U',
    ram: '8GB DDR4',
    ssd: '256GB SSD',
    gpu: 'Intel UHD Graphics',
    pin: '9 giờ (41Wh)',
    weight: '1.69 kg',
    os: 'Windows 11 Home',
    category: ["hp", "budget"],
    ratings: { performance: 2, battery: 3, durability: 3, upgrade: 3, value: 5 }
  },
  {
    id: 74,
    name: 'Acer Aspire 3',
    brand: 'acer',
    badge: { text: 'Giá rẻ', cls: 'badge-popular' },
    price: '~8.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Laptop rẻ nhất thị trường còn dùng được, Celeron N, đủ học online và Word.',
    cpu: 'Intel Celeron N4500',
    ram: '4GB / 8GB DDR4',
    ssd: '256GB SSD',
    gpu: 'Intel UHD Graphics',
    pin: '7 giờ (36Wh)',
    weight: '1.90 kg',
    os: 'Windows 11 S',
    category: ["acer", "budget"],
    ratings: { performance: 1, battery: 2, durability: 2, upgrade: 2, value: 5 }
  },
  {
    id: 75,
    name: 'Dell Inspiron 14 2-in-1',
    brand: 'dell',
    badge: { text: '2-in-1', cls: 'badge-new' },
    price: '~15.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: '2-in-1 giá rẻ cảm ứng, Ryzen 5, đủ dùng cho SV năng động thích ghi chú tay.',
    cpu: 'AMD Ryzen 5 7530U',
    ram: '8GB / 16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon Graphics',
    pin: '9 giờ (54Wh)',
    weight: '1.63 kg',
    os: 'Windows 11 Home',
    category: ["dell", "budget"],
    ratings: { performance: 3, battery: 3, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 76,
    name: 'HP ZBook Fury 16 G10',
    brand: 'hp',
    badge: { text: 'Workstation', cls: 'badge-pro' },
    price: '~79.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Mobile workstation mạnh nhất, NVIDIA RTX 4000 Ada, ECC RAM, ISV certified.',
    cpu: 'Intel Core i9-13950HX',
    ram: '32GB / 128GB DDR5 ECC',
    ssd: '2TB NVMe SSD',
    gpu: 'NVIDIA RTX 4000 Ada 12GB',
    pin: '8 giờ (95.9Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Pro',
    category: ["hp"],
    ratings: { performance: 5, battery: 2, durability: 5, upgrade: 5, value: 1 }
  },
  {
    id: 77,
    name: 'Lenovo ThinkPad P16s',
    brand: 'lenovo',
    badge: { text: 'Workstation', cls: 'badge-pro' },
    price: '~45.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Mobile workstation tầm trung, GPU chuyên nghiệp RTX A1000, bàn phím ThinkPad huyền thoại.',
    cpu: 'AMD Ryzen 7 Pro 7840U',
    ram: '32GB / 64GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX A1000 6GB',
    pin: '12 giờ (86Wh)',
    weight: '1.85 kg',
    os: 'Windows 11 Pro',
    category: ["lenovo", "business"],
    ratings: { performance: 5, battery: 3, durability: 5, upgrade: 5, value: 2 }
  },
  {
    id: 78,
    name: 'Dell Precision 5690',
    brand: 'dell',
    badge: { text: 'Workstation', cls: 'badge-pro' },
    price: '~62.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Workstation di động của Dell, màn OLED 4K chuẩn màu, RTX 4000 Ada cho SV đồ họa kỹ thuật.',
    cpu: 'Intel Core Ultra 9 185H',
    ram: '32GB / 64GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4000 Ada 12GB',
    pin: '10 giờ (86Wh)',
    weight: '1.84 kg',
    os: 'Windows 11 Pro',
    category: ["dell"],
    ratings: { performance: 5, battery: 3, durability: 5, upgrade: 4, value: 1 }
  },
  {
    id: 79,
    name: 'Lenovo IdeaPad Flex 5i Chromebook',
    brand: 'lenovo',
    badge: { text: 'ChromeOS', cls: 'badge-popular' },
    price: '~7.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Chromebook 2-in-1 giá cực rẻ, đủ dùng Google Docs, lập trình web cơ bản, pin tốt.',
    cpu: 'Intel Core i3-1215U',
    ram: '8GB LPDDR4X',
    ssd: '128GB eMMC',
    gpu: 'Intel UHD Graphics',
    pin: '10 giờ (51Wh)',
    weight: '1.35 kg',
    os: 'ChromeOS',
    category: ["lenovo", "budget"],
    ratings: { performance: 2, battery: 4, durability: 3, upgrade: 1, value: 5 }
  },
  {
    id: 80,
    name: 'ASUS Chromebook Plus CX34',
    brand: 'asus',
    badge: { text: 'ChromeOS', cls: 'badge-popular' },
    price: '~9.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Chromebook mạnh nhất với Core i7, đủ chạy Linux và Android app cho SV lập trình.',
    cpu: 'Intel Core i7-1355U',
    ram: '8GB LPDDR4X',
    ssd: '256GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '12 giờ (50Wh)',
    weight: '1.55 kg',
    os: 'ChromeOS Plus',
    category: ["asus", "budget"],
    ratings: { performance: 3, battery: 4, durability: 3, upgrade: 1, value: 4 }
  },
  {
    id: 81,
    name: 'HP Chromebook x360 14c',
    brand: 'hp',
    badge: { text: 'ChromeOS', cls: 'badge-popular' },
    price: '~8.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Chromebook 2-in-1 cảm ứng của HP, thiết kế đẹp, đủ dùng học tập online.',
    cpu: 'Intel Core i3-1215U',
    ram: '8GB DDR4',
    ssd: '128GB eMMC',
    gpu: 'Intel UHD Graphics',
    pin: '11 giờ (51Wh)',
    weight: '1.45 kg',
    os: 'ChromeOS',
    category: ["hp", "budget"],
    ratings: { performance: 2, battery: 4, durability: 3, upgrade: 1, value: 4 }
  },
  {
    id: 82,
    name: 'ASUS ProArt Studiobook 16',
    brand: 'asus',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~58.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Laptop creator đỉnh cao với màn OLED 4K 120Hz, RTX 4070, ASUS Dial xoay điều chỉnh nhanh.',
    cpu: 'Intel Core i9-13980HX',
    ram: '32GB / 64GB DDR5',
    ssd: '2TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '10 giờ (90Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Pro',
    category: ["asus"],
    ratings: { performance: 5, battery: 2, durability: 4, upgrade: 4, value: 2 }
  },
  {
    id: 83,
    name: 'Dell XPS 17 OLED',
    brand: 'dell',
    badge: { text: 'Màn 17"', cls: 'badge-pro' },
    price: '~52.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'XPS lớn nhất với OLED 4K 17 inch, RTX 4070, dành cho SV thiết kế cần màn lớn.',
    cpu: 'Intel Core i9-13900H',
    ram: '32GB DDR5',
    ssd: '1TB – 2TB SSD',
    gpu: 'NVIDIA RTX 4070 8GB',
    pin: '11 giờ (97Wh)',
    weight: '2.69 kg',
    os: 'Windows 11 Pro',
    category: ["dell"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 3, value: 2 }
  },
  {
    id: 84,
    name: 'HP Dragonfly Pro',
    brand: 'hp',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~37.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'Laptop business siêu sang, vỏ nhôm anodized, màn IPS 1200p, pin 68Wh, webcam 5MP.',
    cpu: 'AMD Ryzen 7 7736U',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'AMD Radeon 680M',
    pin: '14 giờ (68Wh)',
    weight: '1.40 kg',
    os: 'Windows 11 Pro',
    category: ["hp", "business"],
    ratings: { performance: 4, battery: 4, durability: 5, upgrade: 2, value: 3 }
  },
  {
    id: 85,
    name: 'Lenovo Yoga Slim 7 Pro X',
    brand: 'lenovo',
    badge: { text: 'Màn 3K', cls: 'badge-new' },
    price: '~25.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Ultrabook mỏng nhẹ màn IPS 3K 120Hz, Ryzen 9 mạnh mẽ, pin tốt cho SV sáng tạo.',
    cpu: 'AMD Ryzen 9 6900HX',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA MX550 2GB',
    pin: '12 giờ (61.5Wh)',
    weight: '1.35 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 2, value: 4 }
  },
  {
    id: 86,
    name: 'Acer Swift X 16',
    brand: 'acer',
    badge: { text: 'OLED', cls: 'badge-new' },
    price: '~24.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Màn OLED 3.2K 120Hz 16 inch mỏng nhẹ 1.8kg, RTX 4050, Ryzen 7 hiệu quả.',
    cpu: 'AMD Ryzen 7 7745H',
    ram: '16GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4050 6GB',
    pin: '9 giờ (76Wh)',
    weight: '1.80 kg',
    os: 'Windows 11 Home',
    category: ["acer", "budget"],
    ratings: { performance: 4, battery: 3, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 87,
    name: 'MSI Summit E16 Flip',
    brand: 'msi',
    badge: { text: '2-in-1', cls: 'badge-new' },
    price: '~30.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: '2-in-1 business cao cấp, RTX 4060, màn QHD+ cảm ứng xoay 360°, vỏ nhôm sang.',
    cpu: 'Intel Core i7-1360P',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '11 giờ (82Wh)',
    weight: '1.95 kg',
    os: 'Windows 11 Pro',
    category: ["msi"],
    ratings: { performance: 4, battery: 3, durability: 4, upgrade: 3, value: 3 }
  },
  {
    id: 88,
    name: 'HP EliteBook 1040 G10',
    brand: 'hp',
    badge: { text: 'Business', cls: 'badge-biz' },
    price: '~44.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: 'EliteBook cao cấp nhất, màn OLED 2.8K cảm ứng, bảo mật AI HP Wolf Security.',
    cpu: 'Intel Core Ultra 7 165U',
    ram: '32GB / 64GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Iris Xe',
    pin: '18 giờ (68Wh)',
    weight: '1.27 kg',
    os: 'Windows 11 Pro',
    category: ["hp", "business"],
    ratings: { performance: 4, battery: 5, durability: 5, upgrade: 2, value: 2 }
  },
  {
    id: 89,
    name: 'Dell Inspiron 16 Plus',
    brand: 'dell',
    badge: { text: 'Học tập', cls: 'badge-popular' },
    price: '~20.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format&fit=crop',
    desc: 'Màn 16" 3K 120Hz đẹp tuyệt vời, Core i7, pin tốt, giá hợp lý cho SV năm 3-4.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '12 giờ (86Wh)',
    weight: '1.97 kg',
    os: 'Windows 11 Home',
    category: ["dell", "budget"],
    ratings: { performance: 5, battery: 3, durability: 4, upgrade: 3, value: 4 }
  },
  {
    id: 90,
    name: 'ASUS ZenBook Duo 14',
    brand: 'asus',
    badge: { text: 'Màn kép', cls: 'badge-new' },
    price: '~29.990.000đ',
    img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop',
    desc: 'Laptop độc đáo 2 màn hình OLED, productivity tối đa cho SV lập trình đa nhiệm.',
    cpu: 'Intel Core i9-13900H',
    ram: '32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '9 giờ (75Wh)',
    weight: '1.65 kg',
    os: 'Windows 11 Pro',
    category: ["asus"],
    ratings: { performance: 5, battery: 3, durability: 3, upgrade: 2, value: 3 }
  },
  {
    id: 91,
    name: 'Lenovo Yoga 9i 14',
    brand: 'lenovo',
    badge: { text: 'Premium', cls: 'badge-pro' },
    price: '~38.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: '2-in-1 premium nhất của Lenovo, OLED 2.8K cảm ứng, loa JBL 4 speaker, pin 75Wh.',
    cpu: 'Intel Core Ultra 7 155H',
    ram: '16GB / 32GB LPDDR5',
    ssd: '1TB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '14 giờ (75Wh)',
    weight: '1.37 kg',
    os: 'Windows 11 Home',
    category: ["lenovo"],
    ratings: { performance: 4, battery: 5, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 92,
    name: 'HP Envy x360 15',
    brand: 'hp',
    badge: { text: '2-in-1', cls: 'badge-new' },
    price: '~22.990.000đ',
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop',
    desc: '2-in-1 15 inch OLED cảm ứng, Ryzen 7, pin 10 giờ, bút cảm ứng MPP, giá hợp lý.',
    cpu: 'AMD Ryzen 7 7730U',
    ram: '16GB DDR4',
    ssd: '512GB SSD',
    gpu: 'AMD Radeon 780M',
    pin: '10 giờ (66Wh)',
    weight: '1.93 kg',
    os: 'Windows 11 Home',
    category: ["hp", "budget"],
    ratings: { performance: 4, battery: 4, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 93,
    name: 'Acer Swift Go 16',
    brand: 'acer',
    badge: { text: 'AI PC', cls: 'badge-new' },
    price: '~21.990.000đ',
    img: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&auto=format&fit=crop',
    desc: 'Laptop AI PC với Intel Core Ultra NPU, màn OLED 3K, mỏng nhẹ cho SV lập trình AI.',
    cpu: 'Intel Core Ultra 5 125H',
    ram: '16GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'Intel Arc Graphics',
    pin: '10 giờ (65Wh)',
    weight: '1.65 kg',
    os: 'Windows 11 Home',
    category: ["acer", "budget"],
    ratings: { performance: 4, battery: 3, durability: 3, upgrade: 3, value: 4 }
  },
  {
    id: 94,
    name: 'MSI Creator Z16P',
    brand: 'msi',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~62.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&auto=format&fit=crop',
    desc: 'Creator cao cấp nhất MSI, màn Mini-LED 4K 120Hz, RTX 4080, vỏ nhôm titan.',
    cpu: 'Intel Core i9-13980HX',
    ram: '64GB DDR5',
    ssd: '4TB SSD',
    gpu: 'NVIDIA RTX 4080 12GB',
    pin: '9 giờ (99.9Wh)',
    weight: '2.60 kg',
    os: 'Windows 11 Pro',
    category: ["msi"],
    ratings: { performance: 5, battery: 2, durability: 5, upgrade: 4, value: 1 }
  },
  {
    id: 95,
    name: 'LG Gram Style 14',
    brand: 'lg',
    badge: { text: 'Thời trang', cls: 'badge-new' },
    price: '~32.990.000đ',
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    desc: 'Laptop thời trang nhất với vỏ prismatic đổi màu, màn OLED 2.8K, siêu nhẹ 1.0kg.',
    cpu: 'Intel Core i7-1360P',
    ram: '16GB LPDDR5',
    ssd: '512GB SSD',
    gpu: 'Intel Iris Xe',
    pin: '16 giờ (72Wh)',
    weight: '1.00 kg',
    os: 'Windows 11 Home',
    category: ["lg"],
    ratings: { performance: 3, battery: 5, durability: 4, upgrade: 2, value: 3 }
  },
  {
    id: 96,
    name: 'Samsung Galaxy Book4 Edge',
    brand: 'samsung',
    badge: { text: 'Snapdragon', cls: 'badge-new' },
    price: '~39.990.000đ',
    img: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&auto=format&fit=crop',
    desc: 'Laptop AI đầu tiên dùng Snapdragon X Elite, pin 22 giờ thực, 5G, siêu mỏng 10.6mm.',
    cpu: 'Snapdragon X Elite X1E-80-100',
    ram: '16GB / 32GB LPDDR5X',
    ssd: '512GB – 1TB SSD',
    gpu: 'Adreno GPU',
    pin: '22 giờ (61.8Wh)',
    weight: '1.17 kg',
    os: 'Windows 11 Home',
    category: ["samsung"],
    ratings: { performance: 4, battery: 5, durability: 4, upgrade: 1, value: 3 }
  },
  {
    id: 97,
    name: 'Microsoft Surface Laptop Studio 2',
    brand: 'microsoft',
    badge: { text: 'Creator', cls: 'badge-pro' },
    price: '~54.990.000đ',
    img: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&auto=format&fit=crop',
    desc: 'Laptop-tablet sáng tạo độc đáo, màn cảm ứng kéo xuống, RTX 4060, Surface Slim Pen.',
    cpu: 'Intel Core i7-13700H',
    ram: '16GB / 64GB LPDDR5',
    ssd: '512GB – 2TB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '14 giờ (58Wh)',
    weight: '2.10 kg',
    os: 'Windows 11 Pro',
    category: ["microsoft"],
    ratings: { performance: 5, battery: 4, durability: 4, upgrade: 1, value: 2 }
  },
  {
    id: 98,
    name: 'Razer Blade Stealth 13',
    brand: 'razer',
    badge: { text: 'Ultrabook', cls: 'badge-pro' },
    price: '~38.990.000đ',
    img: 'https://images.unsplash.com/photo-1615750173239-c9c3bb86c37c?w=600&auto=format&fit=crop',
    desc: 'Ultrabook gaming mỏng nhẹ nhất của Razer, 13.4" OLED, GTX 1650Ti, CNC nhôm.',
    cpu: 'Intel Core i7-1165G7',
    ram: '16GB LPDDR4X',
    ssd: '512GB SSD',
    gpu: 'NVIDIA GTX 1650Ti 4GB',
    pin: '12 giờ (53.1Wh)',
    weight: '1.45 kg',
    os: 'Windows 11 Home',
    category: ["razer"],
    ratings: { performance: 3, battery: 4, durability: 5, upgrade: 2, value: 2 }
  },
  {
    id: 99,
    name: 'Lenovo LOQ 15APH8',
    brand: 'lenovo',
    badge: { text: 'Gaming', cls: 'badge-gaming' },
    price: '~18.990.000đ',
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop',
    desc: 'Gaming giá tốt nhất Lenovo 2024, RTX 4060, màn 144Hz, tản nhiệt Legion Cold Front.',
    cpu: 'AMD Ryzen 7 7745HX',
    ram: '16GB DDR5',
    ssd: '512GB SSD',
    gpu: 'NVIDIA RTX 4060 8GB',
    pin: '8 giờ (60Wh)',
    weight: '2.40 kg',
    os: 'Windows 11 Home',
    category: ["lenovo", "gaming", "budget"],
    ratings: { performance: 5, battery: 2, durability: 3, upgrade: 4, value: 5 }
  }
];

/* ── State ── */


/* ── Đọc danh sách đã chọn từ products.html ── */
function getSelectedLaptops() {
  try {
    const raw = JSON.parse(localStorage.getItem('ahp_selected') || '[]');
    const ids = raw.map(i => parseInt(i, 10)).filter(i => !isNaN(i) && i >= 0);
    if (ids.length >= 2) {
      // Uu tien doc tu PRODUCT_DATA neu co (products.html da load truoc)
      if (typeof PRODUCT_DATA !== 'undefined' && PRODUCT_DATA.length > 0) {
        const sel = ids.map(id => PRODUCT_DATA.find(p => p.id === id)).filter(Boolean);
        if (sel.length >= 2) return sel.map(p => ({
          name:  p.name,
          icon:  p.brand === 'apple' ? '🍎' : p.brand === 'dell' ? '🔷' :
                 p.brand === 'asus'  ? '🎮' : p.brand === 'lenovo' ? '🖤' :
                 p.brand === 'hp'    ? '🔵' : p.brand === 'msi' ? '🔴' :
                 p.brand === 'acer'  ? '🟢' : p.brand === 'samsung' ? '💠' :
                 p.brand === 'lg'    ? '⚪' : '💻',
          color: ALL_LAPTOPS[ids.indexOf(p.id) % ALL_LAPTOPS.length]?.color || ALL_LAPTOPS[0].color,
          ratings: p.ratings,
          id: p.id,
        }));
      }
      // Fallback: chi ap dung khi id < 5 (tuong thich cu)
      const sel2 = ids.filter(i => i < ALL_LAPTOPS.length);
      if (sel2.length >= 2) return sel2.map(i => ALL_LAPTOPS[i]);
    }
  } catch(e) {}
  return ALL_LAPTOPS;
}

const _selectedLaptops = getSelectedLaptops();
const LAPTOPS       = _selectedLaptops.map(l => l.name);
const LAPTOP_ICONS  = _selectedLaptops.map(l => l.icon);
const LAPTOP_COLORS = _selectedLaptops.map(l => l.color);

const N_C = CRITERIA.length;
let N_A = LAPTOPS.length;

/* Bảng Random Index (RI) – Saaty */
const RI_TABLE = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

/* ================================================================
   2. DỮ LIỆU MẪU
   Tiêu chí: [Hiệu năng, Giá cả, Độ bền, Pin, Nâng cấp]
   MacBook Air M2 : pin + hiệu năng xuất sắc, giá cao, nâng cấp kém
   Dell XPS 13    : hiệu năng tốt, giá trung bình-cao, pin khá
   ASUS ROG       : hiệu năng gaming cao, giá cao, pin kém
   Lenovo ThinkPad: độ bền + nâng cấp tốt nhất, giá hợp lý
   ================================================================ */
const SAMPLE_CRITERIA = [
  [1,   3,   2,   1/2, 5  ],   // Hiệu năng
  [1/3, 1,   1/2, 1/3, 3  ],   // Giá cả
  [1/2, 2,   1,   1/2, 3  ],   // Độ bền
  [2,   3,   2,   1,   5  ],   // Pin
  [1/5, 1/3, 1/3, 1/5, 1  ],   // Nâng cấp
];

/* Ma trận mẫu đầy đủ 5×5 cho TẤT CẢ laptop (theo thứ tự ALL_LAPTOPS):
   0=MacBook Air M3, 1=MacBook Pro M3, 2=Dell XPS 13, 3=ASUS ROG, 4=Lenovo ThinkPad */
const SAMPLE_ALT_FULL = [
  // Hiệu năng: MacBook Air ≈ MacBook Pro >> ASUS >> Dell >> ThinkPad
  [
    [1,   1,   3,   1/2, 5  ],  // MacBook Air
    [1,   1,   3,   1/2, 5  ],  // MacBook Pro
    [1/3, 1/3, 1,   1/5, 2  ],  // Dell XPS
    [2,   2,   5,   1,   7  ],  // ASUS ROG
    [1/5, 1/5, 1/2, 1/7, 1  ],  // Lenovo ThinkPad
  ],
  // Giá cả: Dell(rẻ) >> ThinkPad >> ASUS ≈ MacBook Air >> MacBook Pro
  [
    [1,   3,   1/2, 1,   1/3],
    [1/3, 1,   1/5, 1/3, 1/5],
    [2,   5,   1,   2,   1/2],
    [1,   3,   1/2, 1,   1/3],
    [3,   5,   2,   3,   1  ],
  ],
  // Độ bền: ThinkPad >> MacBook Pro >> MacBook Air >> Dell >> ASUS
  [
    [1,   1/2, 2,   3,   1/2],
    [2,   1,   3,   4,   1/2],
    [1/2, 1/3, 1,   2,   1/5],
    [1/3, 1/4, 1/2, 1,   1/7],
    [2,   2,   5,   7,   1  ],
  ],
  // Pin: MacBook Pro >> MacBook Air >> ThinkPad >> Dell >> ASUS
  [
    [1,   1/2, 5,   3,   2  ],
    [2,   1,   7,   5,   3  ],
    [1/5, 1/7, 1,   1/2, 1/3],
    [1/3, 1/5, 2,   1,   1/2],
    [1/2, 1/3, 3,   2,   1  ],
  ],
  // Nâng cấp: ThinkPad >> ASUS >> Dell >> MacBook Air ≈ MacBook Pro (Apple khóa)
  [
    [1,   1,   1/3, 1/5, 1/7],
    [1,   1,   1/3, 1/5, 1/7],
    [3,   3,   1,   1/2, 1/4],
    [5,   5,   2,   1,   1/3],
    [7,   7,   4,   3,   1  ],
  ],
];

/* Lấy ma trận mẫu chỉ cho các laptop đã chọn */
/* Tinh gia tri Saaty tu ti le rating giua 2 laptop */
function ratioToSaaty(a, b) {
  if (!a || !b) return 1;
  const r = a / b;
  const s = r >= 1 ? Math.min(9, Math.round(r * 2) / 2) : Math.max(1/9, Math.round((1/r) * 2) / 2);
  return r >= 1 ? s : 1/s;
}

/* Xay dung ma tran mau dua tren ratings thuc te cua laptop duoc chon */
function buildSampleAlt() {
  // CRITERIA order: Hieu nang, Gia ca, Do ben, Pin, Nang cap
  // ratings keys:  performance, value, durability, battery, upgrade
  const ratingKeys = ['performance', 'value', 'durability', 'battery', 'upgrade'];

  try {
    const rawIds = JSON.parse(localStorage.getItem('ahp_selected') || '[]');
    const ids = rawIds.map(i => parseInt(i, 10)).filter(i => !isNaN(i) && i >= 0);

    if (ids.length >= 2 && typeof PRODUCT_DATA !== 'undefined') {
      const products = ids.map(id => PRODUCT_DATA.find(p => p.id === id)).filter(p => p && p.ratings);
      if (products.length >= 2) {
        return ratingKeys.map(key =>
          products.map(pi =>
            products.map(pj => ratioToSaaty(pi.ratings[key], pj.ratings[key]))
          )
        );
      }
    }
  } catch(e) {}

  // Fallback: dung SAMPLE_ALT_FULL voi 5 laptop mac dinh
  return SAMPLE_ALT_FULL.map(fullMatrix =>
    [0,1,2,3,4].map(r => [0,1,2,3,4].map(c => fullMatrix[r][c]))
  );
}
const SAMPLE_ALT = buildSampleAlt();

/* ================================================================
   3. GLOBAL STATE
   ================================================================ */
let gRanked        = [];
let gCWeights      = [];
let gAltWeightsAll = [];
let gScores        = [];
let gCRs           = [];
let gChartBar      = null;
let gChartRadar    = null;

/* ================================================================
   4. DARK / LIGHT THEME TOGGLE
   ================================================================ */
const themeBtn = document.getElementById('themeToggle');

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️ Light' : '🌙 Dark';
}

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ahp_theme', next);
  applyTheme(next);
});

applyTheme(localStorage.getItem('ahp_theme') || 'dark');

/* ================================================================
   5. RENDER TAG LISTS
   ================================================================ */
function renderTagLists() {
  const ctEl = document.getElementById('criteriaTagList');
  if (ctEl) ctEl.innerHTML = CRITERIA.map((c, i) =>
    `<div class="tag">
      <span class="tag-icon">${CRITERIA_ICONS[i]}</span>
      ${c} – <em style="color:var(--muted);font-size:.8rem">${CRITERIA_DESC[i]}</em>
    </div>`
  ).join('');

  const ltEl = document.getElementById('laptopTagList');
  if (ltEl) ltEl.innerHTML = LAPTOPS.map((l, i) =>
    `<div class="tag"><span class="tag-icon">${LAPTOP_ICONS[i]}</span>${l}</div>`
  ).join('');
}

/* ================================================================
   6. XÂY DỰNG MA TRẬN TIÊU CHÍ (5×5)
   ================================================================ */
function buildCriteriaMatrix() {
  const tbl = document.getElementById('criteriaMatrix');
  let html = '<thead><tr><th class="row-header">Tiêu chí</th>';
  CRITERIA.forEach((c, i) => html += `<th>${CRITERIA_ICONS[i]}<br>${c}</th>`);
  html += '</tr></thead><tbody>';

  for (let r = 0; r < N_C; r++) {
    html += `<tr>
      <td class="row-header" style="text-align:left;padding-left:10px;font-weight:700;color:var(--accent2);white-space:nowrap">
        ${CRITERIA_ICONS[r]} ${CRITERIA[r]}
      </td>`;
    for (let c = 0; c < N_C; c++) {
      if (r === c) {
        html += `<td class="diag">1</td>`;
      } else if (r < c) {
        html += `<td><input class="matrix-input" id="cm_${r}_${c}" type="text" placeholder="1"
                  oninput="syncMirror(${r},${c},'cm')" /></td>`;
      } else {
        html += `<td class="mirror" id="cm_${c}_${r}_mirror">–</td>`;
      }
    }
    html += '</tr>';
  }
  tbl.innerHTML = html + '</tbody>';
}

/* ================================================================
   7. XÂY DỰNG TABS + MA TRẬN PHƯƠNG ÁN (4×4)
   ================================================================ */
function buildAltTabs() {
  const tabsEl = document.getElementById('altTabs');
  const panlEl = document.getElementById('altPanels');
  let tH = '', pH = '';

  CRITERIA.forEach((crit, ci) => {
    tH += `<button class="tab-btn ${ci===0?'active':''}" onclick="switchTab(${ci})" id="tab_${ci}">
              ${CRITERIA_ICONS[ci]} ${crit}
            </button>`;
    pH += `<div class="tab-panel ${ci===0?'active':''}" id="panel_${ci}">
              <div class="matrix-wrapper"><table class="matrix" id="altMatrix_${ci}"></table></div>
              <div id="altCR_${ci}" class="hidden"></div>
            </div>`;
  });

  tabsEl.innerHTML = tH;
  panlEl.innerHTML = pH;
  CRITERIA.forEach((_, ci) => buildAltMatrix(ci));
}

function buildAltMatrix(ci) {
  const tbl = document.getElementById(`altMatrix_${ci}`);
  let html = '<thead><tr><th class="row-header">Laptop</th>';
  LAPTOPS.forEach((l, i) => html += `<th>${LAPTOP_ICONS[i]}<br>${l.split(' ')[0]}</th>`);
  html += '</tr></thead><tbody>';

  for (let r = 0; r < N_A; r++) {
    html += `<tr>
      <td class="row-header" style="text-align:left;padding-left:10px;font-weight:700;color:var(--accent3);white-space:nowrap">
        ${LAPTOP_ICONS[r]} ${LAPTOPS[r]}
      </td>`;
    for (let c = 0; c < N_A; c++) {
      if (r === c) {
        html += `<td class="diag">1</td>`;
      } else if (r < c) {
        html += `<td><input class="matrix-input" id="am_${ci}_${r}_${c}" type="text" placeholder="1"
                  oninput="syncMirror(${r},${c},'am',${ci})" /></td>`;
      } else {
        html += `<td class="mirror" id="am_${ci}_${c}_${r}_mirror">–</td>`;
      }
    }
    html += '</tr>';
  }
  tbl.innerHTML = html + '</tbody>';
}

function switchTab(ci) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === ci));
  document.querySelectorAll('.tab-panel').forEach((p, i) => p.classList.toggle('active', i === ci));
}

/* ================================================================
   8. ĐỒNG BỘ Ô NGHỊCH ĐẢO
   ================================================================ */
function syncMirror(r, c, prefix, ci) {
  const inputId = prefix === 'cm' ? `cm_${r}_${c}` : `am_${ci}_${r}_${c}`;
  const mirId   = prefix === 'cm' ? `cm_${c}_${r}_mirror` : `am_${ci}_${c}_${r}_mirror`;
  const val     = parseInput(document.getElementById(inputId)?.value || '');
  const mirEl   = document.getElementById(mirId);
  if (mirEl) mirEl.textContent = (!isNaN(val) && val > 0) ? formatRecip(val) : '–';
}

/* ================================================================
   9. PARSE & FORMAT INPUT
   ================================================================ */
function parseInput(s) {
  if (!s || s.trim() === '') return 1;
  s = s.trim();
  if (s.includes('/')) {
    const p = s.split('/');
    return parseFloat(p[0]) / parseFloat(p[1]);
  }
  return parseFloat(s);
}

function formatRecip(v) {
  if (!v || v === 0) return '–';
  const r = 1 / v;
  if (Math.abs(r - Math.round(r)) < 0.001) return String(Math.round(r));
  for (let d = 2; d <= 9; d++) {
    if (Math.abs(r * d - Math.round(r * d)) < 0.01) return `1/${Math.round(r * d)}`;
  }
  return r.toFixed(3);
}

/* ================================================================
   10. ĐỌC MA TRẬN TỪ DOM
   ================================================================ */
function readCriteriaMatrix() {
  const M = [];
  for (let r = 0; r < N_C; r++) {
    M.push([]);
    for (let c = 0; c < N_C; c++) {
      if (r === c) { M[r].push(1); continue; }
      if (r < c) {
        const v = parseInput(document.getElementById(`cm_${r}_${c}`)?.value || '');
        M[r].push(isNaN(v) || v <= 0 ? 1 : v);
      } else {
        M[r].push(1 / M[c][r]);
      }
    }
  }
  return M;
}

function readAltMatrix(ci) {
  const M = [];
  for (let r = 0; r < N_A; r++) {
    M.push([]);
    for (let c = 0; c < N_A; c++) {
      if (r === c) { M[r].push(1); continue; }
      if (r < c) {
        const v = parseInput(document.getElementById(`am_${ci}_${r}_${c}`)?.value || '');
        M[r].push(isNaN(v) || v <= 0 ? 1 : v);
      } else {
        M[r].push(1 / M[c][r]);
      }
    }
  }
  return M;
}

/* ================================================================
   11. THUẬT TOÁN AHP (Saaty)
   Trả về: { weights, lambdaMax, CI, CR }
   ================================================================ */
function ahpWeights(M) {
  const n = M.length;

  // Bước 1 – Tổng từng cột
  const colSum = Array(n).fill(0);
  for (let c = 0; c < n; c++)
    for (let r = 0; r < n; r++)
      colSum[c] += M[r][c];

  // Bước 2 – Chuẩn hoá: chia mỗi ô cho tổng cột
  const norm = M.map(row => row.map((v, c) => v / colSum[c]));

  // Bước 3 – Vector trọng số: trung bình mỗi hàng
  const w = norm.map(row => row.reduce((a, b) => a + b, 0) / n);

  // Bước 4 – λ_max
  const aw = M.map(row => row.reduce((s, v, c) => s + v * w[c], 0));
  const lambdaMax = aw.reduce((s, v, i) => s + v / w[i], 0) / n;

  // Bước 5 – CI và CR
  const CI = (lambdaMax - n) / (n - 1);
  const RI = RI_TABLE[n] || 1.49;
  const CR = RI === 0 ? 0 : CI / RI;

  return { weights: w, lambdaMax, CI, CR };
}

/* ================================================================
   12. NẠP DỮ LIỆU MẪU
   ================================================================ */
function loadSampleCriteria() {
  for (let r = 0; r < N_C; r++) {
    for (let c = r + 1; c < N_C; c++) {
      const v  = SAMPLE_CRITERIA[r][c];
      const el = document.getElementById(`cm_${r}_${c}`);
      if (el) {
        el.value = v < 1
          ? `1/${Math.round(1/v)}`
          : (Number.isInteger(v) ? String(v) : parseFloat(v.toFixed(4)).toString());
        syncMirror(r, c, 'cm');
      }
    }
  }
}

function loadSampleAlternatives() {
  CRITERIA.forEach((_, ci) => {
    for (let r = 0; r < N_A; r++) {
      for (let c = r + 1; c < N_A; c++) {
        if (!SAMPLE_ALT[ci] || !SAMPLE_ALT[ci][r] || SAMPLE_ALT[ci][r][c] === undefined) continue;
        const v  = SAMPLE_ALT[ci][r][c];
        const el = document.getElementById(`am_${ci}_${r}_${c}`);
        if (el) {
          el.value = v < 1
            ? `1/${Math.round(1/v)}`
            : (Number.isInteger(v) ? String(v) : parseFloat(v.toFixed(4)).toString());
          syncMirror(r, c, 'am', ci);
        }
      }
    }
  });
}

/* ================================================================
   13. TÍNH AHP CHÍNH
   ================================================================ */
function calculate() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('show');

  // Delay nhỏ để loading overlay render trước
  setTimeout(() => {
    try {
      /* A. Tiêu chí */
      const cMatrix  = readCriteriaMatrix();
      const cResult  = ahpWeights(cMatrix);
      const cWeights = cResult.weights;
      showCR('criteriaCR', cResult.CR, N_C);

      /* B. Phương án (từng tiêu chí) */
      const altWeightsAll = [];
      const allCRs = [{ label: 'Tiêu chí (5×5)', cr: cResult.CR, n: N_C }];

      for (let ci = 0; ci < N_C; ci++) {
        const aResult = ahpWeights(readAltMatrix(ci));
        altWeightsAll.push(aResult.weights);
        showCR(`altCR_${ci}`, aResult.CR, N_A);
        allCRs.push({ label: `${CRITERIA_ICONS[ci]} ${CRITERIA[ci]}`, cr: aResult.CR, n: N_A });
      }

      /* C. Điểm tổng hợp cuối cùng */
      const scores = LAPTOPS.map((_, li) =>
        CRITERIA.reduce((s, _, ci) => s + cWeights[ci] * altWeightsAll[ci][li], 0)
      );

      /* D. Tính thêm dữ liệu cho trang Báo cáo */
      // Ma trận chuẩn hóa tiêu chí
      const colSumC = Array(N_C).fill(0);
      for (let c = 0; c < N_C; c++) for (let r = 0; r < N_C; r++) colSumC[c] += cMatrix[r][c];
      const cNorm = cMatrix.map(row => row.map((v, c) => v / colSumC[c]));
      // Lambda data tiêu chí
      const awC = cMatrix.map(row => row.reduce((s, v, c) => s + v * cWeights[c], 0));
      const lambdaC = awC.reduce((s, v, i) => s + v / cWeights[i], 0) / N_C;
      const lambdaData = { lambda: lambdaC, ci: cResult.CI, cr: cResult.CR, n: N_C };
      // Các ma trận phương án gốc
      const altMatrices = CRITERIA.map((_, ci) => readAltMatrix(ci));

      /* E. Lưu vào localStorage */
      try {
        const ranked = scores
          .map((s, i) => ({ name: LAPTOPS[i], icon: LAPTOP_ICONS[i], score: s, idx: i }))
          .sort((a, b) => b.score - a.score);
        const fullData = {
          ranked, cWeights, altWeightsAll, scores, crs: allCRs,
          cMatrix, cNorm, lambdaData, altMatrices,
        };
        localStorage.setItem('ahp_results',       JSON.stringify(fullData));
        localStorage.setItem('ahp_cMatrix',       JSON.stringify(cMatrix));
        localStorage.setItem('ahp_cWeights',      JSON.stringify(cWeights));
        localStorage.setItem('ahp_altWeightsAll', JSON.stringify(altWeightsAll));
        localStorage.setItem('ahp_scores',        JSON.stringify(scores));
      } catch(e) { /* bỏ qua nếu bị chặn */ }

      /* F. Cập nhật global state */
      gCWeights      = cWeights;
      gAltWeightsAll = altWeightsAll;
      gScores        = scores;
      gCRs           = allCRs;

      /* G. Hiển thị kết quả */
      displayResults(cWeights, altWeightsAll, scores, allCRs);

      /* H. Cập nhật step indicators */
      ['st2', 'st3', 'st4'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('done');
        el.querySelector('.step-num').textContent = '✓';
      });

      /* I. Cuộn tới kết quả */
      setTimeout(() => {
        const rs = document.getElementById('resultsSection');
        if (rs) rs.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.location.href = 'result.html';
      }, 150);

    } catch(err) {
      console.error(err);
      alert('Lỗi tính toán: ' + err.message);
    }

    overlay.classList.remove('show');
  }, 600);
}

/* ================================================================
   14. HIỂN THỊ KHỐ CR
   ================================================================ */
function showCR(elId, cr, n) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.classList.remove('hidden', 'cr-ok', 'cr-bad');
  const ok = cr <= 0.1;
  el.classList.add(ok ? 'cr-ok' : 'cr-bad');
  el.innerHTML = ok
    ? `✅ Kiểm tra nhất quán: CR = <strong class="cr-num">${cr.toFixed(4)}</strong> ≤ 0.1 &nbsp;→&nbsp; Ma trận nhất quán ✔`
    : `⚠️ Cần điều chỉnh: CR = <strong class="cr-num">${cr.toFixed(4)}</strong> &gt; 0.1 &nbsp;→&nbsp; Đánh giá không nhất quán, hãy xem xét lại!`;
}

/* ================================================================
   15. HIỂN THỊ KẾT QUẢ
   ================================================================ */
function displayResults(cWeights, altWeightsAll, scores, allCRs) {
  const _resSec = document.getElementById('resultsSection');
  if (!_resSec) {
    // Đang ở ahp.html — đã lưu localStorage, chuyển sang result.html
    window.location.href = 'result.html';
    return;
  }
  _resSec.classList.remove('hidden');

  /* Xếp hạng */
  const ranked = scores
    .map((s, i) => ({ name: LAPTOPS[i], icon: LAPTOP_ICONS[i], score: s, idx: i }))
    .sort((a, b) => b.score - a.score);
  gRanked = ranked;

  /* --- Winner --- */
  document.getElementById('winnerName').textContent  = `${ranked[0].icon} ${ranked[0].name}`;
  document.getElementById('winnerScore').textContent = `Điểm tổng hợp: ${(ranked[0].score * 100).toFixed(3)}%`;
  document.getElementById('winnerBadges').innerHTML = [
    `🥇 Xếp hạng #1`,
    `📊 ${(ranked[0].score * 100).toFixed(2)}% điểm`,
    allCRs.every(x => x.cr <= 0.1) ? '✅ Tất cả CR < 0.1' : '⚠️ Có CR > 0.1',
  ].map(b => `<span class="winner-badge">${b}</span>`).join('');

  spawnConfetti();

  /* --- Trọng số tiêu chí --- */
  const maxW = Math.max(...cWeights);
  document.getElementById('weightGrid').innerHTML = CRITERIA.map((c, i) => `
    <div class="weight-card">
      <div class="weight-icon">${CRITERIA_ICONS[i]}</div>
      <div class="weight-label">${c}</div>
      <div class="weight-value">${(cWeights[i] * 100).toFixed(1)}%</div>
      <div class="weight-bar-wrap">
        <div class="weight-bar" style="width:0%" data-target="${(cWeights[i]/maxW*100).toFixed(1)}"></div>
      </div>
    </div>`).join('');

  setTimeout(() => {
    document.querySelectorAll('.weight-bar').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 100);

  /* --- Bảng xếp hạng --- */
  document.getElementById('resultHead').innerHTML = `<tr>
    <th>Hạng</th><th>Laptop</th>
    ${CRITERIA.map((c, i) => `<th>${CRITERIA_ICONS[i]} ${c}</th>`).join('')}
    <th>Điểm tổng</th>
  </tr>`;

  const maxScore = Math.max(...scores);
  document.getElementById('resultBody').innerHTML = ranked.map((r, ri) => {
    const cells = altWeightsAll.map(aw =>
      `<td style="font-family:'Space Mono',monospace;font-size:.78rem;color:var(--text2)">${(aw[r.idx]*100).toFixed(1)}%</td>`
    ).join('');
    return `<tr>
      <td><span class="rank-badge rank-${ri+1}">${ri+1}</span></td>
      <td style="font-weight:700;font-family:'Syne',sans-serif">${r.icon} ${r.name}</td>
      ${cells}
      <td>
        <div class="score-bar-wrap">
          <div class="score-bar" style="width:0%;min-width:4px"
               data-target="${(r.score/maxScore*100).toFixed(1)}"></div>
          <span class="score-num">${(r.score*100).toFixed(2)}%</span>
        </div>
      </td>
    </tr>`;
  }).join('');

  setTimeout(() => {
    document.querySelectorAll('.score-bar').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 100);

  /* --- CR Summary --- */
  document.getElementById('crSummaryGrid').innerHTML = allCRs.map(item => `
    <div class="cr-mini">
      <div class="crlabel">${item.label}</div>
      <div class="crval ${item.cr <= 0.1 ? 'ok' : 'bad'}">${item.cr.toFixed(4)}</div>
      <div style="font-size:.68rem;margin-top:4px;color:var(--muted)">
        ${item.cr <= 0.1 ? '✅ Nhất quán' : '⚠️ Không nhất quán'}
      </div>
    </div>`).join('');

  /* --- Charts --- */
  buildBarChart(ranked);
  buildRadarChart(altWeightsAll);
}

/* ================================================================
   16. CONFETTI ANIMATION
   ================================================================ */
function spawnConfetti() {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  const colors = ['#4f8ef7', '#a78bfa', '#00d4c8', '#f472b6', '#fbbf24', '#34d399'];

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:     ${Math.random() * 100}%;
      top:      ${Math.random() * 30 - 10}%;
      background:       ${colors[Math.floor(Math.random() * colors.length)]};
      animation-delay:  ${Math.random() * 1.2}s;
      animation-duration:${1.8 + Math.random()}s;
      width:    ${6 + Math.random() * 8}px;
      height:   ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
    `;
    container.appendChild(piece);
  }
}

/* ================================================================
   17. BIỂU ĐỒ CỘT (Chart.js)
   ================================================================ */
function buildBarChart(ranked) {
  if (gChartBar) { gChartBar.destroy(); gChartBar = null; }
  const ctx = document.getElementById('barChart').getContext('2d');

  gChartBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ranked.map(r => `${r.icon} ${r.name}`),
      datasets: [{
        label: 'Điểm tổng hợp (%)',
        data: ranked.map(r => +(r.score * 100).toFixed(3)),
        backgroundColor: ranked.map(r => LAPTOP_COLORS[r.idx].bg),
        borderColor:     ranked.map(r => LAPTOP_COLORS[r.idx].border),
        borderWidth: 2, borderRadius: 10, borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: { label: ctx => ` Điểm: ${ctx.parsed.y.toFixed(3)}%` },
          backgroundColor: '#111927', borderColor: '#1e2d45', borderWidth: 1,
          titleColor: '#e8edf5', bodyColor: '#00d4c8', padding: 10,
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(128,128,128,.07)' },
          ticks: { color: '#a8b8cc', font: { family: "'Syne'", size: 11, weight: '600' } },
        },
        y: {
          grid: { color: 'rgba(128,128,128,.07)' },
          ticks: { color: '#a8b8cc', font: { family: "'Space Mono'", size: 10 }, callback: v => v.toFixed(1) + '%' },
          beginAtZero: true,
        },
      },
      animation: { duration: 1000, easing: 'easeOutQuart' },
    },
  });
}

/* ================================================================
   18. BIỂU ĐỒ RADAR (Chart.js)
   ================================================================ */
function buildRadarChart(altWeightsAll) {
  if (gChartRadar) { gChartRadar.destroy(); gChartRadar = null; }
  const ctx = document.getElementById('radarChart').getContext('2d');

  // Chuyển bg opacity thành .18 để fill nhẹ
  const bgOf = (col) => col.bg
    .replace(',.85)', ',.18)')
    .replace(',.78)', ',.18)')
    .replace(',.72)', ',.18)')
    .replace(',.65)', ',.18)');

  gChartRadar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: CRITERIA.map((c, i) => `${CRITERIA_ICONS[i]} ${c}`),
      datasets: LAPTOPS.map((laptop, li) => ({
        label:              `${LAPTOP_ICONS[li]} ${laptop}`,
        data:               altWeightsAll.map(aw => +(aw[li] * 100).toFixed(2)),
        fill:               true,
        backgroundColor:    bgOf(LAPTOP_COLORS[li]),
        borderColor:        LAPTOP_COLORS[li].border,
        borderWidth:        2,
        pointBackgroundColor: LAPTOP_COLORS[li].border,
        pointRadius:        4,
        pointHoverRadius:   6,
      })),
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#a8b8cc', font: { family: "'DM Sans'", size: 10 }, boxWidth: 12, padding: 14 },
        },
        tooltip: {
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.r.toFixed(2)}%` },
          backgroundColor: '#111927', borderColor: '#1e2d45', borderWidth: 1,
          titleColor: '#e8edf5', bodyColor: '#00d4c8', padding: 10,
        },
      },
      scales: {
        r: {
          grid:        { color: 'rgba(128,128,128,.13)' },
          angleLines:  { color: 'rgba(128,128,128,.13)' },
          pointLabels: { color: '#a8b8cc', font: { family: "'Syne'", size: 10, weight: '600' } },
          ticks: {
            color: '#586a80', backdropColor: 'transparent',
            font: { family: "'Space Mono'", size: 9 },
            callback: v => v.toFixed(1) + '%',
          },
          beginAtZero: true,
        },
      },
      animation: { duration: 1100, easing: 'easeOutQuart' },
    },
  });
}

/* ================================================================
   19. XUẤT PDF (jsPDF + AutoTable)
   ================================================================ */
function exportPDF() {
  if (!gRanked.length) { alert('⚠️ Hãy bấm "Tính AHP" trước!'); return; }

  const { jsPDF } = window.jspdf;
  const doc   = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  let y = 16;

  /* Tiêu đề xanh */
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageW, 28, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.setTextColor(255,255,255);
  doc.text('BAO CAO PHAN TICH AHP', pageW/2, 12, { align: 'center' });
  doc.setFontSize(9); doc.setFont('helvetica', 'normal');
  doc.text('Lua chon laptop tot nhat cho sinh vien IT', pageW/2, 20, { align: 'center' });
  y = 36;

  /* Winner */
  doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.setTextColor(5, 150, 105);
  doc.text('LAPTOP DUOC DE XUAT: ' + gRanked[0].name, 14, y); y += 7;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(50,50,50);
  doc.text('Diem tong hop: ' + (gRanked[0].score * 100).toFixed(3) + '%', 14, y); y += 12;

  /* Trọng số tiêu chí */
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30,80,200);
  doc.text('1. TRONG SO TIEU CHI:', 14, y); y += 4;
  doc.autoTable({
    startY: y,
    head: [['STT', 'Tieu chi', 'Trong so', 'Trong so (%)']],
    body: CRITERIA.map((c, i) => [i+1, c, gCWeights[i].toFixed(6), (gCWeights[i]*100).toFixed(3)+'%']),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [37,99,235], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [240,247,255] },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  /* Bảng xếp hạng */
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30,80,200);
  doc.text('2. BANG XEP HANG CUOI CUNG:', 14, y); y += 4;
  doc.autoTable({
    startY: y,
    head: [['Hang', 'Laptop', ...CRITERIA, 'Diem tong (%)']],
    body: gRanked.map((r, ri) => [
      ri+1, r.name,
      ...gAltWeightsAll.map(aw => (aw[r.idx]*100).toFixed(2)+'%'),
      (r.score*100).toFixed(3)+'%',
    ]),
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    headStyles: { fillColor: [30,80,180], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245,248,255] },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  /* CR */
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30,80,200);
  doc.text('3. KIEM DINH NHAT QUAN (CR):', 14, y); y += 4;
  doc.autoTable({
    startY: y,
    head: [['Ma tran', 'CR', 'Danh gia']],
    body: gCRs.map(item => [item.label, item.cr.toFixed(4), item.cr <= 0.1 ? 'Nhat quan (CR < 0.1)' : 'Khong nhat quan!']),
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [16,185,129], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [240,255,248] },
    margin: { left: 14, right: 14 },
  });
  y = doc.lastAutoTable.finalY + 10;

  /* Giải thích toán học */
  if (y > 220) { doc.addPage(); y = 20; }
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30,80,200);
  doc.text('4. GIAI THICH TOAN HOC AHP:', 14, y); y += 7;
  doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(60,60,60);
  const mathLines = [
    'Buoc 1: Xay dung ma tran so sanh cap A(nxn), a_ij = muc do quan trong i/j (thang 1-9)',
    'Buoc 2: Chuan hoa: a_ij_norm = a_ij / Sum_k(a_kj)',
    'Buoc 3: Trong so: w_i = (1/n) * Sum_j(a_ij_norm)',
    'Buoc 4: Lambda_max = (1/n) * Sum_i [(A*w)_i / w_i]',
    'Buoc 5: CI = (lambda_max - n) / (n - 1)',
    'Buoc 6: CR = CI / RI  (CR < 0.1 → Nhat quan, ket qua tin cay)',
    'Buoc 7: Score_i = Sum_k [w_k * p_ki]  (diem tong hop cuoi cung)',
    '',
    'Bang RI (Saaty): n=1→0, n=2→0, n=3→0.58, n=4→0.90, n=5→1.12, n=6→1.24',
  ];
  mathLines.forEach(line => { doc.text(line, 14, y); y += 6; });

  /* Footer mỗi trang */
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic'); doc.setFontSize(7.5); doc.setTextColor(150);
    doc.text(
      `AHP Pro | Phuong phap Saaty | Trang ${i}/${pageCount}`,
      pageW/2, doc.internal.pageSize.getHeight() - 8,
      { align: 'center' }
    );
  }

  doc.save('BaoCao_AHP_Laptop.pdf');
}

/* ================================================================
   20. XUẤT EXCEL (SheetJS / XLSX)
   ================================================================ */
function exportExcel() {
  if (!gRanked.length) { alert('⚠️ Hãy bấm "Tính AHP" trước!'); return; }

  const wb = XLSX.utils.book_new();

  /* Sheet 1 – Xếp hạng */
  const s1 = [
    ['Hang', 'Laptop', ...CRITERIA, 'Diem tong hop (%)'],
    ...gRanked.map((r, ri) => [
      ri+1, r.name,
      ...gAltWeightsAll.map(aw => +((aw[r.idx]*100).toFixed(3))),
      +((r.score*100).toFixed(3)),
    ]),
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(s1);
  ws1['!cols'] = [{ wch: 7 }, { wch: 22 }, ...CRITERIA.map(() => ({ wch: 14 })), { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, ws1, 'Xep hang');

  /* Sheet 2 – Trọng số tiêu chí */
  const s2 = [
    ['Tieu chi', 'Trong so (decimal)', 'Trong so (%)'],
    ...CRITERIA.map((c, i) => [c, +gCWeights[i].toFixed(6), +((gCWeights[i]*100).toFixed(3))]),
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(s2);
  ws2['!cols'] = [{ wch: 18 }, { wch: 20 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, ws2, 'Trong so tieu chi');

  /* Sheet 3 – Trọng số phương án */
  const s3 = [
    ['Tieu chi', ...LAPTOPS],
    ...CRITERIA.map((c, ci) => [c, ...gAltWeightsAll[ci].map(w => +((w*100).toFixed(3)))]),
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(s3);
  ws3['!cols'] = [{ wch: 18 }, ...LAPTOPS.map(() => ({ wch: 20 }))];
  XLSX.utils.book_append_sheet(wb, ws3, 'Trong so phuong an');

  /* Sheet 4 – Kiểm định CR */
  const s4 = [
    ['Ma tran', 'CR', 'Danh gia'],
    ...gCRs.map(item => [item.label, +item.cr.toFixed(4), item.cr <= 0.1 ? 'Nhat quan' : 'Khong nhat quan']),
  ];
  const ws4 = XLSX.utils.aoa_to_sheet(s4);
  ws4['!cols'] = [{ wch: 22 }, { wch: 10 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, ws4, 'Kiem dinh CR');

  /* Sheet 5 – Ma trận tiêu chí gốc */
  try {
    const saved = JSON.parse(localStorage.getItem('ahp_cMatrix') || 'null');
    if (saved) {
      const s5 = [['', ...CRITERIA], ...saved.map((row, i) => [CRITERIA[i], ...row.map(v => +v.toFixed(4))])];
      const ws5 = XLSX.utils.aoa_to_sheet(s5);
      XLSX.utils.book_append_sheet(wb, ws5, 'Ma tran tieu chi');
    }
  } catch(e) {}

  XLSX.writeFile(wb, 'AHP_KetQua_Laptop.xlsx');
}

/* ================================================================
   21. RESET TẤT CẢ
   ================================================================ */
function resetAll() {
  if (!confirm('Reset tất cả dữ liệu đã nhập?')) return;

  // Xoá inputs tiêu chí
  document.querySelectorAll('[id^="cm_"]').forEach(el => {
    if (el.tagName === 'INPUT') el.value = '';
    else el.textContent = '–';
  });
  // Xoá inputs phương án
  document.querySelectorAll('[id^="am_"]').forEach(el => {
    if (el.tagName === 'INPUT') el.value = '';
    else el.textContent = '–';
  });

  // Ẩn CR boxes
  document.getElementById('criteriaCR').classList.add('hidden');
  CRITERIA.forEach((_, ci) => {
    const e = document.getElementById(`altCR_${ci}`);
    if (e) e.classList.add('hidden');
  });

  // Ẩn section kết quả
  const resSec = document.getElementById('resultsSection');
  if (resSec) resSec.classList.add('hidden');

  // Reset step indicators
  ['st2', 'st3', 'st4'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('done');
    el.querySelector('.step-num').textContent = id.replace('st', '');
  });

  // Destroy charts
  if (gChartBar)   { gChartBar.destroy();   gChartBar   = null; }
  if (gChartRadar) { gChartRadar.destroy(); gChartRadar = null; }

  // Clear global state
  gRanked = []; gCWeights = []; gAltWeightsAll = []; gScores = []; gCRs = [];

  // Xoá localStorage
  ['ahp_cMatrix','ahp_cWeights','ahp_altWeightsAll','ahp_scores'].forEach(k => localStorage.removeItem(k));
}

/* ================================================================
   22. HÀM TRỰC TIẾP CHO TRANG BÁO CÁO (không cần DOM ma trận)
   ================================================================ */

function computeAHP_direct(cMat, altMats) {
  const cResult  = ahpWeights(cMat);
  const cWeights = cResult.weights;
  const allCRs   = [{ label: 'Tieu chi (5x5)', cr: cResult.CR, n: N_C }];
  const altWeightsAll = [];

  for (let ci = 0; ci < N_C; ci++) {
    const aRes = ahpWeights(altMats[ci]);
    altWeightsAll.push(aRes.weights);
    allCRs.push({ label: CRITERIA_ICONS[ci] + ' ' + CRITERIA[ci], cr: aRes.CR, n: N_A });
  }

  const scores = LAPTOPS.map((_, li) =>
    CRITERIA.reduce((s, _, ci) => s + cWeights[ci] * altWeightsAll[ci][li], 0)
  );
  const ranked = scores
    .map((s, i) => ({ name: LAPTOPS[i], icon: LAPTOP_ICONS[i], score: s, idx: i }))
    .sort((a, b) => b.score - a.score);

  const colSumC = Array(N_C).fill(0);
  for (let c = 0; c < N_C; c++) for (let r = 0; r < N_C; r++) colSumC[c] += cMat[r][c];
  const cNorm = cMat.map(row => row.map((v, c) => v / colSumC[c]));
  const awC = cMat.map(row => row.reduce((s, v, c) => s + v * cWeights[c], 0));
  const lambdaC = awC.reduce((s, v, i) => s + v / cWeights[i], 0) / N_C;
  const lambdaData = { lambda: lambdaC, ci: cResult.CI, cr: cResult.CR, n: N_C };

  return { ranked, cWeights, altWeightsAll, scores, crs: allCRs,
           cMatrix: cMat, cNorm, lambdaData, altMatrices: altMats };
}

function loadSampleReport() {
  const result = computeAHP_direct(SAMPLE_CRITERIA, SAMPLE_ALT);
  try { localStorage.setItem('ahp_results', JSON.stringify(result)); } catch(e) {}
  return result;
}

/* alias dùng cho report.html */
function initSampleReport() {
  const result = loadSampleReport();
  document.getElementById('noReportState') && document.getElementById('noReportState').classList.add('hidden');
  document.getElementById('reportContent') && document.getElementById('reportContent').classList.remove('hidden');
  if (typeof renderReport === 'function') renderReport(result);
}

/* alias dùng cho sensitivity.html */
function loadSampleSensData() {
  return computeAHP_direct(SAMPLE_CRITERIA, SAMPLE_ALT);
}

/* hàm clearCriteria / clearAlternatives / restoreFromStorage nếu chưa có */
function clearCriteria() {
  for (let r=0;r<N_C;r++) for (let c=r+1;c<N_C;c++) {
    const el=document.getElementById(`cm_${r}_${c}`);
    if(el) el.value='';
    const mir=document.getElementById(`cm_${c}_${r}_mirror`);
    if(mir) mir.textContent='–';
  }
  const cr=document.getElementById('criteriaCR');
  if(cr) cr.classList.add('hidden');
}

function clearAlternatives() {
  for (let ci=0;ci<N_C;ci++)
    for (let r=0;r<N_A;r++) for (let c=r+1;c<N_A;c++) {
      const el=document.getElementById(`am_${ci}_${r}_${c}`);
      if(el) el.value='';
      const mir=document.getElementById(`am_${ci}_${c}_${r}_mirror`);
      if(mir) mir.textContent='–';
    }
  for (let ci=0;ci<N_C;ci++) {
    const cr=document.getElementById(`altCR_${ci}`);
    if(cr) cr.classList.add('hidden');
  }
}

function restoreFromStorage() {
  try {
    const saved=JSON.parse(localStorage.getItem('ahp_cMatrix')||'null');
    if(!saved) return;
    for(let r=0;r<N_C;r++) for(let c=r+1;c<N_C;c++) {
      const v=saved[r][c];
      const el=document.getElementById(`cm_${r}_${c}`);
      if(el && v && Math.abs(v-1)>0.001) {
        el.value = v<1 ? `1/${Math.round(1/v)}` : parseFloat(v.toFixed(4)).toString();
        syncMirror(r,c,'cm');
      }
    }
  } catch(e){}
}

/* ================================================================
   23. KHỞI ĐỘNG (DOMContentLoaded)
   ================================================================ */
window.addEventListener('DOMContentLoaded', () => {
  /* === Re-init LAPTOPS & SAMPLE_ALT dua tren PRODUCT_DATA da load === */
  const _fresh = getSelectedLaptops();
  LAPTOPS.splice(0, LAPTOPS.length, ..._fresh.map(l => l.name));
  LAPTOP_ICONS.splice(0, LAPTOP_ICONS.length, ..._fresh.map(l => l.icon));
  LAPTOP_COLORS.splice(0, LAPTOP_COLORS.length, ..._fresh.map(l => l.color));
  const _freshSample = buildSampleAlt();
  SAMPLE_ALT.splice(0, SAMPLE_ALT.length, ..._freshSample);
  /* N_A co the thay doi neu chon khac 5, cap nhat */ 
  N_A = LAPTOPS.length;

  renderTagLists();
  if (document.getElementById('criteriaMatrix')) buildCriteriaMatrix();
  if (document.getElementById('altTabs'))        buildAltTabs();

  /* Khôi phục ma trận tiêu chí từ localStorage (nếu có) */
  try {
    const saved = JSON.parse(localStorage.getItem('ahp_cMatrix') || 'null');
    if (saved) {
      for (let r = 0; r < N_C; r++) {
        for (let c = r + 1; c < N_C; c++) {
          const v  = saved[r][c];
          const el = document.getElementById(`cm_${r}_${c}`);
          if (el && v && Math.abs(v - 1) > 0.001) {
            el.value = v < 1
              ? `1/${Math.round(1/v)}`
              : parseFloat(v.toFixed(4)).toString();
            syncMirror(r, c, 'cm');
          }
        }
      }
    }
  } catch(e) { /* bỏ qua */ }
});