
'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Package, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams?.get('order')
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderNumber) {
      fetchOrderData(orderNumber)
    }
  }, [orderNumber])

  const fetchOrderData = async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders/${orderNumber}`)
      if (response.ok) {
        const data = await response.json()
        setOrderData(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="bg-green-500 rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              ¡Pago Exitoso!
            </h1>
            <p className="text-xl text-gray-600">
              Tu pedido ha sido confirmado y está siendo procesado
            </p>
          </motion.div>

          {/* Order Details */}
          {orderData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Card className="text-left">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Pedido #{orderData.orderNumber}
                    </h2>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      Confirmado
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700">Cliente:</p>
                      <p className="text-gray-600">{orderData.customerName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-600">{orderData.customerEmail}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Dirección:</p>
                      <p className="text-gray-600">
                        {orderData.shippingAddress}, {orderData.shippingCommune}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">Total:</p>
                      <p className="text-gray-600 font-semibold text-lg">
                        ${new Intl.NumberFormat('es-CL').format(orderData.total / 100)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-white rounded-lg p-6 text-left"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              ¿Qué sigue ahora?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Preparación</h4>
                  <p className="text-gray-600 text-sm">
                    Nuestro equipo comenzará a preparar tu pedido inmediatamente
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Entrega</h4>
                  <p className="text-gray-600 text-sm">
                    Recibirás tu pedido en 24-48 horas en la dirección especificada
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

          {/* Email Notification */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-sm text-gray-500"
          >
            <p>
              También te enviamos un email de confirmación con los detalles de tu pedido.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
