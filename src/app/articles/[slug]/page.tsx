import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AffiliateCTA from '@/components/AffiliateCTA'
import ArticleBody from '@/components/ArticleBody'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const { frontmatter, content } = article

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <span className="text-xs text-rose-primary font-medium border border-rose-accent rounded-full px-2 py-0.5">
        {frontmatter.category}
      </span>
      <h1 className="mt-3 text-xl font-bold text-rose-text leading-snug">{frontmatter.title}</h1>
      <p className="mt-1 text-xs text-gray-400">{frontmatter.date}</p>

      <div className="mt-8">
        <ArticleBody>
          <MDXRemote
            source={content}
            components={{ AffiliateCTA }}
          />
        </ArticleBody>
      </div>

      <AffiliateCTA
        title="訪問看護の求人を無料でチェックしよう"
        description="あなたに合った訪問看護の求人を、無料で探してみましょう。"
        href="https://affiliate-link.example.com"
        buttonText="無料で求人を見る →"
      />
    </div>
  )
}
