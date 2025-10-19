
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    event: 'Matrimonio',
    rating: 5,
    comment: 'Los canapés de Sabor Emilia fueron el éxito de nuestra boda. Todos nuestros invitados preguntaron por el servicio de catering.',
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    event: 'Evento Corporativo',
    rating: 5,
    comment: 'Excelente calidad y presentación. Las mini quiches fueron espectaculares, definitivamente volveremos a contratarlos.',
  },
  {
    id: 3,
    name: 'Ana Rodríguez',
    event: 'Cumpleaños',
    rating: 5,
    comment: 'Los petit fours dulces fueron una delicia. Perfectos para nuestra celebración familiar, muy recomendados.',
  }
]

export function TestimonialsSection() {
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
            Lo que dicen nuestros <span className="text-primary">clientes</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa. 
            Descubre por qué confían en nosotros para sus eventos especiales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4 italic">
                    "{testimonial.comment}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
