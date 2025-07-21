# BAND - Đối Tác Âm Nhạc Tin Cậy

Một trang web profile band âm nhạc chuyên nghiệp với thiết kế hiện đại và layout dọc.

## 🎵 Tính Năng

- **Design Hiện Đại**: Thiết kế tối giản với gradient màu tím và layout dọc
- **Responsive**: Tương thích với mọi thiết bị (desktop, tablet, mobile)
- **Animations**: Hiệu ứng mượt mà với GSAP và ScrollTrigger
- **Smooth Scrolling**: Cuộn mượt và parallax effects
- **Contact Integration**: Liên kết trực tiếp với phone, email, social media

## 📁 Cấu Trúc Dự Án

```
Web Band/
├── index.html          # Trang chính
├── css/
│   └── style.css      # Stylesheet chính
├── js/
│   └── script.js      # JavaScript functionality
├── assets/
│   ├── member1.jpg    # Ảnh Keyboardist
│   ├── member2.jpg    # Ảnh Vocalist
│   ├── member3.jpg    # Ảnh Guitarist
│   ├── member4.jpg    # Ảnh Drummer
│   └── placeholder.txt # Hướng dẫn ảnh
└── README.md          # Hướng dẫn này
```

## 🚀 Cách Sử Dụng

### 1. Chuẩn Bị
- Đảm bảo có kết nối internet (để load fonts và icons)
- Thêm ảnh các thành viên vào thư mục `assets/` với tên `member1.jpg`, `member2.jpg`, v.v.

### 2. Chạy Trang Web
- Mở file `index.html` trong trình duyệt web
- Hoặc sử dụng local server để chạy

### 3. Tùy Chỉnh Nội Dung

#### Thay Đổi Thông Tin Band
```html
<!-- Logo và tên band -->
<div class="logo">
    <div class="logo-icon">
        <i class="fas fa-music"></i>
    </div>
    <span class="logo-text">BAND</span>
</div>
```

#### Thay Đổi Nội Dung Giới Thiệu
```html
<!-- Hero section -->
<section class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title">
            BAND – ĐỐI TÁC ÂM NHẠC TIN CẬY TẠI HÀ NỘI & CÁC TỈNH PHÍA BẮC 🎷
        </h1>
        <p class="hero-subtitle">
            Nội dung giới thiệu của bạn...
        </p>
    </div>
</section>
```

#### Thay Đổi Danh Sách Dịch Vụ
```html
<!-- Services section -->
<div class="services-list">
    <div class="service-item">
        <i class="fas fa-check"></i>
        <span>Dịch vụ của bạn...</span>
    </div>
    <!-- Thêm dịch vụ khác... -->
</div>
```

#### Thay Đổi Thông Tin Thành Viên
```html
<!-- Team section -->
<div class="team-member">
    <div class="member-photo">
        <img src="assets/member1.jpg" alt="Thành viên 1" class="member-img">
    </div>
    <div class="member-info">
        <h3 class="member-name">Tên thành viên</h3>
        <p class="member-role">Vai trò</p>
    </div>
</div>
```

#### Thay Đổi Thông Tin Liên Hệ
```html
<!-- Contact section -->
<div class="contact-info">
    <div class="contact-item">
        <i class="fas fa-phone"></i>
        <span>Hotline: Số điện thoại của bạn</span>
    </div>
    <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <span>Email: email@band.com</span>
    </div>
    <div class="contact-item">
        <i class="fab fa-facebook"></i>
        <span>Facebook: Tên Facebook</span>
    </div>
</div>
```

#### Thay Đổi Màu Sắc
```css
/* Trong file css/style.css */
:root {
    --primary-color: #8b5cf6;
    --secondary-color: #a855f7;
    --accent-color: #c084fc;
}
```

## 🎨 Tính Năng Chi Tiết

### Layout Dọc
- **Hero Section**: Giới thiệu chính với gradient background
- **Services Section**: Danh sách dịch vụ với icons
- **Music Style Section**: Phong cách âm nhạc
- **Instruments Section**: Nhạc cụ sử dụng
- **Commitment Section**: Cam kết của band
- **Contact Section**: Thông tin liên hệ với clickable links
- **Team Section**: Thành viên band với ảnh và thông tin

### Animations
- **Scroll Animations**: Các section xuất hiện khi scroll
- **Stagger Effects**: Hiệu ứng xuất hiện lần lượt
- **Parallax**: Hiệu ứng parallax cho hero section
- **Hover Effects**: Hiệu ứng hover cho các elements

### Responsive Design
- **Desktop**: Layout đầy đủ với tất cả sections
- **Tablet**: Layout tối ưu cho tablet
- **Mobile**: Layout dọc, dễ đọc trên mobile

## 🔧 Tùy Chỉnh Nâng Cao

### Thêm Thành Viên Mới
1. Thêm ảnh vào thư mục `assets/`
2. Thêm HTML cho thành viên mới:
```html
<div class="team-member">
    <div class="member-photo">
        <img src="assets/member5.jpg" alt="Tên vai trò" class="member-img">
    </div>
    <div class="member-info">
        <h3 class="member-name">Tên thành viên</h3>
        <p class="member-role">Vai trò</p>
        <p class="member-description">
            Mô tả ngắn về thành viên và chuyên môn của họ.
        </p>
    </div>
</div>
```

### Thêm Dịch Vụ Mới
1. Mở file `index.html`
2. Tìm section `services-list`
3. Thêm service item mới:
```html
<div class="service-item">
    <i class="fas fa-check"></i>
    <span>Dịch vụ mới của bạn</span>
</div>
```

### Tùy Chỉnh Animations
1. Mở file `js/script.js`
2. Tìm function `setupAnimations()`
3. Thay đổi các thông số animation theo ý muốn

## 📱 Tương Thích Trình Duyệt

- ✅ Chrome (khuyến nghị)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (không khuyến nghị)

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Flexbox, Grid, Animations, Backdrop-filter
- **JavaScript ES6+**: Classes, Arrow Functions
- **GSAP**: Advanced animations và ScrollTrigger
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## 📞 Hỗ Trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi:
1. Kiểm tra console trong Developer Tools
2. Đảm bảo tất cả file được load đúng
3. Kiểm tra kết nối internet cho fonts và icons
4. Đảm bảo ảnh thành viên có đúng định dạng và kích thước

## 🎯 Tính Năng Tương Lai

- [ ] Thêm gallery ảnh biểu diễn
- [ ] Tích hợp booking form
- [ ] Thêm video demo
- [ ] Dark/Light mode toggle
- [ ] Thêm blog section
- [ ] Tích hợp Google Maps cho địa chỉ

---

**BAND** - Đối tác âm nhạc tin cậy tại Hà Nội & các tỉnh phía Bắc 🎷 