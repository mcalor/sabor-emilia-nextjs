
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { CartManager } from '@/lib/cart'
import { formatPrice } from '@/lib/mercadopago'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string | null
  category?: string
  slug: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsLoading(true)
    
    try {
      CartManager.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl ?? undefined
      })

      toast({
        title: "¡Producto agregado!",
        description: `${product.name} se agregó al carrito`,
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

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/producto/${product.slug}`}>
        <Card className="group card-hover cursor-pointer h-full overflow-hidden">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted overflow-hidden">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Sin imagen</span>
                </div>
              )}
              
              {/* Quick Add to Cart Button */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  className="button-hover shadow-lg"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="mb-2">
                {product.category && (
                  <span className="text-xs text-primary font-medium">
                    {product.category}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="button-hover"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
