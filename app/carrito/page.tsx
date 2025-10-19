
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartClient } from './_components/cart-client'

export const metadata = {
  title: 'Carrito de Compras - Coctelería Sabor Emilia',
  description: 'Revisa y confirma tu pedido de productos gourmet'
}

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CartClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
