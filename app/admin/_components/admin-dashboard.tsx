
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalContacts: number
  totalRevenue: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/recent-orders')
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        setRecentOrders(ordersData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Productos',
      value: stats?.totalProducts || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pedidos Totales',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Consultas',
      value: stats?.totalContacts || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Ingresos Totales',
      value: `$${new Intl.NumberFormat('es-CL').format((stats?.totalRevenue || 0) / 100)}`,
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  const orderStatusCards = [
    {
      title: 'Pendientes',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Completados',
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Cancelados',
      value: stats?.cancelledOrders || 0,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Resumen general de tu negocio
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {card.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${card.bgColor}`}>
                      <Icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Order Status Stats */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Estado de Pedidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {orderStatusCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${card.bgColor}`}>
                        <Icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {card.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos Recientes</CardTitle>
            <Link href="/admin/pedidos">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customerName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${new Intl.NumberFormat('es-CL').format(order.total / 100)}
                      </p>
                      <span className={`
                        inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${order.status === 'CONFIRMED' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                        }
                      `}>
                        {order.status === 'CONFIRMED' ? 'Confirmado' : 
                         order.status === 'PENDING' ? 'Pendiente' : order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No hay pedidos recientes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/admin/productos">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Gestionar Productos
                </Button>
              </Link>
              
              <Link href="/admin/pedidos">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ver Pedidos
                </Button>
              </Link>
              
              <Link href="/admin/contactos">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Consultas
                </Button>
              </Link>
              
              <Link href="/admin/configuracion">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
