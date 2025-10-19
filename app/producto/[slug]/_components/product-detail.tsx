
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Plus, Minus, ArrowLeft, Share2 } from 'lucide-react'
import { CartManager } from '@/lib/cart'
import { formatPrice } from '@/lib/mercadopago'
import { useToast } from '@/hooks/use-toast'
import { ProductCard } from '@/components/ui/product-card'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  slug: string
  category: {
    name: string
    slug: string
  }
}

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    try {
      CartManager.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl ?? undefined
      }, quantity)

      toast({
        title: "¡Producto agregado!",
        description: `${quantity} unidad${quantity > 1 ? 'es' : ''} de ${product.name} agregada${quantity > 1 ? 's' : ''} al carrito`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el producto al carrito",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description || `Descubre ${product.name} en Coctelería Sabor Emilia`,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace del producto se copió al portapapeles",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 text-sm text-gray-600 mb-8"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-primary transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <Link 
          href={`/catalogo?categoria=${product.category.slug}`}
          className="hover:text-primary transition-colors"
        >
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </motion.nav>

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      </motion.div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-lg">Sin imagen</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category.name}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description || 'Producto sin descripción disponible.'}
            </p>
          </div>

          <Separator />

          {/* Price */}
          <div className="text-4xl font-bold text-primary">
            {formatPrice(product.price)}
            <span className="text-lg font-normal text-gray-500 ml-2">
              por docena
            </span>
          </div>

          <Separator />

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad (docenas)
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 button-hover"
                onClick={handleAddToCart}
                disabled={isLoading}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Product Features */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Características:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Elaborado con ingredientes premium</li>
              <li>• Preparación artesanal</li>
              <li>• Perfecto para eventos y celebraciones</li>
              <li>• Entrega fresca garantizada</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            También te puede <span className="text-primary">interesar</span>
          </h2>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={{
                  ...relatedProduct,
                  description: relatedProduct.description || '',
                  category: relatedProduct.category.name
                }}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
