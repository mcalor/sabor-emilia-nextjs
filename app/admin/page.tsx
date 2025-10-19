
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { AdminDashboard } from './_components/admin-dashboard'
import { AdminLayout } from './_components/admin-layout'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Panel de Administración - Coctelería Sabor Emilia',
  description: 'Gestión de productos, pedidos y configuración'
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}
