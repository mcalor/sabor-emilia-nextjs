
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactClient } from './_components/contact-client'

export const metadata = {
  title: 'Contacto - Coctelería Sabor Emilia',
  description: 'Contáctanos para consultas, cotizaciones y servicios de catering gourmet en Villa Alemana'
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <ContactClient />
      </main>
      <Footer />
    </>
  )
}
