
import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CatalogClient } from './_components/catalog-client'
import { CatalogSkeleton } from './_components/catalog-skeleton'

export const dynamic = 'force-dynamic'

export default async function CatalogPage({
  searchParams
}: {
  searchParams: { categoria?: string; q?: string }
}) {
  // Get categories and products
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.product.findMany({
      where: {
        available: true,
        ...(searchParams?.categoria && {
          category: {
            slug: searchParams.categoria
          }
        }),
        ...(searchParams?.q && {
          OR: [
            { name: { contains: searchParams.q, mode: 'insensitive' } },
            { description: { contains: searchParams.q, mode: 'insensitive' } }
          ]
        })
      },
      include: {
        category: true
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    })
  ])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Suspense fallback={<CatalogSkeleton />}>
            <CatalogClient 
              initialProducts={products} 
              categories={categories}
              initialCategory={searchParams?.categoria}
              initialSearch={searchParams?.q}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
