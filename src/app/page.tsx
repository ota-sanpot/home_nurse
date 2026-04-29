import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <>
      <HeroSection />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-base font-bold text-rose-text mb-5">注目記事</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}
