# 📊 AHP Pro – Hệ Thống Hỗ Trợ Ra Quyết Định Chọn Laptop

> Ứng dụng web tĩnh (pure HTML/CSS/JS) triển khai phương pháp **Analytic Hierarchy Process (AHP – Saaty)** để hỗ trợ sinh viên IT lựa chọn laptop phù hợp nhất.

---

## 🎯 Mục tiêu

Giúp sinh viên IT đưa ra quyết định mua laptop một cách **có hệ thống, khách quan** bằng cách định lượng hóa sự so sánh giữa các tiêu chí và phương án thông qua ma trận AHP.

---

## 📁 Cấu trúc dự án

```
ahp-pro/
├── index.html          # Trang chủ – giới thiệu phương pháp AHP
├── products.html       # Danh sách 100 laptop (có filter, rating, chọn so sánh)
├── ahp.html            # Nhập ma trận so sánh tiêu chí & phương án
├── result.html         # Kết quả xếp hạng, biểu đồ, điểm tổng hợp
├── sensitivity.html    # Phân tích độ nhạy – thay đổi trọng số tiêu chí
├── report.html         # Báo cáo chi tiết, xuất PDF
├── script.js           # Toàn bộ logic AHP, dữ liệu sản phẩm, tính CR/CI
└── style.css           # Thiết kế UI – hỗ trợ Dark/Light theme
```

---

## 🔧 Công nghệ sử dụng

| Thành phần | Công nghệ |
|---|---|
| Ngôn ngữ | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| Font chữ | Syne, Space Mono, DM Sans (Google Fonts) |
| Lưu trữ | `localStorage` (không cần backend) |
| Triển khai | Chạy trực tiếp trên trình duyệt, không cần server |

---

## ⚙️ Phương pháp AHP (Analytic Hierarchy Process)

### 5 Tiêu chí đánh giá

| # | Tiêu chí | Mô tả |
|---|---|---|
| 1 | ⚡ Hiệu năng | CPU, RAM, tốc độ xử lý |
| 2 | 💰 Giá cả | Chi phí mua / giá thành |
| 3 | 🛡️ Độ bền | Độ bền vật liệu, chắc chắn |
| 4 | 🔋 Pin | Thời lượng pin, hiệu quả |
| 5 | 🔧 Nâng cấp | Khả năng nâng cấp RAM/SSD |

### 5 Laptop mặc định để phân tích

- 🍎 MacBook Air M3
- 🔵 MacBook Pro M3
- 🔷 Dell XPS 13
- 🎮 ASUS ROG Zephyrus
- 🖤 Lenovo ThinkPad X1

### Quy trình tính toán

```
1. Xây dựng ma trận so sánh cặp A(n×n) theo thang Saaty 1–9
   → a_ij : mức độ quan trọng của i so với j
   → a_ji = 1 / a_ij  |  a_ii = 1 (đường chéo)

2. Chuẩn hóa & tính vector trọng số
   → w_i = (1/n) · Σ_j (a_ij / Σ_k a_kj)

3. Kiểm tra tính nhất quán
   → λmax = (1/n) · Σ (Aw)_i / w_i
   → CI   = (λmax − n) / (n − 1)
   → CR   = CI / RI(n)
   → CR < 0.10 ✔ Nhất quán | CR ≥ 0.10 ✗ Cần xem lại

4. Tính điểm tổng hợp từng phương án
   → Score(A_k) = Σ_i [ w_i · local_weight(A_k, criterion_i) ]
```

---

## 🚀 Hướng dẫn sử dụng

1. **Mở `index.html`** trong trình duyệt (Chrome/Firefox/Edge).
2. **Trang Laptop (`products.html`)**: xem 100 laptop, lọc theo hãng/loại, chọn đúng **5 laptop** để so sánh.
3. **Trang AHP (`ahp.html`)**: nhập ma trận so sánh tiêu chí và phương án. Hệ thống tính CR tự động.
   - Nhấn **📥 Dữ liệu mẫu** để điền nhanh giá trị minh họa.
4. **Trang Kết quả (`result.html`)**: xem xếp hạng, biểu đồ radar, điểm tổng hợp.
5. **Trang Độ nhạy (`sensitivity.html`)**: kéo thanh trượt thay đổi trọng số và xem kết quả thay đổi theo thời gian thực.
6. **Trang Báo cáo (`report.html`)**: xem và xuất báo cáo đầy đủ.

> ⚡ **Lưu ý:** Dữ liệu lưu trong `localStorage` của trình duyệt – không cần tài khoản, không cần internet (trừ Google Fonts).

---

## 🎨 Tính năng nổi bật

- 🌗 **Dark / Light mode** – chuyển đổi ngay trên thanh nav
- 📱 **Responsive design** – hoạt động tốt trên mobile, tablet, desktop
- ✅ **Auto-fill dữ liệu mẫu** – từ trang Laptop chuyển sang AHP, ma trận tự điền
- 📊 **Biểu đồ trực quan** – radar chart, bar chart cho kết quả và độ nhạy
- 📥 **Xuất báo cáo PDF** – từ trang `report.html`
- 🔄 **Persist state** – dữ liệu lưu localStorage, không mất khi reload
- ⚠️ **Kiểm tra CR** – cảnh báo ngay nếu ma trận không nhất quán

---

## 📌 Ghi chú kỹ thuật

- Tất cả logic AHP nằm trong `script.js` – có thể tái sử dụng độc lập.
- `PRODUCT_DATA` (100 laptop) được khai báo trong `script.js` để dùng chung giữa các trang.
- `ALL_LAPTOPS` (5 laptop mặc định cho AHP) cũng trong `script.js`.
- Không có dependency ngoài – không cần `npm install` hay build step.

---

## 👨‍💻 Thông tin dự án

| | |
|---|---|
| Tên | AHP Pro |
| Loại | Đồ án – Hệ hỗ trợ ra quyết định |
| Phương pháp | Analytic Hierarchy Process (Saaty, 1980) |
| Ngôn ngữ giao diện | Tiếng Việt |
| Năm | 2025 |

---

*© 2025 AHP Pro · Đồ án Hệ hỗ trợ ra quyết định*