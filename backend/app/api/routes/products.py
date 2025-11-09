from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import ProdMast, ProdTypeMast, ProdCatMast, MfrMast, SchTypeMast, GenericMast, TaxMast, ProdGeneric
from app.api.schemas import (
    Prod, ProdCreate, ProdUpdate,
    ProdType, ProdTypeCreate, ProdTypeUpdate,
    ProdCat, ProdCatCreate, ProdCatUpdate,
    Mfr, MfrCreate, MfrUpdate,
    SchType, SchTypeCreate, SchTypeUpdate,
    Generic, GenericCreate, GenericUpdate,
    Tax, TaxCreate, TaxUpdate,
    ProdGeneric as ProdGenericSchema, ProdGenericCreate, ProdGenericUpdate
)

router = APIRouter()

# Product Routes
@router.get("/products", response_model=List[Prod])
def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(ProdMast)
    if is_active is not None:
        query = query.filter(ProdMast.isActive == is_active)
    products = query.offset(skip).limit(limit).all()
    return products

@router.post("/products", response_model=Prod)
def create_product(product: ProdCreate, db: Session = Depends(get_db)):
    db_product = ProdMast(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/products/{product_id}", response_model=Prod)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProdMast).filter(ProdMast.prodCode == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/products/{product_id}", response_model=Prod)
def update_product(product_id: int, product: ProdUpdate, db: Session = Depends(get_db)):
    db_product = db.query(ProdMast).filter(ProdMast.prodCode == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProdMast).filter(ProdMast.prodCode == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}


# Product Type Routes
@router.get("/product-types", response_model=List[ProdType])
def get_product_types(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    product_types = db.query(ProdTypeMast).offset(skip).limit(limit).all()
    return product_types

@router.post("/product-types", response_model=ProdType)
def create_product_type(product_type: ProdTypeCreate, db: Session = Depends(get_db)):
    db_product_type = ProdTypeMast(**product_type.dict())
    db.add(db_product_type)
    db.commit()
    db.refresh(db_product_type)
    return db_product_type

@router.get("/product-types/{type_id}", response_model=ProdType)
def get_product_type(type_id: int, db: Session = Depends(get_db)):
    product_type = db.query(ProdTypeMast).filter(ProdTypeMast.prodTypeCode == type_id).first()
    if not product_type:
        raise HTTPException(status_code=404, detail="Product type not found")
    return product_type

@router.put("/product-types/{type_id}", response_model=ProdType)
def update_product_type(type_id: int, product_type: ProdTypeUpdate, db: Session = Depends(get_db)):
    db_product_type = db.query(ProdTypeMast).filter(ProdTypeMast.prodTypeCode == type_id).first()
    if not db_product_type:
        raise HTTPException(status_code=404, detail="Product type not found")
    
    update_data = product_type.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_product_type, field, value)
    
    db.commit()
    db.refresh(db_product_type)
    return db_product_type


# Product Category Routes
@router.get("/product-categories", response_model=List[ProdCat])
def get_product_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    categories = db.query(ProdCatMast).offset(skip).limit(limit).all()
    return categories

@router.post("/product-categories", response_model=ProdCat)
def create_product_category(category: ProdCatCreate, db: Session = Depends(get_db)):
    db_category = ProdCatMast(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.get("/product-categories/{category_id}", response_model=ProdCat)
def get_product_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(ProdCatMast).filter(ProdCatMast.prodCatCode == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Product category not found")
    return category

@router.put("/product-categories/{category_id}", response_model=ProdCat)
def update_product_category(category_id: int, category: ProdCatUpdate, db: Session = Depends(get_db)):
    db_category = db.query(ProdCatMast).filter(ProdCatMast.prodCatCode == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Product category not found")
    
    update_data = category.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_category, field, value)
    
    db.commit()
    db.refresh(db_category)
    return db_category


# Manufacturer Routes
@router.get("/manufacturers", response_model=List[Mfr])
def get_manufacturers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    manufacturers = db.query(MfrMast).offset(skip).limit(limit).all()
    return manufacturers

@router.post("/manufacturers", response_model=Mfr)
def create_manufacturer(manufacturer: MfrCreate, db: Session = Depends(get_db)):
    db_manufacturer = MfrMast(**manufacturer.dict())
    db.add(db_manufacturer)
    db.commit()
    db.refresh(db_manufacturer)
    return db_manufacturer

@router.get("/manufacturers/{mfr_id}", response_model=Mfr)
def get_manufacturer(mfr_id: int, db: Session = Depends(get_db)):
    manufacturer = db.query(MfrMast).filter(MfrMast.mfrCode == mfr_id).first()
    if not manufacturer:
        raise HTTPException(status_code=404, detail="Manufacturer not found")
    return manufacturer

@router.put("/manufacturers/{mfr_id}", response_model=Mfr)
def update_manufacturer(mfr_id: int, manufacturer: MfrUpdate, db: Session = Depends(get_db)):
    db_manufacturer = db.query(MfrMast).filter(MfrMast.mfrCode == mfr_id).first()
    if not db_manufacturer:
        raise HTTPException(status_code=404, detail="Manufacturer not found")
    
    update_data = manufacturer.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_manufacturer, field, value)
    
    db.commit()
    db.refresh(db_manufacturer)
    return db_manufacturer


# Tax Routes
@router.get("/taxes", response_model=List[Tax])
def get_taxes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    taxes = db.query(TaxMast).offset(skip).limit(limit).all()
    return taxes

@router.post("/taxes", response_model=Tax)
def create_tax(tax: TaxCreate, db: Session = Depends(get_db)):
    db_tax = TaxMast(**tax.dict())
    db.add(db_tax)
    db.commit()
    db.refresh(db_tax)
    return db_tax

@router.get("/taxes/{tax_id}", response_model=Tax)
def get_tax(tax_id: int, db: Session = Depends(get_db)):
    tax = db.query(TaxMast).filter(TaxMast.taxCode == tax_id).first()
    if not tax:
        raise HTTPException(status_code=404, detail="Tax not found")
    return tax

@router.put("/taxes/{tax_id}", response_model=Tax)
def update_tax(tax_id: int, tax: TaxUpdate, db: Session = Depends(get_db)):
    db_tax = db.query(TaxMast).filter(TaxMast.taxCode == tax_id).first()
    if not db_tax:
        raise HTTPException(status_code=404, detail="Tax not found")
    
    update_data = tax.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_tax, field, value)
    
    db.commit()
    db.refresh(db_tax)
    return db_tax


# Schedule Type Routes
@router.get("/schedule-types", response_model=List[SchType])
def get_schedule_types(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    schedule_types = db.query(SchTypeMast).offset(skip).limit(limit).all()
    return schedule_types

@router.post("/schedule-types", response_model=SchType)
def create_schedule_type(schedule_type: SchTypeCreate, db: Session = Depends(get_db)):
    db_schedule_type = SchTypeMast(**schedule_type.dict())
    db.add(db_schedule_type)
    db.commit()
    db.refresh(db_schedule_type)
    return db_schedule_type

@router.get("/schedule-types/{schedule_id}", response_model=SchType)
def get_schedule_type(schedule_id: int, db: Session = Depends(get_db)):
    schedule_type = db.query(SchTypeMast).filter(SchTypeMast.schTypeCode == schedule_id).first()
    if not schedule_type:
        raise HTTPException(status_code=404, detail="Schedule type not found")
    return schedule_type


# Generic Routes
@router.get("/generics", response_model=List[Generic])
def get_generics(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    category_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(GenericMast)
    if category_id:
        query = query.filter(GenericMast.prodCatCode == category_id)
    generics = query.offset(skip).limit(limit).all()
    return generics

@router.post("/generics", response_model=Generic)
def create_generic(generic: GenericCreate, db: Session = Depends(get_db)):
    db_generic = GenericMast(**generic.dict())
    db.add(db_generic)
    db.commit()
    db.refresh(db_generic)
    return db_generic

@router.get("/generics/{generic_id}", response_model=Generic)
def get_generic(generic_id: int, db: Session = Depends(get_db)):
    generic = db.query(GenericMast).filter(GenericMast.genericCode == generic_id).first()
    if not generic:
        raise HTTPException(status_code=404, detail="Generic not found")
    return generic

@router.put("/generics/{generic_id}", response_model=Generic)
def update_generic(generic_id: int, generic: GenericUpdate, db: Session = Depends(get_db)):
    db_generic = db.query(GenericMast).filter(GenericMast.genericCode == generic_id).first()
    if not db_generic:
        raise HTTPException(status_code=404, detail="Generic not found")
    
    update_data = generic.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_generic, field, value)
    
    db.commit()
    db.refresh(db_generic)
    return db_generic


# Product Generic Mapping Routes
@router.get("/product-generics", response_model=List[ProdGenericSchema])
def get_product_generics(
    product_id: Optional[int] = None,
    generic_id: Optional[int] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    db: Session = Depends(get_db)
):
    query = db.query(ProdGeneric)
    if product_id:
        query = query.filter(ProdGeneric.prodCode == product_id)
    if generic_id:
        query = query.filter(ProdGeneric.genericCode == generic_id)
    mappings = query.offset(skip).limit(limit).all()
    return mappings

@router.post("/product-generics", response_model=ProdGenericSchema)
def create_product_generic_mapping(mapping: ProdGenericCreate, db: Session = Depends(get_db)):
    # Check if mapping already exists
    existing = db.query(ProdGeneric).filter(
        ProdGeneric.prodCode == mapping.prodCode,
        ProdGeneric.genericCode == mapping.genericCode
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="This product-generic mapping already exists")
    
    db_mapping = ProdGeneric(**mapping.dict())
    db.add(db_mapping)
    db.commit()
    db.refresh(db_mapping)
    return db_mapping

@router.delete("/product-generics/{mapping_id}")
def delete_product_generic_mapping(mapping_id: int, db: Session = Depends(get_db)):
    mapping = db.query(ProdGeneric).filter(ProdGeneric.id == mapping_id).first()
    if not mapping:
        raise HTTPException(status_code=404, detail="Product-generic mapping not found")
    db.delete(mapping)
    db.commit()
    return {"message": "Product-generic mapping deleted successfully"}
