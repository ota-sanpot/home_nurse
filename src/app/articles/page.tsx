import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: '記事一覧',
  description: '訪問看護転職に関するすべての記事をご覧いただけます。',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-rose-text mb-6">記事一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
