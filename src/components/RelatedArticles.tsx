import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

export default function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-base font-bold text-rose-text mb-4 border-l-4 border-rose-primary pl-3">
        関連記事
      </h2>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="flex items-start gap-3 bg-white border border-rose-accent rounded-xl p-4 hover:shadow-sm transition-shadow group"
          >
            <span className="shrink-0 text-xs text-rose-primary font-medium border border-rose-accent rounded-full px-2 py-0.5 mt-0.5">
              {article.category}
            </span>
            <span className="text-sm font-medium text-rose-text group-hover:text-rose-primary transition-colors leading-snug">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
