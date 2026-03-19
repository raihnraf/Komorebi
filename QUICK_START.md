# 🚀 Quick Start Guide - Run Sakura & Matcha Locally

Complete step-by-step guide to run the Sakura & Matcha Japanese learning application on your local machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (comes with Node.js)
  - Check: `npm --version`

- **Git** (for cloning the repository)
  - Check: `git --version`
  - Download: https://git-scm.com/

- A code editor (VS Code recommended)
  - Download: https://code.visualstudio.com/

---

## 📥 Step 1: Clone the Repository

### Option A: Using Git (Recommended)

```bash
# Navigate to your projects directory
cd /path/to/your/projects

# Clone the repository
git clone https://github.com/raihnraf/Komorebi.git

# Navigate into the project directory
cd Komorebi
```

### Option B: Download ZIP

1. Visit: https://github.com/raihnraf/Komorebi
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file
5. Open the extracted folder in your terminal

---

## 🔧 Step 2: Install Dependencies

Install all required packages and dependencies:

```bash
# Install dependencies
npm install

# Or use yarn if you prefer
# yarn install
```

**Expected output:**
```
added XXX packages, and audited XXX packages in Xs
found 0 vulnerabilities
```

**⏱️ Time:** ~2-3 minutes (first time)

---

## ⚙️ Step 3: Configure Environment Variables

### Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

### Edit `.env` File (Optional)

Open `.env` in your code editor:

```bash
# Using VS Code
code .env

# Or any text editor
nano .env
```

**Default configuration:**
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# Feature Flags
VITE_ENABLE_AUTH=true
VITE_ENABLE_REVIEW=true

# Environment (development | production)
VITE_APP_ENV=development

# Error Tracking (Optional)
# VITE_SENTRY_DSN=your-sentry-dsn-here
# VITE_ENABLE_ERROR_TRACKING=true
```

**📝 Note:** You can leave the defaults for now. The app will work without a backend API.

---

## 🚀 Step 4: Start Development Server

### Start the Application

```bash
# Run the development server
npm run dev
```

**Expected output:**
```
  VITE v6.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.X:5173/
  ➜  press h + enter to show help
```

### Open in Browser

1. Open your web browser
2. Navigate to: http://localhost:5173
3. The app should load with the home page

---

## ✅ Step 5: Verify the Application

### Check the Following

✅ **Home Page Loads**
   - You should see the dashboard with bento grid layout
   - Navigation bar should be visible

✅ **No Console Errors**
   - Open DevTools (F12 or right-click → Inspect)
   - Check Console tab for errors
   - Should see no red errors

✅ **Navigation Works**
   - Click through: Learn, Kanji, Lists, Review, Profile
   - All pages should load without errors

✅ **Error Boundary Working**
   - The ErrorBoundary is integrated in App.tsx
   - Will catch any React errors gracefully

---

## 🛠️ Available Scripts

Here are all the available npm scripts:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🐛 Troubleshooting

### Issue 1: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5173`

**Solution:**
```bash
# Kill the process using port 5173
# On Linux/Mac:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3000
```

### Issue 2: Module Not Found

**Error:** `Cannot find module 'xxx'`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: TypeScript Errors

**Error:** TypeScript errors in editor

**Solution:**
```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P
# Type: "TypeScript: Restart TS Server"
```

### Issue 4: Permission Denied

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# On Linux/Mac, use sudo
sudo npm install

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Issue 5: Cache Issues

**Error:** Old code still running after changes

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

---

## 📱 Development Tips

### Hot Module Replacement (HMR)

The app supports hot reload. Changes you make will automatically appear in the browser without refreshing.

### React Query DevTools

Press `Alt + Q` (or `Option + Q` on Mac) to toggle React Query DevTools in development mode.

### View Error Logs

Open browser console and run:
```javascript
// View all error logs
localStorage.getItem('error_logs');

// Clear error logs
localStorage.removeItem('error_logs');
```

### Test Error Boundary

To test the error boundary, you can temporarily add this to any component:

```typescript
throw new Error("Test error boundary");
```

---

## 🏗️ Project Structure

```
Komorebi/
├── src/
│   ├── components/       # React components
│   ├── config/          # Configuration files
│   ├── features/        # Feature modules
│   ├── pages/           # Page components
│   ├── services/        # Service layer & API
│   ├── store/           # Zustand stores
│   └── types/           # TypeScript types
├── public/              # Static assets
├── .env.example         # Environment template
├── ARCHITECTURE.md      # System documentation
├── README.md            # Project overview
└── package.json         # Dependencies
```

---

## 🎯 Next Steps

### Learn the Architecture

1. Read `ARCHITECTURE.md` - Complete system documentation
2. Read `IMPLEMENTATION_SUMMARY.md` - Implementation details
3. Check `README.md` - Project overview

### Start Development

1. Explore `src/features/` for existing features
2. Check `src/services/` for API integration examples
3. Use `src/config/` for configuration

### Common Tasks

**Add a new page:**
```bash
# Create page in src/pages/
# Add route in App.tsx
# Add navigation link in Layout component
```

**Add a new service:**
```bash
# Create service in src/services/api/
# Create React Query hooks in src/services/api/queries.ts
# Use in your components
```

**Add new configuration:**
```bash
# Add to src/config/constants.ts
# Add to .env.example if needed
# Use throughout the app
```

---

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [TanStack Query](https://tanstack.com/query/latest)

### Project-Specific
- `ARCHITECTURE.md` - Service layer & error handling
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `README.md` - Project overview

---

## 🆘 Getting Help

### Check Documentation First
1. `README.md` - Project overview
2. `ARCHITECTURE.md` - System architecture
3. `IMPLEMENTATION_SUMMARY.md` - Implementation details

### Common Issues
- See "Troubleshooting" section above
- Check browser console for errors
- Check terminal for build errors

### Still Stuck?
1. Check GitHub Issues: https://github.com/raihnraf/Komorebi/issues
2. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, browser)

---

## ✨ You're All Set!

Your local development environment is now ready. Happy coding! 🎉

**Quick Commands:**
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

---

**Last Updated:** March 20, 2025
**Version:** 1.0.0
**Status:** ✅ Ready for Development
