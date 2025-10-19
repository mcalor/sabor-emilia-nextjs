
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductDetail } from './_components/product-detail'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
      available: true
    },
    include: {
      category: true
    }
  })

  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      available: true
    },
    include: {
      category: true
    },
    take: 4,
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  )
}
