# Pharmacy ERP System - Project Context

## Project Overview
A comprehensive Pharmacy ERP System with FastAPI backend and cross-platform desktop application support.

## Current Status
- **Backend**: ✅ FULLY FUNCTIONAL - FastAPI with Prisma ORM and PostgreSQL database
- **Database**: ✅ PharmaERPV2 created, migrated, and seeded with sample data
- **API**: ✅ All CRUD endpoints implemented for 8 entities
- **Frontend**: ✅ React with Material-UI, enhanced UI with modern design

## Database Schema (8 Tables)
1. **TaxMast** - Tax configuration (GST rates)
2. **ProdTypeMast** - Product types (Tablet, Capsule, Syrup, etc.)
3. **ProdCatMast** - Product categories (Antibiotics, Vitamins, etc.)
4. **MfrMast** - Manufacturer details
5. **SchTypeMast** - Schedule types (H, H1, X, OTC)
6. **GenericMast** - Generic medicine names
7. **ProdMast** - Product master with all details
8. **ProdGeneric** - Product-Generic mapping (many-to-many)

## Backend Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   └── products.py  # All API endpoints implemented
│   │   └── schemas.py        # Pydantic schemas for validation
│   ├── core/
│   │   ├── config.py         # Settings management
│   │   └── database.py       # Database connection
│   ├── models/
│   │   └── models.py         # SQLAlchemy models
│   └── main.py               # FastAPI application
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── seed.ts              # Seed data
│   └── migrations/          # Applied migrations
├── .env                     # Environment variables
├── package.json            # Node dependencies
└── requirements.txt        # Python dependencies
```

## Technologies Used
- **Backend**: FastAPI (Python), Prisma ORM, PostgreSQL
- **Frontend**: React, Material-UI, React Router, React Hook Form
- **Database**: PostgreSQL
- **Desktop**: Support for Electron and Tauri

## Key Features Implemented
- ✅ Complete Prisma schema with all relationships
- ✅ Seed data for all master tables
- ✅ Sample products with generic mappings
- ✅ Auto-increment primary keys
- ✅ Foreign key relationships
- ✅ Audit fields (createdDate, modifiedDate, createdBy)

## Sample Seed Data
- 3 Tax configurations (5%, 12%, 18% GST)
- 5 Product types (Tablet, Capsule, Syrup, Injection, Cream)
- 5 Product categories (Antibiotics, Analgesics, etc.)
- 4 Manufacturers (Cipla, Ranbaxy, Dr. Reddy's, Alembic)
- 4 Schedule types (H, H1, X, OTC)
- 5 Generic medicines
- 4 Sample products with complete details

## Database Connection
- **Database Name**: PharmaERPV2
- **URL**: `postgresql://sathishkumar:@localhost:5432/PharmaERPV2?schema=public`
- **Provider**: PostgreSQL
- **ORM**: Prisma (for migrations) + SQLAlchemy (for FastAPI)

## How to Run the Backend

### Database is Already Set Up! ✅
- Database: PharmaERPV2 (created)
- Migrations: Applied
- Seed data: Loaded

### To Start the API Server:

### 1. Install Python Dependencies (if not done)
```bash
pip install -r requirements.txt
```

### 2. Run FastAPI Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Available Scripts
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database with sample data
- `npm run prisma:studio` - Open Prisma Studio GUI

## API Endpoints (Implemented & Working)

### Base URL: `http://localhost:8000/api/v1`

All endpoints support full CRUD operations (GET, POST, PUT, DELETE):

1. **Products** - `/products`
   - GET `/products` - List all (with pagination & filters)
   - GET `/products/{id}` - Get specific product
   - POST `/products` - Create new product
   - PUT `/products/{id}` - Update product
   - DELETE `/products/{id}` - Delete product

2. **Product Types** - `/product-types`
3. **Product Categories** - `/product-categories`
4. **Manufacturers** - `/manufacturers`
5. **Taxes** - `/taxes`
6. **Schedule Types** - `/schedule-types`
7. **Generics** - `/generics`
8. **Product-Generic Mappings** - `/product-generics`

### Documentation
- Swagger UI: `http://localhost:8000/api/v1/docs`
- ReDoc: `http://localhost:8000/api/v1/redoc`

## Frontend Options Analyzed
1. **Tauri** (Recommended) - Smallest, fastest, most secure
2. **Electron** - Mature ecosystem, larger bundle
3. **Flutter Desktop** - Cross-platform including mobile
4. **.NET MAUI** - Enterprise-ready, Windows-focused

## Important Notes
- Single codebase strategy for web and desktop (95% code sharing)
- Keyboard navigation fully supported for pharmacy operations
- Offline capabilities planned with local database sync
- Barcode scanner and printer integration planned

## Knowledge Base
- Complete database schema understanding
- FastAPI project structure knowledge
- Prisma ORM configuration expertise
- Seed data patterns for pharmacy domain
- Desktop framework comparison analysis
- Code sharing strategies for multi-platform deployment

## Frontend Features Implemented
- **Modern UI Design**: Beautiful gradient headers, rounded corners, shadow effects
- **Side Navigation**: Collapsible drawer with organized menu structure
- **Product Management**: 
  - Unified product form with 4-step wizard (Basic Info, Classification, Tax, Review)
  - Form validation with React Hook Form
  - Real-time form feedback with Material-UI components
  - Product listing with search and actions
- **Dashboard**: Overview cards with statistics
- **Manufacturer Form**: Add new manufacturers
- **Responsive Design**: Mobile and desktop optimized
- **Theme**: Custom Material-UI theme with consistent color palette
