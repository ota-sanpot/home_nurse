import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

type Props = {
  article: ArticleMeta
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-white border border-rose-accent rounded-xl p-5 hover:shadow-md transition-shadow"
    >
      <span className="text-xs text-rose-primary font-medium border border-rose-accent rounded-full px-2 py-0.5">
        {article.category}
      </span>
      <h2 className="mt-2 text-sm font-bold text-rose-text leading-snug line-clamp-2">
        {article.title}
      </h2>
      <p className="mt-1 text-xs text-gray-400 line-clamp-2">{article.description}</p>
    </Link>
  )
}
