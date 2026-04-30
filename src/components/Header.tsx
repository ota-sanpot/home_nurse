import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export default function Header() {
  return (
    <header className="bg-white border-b border-rose-accent shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-rose-primary font-bold text-lg hover:text-rose-dark transition-colors">
            訪問看護転職ナビ
          </Link>
          <nav className="flex gap-6 text-sm text-rose-text">
            <Link href="/articles" className="hover:text-rose-primary transition-colors">記事一覧</Link>
            <Link href="/about" className="hover:text-rose-primary transition-colors">運営者情報</Link>
          </nav>
        </div>
        <div className="flex gap-5 pb-2.5 overflow-x-auto border-t border-rose-accent pt-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/articles/category/${cat.slug}`}
              className="whitespace-nowrap text-xs text-rose-text hover:text-rose-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
