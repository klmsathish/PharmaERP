# 🚀 Build Commands for Pharma ERP System

## Prerequisites

### System Requirements
- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL
- For Tauri: Rust (install from https://www.rust-lang.org/)
- For Electron: No additional requirements

## 🌐 Web Application

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm start
```

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# The build folder contains static files that can be served
# Serve with any static server like nginx, apache, or npx serve
npx serve -s build
```

## 🦀 Tauri Desktop App (Lightweight ~10MB)

### Development Mode
```bash
# Make sure backend is running
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Tauri dev
cd frontend
npm run tauri:dev
```

### Build for Production

#### macOS Build
```bash
cd frontend
npm run build
npm run tauri:build

# Output location: frontend/src-tauri/target/release/bundle/dmg/
# File: PharmaERP_0.1.0_x64.dmg
```

#### Windows Build
```bash
cd frontend
npm run build
npm run tauri:build

# Output location: frontend/src-tauri/target/release/bundle/msi/
# File: PharmaERP_0.1.0_x64_en-US.msi
```

#### Linux Build
```bash
cd frontend
npm run build
npm run tauri:build

# Output location: frontend/src-tauri/target/release/bundle/
# Files: .deb, .AppImage, etc.
```

### Tauri Configuration (if needed)
Edit `frontend/src-tauri/tauri.conf.json`:
```json
{
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "devPath": "http://localhost:3000",
    "distDir": "../build"
  },
  "package": {
    "productName": "PharmaERP",
    "version": "0.1.0"
  },
  "tauri": {
    "bundle": {
      "active": true,
      "identifier": "com.pharmaerp.app",
      "icon": ["icons/icon.ico", "icons/icon.png"],
      "resources": [],
      "targets": "all"
    }
  }
}
```

## ⚡ Electron Desktop App (Full-featured ~50-100MB)

### Development Mode
```bash
# Make sure backend is running
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run Electron in dev mode
cd frontend

# On macOS/Linux:
ELECTRON_IS_DEV=1 npm run electron

# On Windows:
SET ELECTRON_IS_DEV=1 && npm run electron
```

### Build for Production

#### All Platforms (from current OS)
```bash
cd frontend

# First build React app
npm run build

# Then build Electron app
npm run electron:build
```

#### Platform-Specific Builds

**macOS Build:**
```bash
cd frontend
npm run build
npx electron-builder --mac

# Output: frontend/dist/
# Files: PharmaERP-0.1.0.dmg, PharmaERP-0.1.0-mac.zip
```

**Windows Build:**
```bash
cd frontend
npm run build
npx electron-builder --win

# Output: frontend/dist/
# Files: PharmaERP Setup 0.1.0.exe (installer)
```

**Linux Build:**
```bash
cd frontend
npm run build
npx electron-builder --linux

# Output: frontend/dist/
# Files: PharmaERP-0.1.0.AppImage, pharmaerp_0.1.0_amd64.deb
```

### Electron Builder Configuration
Add to `frontend/package.json`:
```json
{
  "build": {
    "appId": "com.pharmaerp.app",
    "productName": "PharmaERP",
    "directories": {
      "output": "dist"
    },
    "files": [
      "build/**/*",
      "public/electron.js",
      "public/preload.js",
      "node_modules/**/*"
    ],
    "mac": {
      "category": "public.app-category.business",
      "icon": "public/icon.icns"
    },
    "win": {
      "target": "nsis",
      "icon": "public/icon.ico"
    },
    "linux": {
      "target": [
        "AppImage",
        "deb"
      ],
      "icon": "public/icon.png",
      "category": "Office"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

## 📦 Build All Platforms at Once

### Using GitHub Actions (Recommended)
Create `.github/workflows/build.yml`:
```yaml
name: Build Desktop Apps

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Rust (for Tauri)
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
      
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      
      - name: Build Tauri
        run: |
          cd frontend
          npm run tauri:build
      
      - name: Build Electron
        run: |
          cd frontend
          npm run electron:build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-builds
          path: |
            frontend/src-tauri/target/release/bundle/
            frontend/dist/
```

## 🚢 Distribution

### Code Signing (Optional but Recommended)

#### macOS
- Requires Apple Developer Certificate
- Add to electron-builder config:
```json
"mac": {
  "identity": "Developer ID Application: Your Name (XXXXXXXXXX)"
}
```

#### Windows
- Requires Code Signing Certificate
- Add to electron-builder config:
```json
"win": {
  "certificateFile": "cert.pfx",
  "certificatePassword": "password"
}
```

### Auto-Update Setup

#### For Electron
```bash
npm install electron-updater
```

Add to `electron.js`:
```javascript
const { autoUpdater } = require('electron-updater');
autoUpdater.checkForUpdatesAndNotify();
```

#### For Tauri
Built-in updater available. Configure in `tauri.conf.json`:
```json
"updater": {
  "active": true,
  "endpoints": [
    "https://your-server.com/update/{{target}}/{{current_version}}"
  ],
  "dialog": true,
  "pubkey": "YOUR_PUBLIC_KEY"
}
```

## 📊 Build Output Sizes

| Platform | Tauri | Electron |
|----------|-------|----------|
| **macOS** | ~10-15 MB | ~70-90 MB |
| **Windows** | ~8-12 MB | ~60-80 MB |
| **Linux** | ~10-15 MB | ~70-90 MB |

## 🐛 Troubleshooting

### Tauri Build Issues
```bash
# Clear Rust cache
cargo clean

# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Electron Build Issues
```bash
# Clear Electron cache
npx electron-rebuild

# Reset build
cd frontend
rm -rf dist/ build/
npm run build
npm run electron:build
```

### Missing Icons
Create icons in these formats:
- **icon.png**: 512x512 (Linux/General)
- **icon.ico**: Multiple sizes (Windows)
- **icon.icns**: macOS format

Use tools like:
- https://www.electronforge.io/asset-pipeline
- https://github.com/electron-userland/electron-icon-maker

## 🎯 Quick Commands Summary

```bash
# Web Development
npm start

# Tauri Development
npm run tauri:dev

# Electron Development
npm run electron:dev

# Build for Web
npm run build

# Build Tauri App
npm run tauri:build

# Build Electron App
npm run electron:build
```

## 📄 License & Distribution

Remember to:
1. Include license file in builds
2. Add privacy policy for app stores
3. Create installer certificates for trusted distribution
4. Set up auto-update servers for seamless updates

---

**Created**: November 9, 2024
**Platform Support**: macOS, Windows, Linux
**Technologies**: Tauri, Electron, React
