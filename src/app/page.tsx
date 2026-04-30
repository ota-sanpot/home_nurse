import HeroSection from '@/components/HeroSection'
import CategorySection from '@/components/CategorySection'
import AffiliateCTA from '@/components/AffiliateCTA'
import { getAllArticles } from '@/lib/articles'
import { CATEGORIES } from '@/lib/categories'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <>
      <HeroSection />
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">
        {CATEGORIES.map((category) => {
          const categoryArticles = articles.filter((a) => a.category === category.name)
          return (
            <CategorySection
              key={category.slug}
              category={category}
              articles={categoryArticles}
            />
          )
        })}
        <AffiliateCTA
          title="訪問看護への転職を無料でサポート"
          description="専任のキャリアアドバイザーが、あなたの条件に合った訪問看護ステーションを無料で紹介します。"
          href="https://affiliate-link.example.com"
          buttonText="無料で相談してみる →"
        />
      </div>
    </>
  )
}
