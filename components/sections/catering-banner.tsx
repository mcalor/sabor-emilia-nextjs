
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar, Users, ChefHat } from 'lucide-react'
import Link from 'next/link'

export function CateringBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_60%)] bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            Servicios de Catering para Eventos
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Transforma tu evento en una experiencia gastronómica inolvidable. 
            Ofrecemos servicios completos de catering para todo tipo de celebraciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eventos Corporativos</h3>
              <p className="opacity-80">Reuniones, conferencias y celebraciones empresariales</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Celebraciones Privadas</h3>
              <p className="opacity-80">Matrimonios, cumpleaños y eventos familiares</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Menús Personalizados</h3>
              <p className="opacity-80">Adaptamos nuestras propuestas a tus gustos y necesidades</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/contacto">
              <Button 
                size="lg" 
                variant="secondary" 
                className="button-hover text-primary hover:text-primary/90"
              >
                Solicitar Cotización
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
