
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/product-card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  slug: string
  featured: boolean
  category: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
}

interface CatalogClientProps {
  initialProducts: Product[]
  categories: Category[]
  initialCategory?: string
  initialSearch?: string
}

export function CatalogClient({ 
  initialProducts, 
  categories, 
  initialCategory = '',
  initialSearch = ''
}: CatalogClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('featured')

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...initialProducts]

    // Apply search filter
    if (search?.trim()) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.category.name.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.slug === selectedCategory
      )
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // featured
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
    }

    setProducts(filteredProducts)
  }, [search, selectedCategory, sortBy, initialProducts])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateURL({ categoria: category === 'all' ? undefined : category })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL({ q: search?.trim() || undefined })
  }

  const updateURL = (params: { categoria?: string; q?: string }) => {
    const url = new URLSearchParams(searchParams?.toString() || '')
    
    if (params.categoria) {
      url.set('categoria', params.categoria)
    } else {
      url.delete('categoria')
    }
    
    if (params.q) {
      url.set('q', params.q)
    } else {
      url.delete('q')
    }
    
    const queryString = url.toString()
    router.push(`/catalogo${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestro <span className="text-primary">Catálogo</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra selección completa de productos gourmet, 
          perfectos para tus eventos y celebraciones especiales.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Filters */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="name">Nombre A-Z</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="product-grid">
        {products?.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <ProductCard
              product={{
                ...product,
                description: product.description || '',
                category: product.category.name
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* No results */}
      {products.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 mb-6">
            Intenta con otros términos de búsqueda o ajusta los filtros.
          </p>
          <Button onClick={() => {
            setSearch('')
            setSelectedCategory('')
            router.push('/catalogo')
          }}>
            Ver todos los productos
          </Button>
        </motion.div>
      )}
    </div>
  )
}
