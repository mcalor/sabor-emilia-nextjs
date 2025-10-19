
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify webhook signature if needed
    // const signature = request.headers.get('x-signature')
    // const requestId = request.headers.get('x-request-id')
    
    console.log('MercadoPago Webhook received:', body)

    if (body.action === 'payment.created' || body.action === 'payment.updated') {
      const paymentId = body.data?.id
      
      if (!paymentId) {
        return NextResponse.json({ error: 'No payment ID provided' }, { status: 400 })
      }

      // Fetch payment details from MercadoPago API
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      })

      if (!response.ok) {
        console.error('Failed to fetch payment details from MercadoPago')
        return NextResponse.json({ error: 'Failed to fetch payment details' }, { status: 500 })
      }

      const payment = await response.json()
      
      // Find order by external reference (order ID)
      const orderId = payment.external_reference
      
      if (!orderId) {
        console.error('No external reference found in payment')
        return NextResponse.json({ error: 'No external reference' }, { status: 400 })
      }

      // Update order status based on payment status
      let paymentStatus = 'PENDING'
      let orderStatus = 'PENDING'

      switch (payment.status) {
        case 'approved':
          paymentStatus = 'PAID'
          orderStatus = 'CONFIRMED'
          break
        case 'pending':
          paymentStatus = 'PENDING'
          orderStatus = 'PENDING'
          break
        case 'rejected':
        case 'cancelled':
          paymentStatus = 'FAILED'
          orderStatus = 'CANCELLED'
          break
      }

      // Update order in database
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: paymentStatus as any,
          status: orderStatus as any,
          mercadoPagoStatus: payment.status,
          updatedAt: new Date()
        }
      })

      console.log(`Order ${orderId} updated: ${paymentStatus}`)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
