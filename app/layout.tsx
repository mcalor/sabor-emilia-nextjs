
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coctelería Sabor Emilia - Villa Alemana',
  description: 'Tu destino gourmet en Villa Alemana. Especialistas en canapés, mini quiches, mini empanadas y petit fours dulces para eventos y celebraciones.',
  keywords: 'coctelería, gourmet, Villa Alemana, canapés, mini quiches, empanadas, petit fours, eventos, catering',
  authors: [{ name: 'Coctelería Sabor Emilia' }],
  openGraph: {
    title: 'Coctelería Sabor Emilia - Villa Alemana',
    description: 'Tu destino gourmet en Villa Alemana. Especialistas en coctelería y catering de alta calidad.',
    type: 'website',
    locale: 'es_CL',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
