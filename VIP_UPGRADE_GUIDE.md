# 🎯 Hướng Dẫn Nâng Cấp VIP

## Cách Upgrade Tài Khoản Lên VIP

### Bước 1: Kiểm tra thông tin user

```bash
cd backend
npm run check-user
```

Lệnh này sẽ hiển thị tất cả users trong database.

### Bước 2: Upgrade lên VIP

```bash
npm run upgrade-vip <email-của-bạn>
```

Ví dụ:
```bash
npm run upgrade-vip tunkhang06@gmail.com
```

### Kết quả sau khi upgrade:
- ✅ Tier: VIP
- ✅ Hết hạn: 1 năm sau (để test)
- ✅ Usage stats được reset về 0
- ✅ Không giới hạn sử dụng tất cả tính năng

---

## 🎨 Giao Diện VIP vs FREE

### **Sidebar Differences**

#### FREE User:
- Background: Gradient xám (gray-900)
- Border: Gray-700
- Logo: Gradient đỏ-cam
- Menu active: Đỏ
- User avatar: Đỏ
- Text: Gray-400
- Button: "Nâng cấp VIP" màu vàng

#### VIP User:
- Background: Gradient xám-vàng (yellow-900/10)
- Border: Vàng (yellow-500/30) với shadow
- Logo: Gradient vàng-amber với icon Crown
- Subtitle: "Huyền thuật AI • VIP Premium"
- Menu active: Vàng-amber với border vàng
- Menu inactive: Yellow-200 với hover vàng
- Active indicator: Vàng (thay vì đỏ)
- User avatar: Gradient vàng-amber
- Mini crown badge: Animation scale trên avatar
- VIP badge: Crown icon 
- Text: Yellow-100 / Yellow-300
- Status card: Hiển thị VIP Premium, ngày hết hạn, "Không giới hạn sử dụng"
- Footer: Background vàng nhạt (yellow-600/5)

### **Key Visual Differences**

1. **Theme Color:**
   - FREE: Red/Orange
   - VIP: Yellow/Gold

2. **Animations:**
   - VIP sidebar có subtle yellow glow
   - Crown icon animation (scale pulse)
   - Mini crown badge trên avatar animation

3. **Information Display:**
   - FREE: Button "Nâng cấp VIP"
   - VIP: Status card với expiry date và unlimited info

4. **Text Styling:**
   - VIP text có màu vàng/amber thay vì gray/white
   - Font weight và opacity khác biệt

---

## 📊 Feature Limits

### FREE Tier:
- 3 lượt Tarot/ngày
- 10 tin nhắn Chat AI/ngày
- 1 phân tích Chiêm tinh/ngày
- 1 phân tích Tử vi/ngày
- 1 phân tích Thần số học/ngày
- Không có biểu đồ 3D
- Có quảng cáo

### VIP Tier:
- ♾️ Tarot không giới hạn
- ♾️ Chat AI không giới hạn
- ♾️ Chiêm tinh không giới hạn
- ♾️ Tử vi không giới hạn
- ♾️ Thần số học không giới hạn
- Biểu đồ 3D đầy đủ
- Không có quảng cáo
- Hỗ trợ ưu tiên
- Ưu tiên tính năng mới

---

## 🔧 Scripts Có Sẵn

### 1. Check User Info
```bash
cd backend
npm run check-user              # Xem tất cả users
npm run check-user <email>      # Xem user cụ thể
```

### 2. Upgrade to VIP
```bash
npm run upgrade-vip <email>
```

### 3. Prisma Studio (GUI)
```bash
npm run prisma:studio
```
Mở giao diện web để xem/edit database trực tiếp.

---

## 💡 Tips

1. **Reset Usage:** Script upgrade-vip tự động reset usage stats về 0
2. **VIP Duration:** Mặc định set 1 năm để test, có thể thay đổi trong script
3. **Check Status:** Refresh trang web sau khi upgrade để thấy thay đổi UI
4. **Revert:** Có thể dùng Prisma Studio để đổi lại thành FREE nếu cần

---

## 🚨 Troubleshooting

### Sidebar không đổi màu sau upgrade:
1. Đảm bảo đã refresh trang web (Ctrl+F5)
2. Kiểm tra localStorage có chứa user data mới không
3. Logout và login lại

### User data không load:
1. Check backend console xem có lỗi không
2. Verify token còn valid
3. Check database xem vipTier và vipExpiresAt đã được set

### Lỗi 403 Forbidden:
1. Usage stats có thể chưa được reset
2. Check database table UsageStats
3. Run upgrade script lại để reset

---

## 📝 Notes

- Không có emoji trong UI theo yêu cầu
- Tất cả icons sử dụng Lucide React
- Animations sử dụng Framer Motion
- Theme colors sử dụng Tailwind CSS
- VIP status được check từ user.vipTier === 'VIP'

