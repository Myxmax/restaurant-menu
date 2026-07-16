# 📱 راهنمای نهایی - آپلود به GitHub و راه‌اندازی QR Codes

## ✅ چی انجام شد

1. ✨ **vite.config.ts اصلاح شد** - base path برای GitHub Pages تنظیم شد
2. 🚀 **GitHub Actions workflow اضافه شد** - deployment خودکار
3. 📦 **.gitignore درست است** - node_modules و dist نادیده گرفته می‌شوند

---

## 🎯 مراحل نهایی (Step by Step)

### **مرحله 1️⃣: آماده کردن محلی (Local Setup)**

```bash
# اگر git initialize نشده است
git init

# اگر remote GitHub تنظیم نشده است
git remote add origin https://github.com/myxmax/restaurant-menu.git

# یا اگر قبلاً تنظیم شده (بررسی کنید)
git remote -v
```

### **مرحله 2️⃣: اضافه کردن و Commit کردن تمام فایل‌ها**

```bash
# اضافه کردن تمام فایل‌های جدید و تغییر شده
git add .

# Commit کردن با یک پیام معنی‌دار
git commit -m "feat: Setup QR-based restaurant menu system with GitHub Pages deployment"

# یا به فارسی
git commit -m "feat: راه‌اندازی سیستم منو رستوران بر اساس QR codes"
```

### **مرحله 3️⃣: Push کردن به GitHub**

```bash
# push کردن تمام commits به GitHub
git push -u origin main

# اگر branch شما master است
git push -u origin master
```

### **مرحله 4️⃣: تنظیم GitHub Pages در تنظیمات Repository**

1. برید به `https://github.com/myxmax/restaurant-menu`
2. کلیک کنید بر **Settings** (تنظیمات)
3. در سایدبار بروید به **Pages**
4. در **Source** انتخاب کنید: **Deploy from a branch**
5. **Branch** را انتخاب کنید: **gh-pages** و **(root)**
6. **Save** کنید

### **مرحله 5️⃣: منتظر Deployment بمانید**

- GitHub Actions خودکار شروع می‌شود (یک زرد نقطه می‌بینید)
- **2-3 دقیقه** صبر کنید تا deployment کامل شود
- پس از تکمیل، یک ✅ سبز می‌بینید
- سایت شما در دسترس خواهد بود:
  ```
  https://myxmax.github.io/restaurant-menu/
  ```

---

## 🔑 فایل‌های مهم که اضافه/تغییر شدند

### ✏️ **vite.config.ts**
```typescript
base: '/restaurant-menu/',  // ← لازم برای GitHub Pages
```

### 📄 **.github/workflows/deploy.yml** (جدید)
- خودکار npm build را اجرا می‌کند
- خودکار dist را به gh-pages branch منتقل می‌کند
- هر بار که push کنید، دوباره deploy می‌شود

---

## 🎮 استفاده از QR Codes

### **برای مدیر رستوران:**
1. وارد dashboard شوید (`/admin`)
2. بروید به **"کدهای QR و میزها"**
3. برای هر میز **"Create Table QR"** بکنید
4. QR code را **دانلود** کنید یا **چاپ** کنید

### **برای مشتری:**
1. **QR code را اسکن** کند با موبایل
2. خودکار به منو رستوران منتقل می‌شود
   ```
   https://myxmax.github.io/restaurant-menu/?table=TABLE_ID
   ```
3. می‌تواند **قیمت محصولات** و **توضیحات** را ببیند
4. می‌تواند **سفارش** دهد

---

## 🛠️ دستورات مفید

```bash
# ساخت محلی (برای تست)
npm run build

# تست محلی
npm run dev

# بررسی وضعیت git
git status

# مشاهده آخرین commits
git log --oneline -5

# اگر اشتباهی کردید، آخرین commit را برگردانید
git reset --soft HEAD~1
git reset HEAD .
```

---

## 🐛 حل مشکلات

### مشکل 1: صفحه هنوز سفید است
```
✓ vite.config.ts میتواند base path داشته باشد
✓ GitHub Actions موفق است (✅ نشان دهنده)
✓ 5 دقیقه صبر کنید و cache را پاک کنید (Ctrl+Shift+Del)
```

### مشکل 2: GitHub Actions fail شد
```
1. برید به Actions tab
2. کلیک کنید بر workflow که fail شد
3. مشاهده کنید error message
4. معمولاً مربوط به npm install است
5. دوباره push کنید: git push
```

### مشکل 3: QR codes کار نمی‌کند
```
✓ بررسی کنید که API running است
✓ اگر محلی است: npm run dev
✓ اگر live است: درخواست API به backend نیاز دارد
```

---

## 📊 ساختار پروژه نهایی

```
restaurant-menu/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions
├── src/
│   ├── components/
│   │   ├── CustomerMenu.tsx     ← صفحه مشتری (QR scanner)
│   │   ├── RestaurantAdmin.tsx  ← ایجاد QR codes
│   │   └── ...
│   └── ...
├── public/
│   └── pwa-menu/               ← Static PWA menu
├── vite.config.ts              ← base: '/restaurant-menu/'
├── package.json
└── index.html
```

---

## ✨ نتیجه نهایی

✅ مشتری QR را اسکن می‌کند  
✅ منو رستوران بلافاصله باز می‌شود  
✅ قیمت محصولات نمایش داده می‌شود  
✅ سفارش می‌تواند داده شود  
✅ مدیر می‌تواند سفارش‌ها را ببیند  

---

## 🆘 کمک نیاز دارید؟

اگر مشکلی پیش آمد، کدام قسمت مشکل دارد؟
1. GitHub push
2. Deployment
3. QR code generation
4. API connection

اینجا هستم! 🚀
