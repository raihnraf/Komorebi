# ⚡ Quick Start - 5 Steps to Run Locally

## 🚀 Fastest Way to Start (5 Minutes)

```bash
# 1. Clone the repository
git clone https://github.com/raihnraf/Komorebi.git
cd Komorebi

# 2. Install dependencies
npm install

# 3. Configure environment (optional)
cp .env.example .env

# 4. Start development server
npm run dev

# 5. Open in browser
# Navigate to: http://localhost:5173
```

**That's it!** 🎉 The app should now be running locally.

---

## 📖 Need More Details?

See [QUICK_START.md](./QUICK_START.md) for:
- Detailed troubleshooting
- All available scripts
- Development tips
- Project structure

---

## ✅ Verification Checklist

After starting, check:
- [ ] Home page loads at http://localhost:5173
- [ ] No errors in browser console (F12)
- [ ] Navigation works (Learn, Kanji, Lists, Review, Profile)
- [ ] DevTools show no TypeScript errors

---

## 🛠️ Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

---

## 🐛 Quick Fixes

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Cache issues?**
```bash
rm -rf node_modules/.vite
npm run dev
```

---

**Need help?** Check [QUICK_START.md](./QUICK_START.md) for complete guide.
