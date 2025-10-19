
import { HeroSection } from '@/components/sections/hero-section'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProductsSection } from '@/components/sections/featured-products-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CateringBanner } from '@/components/sections/catering-banner'
import { ShippingInfo } from '@/components/sections/shipping-info'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <TestimonialsSection />
        <CateringBanner />
        <ShippingInfo />
      </main>
      <Footer />
    </>
  )
}
