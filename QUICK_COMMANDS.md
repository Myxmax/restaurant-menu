# ⚡ دستورات سریع - کپی و Paste کنید

## 🎯 خلاصه بسیار سریع

**مشکل**: صفحه سفید
**حل**: یک خط کد + GitHub Setup

---

## 1️⃣ آماده‌سازی (5 دقیقه)

```bash
# برو به پوشه پروژه
cd ~/my-restaurant-menu

# نصب dependencies
npm install

# تست محلی
npm run dev

# در مرورگر بوید: http://localhost:5173
# اگر کار کرد، بسته Ctrl+C
```

---

## 2️⃣ Git Setup (2 دقیقه)

```bash
# اگر git init نشده
git init

# تنظیم کاربر (اولین بار)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# اضافه کردن remote
git remote add origin https://github.com/myxmax/restaurant-menu.git

# یا اگر قبلاً موجود است:
git remote set-url origin https://github.com/myxmax/restaurant-menu.git
```

---

## 3️⃣ جایگزینی فایل‌ها (3 دقیقه)

```bash
# فرض می‌کنیم دانلودها در ~/Downloads هستند

# 1. فایل‌های اصلی
cp ~/Downloads/vite.config.ts ./vite.config.ts
cp ~/Downloads/package.json ./package.json
cp ~/Downloads/.gitignore ./.gitignore

# 2. پوشه جدید
mkdir -p .github/workflows
mkdir -p src/components

# 3. فایل‌های جدید
cp ~/Downloads/deploy.yml .github/workflows/deploy.yml
cp ~/Downloads/QRCodeGenerator.tsx ./src/components/QRCodeGenerator.tsx

# 4. دوباره install (برای qrcode library)
npm install
```

---

## 4️⃣ Git Commit و Push (2 دقیقه)

```bash
# چک کردن وضعیت
git status

# اضافه کردن تمام فایل‌ها
git add .

# Commit کردن
git commit -m "feat: Add QR code system and GitHub Pages deployment

- Added QRCodeGenerator component
- Fixed Vite base path for GitHub Pages
- Configured GitHub Actions workflow
- Added qrcode.react library"

# Branch را اگر لازم بود تغییر دهید
git branch -M main

# Push کردن
git push -u origin main

# یا اگر error شد:
git push --force origin main
```

---

## 5️⃣ GitHub Pages تنظیم (۲ دقیقه)

```
🌐 Browser میں این کار کنید:

1. GitHub.com → myxmax/restaurant-menu
2. Settings (تنظیمات) کلیک کنید
3. Pages (سایدبار) کلیک کنید
4. Source: "Deploy from a branch" انتخاب کنید
5. Branch: "gh-pages" انتخاب کنید
6. Folder: "(root)" انتخاب کنید
7. Save کلیک کنید
```

---

## 6️⃣ منتظر Deploy بمانید (2-3 دقیقه)

```bash
# GitHub Actions خودکار اجرا می‌شود
# صبر کنید تا ✅ سبز شود

# آدرس سایت:
https://myxmax.github.io/restaurant-menu/

# برای بررسی:
# GitHub → Actions → workflow → Logs
```

---

## ✅ نتیجه نهایی

```
URL: https://myxmax.github.io/restaurant-menu/

چی باید کار کند:
✅ صفحه بارگیری شود
✅ فارسی نمایش داده شود
✅ دکمه‌ها کار کنند
✅ منو نمایش داده شود
✅ QR codes تولید شوند
```

---

## 🆘 اگر مشکل داشتید

### صفحه هنوز سفید است

```bash
# 1. محلی build کنید
npm run build

# 2. errors را بررسی کنید
npm run lint

# 3. اگر TypeScript error داشت:
npm install

# 4. دوباره push کنید
git add .
git commit -m "fix: resolve build issues"
git push
```

### GitHub Actions fail شد

```bash
# Logs را بررسی کنید:
# GitHub → Actions → Failed workflow → Logs

# معمول‌ترین حل:
1. فایل‌ها دوباره copy کنید
2. npm install دوباره اجرا کنید
3. git push دوباره کنید
```

### QR codes کار نمی‌کند

```bash
# بررسی کنید:
npm list qrcode.react

# اگر موجود نیست:
npm install qrcode.react qrcode
npm run build
git add . && git commit -m "fix: add qrcode" && git push
```

---

## 🎯 دستورات مفید بعدی

```bash
# هر بار یک تغییر می‌دهید:
git add .
git commit -m "description of change"
git push

# خودکار deploy می‌شود!

# مشاهده history:
git log --oneline -10

# اگر اشتباه کردید:
git revert HEAD~1
git push

# یا:
git reset --soft HEAD~1
git reset HEAD .
```

---

## 📊 Timeline کل

```
Total time: ~20 دقیقه

5 min   ← npm install + تست محلی
2 min   ← Git setup
3 min   ← Copy فایل‌ها
2 min   ← Git commit و push
2 min   ← GitHub Pages تنظیم
3-5 min ← منتظر deployment
3 min   ← تست و تایید

= ~20 دقیقه

و DONE! 🎉
```

---

## 💡 نکات زبردست

1. **اولین push**: 
   ```bash
   git push -u origin main  # -u را فراموش نکنید
   ```

2. **Branch اسم مهم است**:
   ```bash
   git branch  # بررسی کنید main یا master است
   git branch -M main  # تغییر دهید اگر لازم است
   ```

3. **Remote URL**:
   ```bash
   git remote -v  # بررسی کنید صحیح است
   ```

4. **GitHub Pages branch**:
   ```bash
   GitHub تخودکار gh-pages branch می‌سازد
   نیاز نیست که شما بسازید
   ```

5. **Cache مشکل است**:
   ```
   Ctrl+Shift+Delete (Windows)
   یا Private/Incognito mode
   ```

---

## 🎊 تبریک!

بسیار ساده است:
1. Copy فایل‌ها
2. npm install
3. git push
4. GitHub Pages تنظیم
5. Done! 🚀

---

**همین! شما آماده هستید!** 💪
