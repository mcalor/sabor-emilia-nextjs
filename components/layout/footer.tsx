
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <span className="font-bold text-xl">Sabor Emilia</span>
            </div>
            <p className="text-gray-400 mb-4">
              Tu destino gourmet en Villa Alemana. Especialistas en coctelería 
              y catering de alta calidad para eventos especiales.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" />
                <span>Villa Alemana, V Región</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+56 9 7859 4407</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>contacto.cocteleria.saboremilia@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <div className="space-y-2">
              <Link
                href="/catalogo"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Catálogo
              </Link>
              <Link
                href="/contacto"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contacto
              </Link>
              <Link
                href="/politicas"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Políticas
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Coctelería Sabor Emilia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
