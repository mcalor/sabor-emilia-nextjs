
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'
import { CartManager, type CartItem } from '@/lib/cart'
import { formatPrice } from '@/lib/mercadopago'

const SHIPPING_COST = 3000 // CLP

export function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCartItems(CartManager.getCart())
    setIsLoading(false)

    const handleCartUpdate = () => {
      setCartItems(CartManager.getCart())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', handleCartUpdate)
      return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    CartManager.updateQuantity(productId, newQuantity)
  }

  const removeItem = (productId: string) => {
    CartManager.removeItem(productId)
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const total = subtotal + (cartItems.length > 0 ? SHIPPING_COST : 0)

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando carrito...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Descubre nuestros deliciosos productos gourmet y comienza a llenar tu carrito.
        </p>
        <Link href="/catalogo">
          <Button size="lg" className="button-hover">
            Explorar Catálogo
          </Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Carrito de Compras
        </h1>
        <p className="text-gray-600">
          {cartItems.length} producto{cartItems.length > 1 ? 's' : ''} en tu carrito
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">Sin imagen</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} por docena
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Resumen del Pedido
              </h2>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{formatPrice(SHIPPING_COST)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full button-hover">
                  Proceder al Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>

              <Link href="/catalogo" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>• Entrega en Villa Alemana y comunas cercanas</p>
                <p>• Productos frescos garantizados</p>
                <p>• Pago seguro con MercadoPago</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
