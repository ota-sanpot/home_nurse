import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getAllArticles } from '@/lib/articles'
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) return {}
  return {
    title: cat.name,
    description: cat.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const cat = getCategoryBySlug(slug)
  if (!cat) notFound()

  const all = await getAllArticles()
  const articles = all.filter((a) => a.category === cat.name)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'ホーム', href: '/' },
          { label: '記事一覧', href: '/articles' },
          { label: cat.name },
        ]}
      />
      <div className="mb-8">
        <span className="text-xs font-medium text-rose-primary border border-rose-accent rounded-full px-3 py-1">
          カテゴリ
        </span>
        <h1 className="mt-3 text-2xl font-bold text-rose-text">{cat.name}</h1>
        <p className="mt-2 text-sm text-gray-500">{cat.description}</p>
        <p className="mt-1 text-xs text-gray-400">{articles.length}件の記事</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
