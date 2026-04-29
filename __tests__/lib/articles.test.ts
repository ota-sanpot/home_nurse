import { getAllArticles, getArticleBySlug } from '@/lib/articles'

describe('getAllArticles', () => {
  it('記事一覧を返す', async () => {
    const articles = await getAllArticles()
    expect(Array.isArray(articles)).toBe(true)
    expect(articles.length).toBeGreaterThan(0)
  })

  it('各記事にtitle・description・category・date・slugが含まれる', async () => {
    const articles = await getAllArticles()
    for (const article of articles) {
      expect(article.slug).toBeTruthy()
      expect(article.title).toBeTruthy()
      expect(article.description).toBeTruthy()
      expect(article.category).toBeTruthy()
      expect(article.date).toBeTruthy()
    }
  })

  it('dateの降順で並んでいる', async () => {
    const articles = await getAllArticles()
    for (let i = 0; i < articles.length - 1; i++) {
      expect(articles[i].date >= articles[i + 1].date).toBe(true)
    }
  })
})

describe('getArticleBySlug', () => {
  it('存在するslugでfrontmatterとcontentを返す', async () => {
    const articles = await getAllArticles()
    const firstSlug = articles[0].slug
    const result = await getArticleBySlug(firstSlug)
    expect(result).not.toBeNull()
    expect(result!.frontmatter.title).toBeTruthy()
    expect(result!.content).toBeTruthy()
  })

  it('存在しないslugでnullを返す', async () => {
    const result = await getArticleBySlug('non-existent-slug')
    expect(result).toBeNull()
  })
})
