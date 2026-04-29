import { getAllArticles } from '@/lib/articles'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = 'https://home-nurse.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/articles`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${BASE_URL}/articles/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ]
}
