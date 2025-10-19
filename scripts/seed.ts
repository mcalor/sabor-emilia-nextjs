
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Create categories
  console.log('📂 Creando categorías...')
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'canapes' },
      update: {},
      create: {
        name: 'Canapés',
        description: 'Bocados gourmet con ingredientes premium',
        slug: 'canapes'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'mini-quiches' },
      update: {},
      create: {
        name: 'Mini Quiches',
        description: 'Deliciosas tartas individuales horneadas',
        slug: 'mini-quiches'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'mini-empanadas' },
      update: {},
      create: {
        name: 'Mini Empanadas',
        description: 'Tradición chilena en formato gourmet',
        slug: 'mini-empanadas'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'petit-fours' },
      update: {},
      create: {
        name: 'Petit Fours Dulces',
        description: 'Exquisitas creaciones dulces artesanales',
        slug: 'petit-fours'
      }
    })
  ])

  console.log(`✅ ${categories.length} categorías creadas`)

  // Create products
  console.log('🥘 Creando productos...')
  const products = [
    // Canapés
    {
      name: 'Canapé de Salmón Ahumado',
      description: 'Delicioso canapé con salmón ahumado noruego, eneldo fresco y base crocante de pan artesanal. Perfecto para eventos elegantes.',
      price: 4500000, // $45.000 CLP en centavos
      categoryId: categories[0].id,
      imageUrl: 'https://cdn.abacus.ai/images/30a9cda6-f0f4-47a8-ace3-04b4ecf0aba5.png',
      slug: 'canape-salmon-ahumado',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Canapé de Queso de Cabra con Miel',
      description: 'Canapé artesanal con cremoso queso de cabra, miel de ulmo y nueces caramelizadas sobre base de masa madre.',
      price: 4200000, // $42.000 CLP
      categoryId: categories[0].id,
      imageUrl: 'https://cdn.abacus.ai/images/503bcbcf-f1d4-400f-a119-f7d5711df670.png',
      slug: 'canape-queso-cabra-miel',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Canapé de Paté de Foie con Mermelada',
      description: 'Elegante canapé de alta cocina con paté de foie artesanal y mermelada de frutos rojos, sobre tostada francesa.',
      price: 5500000, // $55.000 CLP
      categoryId: categories[0].id,
      imageUrl: 'https://cdn.abacus.ai/images/f9b0c090-7ae1-4c11-9f0d-a8c4dd637eac.png',
      slug: 'canape-pate-foie-mermelada',
      featured: false,
      stock: 999,
      available: true
    },

    // Mini Quiches
    {
      name: 'Mini Quiche de Espinaca y Queso de Cabra',
      description: 'Mini quiche artesanal con espinaca fresca, queso de cabra cremoso y masa hojaldre casera. Horneado a la perfección.',
      price: 3800000, // $38.000 CLP
      categoryId: categories[1].id,
      imageUrl: 'https://cdn.abacus.ai/images/b022653f-93a8-4138-96d8-ebbe28f292ce.png',
      slug: 'mini-quiche-espinaca-cabra',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Mini Quiche Lorraine',
      description: 'Clásico quiche lorraine en formato individual con tocino ahumado, queso gruyère y crema fresca en masa quebrada.',
      price: 4000000, // $40.000 CLP
      categoryId: categories[1].id,
      imageUrl: 'https://cdn.abacus.ai/images/96fc0916-7595-4210-8355-3ed862147c9c.png',
      slug: 'mini-quiche-lorraine',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Mini Quiche de Champiñones y Gruyère',
      description: 'Exquisito mini quiche con mezcla de champiñones salteados, queso gruyère maduro y hierbas frescas.',
      price: 4100000, // $41.000 CLP
      categoryId: categories[1].id,
      imageUrl: 'https://cdn.abacus.ai/images/14da611a-8d5c-422a-854d-7a47c965e39f.png',
      slug: 'mini-quiche-champinones-gruyere',
      featured: false,
      stock: 999,
      available: true
    },

    // Mini Empanadas
    {
      name: 'Mini Empanadas de Queso',
      description: 'Tradicionales empanadas chilenas en tamaño gourmet, rellenas con queso derretido y especias. Masa dorada y crocante.',
      price: 3200000, // $32.000 CLP
      categoryId: categories[2].id,
      imageUrl: 'https://cdn.abacus.ai/images/7eacfd33-0bae-4e8c-9e17-6cad75726417.png',
      slug: 'mini-empanadas-queso',
      featured: false,
      stock: 999,
      available: true
    },
    {
      name: 'Mini Empanadas de Pino',
      description: 'Auténticas empanadas de pino en formato mini, con carne molida, cebolla, huevo duro y aceitunas. Receta tradicional.',
      price: 3500000, // $35.000 CLP
      categoryId: categories[2].id,
      imageUrl: 'https://cdn.abacus.ai/images/b146b254-d5a6-4701-beb4-9696a2223c54.png',
      slug: 'mini-empanadas-pino',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Mini Empanadas de Camarón',
      description: 'Elegantes empanadas gourmet rellenas con camarones frescos, palta y salsa especial. Perfectas para eventos especiales.',
      price: 4800000, // $48.000 CLP
      categoryId: categories[2].id,
      imageUrl: 'https://cdn.abacus.ai/images/8fabc3ac-54c6-46c3-aebc-052d23326159.png',
      slug: 'mini-empanadas-camaron',
      featured: true,
      stock: 999,
      available: true
    },

    // Petit Fours Dulces
    {
      name: 'Petit Fours de Chocolate Belga',
      description: 'Exquisitos petit fours elaborados con chocolate belga premium, con acabado brillante y decoración artesanal.',
      price: 4200000, // $42.000 CLP
      categoryId: categories[3].id,
      imageUrl: 'https://cdn.abacus.ai/images/99630e89-0e66-4c60-a12a-027709125690.png',
      slug: 'petit-fours-chocolate-belga',
      featured: true,
      stock: 999,
      available: true
    },
    {
      name: 'Petit Fours de Frutos Rojos',
      description: 'Delicados petit fours con mousse de frutos rojos frescos, glaseado natural y decoración con frutas del bosque.',
      price: 4000000, // $40.000 CLP
      categoryId: categories[3].id,
      imageUrl: 'https://cdn.abacus.ai/images/d58f0e22-fc93-4340-af01-b7b35df7c859.png',
      slug: 'petit-fours-frutos-rojos',
      featured: false,
      stock: 999,
      available: true
    },
    {
      name: 'Petit Fours de Limón',
      description: 'Refrescantes petit fours de limón con glaseado cítrico, elaborados con limones orgánicos y crema pastelera artesanal.',
      price: 3900000, // $39.000 CLP
      categoryId: categories[3].id,
      imageUrl: 'https://cdn.abacus.ai/images/ad026488-b721-4eab-9ecb-a787ffbd435f.png',
      slug: 'petit-fours-limon',
      featured: false,
      stock: 999,
      available: true
    }
  ]

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData
    })
  }

  console.log(`✅ ${products.length} productos creados`)

  // Create admin user
  console.log('👤 Creando usuarios administradores...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const hashedPasswordTest = await bcrypt.hash('johndoe123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@saboremilia.cl' },
    update: {},
    create: {
      email: 'admin@saboremilia.cl',
      name: 'Administrador Sabor Emilia',
      password: hashedPassword,
      role: 'admin'
    }
  })

  // Create test user (required for testing)
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      password: hashedPasswordTest,
      role: 'admin'
    }
  })

  console.log('✅ Usuarios administradores creados')

  // Create configuration entries
  console.log('⚙️ Creando configuración inicial...')
  const configs = [
    {
      key: 'shipping_cost',
      value: '3000',
      description: 'Costo de envío en CLP (centavos)'
    },
    {
      key: 'free_shipping_threshold',
      value: '5000000',
      description: 'Monto mínimo para envío gratis en CLP (centavos)'
    },
    {
      key: 'business_name',
      value: 'Coctelería Sabor Emilia',
      description: 'Nombre del negocio'
    },
    {
      key: 'business_phone',
      value: '+56 9 7859 4407',
      description: 'Teléfono del negocio'
    },
    {
      key: 'business_email',
      value: 'contacto.cocteleria.saboremilia@gmail.com',
      description: 'Email del negocio'
    },
    {
      key: 'business_address',
      value: 'Villa Alemana, V Región de Valparaíso',
      description: 'Dirección del negocio'
    }
  ]

  for (const config of configs) {
    await prisma.configuration.upsert({
      where: { key: config.key },
      update: {},
      create: config
    })
  }

  console.log(`✅ ${configs.length} configuraciones creadas`)

  console.log('🎉 Seed completado exitosamente!')
  console.log('\n📋 Resumen:')
  console.log(`   • ${categories.length} categorías`)
  console.log(`   • ${products.length} productos`) 
  console.log(`   • 2 usuarios administradores`)
  console.log(`   • ${configs.length} configuraciones`)
  console.log('\n🔑 Credenciales de acceso:')
  console.log('   • Email: admin@saboremilia.cl')
  console.log('   • Contraseña: admin123')
  console.log('   • URL Admin: http://localhost:3000/admin')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
