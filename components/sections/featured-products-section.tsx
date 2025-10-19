
'use client'

import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const featuredProducts = [
  {
    id: '1',
    name: 'Canapé de Salmón Ahumado',
    description: 'Delicioso canapé con salmón ahumado, eneldo fresco y base crocante',
    price: 45000,
    imageUrl: 'https://cdn.abacus.ai/images/30a9cda6-f0f4-47a8-ace3-04b4ecf0aba5.png',
    category: 'Canapés',
    slug: 'canape-salmon-ahumado'
  },
  {
    id: '2',
    name: 'Mini Quiche de Espinaca',
    description: 'Mini quiche artesanal relleno de espinaca fresca y queso de cabra',
    price: 38000,
    imageUrl: 'https://cdn.abacus.ai/images/b022653f-93a8-4138-96d8-ebbe28f292ce.png',
    category: 'Mini Quiches',
    slug: 'mini-quiche-espinaca'
  },
  {
    id: '3',
    name: 'Petit Fours de Chocolate',
    description: 'Exquisitos petit fours de chocolate belga con acabado brillante',
    price: 42000,
    imageUrl: 'https://cdn.abacus.ai/images/99630e89-0e66-4c60-a12a-027709125690.png',
    category: 'Petit Fours',
    slug: 'petit-fours-chocolate'
  },
  {
    id: '4',
    name: 'Mini Empanadas de Pino',
    description: 'Tradicionales empanadas chilenas en formato gourmet, relleno casero',
    price: 35000,
    imageUrl: 'https://cdn.abacus.ai/images/b146b254-d5a6-4701-beb4-9696a2223c54.png',
    category: 'Mini Empanadas',
    slug: 'mini-empanadas-pino'
  }
]

export function FeaturedProductsSection() {
  return (
    <section className="py-20 bg-sage">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Productos <span className="text-primary">Destacados</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una selección especial de nuestros productos más populares, 
            perfectos para cualquier ocasión especial.
          </p>
        </motion.div>

        <div className="product-grid mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/catalogo">
            <Button size="lg" className="button-hover">
              Ver Catálogo Completo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
