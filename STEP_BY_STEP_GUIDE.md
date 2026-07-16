# 🚀 دستورالعمل مرحله‌به‌مرحله - GitHub Upload و Deployment

## 📋 فهرست
1. [تدارکات](#تدارکات)
2. [مرحله 1: آماده‌سازی پروژه](#مرحله-1-آماده‌سازی-پروژه)
3. [مرحله 2: Git Setup](#مرحله-2-git-setup)
4. [مرحله 3: GitHub Upload](#مرحله-3-github-upload)
5. [مرحله 4: GitHub Pages Configuration](#مرحله-4-github-pages-configuration)
6. [مرحله 5: Deployment](#مرحله-5-deployment)
7. [مرحله 6: تست و تایید](#مرحله-6-تست-و-تایید)

---

## 🎯 تدارکات

### چی داشته باشید:
- ✅ **GitHub Account** (myxmax) - قبلاً دارید
- ✅ **Git** نصب شده (Windows/Mac/Linux)
- ✅ **Node.js** 16+ نصب شده
- ✅ **فایل‌های زیپ شده** - من برایتان آماده کردم

### دانلود Git (اگر ندارید):
```
Windows: https://git-scm.com/download/win
Mac: https://git-scm.com/download/mac
Linux: sudo apt install git
```

---

## 📂 مرحله 1: آماده‌سازی پروژه

### 1.1️⃣ خارج کردن فایل‌های زیپ

```bash
# پوشه‌ای برای پروژه بسازید
mkdir ~/my-restaurant-menu
cd ~/my-restaurant-menu

# فایل‌های زیپ شده را اینجا قرار دهید و باز کنید
# یا استفاده کنید:
unzip quickmenu-saas-platform.zip
```

### 1.2️⃣ بروز کردن فایل‌های مهم

فایل‌هایی که من برایتان آماده کردم:
- ✅ **vite.config.ts** - base path اصلاح شده
- ✅ **package.json** - QR code library اضافه شده
- ✅ **.gitignore** - درست تنظیم شده
- ✅ **.github/workflows/deploy.yml** - GitHub Actions
- ✅ **src/components/QRCodeGenerator.tsx** - QR code component جدید

```bash
# این فایل‌ها را جایگزین کنید:
cp ~/Downloads/vite.config.ts ./vite.config.ts
cp ~/Downloads/package.json ./package.json
cp ~/Downloads/.gitignore ./.gitignore

# پوشه .github را بسازید و فایل‌ها را اضافه کنید:
mkdir -p .github/workflows
cp ~/Downloads/deploy.yml .github/workflows/deploy.yml
cp ~/Downloads/QRCodeGenerator.tsx ./src/components/QRCodeGenerator.tsx
```

### 1.3️⃣ نصب Dependencies

```bash
cd ~/my-restaurant-menu

# npm install اجرا کنید
npm install

# انتظار بگیرید تا تمام packages نصب شوند (2-3 دقیقه)
```

### 1.4️⃣ تست محلی

```bash
# development server را شروع کنید
npm run dev

# باید این پیام ببینید:
# VITE v6.2.3 ready in 456 ms
# ➜  Local:   http://localhost:5173/

# موبایل یا مرورگر را باز کنید و رفتن به:
# http://localhost:5173
```

✅ **اگر صفحه بارگیری شد، عالی است!**

---

## 🔧 مرحله 2: Git Setup

### 2.1️⃣ Git Config (برای اولین بار)

```bash
# نام و ایمیل را تنظیم کنید
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# بررسی کنید:
git config --global --list
```

### 2.2️⃣ Git Initialize

```bash
cd ~/my-restaurant-menu

# اگر قبلاً git نیست، شروع کنید:
git init

# اگر قبلاً git است، صاف کنید:
git status
```

### 2.3️⃣ اضافه کردن تمام فایل‌ها

```bash
# نمایش فایل‌های قابل اضافه کردن
git status

# اضافه کردن همه
git add .

# بررسی کنید:
git status
# باید "Changes to be committed" ببینید
```

---

## 📡 مرحله 3: GitHub Upload

### 3.1️⃣ ایجاد Commit

```bash
# تمام تغییرات را commit کنید
git commit -m "feat: Initial commit - QR-based restaurant menu system

- Added QRCodeGenerator component
- Configured GitHub Pages deployment
- Added GitHub Actions workflow
- Fixed Vite base path configuration
- Added qrcode.react library"

# یا فارسی:
git commit -m "feat: راه‌اندازی اولیه - سیستم منو رستوران QR-based"
```

### 3.2️⃣ تنظیم Remote Repository

```bash
# بررسی کنید آیا remote وجود دارد
git remote -v

# اگر نه، اضافه کنید:
git remote add origin https://github.com/myxmax/restaurant-menu.git

# یا اگر قبلاً موجود است، به‌روز کنید:
git remote set-url origin https://github.com/myxmax/restaurant-menu.git
```

### 3.3️⃣ Branch را Rename کنید (اگر لازم)

```bash
# شاخه فعلی را ببینید
git branch

# اگر master است، به main تغییر دهید:
git branch -M main
```

### 3.4️⃣ Push کردن به GitHub

```bash
# اولین push
git push -u origin main

# یا اگر نیاز است رمز وارد کنید:
# در Windows/Mac:
#   - رمز GitHub Personal Access Token را وارد کنید
#   - یا SSH key استفاده کنید
```

✅ **اگر موفق شد، فایل‌ها اکنون در GitHub هستند!**

---

## ⚙️ مرحله 4: GitHub Pages Configuration

### 4.1️⃣ Repository Settings

```
1. GitHub.com → myxmax/restaurant-menu
2. کلیک بر "Settings" (تنظیمات)
3. سایدبار میں "Pages" را کلیک کنید
```

### 4.2️⃣ Source Configuration

```
1. "Source" → "Deploy from a branch" انتخاب کنید
2. Branch: "gh-pages" انتخاب کنید
3. Folder: "(root)" انتخاب کنید
4. "Save" کلیک کنید
```

### 4.3️⃣ Custom Domain (اختیاری)

اگر domain دارید:
```
1. Custom domain: your-domain.com وارد کنید
2. "Save" کنید
3. DNS تنظیم کنید
```

---

## 🚀 مرحله 5: Deployment

### 5.1️⃣ GitHub Actions اجرا می‌شود خودکار

```
1. GitHub.com → myxmax/restaurant-menu
2. "Actions" tab را کلیک کنید
3. یک "workflow" باید در حال اجرا باشد

وضعیت‌ها:
🟡 در حال اجرا (Pending)
🟢 موفق (Success) ✅
🔴 خطا (Failed)
```

### 5.2️⃣ منتظر Deployment بمانید

```
زمان‌بندی:
- npm install: 1-2 دقیقه
- npm run build: 30-60 ثانیه
- Deploy: 10-30 ثانیه
- کل: 2-3 دقیقه
```

### 5.3️⃣ اگر Deployment fail شد

```bash
# 1. Logs را بررسی کنید
# GitHub → Actions → Failed workflow → Logs

# معمول‌ترین خطا‌ها:
# - npm install failed → اینترنت فعال کنید
# - Build failed → TypeScript errors را بررسی کنید
# - Deploy failed → branch gh-pages تنظیم کنید

# 2. Local fix کنید
npm run build
npm run lint

# 3. دوباره push کنید
git add .
git commit -m "fix: resolve build issues"
git push
```

---

## ✅ مرحله 6: تست و تایید

### 6.1️⃣ نتایج نهایی

```
URL: https://myxmax.github.io/restaurant-menu/
```

### 6.2️⃣ بررسی کنید

```
✅ صفحه بارگیری شود (نه سفید)
✅ فارسی نمایش داده شود
✅ دکمه‌ها کار کنند
✅ منو نمایش داده شود
✅ QR codes تولید شوند
```

### 6.3️⃣ اگر هنوز سفید است

```bash
# 1. Cache را پاک کنید
# Ctrl+Shift+Delete (Windows)
# Cmd+Shift+Delete (Mac)

# 2. یا Private/Incognito مرورگر استفاده کنید

# 3. یا URL را بررسی کنید
https://myxmax.github.io/restaurant-menu/
# نه
https://github.com/myxmax/restaurant-menu/

# 4. vite.config.ts را بررسی کنید
grep "base:" vite.config.ts
# باید ببینید: base: '/restaurant-menu/',
```

---

## 🎯 ساختار نهایی (توقع)

```
myxmax/restaurant-menu/
├── .github/workflows/
│   └── deploy.yml
├── src/
│   ├── components/
│   │   ├── CustomerMenu.tsx
│   │   ├── RestaurantAdmin.tsx
│   │   ├── KitchenDashboard.tsx
│   │   ├── QRCodeGenerator.tsx       ← جدید!
│   │   └── ...
│   └── ...
├── vite.config.ts               ← base: '/restaurant-menu/'
├── package.json                 ← qrcode.react اضافه شده
├── .gitignore
├── README.md
└── ... سایر فایل‌ها
```

---

## 📱 نحوه استفاده QR Codes

### مدیر:
```
1. Dashboard → QR Codes & Tables
2. Create Table QR
3. دانلود یا چاپ
4. میز → مشتری اسکن می‌کند
```

### مشتری:
```
1. QR code را با موبایل اسکن کنید
2. منو خودکار باز می‌شود
3. قیمت‌ها نمایش داده می‌شود
4. سفارش می‌دهید
```

---

## 🆘 راهنمای مشکل‌گشایی سریع

| مشکل | حل |
|------|-----|
| صفحه سفید است | Cache پاک کنید، vite.config.ts check کنید |
| GitHub Actions fail | Logs را بررسی کنید، دوباره push کنید |
| QR codes کار نمی‌کند | QRCodeGenerator import شده؟ |
| فارسی نمایش نمی‌شود | dir="rtl" تنظیم شده است |
| API متصل نیست | Backend running است؟ npm run dev |

---

## ✨ پایان

تبریک! 🎉 پروژه شما اکنون:
- ✅ روی GitHub هست
- ✅ خودکار deploy می‌شود
- ✅ QR codes دارد
- ✅ منو نمایش می‌دهد
- ✅ Live است!

### برای تغییرات آینده:

```bash
# کد را تغییر دهید
# مثلاً RestaurantAdmin.tsx را ویرایش کنید

# مراحل:
git add .
git commit -m "feat: new feature description"
git push

# خودکار deploy می‌شود! 🚀
```

---

**هرسوال؟ اینجا هستم! 💪**
