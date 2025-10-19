
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Mail, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

function PendingContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams?.get('order')

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Pending Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="bg-yellow-500 rounded-full p-6">
              <Clock className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          {/* Pending Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Pago Pendiente
            </h1>
            <p className="text-xl text-gray-600">
              Tu pago está siendo procesado
            </p>
          </motion.div>

          {/* Order Details */}
          {orderNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Card className="text-left">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Pedido #{orderNumber}
                    </h2>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                      Pendiente
                    </span>
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <p>
                      <strong>Estado:</strong> Esperando confirmación de pago
                    </p>
                    <p className="text-sm">
                      Algunos métodos de pago pueden tomar tiempo en procesarse. 
                      Te notificaremos una vez que se confirme.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-white rounded-lg p-6 text-left"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              ¿Qué significa esto?
            </h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-1 flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-sm">
                  Tu pedido ha sido recibido y está reservado
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-1 flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-sm">
                  El pago está siendo verificado por el banco
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-1 flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-sm">
                  Recibirás una notificación cuando se confirme
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-amber-50 rounded-lg p-6"
          >
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Tiempos de Procesamiento
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Transferencia bancaria:</span>
                <span className="font-medium">2-3 días hábiles</span>
              </div>
              <div className="flex justify-between">
                <span>Pago en efectivo:</span>
                <span className="font-medium">1-2 días hábiles</span>
              </div>
              <div className="flex justify-between">
                <span>Tarjeta de débito:</span>
                <span className="font-medium">Algunas horas</span>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="border-t pt-6 space-y-4"
          >
            <h3 className="font-semibold text-gray-900">
              ¿Necesitas ayuda?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+56 9 7859 4407</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>contacto.cocteleria.saboremilia@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/catalogo">
              <Button size="lg" className="button-hover">
                Seguir Comprando
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" size="lg" className="button-hover">
                Contactar Soporte
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentPendingPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
          </div>
        }>
          <PendingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
