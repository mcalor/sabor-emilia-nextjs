
'use client'

import { motion } from 'framer-motion'
import { Truck, Clock, MapPin, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const shippingFeatures = [
  {
    icon: Truck,
    title: 'Despacho Gratuito',
    description: 'Entregas sin costo en Villa Alemana y comunas cercanas'
  },
  {
    icon: Clock,
    title: 'Entrega Programada',
    description: 'Coordinamos la entrega en el horario que mejor te convenga'
  },
  {
    icon: MapPin,
    title: 'Cobertura Regional',
    description: 'Atendemos toda la V Región con servicios especializados'
  },
  {
    icon: Phone,
    title: 'Seguimiento',
    description: 'Te mantenemos informado del estado de tu pedido'
  }
]

export function ShippingInfo() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Información de <span className="text-primary">Despacho</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nos preocupamos por que recibas tus productos en perfectas condiciones 
            y en el momento que lo necesites.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shippingFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center card-hover">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Horarios de Atención y Despacho
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Horarios de Pedidos</h4>
                <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-600">Sábados: 9:00 - 14:00</p>
                <p className="text-gray-600">Domingos: Solo urgencias</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tiempo de Preparación</h4>
                <p className="text-gray-600">Pedidos estándar: 24-48 horas</p>
                <p className="text-gray-600">Eventos grandes: 3-5 días</p>
                <p className="text-gray-600">Urgencias: Consultar disponibilidad</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
