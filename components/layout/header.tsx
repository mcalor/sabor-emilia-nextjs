
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartManager } from '@/lib/cart'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const pathname = usePathname()

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Contacto', href: '/contacto' },
  ]

  useEffect(() => {
    // Load initial cart count
    setCartItemCount(CartManager.getItemCount())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartItemCount(CartManager.getItemCount())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('cartUpdated', handleCartUpdate)
      return () => window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SE</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              Sabor Emilia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link href="/carrito">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
