
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CheckoutClient } from './_components/checkout-client'

export const metadata = {
  title: 'Checkout - Coctelería Sabor Emilia',
  description: 'Finaliza tu compra de productos gourmet'
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CheckoutClient />
        </div>
      </main>
      <Footer />
    </>
  )
}
