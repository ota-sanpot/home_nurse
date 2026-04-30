import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  category: string
  date: string
}

export type Article = {
  frontmatter: ArticleMeta
  content: string
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  if (!fs.existsSync(articlesDir)) return []

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'))

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(articlesDir, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      category: data.category ?? '',
      date: data.date ?? '',
    } satisfies ArticleMeta
  })

  return articles.sort((a, b) => (a.date >= b.date ? -1 : 1))
}

export async function getArticlesByCategory(categoryName: string): Promise<ArticleMeta[]> {
  const all = await getAllArticles()
  return all.filter((a) => a.category === categoryName)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const filePath = path.join(articlesDir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    frontmatter: {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      category: data.category ?? '',
      date: data.date ?? '',
    },
    content,
  }
}
