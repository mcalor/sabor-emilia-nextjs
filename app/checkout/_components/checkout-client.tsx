
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreditCard, MapPin, User, Phone, Mail, ShoppingBag } from 'lucide-react'
import { CartManager, type CartItem } from '@/lib/cart'
import { formatPrice } from '@/lib/mercadopago'
import { useToast } from '@/hooks/use-toast'

const SHIPPING_COST = 3000 // CLP

const communes = [
  'Villa Alemana',
  'Quilpué',
  'Valparaíso',
  'Viña del Mar',
  'Concón',
  'Quintero',
  'Puchuncaví',
  'Limache',
  'Olmué',
  'Casablanca'
]

interface FormData {
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCommune: string
  notes: string
}

export function CheckoutClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCommune: 'Villa Alemana',
    notes: ''
  })

  useEffect(() => {
    const items = CartManager.getCart()
    if (items.length === 0) {
      router.push('/catalogo')
      return
    }
    setCartItems(items)
  }, [router])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = ['customerName', 'customerEmail', 'customerPhone', 'shippingAddress', 'shippingCommune']
    
    for (const field of requiredFields) {
      if (!formData[field]?.trim()) {
        toast({
          title: "Campos incompletos",
          description: `Por favor completa el campo ${getFieldLabel(field)}`,
          variant: "destructive"
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.customerEmail)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      })
      return false
    }

    return true
  }

  const getFieldLabel = (field: keyof FormData): string => {
    const labels = {
      customerName: 'Nombre completo',
      customerEmail: 'Email',
      customerPhone: 'Teléfono',
      shippingAddress: 'Dirección',
      shippingCommune: 'Comuna',
      notes: 'Notas'
    }
    return labels[field]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const orderData = {
        items: cartItems,
        customer: formData,
        subtotal,
        shippingCost: SHIPPING_COST,
        total
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Error al procesar el pedido')
      }

      const { preferenceId, initPoint } = await response.json()

      // Clear cart and redirect to MercadoPago
      CartManager.clearCart()
      
      if (initPoint) {
        window.location.href = initPoint
      } else {
        throw new Error('No se pudo generar el enlace de pago')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Error en el checkout",
        description: "Hubo un problema al procesar tu pedido. Inténtalo nuevamente.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const total = subtotal + SHIPPING_COST

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          No hay productos en el carrito
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Agrega algunos productos antes de proceder al checkout.
        </p>
        <Button onClick={() => router.push('/catalogo')} size="lg">
          Ver Catálogo
        </Button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Finalizar Compra
        </h1>
        <p className="text-gray-600">
          Completa tus datos para proceder con el pago
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Nombre Completo *</Label>
                  <Input
                    id="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      placeholder="tu@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="customerPhone">Teléfono *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Información de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shippingAddress">Dirección de Entrega *</Label>
                  <Input
                    id="shippingAddress"
                    type="text"
                    value={formData.shippingAddress}
                    onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                    placeholder="Calle, número, depto (si aplica)"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="shippingCommune">Comuna *</Label>
                  <Select
                    value={formData.shippingCommune}
                    onValueChange={(value) => handleInputChange('shippingCommune', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu comuna" />
                    </SelectTrigger>
                    <SelectContent>
                      {communes.map((commune) => (
                        <SelectItem key={commune} value={commune}>
                          {commune}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notas Adicionales</Label>
                  <Input
                    id="notes"
                    type="text"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full button-hover"
              disabled={isLoading}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              {isLoading ? 'Procesando...' : 'Proceder al Pago'}
            </Button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.quantity} docena{item.quantity > 1 ? 's' : ''}</p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
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

              <div className="text-xs text-gray-500 space-y-1">
                <p>• Pago seguro con MercadoPago</p>
                <p>• Entrega en 24-48 horas</p>
                <p>• Productos frescos garantizados</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
