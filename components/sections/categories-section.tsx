
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    id: 'canapes',
    name: 'Canapés',
    description: 'Bocados gourmet con ingredientes premium',
    image: 'https://cdn.abacus.ai/images/30a9cda6-f0f4-47a8-ace3-04b4ecf0aba5.png',
    href: '/catalogo?categoria=canapes'
  },
  {
    id: 'mini-quiches',
    name: 'Mini Quiches',
    description: 'Deliciosas tartas individuales horneadas',
    image: 'https://cdn.abacus.ai/images/b022653f-93a8-4138-96d8-ebbe28f292ce.png',
    href: '/catalogo?categoria=mini-quiches'
  },
  {
    id: 'mini-empanadas',
    name: 'Mini Empanadas',
    description: 'Tradición chilena en formato gourmet',
    image: 'https://cdn.abacus.ai/images/7eacfd33-0bae-4e8c-9e17-6cad75726417.png',
    href: '/catalogo?categoria=mini-empanadas'
  },
  {
    id: 'petit-fours',
    name: 'Petit Fours Dulces',
    description: 'Exquisitas creaciones dulces artesanales',
    image: 'https://cdn.abacus.ai/images/99630e89-0e66-4c60-a12a-027709125690.png',
    href: '/catalogo?categoria=petit-fours'
  }
]

export function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestras <span className="text-primary">Especialidades</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de productos gourmet, cuidadosamente elaborados 
            con los mejores ingredientes para deleitar tus sentidos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <Card className="group card-hover cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-muted rounded-t-lg overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
