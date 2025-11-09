from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class TaxMast(Base):
    __tablename__ = "TaxMast"
    
    taxCode = Column(Integer, primary_key=True, autoincrement=True)
    taxDesc = Column(String(50), nullable=False)
    igst = Column(Float, default=0, nullable=False)
    cgst = Column(Float, default=0, nullable=False)
    sgst = Column(Float, default=0, nullable=False)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    products_purchase = relationship("ProdMast", foreign_keys="ProdMast.purTaxCode", back_populates="purchaseTax")
    products_sale = relationship("ProdMast", foreign_keys="ProdMast.salTaxCode", back_populates="saleTax")


class ProdTypeMast(Base):
    __tablename__ = "ProdTypeMast"
    
    prodTypeCode = Column(Integer, primary_key=True, autoincrement=True)
    prodTypeName = Column(String(50), nullable=False)
    prodTypeShortName = Column(String(3), nullable=False)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    products = relationship("ProdMast", back_populates="productType")


class ProdCatMast(Base):
    __tablename__ = "ProdCatMast"
    
    prodCatCode = Column(Integer, primary_key=True, autoincrement=True)
    prodCatName = Column(String(50), nullable=False)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    generics = relationship("GenericMast", back_populates="category")


class MfrMast(Base):
    __tablename__ = "MfrMast"
    
    mfrCode = Column(Integer, primary_key=True, autoincrement=True)
    mfrName = Column(String(50), nullable=False)
    mfrShortName = Column(String(3), nullable=False)
    address = Column(String(255))
    city = Column(String(50))
    state = Column(String(50))
    pin = Column(String(10))
    cpName = Column(String(50))
    cpPhone = Column(String(20))
    email = Column(String(50))
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    products = relationship("ProdMast", back_populates="manufacturer")


class SchTypeMast(Base):
    __tablename__ = "SchTypeMast"
    
    schTypeCode = Column(Integer, primary_key=True, autoincrement=True)
    schTypeName = Column(String(50), nullable=False)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    products = relationship("ProdMast", back_populates="scheduleType")


class GenericMast(Base):
    __tablename__ = "GenericMast"
    
    genericCode = Column(Integer, primary_key=True, autoincrement=True)
    genericName = Column(String(50), nullable=False)
    prodCatCode = Column(Integer, ForeignKey("ProdCatMast.prodCatCode"))
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    category = relationship("ProdCatMast", back_populates="generics")
    product_generics = relationship("ProdGeneric", back_populates="generic")


class ProdMast(Base):
    __tablename__ = "ProdMast"
    
    prodCode = Column(Integer, primary_key=True, autoincrement=True)
    prodName = Column(String(50), nullable=False)
    hsnCode = Column(String(15))
    packing = Column(String(50), nullable=False)
    purUnit = Column(String(20), nullable=False)
    salUnit = Column(String(20), nullable=False)
    prodTypeCode = Column(Integer, ForeignKey("ProdTypeMast.prodTypeCode"), nullable=False)
    mfrCode = Column(Integer, ForeignKey("MfrMast.mfrCode"), nullable=False)
    mrp = Column(Float, default=0, nullable=False)
    purTaxCode = Column(Integer, ForeignKey("TaxMast.taxCode"), nullable=False)
    salTaxCode = Column(Integer, ForeignKey("TaxMast.taxCode"), nullable=False)
    schTypeCode = Column(Integer, ForeignKey("SchTypeMast.schTypeCode"), nullable=False)
    isActive = Column(Boolean, default=True, nullable=False)
    inActiveFrom = Column(DateTime)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    productType = relationship("ProdTypeMast", back_populates="products")
    manufacturer = relationship("MfrMast", back_populates="products")
    purchaseTax = relationship("TaxMast", foreign_keys=[purTaxCode], back_populates="products_purchase")
    saleTax = relationship("TaxMast", foreign_keys=[salTaxCode], back_populates="products_sale")
    scheduleType = relationship("SchTypeMast", back_populates="products")
    product_generics = relationship("ProdGeneric", back_populates="product")


class ProdGeneric(Base):
    __tablename__ = "ProdGeneric"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    prodCode = Column(Integer, ForeignKey("ProdMast.prodCode"), nullable=False)
    genericCode = Column(Integer, ForeignKey("GenericMast.genericCode"), nullable=False)
    genericStrength = Column(String(50), nullable=False)
    createdDate = Column(DateTime, default=func.now(), nullable=False)
    modifiedDate = Column(DateTime, onupdate=func.now())
    createdBy = Column(String(50), nullable=False)
    
    # Relations
    product = relationship("ProdMast", back_populates="product_generics")
    generic = relationship("GenericMast", back_populates="product_generics")
    
    # Unique constraint
    __table_args__ = (UniqueConstraint('prodCode', 'genericCode', name='_prodCode_genericCode_uc'),)
