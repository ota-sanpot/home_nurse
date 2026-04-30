import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'
import { CATEGORIES } from '@/lib/categories'

export const metadata: Metadata = {
  title: '記事一覧',
  description: '訪問看護転職に関するすべての記事をご覧いただけます。',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-rose-text mb-4">記事一覧</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs font-medium bg-rose-primary text-white rounded-full px-3 py-1.5">
          すべて（{articles.length}件）
        </span>
        {CATEGORIES.map((cat) => {
          const count = articles.filter((a) => a.category === cat.name).length
          return (
            <Link
              key={cat.slug}
              href={`/articles/category/${cat.slug}`}
              className="text-xs font-medium text-rose-text border border-rose-accent rounded-full px-3 py-1.5 hover:bg-rose-bg hover:text-rose-primary transition-colors"
            >
              {cat.name}（{count}件）
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
