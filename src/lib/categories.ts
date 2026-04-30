export type CategoryConfig = {
  slug: string
  name: string
  description: string
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: 'hospital-transfer',
    name: '病院からの転職',
    description: '病院から訪問看護への転職方法・体験談・注意点をまとめています。',
  },
  {
    slug: 'salary',
    name: '給与・待遇',
    description: '訪問看護師の年収・手当・オンコール費用など待遇面を詳しく解説。',
  },
  {
    slug: 'blank-nurse',
    name: 'ブランク明け',
    description: 'ブランクを経て訪問看護に復職したい看護師向けのガイド記事。',
  },
  {
    slug: 'job-sites',
    name: '転職サイト比較',
    description: '訪問看護求人に強い転職サービスをランキング形式で紹介。',
  },
]

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategorySlug(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.slug ?? ''
}
