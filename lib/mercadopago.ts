
export interface MercadoPagoPreference {
  id: string
  init_point: string
  sandbox_init_point: string
}

export interface CreatePreferenceData {
  items: Array<{
    title: string
    quantity: number
    unit_price: number
  }>
  payer: {
    email: string
  }
  back_urls: {
    success: string
    failure: string
    pending: string
  }
  auto_return: string
  external_reference: string
}

export async function createPreference(data: CreatePreferenceData): Promise<MercadoPagoPreference> {
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('MercadoPago API Error:', errorText)
    throw new Error(`Failed to create preference: ${response.status}`)
  }

  return response.json()
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(price)
}

export function formatPriceSimple(price: number): string {
  return new Intl.NumberFormat('es-CL').format(price)
}

export function centsToPesos(cents: number): number {
  return cents / 100
}

export function pesosToCents(pesos: number): number {
  return Math.round(pesos * 100)
}
