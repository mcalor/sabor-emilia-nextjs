
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { XCircle, RefreshCw, ArrowLeft, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

function FailureContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams?.get('order')

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="bg-red-500 rounded-full p-6">
              <XCircle className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Pago No Completado
            </h1>
            <p className="text-xl text-gray-600">
              Hubo un problema al procesar tu pago
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Card className="text-left">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  ¿Qué pasó?
                </h2>
                <div className="space-y-3 text-gray-600">
                  <p>• El pago pudo ser rechazado por tu banco o tarjeta</p>
                  <p>• Los datos de la tarjeta podrían ser incorrectos</p>
                  <p>• La conexión se interrumpió durante el proceso</p>
                  <p>• No hay fondos suficientes en la cuenta</p>
                </div>

                {orderNumber && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">
                      Número de orden: {orderNumber}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Guarda este número para referencia
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-white rounded-lg p-6 text-left"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              ¿Cómo solucionarlo?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                  <RefreshCw className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Intenta nuevamente</h4>
                  <p className="text-gray-600 text-sm">
                    Verifica los datos de tu tarjeta y vuelve a intentar el pago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Método diferente</h4>
                  <p className="text-gray-600 text-sm">
                    Prueba con otra tarjeta o método de pago disponible
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/carrito">
              <Button size="lg" className="button-hover">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar Pago
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button variant="outline" size="lg" className="button-hover">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Catálogo
              </Button>
            </Link>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="border-t pt-6"
          >
            <p className="text-gray-600 mb-4">
              ¿Sigues teniendo problemas?
            </p>
            <Link href="/contacto">
              <Button variant="outline">
                Contactar Soporte
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentFailurePage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          </div>
        }>
          <FailureContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
