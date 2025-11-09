# Pharmacy ERP System - Complete Setup Guide

## ✅ System Overview

A complete Pharmacy ERP system with:
- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: React with TypeScript and Material-UI
- **Desktop Apps**: Both Tauri and Electron support
- **Web App**: Standard React web application

## 📊 Database Schema (8 Tables)

1. **TaxMast** - Tax configurations (GST rates)
2. **ProdTypeMast** - Product types (Tablet, Capsule, Syrup, etc.)
3. **ProdCatMast** - Product categories (Antibiotics, Vitamins, etc.)
4. **MfrMast** - Manufacturer details
5. **SchTypeMast** - Schedule types (H, H1, X, OTC)
6. **GenericMast** - Generic medicine names
7. **ProdMast** - Product master with all details
8. **ProdGeneric** - Product-Generic mapping

## 🚀 Running the System

### 1. Backend (FastAPI)
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API: http://localhost:8000/api/v1
- Swagger Docs: http://localhost:8000/api/v1/docs
- Database: PostgreSQL (PharmaERPV2)

### 2. Web Application (React)
```bash
cd frontend
npm start
```
- Open: http://localhost:3000

### 3. Tauri Desktop App
```bash
cd frontend
npm run tauri:dev
```
- Native desktop app using system WebView
- Smallest bundle size (~10MB)
- Best performance

### 4. Electron Desktop App
```bash
cd frontend

# Development
npm run electron:dev

# Or on Windows:
SET ELECTRON_IS_DEV=1 && npm run electron

# Production build
npm run electron:build
```
- Cross-platform desktop app
- Includes Chromium (~50-100MB)
- More features and APIs

## 🎯 Features Implemented

### Backend APIs (All CRUD Operations)
- ✅ Products - `/api/v1/products`
- ✅ Product Types - `/api/v1/product-types`
- ✅ Product Categories - `/api/v1/product-categories`
- ✅ Manufacturers - `/api/v1/manufacturers`
- ✅ Taxes - `/api/v1/taxes`
- ✅ Schedule Types - `/api/v1/schedule-types`
- ✅ Generics - `/api/v1/generics`
- ✅ Product-Generic Mappings - `/api/v1/product-generics`

### Frontend Forms
- ✅ Add New Manufacturer Form
- ✅ Add New Product Form
- ✅ Platform detection (Web/Tauri/Electron)
- ✅ Material-UI design
- ✅ Form validation
- ✅ API integration

## 📦 Technology Stack

### Backend
- FastAPI (Python)
- PostgreSQL
- Prisma (migrations)
- SQLAlchemy (ORM)
- Pydantic (validation)

### Frontend
- React 19
- TypeScript
- Material-UI
- React Router
- React Hook Form
- Axios

### Desktop
- Tauri 2.0 (Rust-based)
- Electron 39 (Chromium-based)

## 🔧 Installation Requirements

### Backend
```bash
pip install -r backend/requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

### Database
- PostgreSQL installed and running
- Database: PharmaERPV2 (already created and seeded)

## 📱 Platform Comparison

| Feature | Web App | Tauri | Electron |
|---------|---------|-------|----------|
| Bundle Size | N/A | ~10MB | ~50-100MB |
| Performance | Good | Excellent | Good |
| Native APIs | Limited | Full | Full |
| Auto-update | Manual | Built-in | Available |
| System Tray | No | Yes | Yes |
| File System | Limited | Full | Full |
| Cross-platform | Yes | Yes | Yes |

## 🎨 Screenshots Locations

### Web Application
- Navigate to http://localhost:3000
- Home page shows platform detection
- Navigate to forms using top menu

### Forms Available
1. **Manufacturer Form** - `/manufacturer`
   - Company details
   - Contact information
   - Address

2. **Product Form** - `/product`
   - Product details
   - Select manufacturer, type, category
   - Tax configuration
   - MRP and packing

## 🚨 Important Notes

1. **CORS**: Backend is configured to accept requests from localhost:3000
2. **Database**: Make sure PostgreSQL is running before starting backend
3. **Ports**: 
   - Backend: 8000
   - Frontend: 3000
4. **Platform Detection**: The app automatically detects if running in Web/Tauri/Electron

## 📝 Testing the Forms

1. **Add Manufacturer**:
   - Go to Manufacturer form
   - Fill in: Name, Short Name (3 chars max)
   - Optional: Address, Contact details
   - Submit

2. **Add Product**:
   - Go to Product form
   - Fill in required fields
   - Select from dropdowns (data loaded from API)
   - Submit

## 🔄 Next Steps & Enhancements

- [ ] Add authentication/authorization
- [ ] Implement product listing/search
- [ ] Add edit/delete functionality
- [ ] Create purchase/sales modules
- [ ] Add inventory management
- [ ] Implement reporting features
- [ ] Add barcode scanning
- [ ] Implement offline sync

## 🐛 Troubleshooting

### Backend Issues
```bash
# Check if PostgreSQL is running
psql -U sathishkumar -d PharmaERPV2

# Check API
curl http://localhost:8000/api/v1/products
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Electron Issues
```bash
# If electron doesn't start
npm run build
npm run electron
```

## 📄 License & Support

This is a POC (Proof of Concept) for a Pharmacy ERP System demonstrating:
- Modern web technologies
- Cross-platform desktop support
- RESTful API design
- Database design for pharmacy domain

---

**Created**: November 9, 2025
**Technologies**: FastAPI, React, Tauri, Electron, PostgreSQL
