import Link from 'next/link'
import ArticleCard from './ArticleCard'
import type { ArticleMeta } from '@/lib/articles'
import type { CategoryConfig } from '@/lib/categories'

type Props = {
  category: CategoryConfig
  articles: ArticleMeta[]
}

export default function CategorySection({ category, articles }: Props) {
  if (articles.length === 0) return null

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-rose-text border-l-4 border-rose-primary pl-3">
            {category.name}
          </h2>
          <p className="mt-1 text-xs text-gray-400 pl-3">{category.description}</p>
        </div>
        <Link
          href={`/articles/category/${category.slug}`}
          className="shrink-0 text-xs text-rose-primary hover:text-rose-dark border border-rose-accent rounded-full px-3 py-1 transition-colors"
        >
          もっと見る →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.slice(0, 3).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
