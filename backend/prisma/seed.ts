import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Seed Tax Master
  const taxes = await Promise.all([
    prisma.taxMast.create({
      data: {
        taxDesc: 'Medicine GST 5%',
        igst: 5.00,
        cgst: 2.50,
        sgst: 2.50,
        createdBy: 'system'
      }
    }),
    prisma.taxMast.create({
      data: {
        taxDesc: 'Medicine GST 12%',
        igst: 12.00,
        cgst: 6.00,
        sgst: 6.00,
        createdBy: 'system'
      }
    }),
    prisma.taxMast.create({
      data: {
        taxDesc: 'Equipment GST 18%',
        igst: 18.00,
        cgst: 9.00,
        sgst: 9.00,
        createdBy: 'system'
      }
    })
  ]);

  // Seed Product Type Master
  const productTypes = await Promise.all([
    prisma.prodTypeMast.create({
      data: {
        prodTypeName: 'Tablet',
        prodTypeShortName: 'Tab',
        createdBy: 'system'
      }
    }),
    prisma.prodTypeMast.create({
      data: {
        prodTypeName: 'Capsule',
        prodTypeShortName: 'Cap',
        createdBy: 'system'
      }
    }),
    prisma.prodTypeMast.create({
      data: {
        prodTypeName: 'Syrup',
        prodTypeShortName: 'Syp',
        createdBy: 'system'
      }
    }),
    prisma.prodTypeMast.create({
      data: {
        prodTypeName: 'Injection',
        prodTypeShortName: 'Inj',
        createdBy: 'system'
      }
    }),
    prisma.prodTypeMast.create({
      data: {
        prodTypeName: 'Cream',
        prodTypeShortName: 'Crm',
        createdBy: 'system'
      }
    })
  ]);

  // Seed Product Category Master
  const categories = await Promise.all([
    prisma.prodCatMast.create({
      data: {
        prodCatName: 'Antibiotics',
        createdBy: 'system'
      }
    }),
    prisma.prodCatMast.create({
      data: {
        prodCatName: 'Analgesics',
        createdBy: 'system'
      }
    }),
    prisma.prodCatMast.create({
      data: {
        prodCatName: 'Antivirals',
        createdBy: 'system'
      }
    }),
    prisma.prodCatMast.create({
      data: {
        prodCatName: 'Vitamins',
        createdBy: 'system'
      }
    }),
    prisma.prodCatMast.create({
      data: {
        prodCatName: 'Diuretics',
        createdBy: 'system'
      }
    })
  ]);

  // Seed Manufacturer Master
  const manufacturers = await Promise.all([
    prisma.mfrMast.create({
      data: {
        mfrName: 'Cipla Ltd',
        mfrShortName: 'CIP',
        address: '289, Bellasis Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pin: '400008',
        cpName: 'John Doe',
        cpPhone: '+91-22-23456789',
        email: 'contact@cipla.com',
        createdBy: 'system'
      }
    }),
    prisma.mfrMast.create({
      data: {
        mfrName: 'Ranbaxy Laboratories',
        mfrShortName: 'RBX',
        address: 'Plot 90, Sector 32',
        city: 'Gurgaon',
        state: 'Haryana',
        pin: '122001',
        cpName: 'Jane Smith',
        cpPhone: '+91-124-4135000',
        email: 'info@ranbaxy.com',
        createdBy: 'system'
      }
    }),
    prisma.mfrMast.create({
      data: {
        mfrName: 'Dr. Reddy\'s Laboratories',
        mfrShortName: 'DRR',
        address: '7-1-27, Ameerpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pin: '500016',
        cpName: 'Rajesh Kumar',
        cpPhone: '+91-40-49002900',
        email: 'info@drreddys.com',
        createdBy: 'system'
      }
    }),
    prisma.mfrMast.create({
      data: {
        mfrName: 'Alembic Pharmaceuticals',
        mfrShortName: 'ALE',
        address: 'Alembic Road',
        city: 'Vadodara',
        state: 'Gujarat',
        pin: '390003',
        cpName: 'Amit Patel',
        cpPhone: '+91-265-2280550',
        email: 'contact@alembic.com',
        createdBy: 'system'
      }
    })
  ]);

  // Seed Schedule Type Master
  const scheduleTypes = await Promise.all([
    prisma.schTypeMast.create({
      data: {
        schTypeName: 'Schedule H',
        createdBy: 'system'
      }
    }),
    prisma.schTypeMast.create({
      data: {
        schTypeName: 'Schedule H1',
        createdBy: 'system'
      }
    }),
    prisma.schTypeMast.create({
      data: {
        schTypeName: 'Schedule X',
        createdBy: 'system'
      }
    }),
    prisma.schTypeMast.create({
      data: {
        schTypeName: 'OTC',
        createdBy: 'system'
      }
    })
  ]);

  // Seed Generic Master
  const generics = await Promise.all([
    prisma.genericMast.create({
      data: {
        genericName: 'Paracetamol',
        prodCatCode: categories[1].prodCatCode, // Analgesics
        createdBy: 'system'
      }
    }),
    prisma.genericMast.create({
      data: {
        genericName: 'Amoxicillin',
        prodCatCode: categories[0].prodCatCode, // Antibiotics
        createdBy: 'system'
      }
    }),
    prisma.genericMast.create({
      data: {
        genericName: 'Azithromycin',
        prodCatCode: categories[0].prodCatCode, // Antibiotics
        createdBy: 'system'
      }
    }),
    prisma.genericMast.create({
      data: {
        genericName: 'Vitamin C',
        prodCatCode: categories[3].prodCatCode, // Vitamins
        createdBy: 'system'
      }
    }),
    prisma.genericMast.create({
      data: {
        genericName: 'Cetirizine',
        prodCatCode: categories[1].prodCatCode, // Analgesics
        createdBy: 'system'
      }
    })
  ]);

  // Seed Product Master
  const products = await Promise.all([
    prisma.prodMast.create({
      data: {
        prodName: 'Dolo 650',
        hsnCode: '30049099',
        packing: 'Strip of 10 Tablets',
        purUnit: '10',
        salUnit: '1',
        prodTypeCode: productTypes[0].prodTypeCode, // Tablet
        mfrCode: manufacturers[0].mfrCode, // Cipla
        mrp: 35.50,
        purTaxCode: taxes[0].taxCode, // 5% GST
        salTaxCode: taxes[0].taxCode, // 5% GST
        schTypeCode: scheduleTypes[3].schTypeCode, // OTC
        isActive: true,
        createdBy: 'system'
      }
    }),
    prisma.prodMast.create({
      data: {
        prodName: 'Amoxil 500',
        hsnCode: '30041010',
        packing: 'Strip of 10 Capsules',
        purUnit: '10',
        salUnit: '1',
        prodTypeCode: productTypes[1].prodTypeCode, // Capsule
        mfrCode: manufacturers[1].mfrCode, // Ranbaxy
        mrp: 125.00,
        purTaxCode: taxes[1].taxCode, // 12% GST
        salTaxCode: taxes[1].taxCode, // 12% GST
        schTypeCode: scheduleTypes[0].schTypeCode, // Schedule H
        isActive: true,
        createdBy: 'system'
      }
    }),
    prisma.prodMast.create({
      data: {
        prodName: 'Azithral 500',
        hsnCode: '30041020',
        packing: 'Strip of 3 Tablets',
        purUnit: '3',
        salUnit: '1',
        prodTypeCode: productTypes[0].prodTypeCode, // Tablet
        mfrCode: manufacturers[2].mfrCode, // Dr. Reddy's
        mrp: 89.50,
        purTaxCode: taxes[1].taxCode, // 12% GST
        salTaxCode: taxes[1].taxCode, // 12% GST
        schTypeCode: scheduleTypes[0].schTypeCode, // Schedule H
        isActive: true,
        createdBy: 'system'
      }
    }),
    prisma.prodMast.create({
      data: {
        prodName: 'Benadryl Syrup',
        hsnCode: '30042090',
        packing: 'Bottle of 100ml',
        purUnit: '100',
        salUnit: '1',
        prodTypeCode: productTypes[2].prodTypeCode, // Syrup
        mfrCode: manufacturers[3].mfrCode, // Alembic
        mrp: 95.00,
        purTaxCode: taxes[0].taxCode, // 5% GST
        salTaxCode: taxes[0].taxCode, // 5% GST
        schTypeCode: scheduleTypes[3].schTypeCode, // OTC
        isActive: true,
        createdBy: 'system'
      }
    })
  ]);

  // Seed Product Generic Mapping
  await Promise.all([
    prisma.prodGeneric.create({
      data: {
        prodCode: products[0].prodCode,
        genericCode: generics[0].genericCode, // Paracetamol
        genericStrength: '650mg',
        createdBy: 'system'
      }
    }),
    prisma.prodGeneric.create({
      data: {
        prodCode: products[1].prodCode,
        genericCode: generics[1].genericCode, // Amoxicillin
        genericStrength: '500mg',
        createdBy: 'system'
      }
    }),
    prisma.prodGeneric.create({
      data: {
        prodCode: products[2].prodCode,
        genericCode: generics[2].genericCode, // Azithromycin
        genericStrength: '500mg',
        createdBy: 'system'
      }
    }),
    prisma.prodGeneric.create({
      data: {
        prodCode: products[3].prodCode,
        genericCode: generics[4].genericCode, // Cetirizine
        genericStrength: '10mg/5ml',
        createdBy: 'system'
      }
    })
  ]);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
