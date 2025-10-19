
import { AuthClient } from './_components/auth-client'

export const metadata = {
  title: 'Iniciar Sesión - Coctelería Sabor Emilia',
  description: 'Acceso al panel de administración'
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage via-cream to-gold">
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthClient />
      </div>
    </div>
  )
}
