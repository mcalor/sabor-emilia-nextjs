
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChefHat } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sage via-cream to-gold">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_40%)] bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_40%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm">
              <ChefHat className="h-16 w-16 text-primary" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
              <span className="text-primary">Sabor</span> Emilia
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Tu destino <span className="font-semibold text-primary">gourmet</span> en Villa Alemana
            </p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Especialistas en canapés, mini quiches, mini empanadas y petit fours dulces 
            para convertir tus eventos en experiencias gastronómicas inolvidables.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/catalogo">
              <Button size="lg" className="button-hover text-lg px-8 py-4 h-auto">
                Ver Catálogo
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="button-hover text-lg px-8 py-4 h-auto">
                Contactar
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
