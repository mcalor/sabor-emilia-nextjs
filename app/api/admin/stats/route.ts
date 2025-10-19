
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Get statistics in parallel
    const [
      totalProducts,
      totalOrders,
      totalContacts,
      totalRevenue,
      pendingOrders,
      completedOrders,
      cancelledOrders
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.contact.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'PAID' }
      }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: { in: ['CONFIRMED', 'DELIVERED'] } } }),
      prisma.order.count({ where: { status: 'CANCELLED' } })
    ])

    const stats = {
      totalProducts,
      totalOrders,
      totalContacts,
      totalRevenue: Number(totalRevenue._sum.total || 0),
      pendingOrders,
      completedOrders,
      cancelledOrders
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
