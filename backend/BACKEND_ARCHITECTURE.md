# Pharmacy ERP System - Backend Architecture Plan

## Technology Stack
- **Framework**: FastAPI (Python 3.10+)
- **Database**: SQLite (for development) / PostgreSQL (for production)
- **ORM**: SQLAlchemy 2.0
- **Migration Tool**: Alembic
- **Validation**: Pydantic
- **Authentication**: JWT tokens
- **API Documentation**: Auto-generated Swagger/OpenAPI

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database connection and session
│   │
│   ├── models/                 # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── base.py            # Base model class
│   │   ├── tax.py             # TaxMast model
│   │   ├── product_type.py    # ProdTypeMast model
│   │   ├── product_category.py # ProdCatMast model
│   │   ├── manufacturer.py    # MfrMast model
│   │   ├── schedule_type.py   # SchTypeMast model
│   │   ├── generic.py         # GenericMast model
│   │   ├── product.py         # ProdMast model
│   │   └── product_generic.py # ProdGeneric model
│   │
│   ├── schemas/                # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── tax.py
│   │   ├── product_type.py
│   │   ├── product_category.py
│   │   ├── manufacturer.py
│   │   ├── schedule_type.py
│   │   ├── generic.py
│   │   ├── product.py
│   │   └── product_generic.py
│   │
│   ├── api/                    # API routes
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── tax.py
│   │   │   ├── product_type.py
│   │   │   ├── product_category.py
│   │   │   ├── manufacturer.py
│   │   │   ├── schedule_type.py
│   │   │   ├── generic.py
│   │   │   ├── product.py
│   │   │   └── product_generic.py
│   │   └── deps.py            # Dependencies (DB session, auth, etc.)
│   │
│   ├── crud/                   # CRUD operations
│   │   ├── __init__.py
│   │   ├── base.py            # Base CRUD class
│   │   ├── tax.py
│   │   ├── product_type.py
│   │   ├── product_category.py
│   │   ├── manufacturer.py
│   │   ├── schedule_type.py
│   │   ├── generic.py
│   │   ├── product.py
│   │   └── product_generic.py
│   │
│   ├── core/                   # Core functionality
│   │   ├── __init__.py
│   │   ├── config.py          # Settings management
│   │   ├── security.py        # Security utilities
│   │   └── exceptions.py      # Custom exceptions
│   │
│   └── utils/                  # Utility functions
│       ├── __init__.py
│       └── validators.py       # Custom validators
│
├── alembic/                    # Database migrations
│   ├── versions/
│   └── alembic.ini
│
├── tests/                      # Test files
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_tax.py
│   ├── test_product_type.py
│   └── ...
│
├── requirements.txt            # Python dependencies
├── requirements-dev.txt        # Development dependencies
├── .env.example               # Environment variables example
├── .gitignore
├── README.md
└── Dockerfile                 # Docker configuration
```

## API Endpoints Design

### Base URL: `/api/v1`

### 1. Tax Management (`/tax`)
- `GET /tax` - List all taxes (with pagination)
- `GET /tax/{id}` - Get specific tax
- `POST /tax` - Create new tax
- `PUT /tax/{id}` - Update tax
- `DELETE /tax/{id}` - Delete tax

### 2. Product Type Management (`/product-types`)
- `GET /product-types` - List all product types
- `GET /product-types/{id}` - Get specific product type
- `POST /product-types` - Create new product type
- `PUT /product-types/{id}` - Update product type
- `DELETE /product-types/{id}` - Delete product type

### 3. Product Category Management (`/product-categories`)
- `GET /product-categories` - List all categories
- `GET /product-categories/{id}` - Get specific category
- `POST /product-categories` - Create new category
- `PUT /product-categories/{id}` - Update category
- `DELETE /product-categories/{id}` - Delete category

### 4. Manufacturer Management (`/manufacturers`)
- `GET /manufacturers` - List all manufacturers
- `GET /manufacturers/{id}` - Get specific manufacturer
- `POST /manufacturers` - Create new manufacturer
- `PUT /manufacturers/{id}` - Update manufacturer
- `DELETE /manufacturers/{id}` - Delete manufacturer

### 5. Schedule Type Management (`/schedule-types`)
- `GET /schedule-types` - List all schedule types
- `GET /schedule-types/{id}` - Get specific schedule type
- `POST /schedule-types` - Create new schedule type
- `PUT /schedule-types/{id}` - Update schedule type
- `DELETE /schedule-types/{id}` - Delete schedule type

### 6. Generic Medicine Management (`/generics`)
- `GET /generics` - List all generic medicines
- `GET /generics/{id}` - Get specific generic
- `POST /generics` - Create new generic
- `PUT /generics/{id}` - Update generic
- `DELETE /generics/{id}` - Delete generic
- `GET /generics/category/{category_id}` - Get generics by category

### 7. Product Management (`/products`)
- `GET /products` - List all products (with filters)
- `GET /products/{id}` - Get specific product
- `POST /products` - Create new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Soft delete product
- `GET /products/search` - Search products
- `GET /products/manufacturer/{mfr_id}` - Get products by manufacturer
- `GET /products/type/{type_id}` - Get products by type
- `GET /products/inactive` - Get inactive products

### 8. Product-Generic Mapping (`/product-generics`)
- `GET /product-generics/product/{product_id}` - Get generics for a product
- `POST /product-generics` - Add generic to product
- `DELETE /product-generics/{id}` - Remove generic from product

## Key Features to Implement

### 1. Database Features
- Auto-increment primary keys
- Foreign key relationships
- Default values for timestamps
- Soft delete for products (IsActive field)

### 2. API Features
- Pagination for list endpoints
- Filtering and searching
- Sorting options
- Field selection (sparse fieldsets)
- Batch operations where applicable

### 3. Validation Features
- Input validation using Pydantic
- Business logic validation
- Referential integrity checks
- Format validation (email, phone, etc.)

### 4. Security Features
- JWT authentication (to be added later)
- Role-based access control (RBAC)
- API rate limiting
- Input sanitization

### 5. Additional Features
- Audit logging (CreatedBy, CreatedDate, ModifiedDate)
- Error handling and custom exceptions
- API versioning
- Swagger documentation
- Health check endpoint
- Database backup endpoints

## Development Phases

### Phase 1: Core Setup
1. Initialize FastAPI project structure
2. Setup SQLAlchemy models
3. Configure Alembic for migrations
4. Create base CRUD operations

### Phase 2: Master Data APIs
1. Implement Tax management APIs
2. Implement Product Type APIs
3. Implement Product Category APIs
4. Implement Manufacturer APIs
5. Implement Schedule Type APIs

### Phase 3: Product Management
1. Implement Generic medicine APIs
2. Implement Product APIs
3. Implement Product-Generic mapping
4. Add search and filter functionality

### Phase 4: Enhancement
1. Add authentication/authorization
2. Implement audit logging
3. Add batch operations
4. Performance optimization

### Phase 5: Testing & Documentation
1. Write unit tests
2. Write integration tests
3. Complete API documentation
4. Create deployment guide

## Dependencies (requirements.txt)
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
alembic==1.12.1
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
```

## Environment Variables (.env)
```
DATABASE_URL=sqlite:///./pharma_erp.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
API_V1_STR=/api/v1
PROJECT_NAME=Pharma ERP System
```

## Next Steps
1. Create the project structure
2. Implement SQLAlchemy models based on the database schema
3. Create Pydantic schemas for validation
4. Implement CRUD operations
5. Build API endpoints
6. Add tests
7. Setup Docker for containerization
