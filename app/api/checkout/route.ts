
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPreference } from '@/lib/mercadopago'


export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, customer, subtotal, shippingCost, total } = body

    if (!items || !customer || !subtotal || !total) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = `SE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Create order in database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail: customer.customerEmail,
        customerName: customer.customerName,
        customerPhone: customer.customerPhone,
        shippingAddress: customer.shippingAddress,
        shippingCommune: customer.shippingCommune,
        subtotal: Math.round(subtotal),
        shippingCost: Math.round(shippingCost),
        total: Math.round(total),
        notes: customer.notes || null,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: Math.round(item.price),
            total: Math.round(item.price * item.quantity)
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    // Create MercadoPago preference
    const preferenceData = {
      items: items.map((item: any) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price
      })),
      payer: {
        email: customer.customerEmail
      },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/success?order=${orderNumber}`,
        failure: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/failure?order=${orderNumber}`,
        pending: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/pending?order=${orderNumber}`
      },
      auto_return: 'approved' as const,
      external_reference: order.id,
    }

    // Add shipping item if applicable
    if (shippingCost > 0) {
      preferenceData.items.push({
        title: 'Envío',
        quantity: 1,
        unit_price: shippingCost
      })
    }

    const preference = await createPreference(preferenceData)

    // Update order with MercadoPago preference ID
    await prisma.order.update({
      where: { id: order.id },
      data: { mercadoPagoId: preference.id }
    })

    return NextResponse.json({
      orderNumber: order.orderNumber,
      preferenceId: preference.id,
      initPoint: process.env.NODE_ENV === 'production' ? preference.init_point : preference.sandbox_init_point
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
