from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

# Tax Schemas
class TaxBase(BaseModel):
    taxDesc: str = Field(..., max_length=50)
    igst: float = Field(0, ge=0)
    cgst: float = Field(0, ge=0)
    sgst: float = Field(0, ge=0)
    createdBy: str = Field(..., max_length=50)

class TaxCreate(TaxBase):
    pass

class TaxUpdate(BaseModel):
    taxDesc: Optional[str] = Field(None, max_length=50)
    igst: Optional[float] = Field(None, ge=0)
    cgst: Optional[float] = Field(None, ge=0)
    sgst: Optional[float] = Field(None, ge=0)

class Tax(TaxBase):
    taxCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Product Type Schemas
class ProdTypeBase(BaseModel):
    prodTypeName: str = Field(..., max_length=50)
    prodTypeShortName: str = Field(..., max_length=3)
    createdBy: str = Field(..., max_length=50)

class ProdTypeCreate(ProdTypeBase):
    pass

class ProdTypeUpdate(BaseModel):
    prodTypeName: Optional[str] = Field(None, max_length=50)
    prodTypeShortName: Optional[str] = Field(None, max_length=3)

class ProdType(ProdTypeBase):
    prodTypeCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Product Category Schemas
class ProdCatBase(BaseModel):
    prodCatName: str = Field(..., max_length=50)
    createdBy: str = Field(..., max_length=50)

class ProdCatCreate(ProdCatBase):
    pass

class ProdCatUpdate(BaseModel):
    prodCatName: Optional[str] = Field(None, max_length=50)

class ProdCat(ProdCatBase):
    prodCatCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Manufacturer Schemas
class MfrBase(BaseModel):
    mfrName: str = Field(..., max_length=50)
    mfrShortName: str = Field(..., max_length=3)
    address: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=50)
    state: Optional[str] = Field(None, max_length=50)
    pin: Optional[str] = Field(None, max_length=10)
    cpName: Optional[str] = Field(None, max_length=50)
    cpPhone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=50)
    createdBy: str = Field(..., max_length=50)

class MfrCreate(MfrBase):
    pass

class MfrUpdate(BaseModel):
    mfrName: Optional[str] = Field(None, max_length=50)
    mfrShortName: Optional[str] = Field(None, max_length=3)
    address: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=50)
    state: Optional[str] = Field(None, max_length=50)
    pin: Optional[str] = Field(None, max_length=10)
    cpName: Optional[str] = Field(None, max_length=50)
    cpPhone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=50)

class Mfr(MfrBase):
    mfrCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Schedule Type Schemas
class SchTypeBase(BaseModel):
    schTypeName: str = Field(..., max_length=50)
    createdBy: str = Field(..., max_length=50)

class SchTypeCreate(SchTypeBase):
    pass

class SchTypeUpdate(BaseModel):
    schTypeName: Optional[str] = Field(None, max_length=50)

class SchType(SchTypeBase):
    schTypeCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    
    class Config:
        from_attributes = True


# Generic Schemas
class GenericBase(BaseModel):
    genericName: str = Field(..., max_length=50)
    prodCatCode: Optional[int] = None
    createdBy: str = Field(..., max_length=50)

class GenericCreate(GenericBase):
    pass

class GenericUpdate(BaseModel):
    genericName: Optional[str] = Field(None, max_length=50)
    prodCatCode: Optional[int] = None

class Generic(GenericBase):
    genericCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    category: Optional[ProdCat] = None
    
    class Config:
        from_attributes = True


# Product Schemas
class ProdBase(BaseModel):
    prodName: str = Field(..., max_length=50)
    hsnCode: Optional[str] = Field(None, max_length=15)
    packing: str = Field(..., max_length=50)
    purUnit: str = Field(..., max_length=20)
    salUnit: str = Field(..., max_length=20)
    prodTypeCode: int
    mfrCode: int
    mrp: float = Field(0, ge=0)
    purTaxCode: int
    salTaxCode: int
    schTypeCode: int
    isActive: bool = True
    inActiveFrom: Optional[datetime] = None
    createdBy: str = Field(..., max_length=50)

class ProdCreate(ProdBase):
    pass

class ProdUpdate(BaseModel):
    prodName: Optional[str] = Field(None, max_length=50)
    hsnCode: Optional[str] = Field(None, max_length=15)
    packing: Optional[str] = Field(None, max_length=50)
    purUnit: Optional[str] = Field(None, max_length=20)
    salUnit: Optional[str] = Field(None, max_length=20)
    prodTypeCode: Optional[int] = None
    mfrCode: Optional[int] = None
    mrp: Optional[float] = Field(None, ge=0)
    purTaxCode: Optional[int] = None
    salTaxCode: Optional[int] = None
    schTypeCode: Optional[int] = None
    isActive: Optional[bool] = None
    inActiveFrom: Optional[datetime] = None

class Prod(ProdBase):
    prodCode: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    productType: Optional[ProdType] = None
    manufacturer: Optional[Mfr] = None
    purchaseTax: Optional[Tax] = None
    saleTax: Optional[Tax] = None
    scheduleType: Optional[SchType] = None
    
    class Config:
        from_attributes = True


# Product Generic Schemas
class ProdGenericBase(BaseModel):
    prodCode: int
    genericCode: int
    genericStrength: str = Field(..., max_length=50)
    createdBy: str = Field(..., max_length=50)

class ProdGenericCreate(ProdGenericBase):
    pass

class ProdGenericUpdate(BaseModel):
    genericStrength: Optional[str] = Field(None, max_length=50)

class ProdGeneric(ProdGenericBase):
    id: int
    createdDate: datetime
    modifiedDate: Optional[datetime] = None
    product: Optional[Prod] = None
    generic: Optional[Generic] = None
    
    class Config:
        from_attributes = True


# Pagination Response
class PaginationResponse(BaseModel):
    total: int
    page: int
    page_size: int
    total_pages: int
    items: List[dict]
