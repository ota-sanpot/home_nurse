import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-rose-accent shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-rose-primary font-bold text-lg hover:text-rose-dark transition-colors">
          訪問看護転職ナビ
        </Link>
        <nav className="flex gap-6 text-sm text-rose-text">
          <Link href="/articles" className="hover:text-rose-primary transition-colors">記事一覧</Link>
          <Link href="/about" className="hover:text-rose-primary transition-colors">運営者情報</Link>
        </nav>
      </div>
    </header>
  )
}
