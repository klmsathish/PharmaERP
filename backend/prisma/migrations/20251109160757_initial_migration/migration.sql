-- CreateTable
CREATE TABLE "TaxMast" (
    "taxCode" SERIAL NOT NULL,
    "taxDesc" VARCHAR(50) NOT NULL,
    "igst" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cgst" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sgst" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "TaxMast_pkey" PRIMARY KEY ("taxCode")
);

-- CreateTable
CREATE TABLE "ProdTypeMast" (
    "prodTypeCode" SERIAL NOT NULL,
    "prodTypeName" VARCHAR(50) NOT NULL,
    "prodTypeShortName" VARCHAR(3) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProdTypeMast_pkey" PRIMARY KEY ("prodTypeCode")
);

-- CreateTable
CREATE TABLE "ProdCatMast" (
    "prodCatCode" SERIAL NOT NULL,
    "prodCatName" VARCHAR(50) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProdCatMast_pkey" PRIMARY KEY ("prodCatCode")
);

-- CreateTable
CREATE TABLE "MfrMast" (
    "mfrCode" SERIAL NOT NULL,
    "mfrName" VARCHAR(50) NOT NULL,
    "mfrShortName" VARCHAR(3) NOT NULL,
    "address" VARCHAR(255),
    "city" VARCHAR(50),
    "state" VARCHAR(50),
    "pin" VARCHAR(10),
    "cpName" VARCHAR(50),
    "cpPhone" VARCHAR(20),
    "email" VARCHAR(50),
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "MfrMast_pkey" PRIMARY KEY ("mfrCode")
);

-- CreateTable
CREATE TABLE "SchTypeMast" (
    "schTypeCode" SERIAL NOT NULL,
    "schTypeName" VARCHAR(50) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "SchTypeMast_pkey" PRIMARY KEY ("schTypeCode")
);

-- CreateTable
CREATE TABLE "GenericMast" (
    "genericCode" SERIAL NOT NULL,
    "genericName" VARCHAR(50) NOT NULL,
    "prodCatCode" INTEGER,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "GenericMast_pkey" PRIMARY KEY ("genericCode")
);

-- CreateTable
CREATE TABLE "ProdMast" (
    "prodCode" SERIAL NOT NULL,
    "prodName" VARCHAR(50) NOT NULL,
    "hsnCode" VARCHAR(15),
    "packing" VARCHAR(50) NOT NULL,
    "purUnit" VARCHAR(20) NOT NULL,
    "salUnit" VARCHAR(20) NOT NULL,
    "prodTypeCode" INTEGER NOT NULL,
    "mfrCode" INTEGER NOT NULL,
    "mrp" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "purTaxCode" INTEGER NOT NULL,
    "salTaxCode" INTEGER NOT NULL,
    "schTypeCode" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "inActiveFrom" TIMESTAMP(3),
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProdMast_pkey" PRIMARY KEY ("prodCode")
);

-- CreateTable
CREATE TABLE "ProdGeneric" (
    "id" SERIAL NOT NULL,
    "prodCode" INTEGER NOT NULL,
    "genericCode" INTEGER NOT NULL,
    "genericStrength" VARCHAR(50) NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3),
    "createdBy" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProdGeneric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProdGeneric_prodCode_genericCode_key" ON "ProdGeneric"("prodCode", "genericCode");

-- AddForeignKey
ALTER TABLE "GenericMast" ADD CONSTRAINT "GenericMast_prodCatCode_fkey" FOREIGN KEY ("prodCatCode") REFERENCES "ProdCatMast"("prodCatCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdMast" ADD CONSTRAINT "ProdMast_prodTypeCode_fkey" FOREIGN KEY ("prodTypeCode") REFERENCES "ProdTypeMast"("prodTypeCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdMast" ADD CONSTRAINT "ProdMast_mfrCode_fkey" FOREIGN KEY ("mfrCode") REFERENCES "MfrMast"("mfrCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdMast" ADD CONSTRAINT "ProdMast_purTaxCode_fkey" FOREIGN KEY ("purTaxCode") REFERENCES "TaxMast"("taxCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdMast" ADD CONSTRAINT "ProdMast_salTaxCode_fkey" FOREIGN KEY ("salTaxCode") REFERENCES "TaxMast"("taxCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdMast" ADD CONSTRAINT "ProdMast_schTypeCode_fkey" FOREIGN KEY ("schTypeCode") REFERENCES "SchTypeMast"("schTypeCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdGeneric" ADD CONSTRAINT "ProdGeneric_prodCode_fkey" FOREIGN KEY ("prodCode") REFERENCES "ProdMast"("prodCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdGeneric" ADD CONSTRAINT "ProdGeneric_genericCode_fkey" FOREIGN KEY ("genericCode") REFERENCES "GenericMast"("genericCode") ON DELETE RESTRICT ON UPDATE CASCADE;
