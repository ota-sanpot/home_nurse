import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-accent mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-rose-text">
        <p className="mb-3 text-xs text-gray-400">
          当サイトはアフィリエイト広告を掲載しています。
        </p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-rose-primary transition-colors">運営者情報</Link>
          <Link href="/privacy" className="hover:text-rose-primary transition-colors">プライバシーポリシー</Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">© 2026 訪問看護転職ナビ</p>
      </div>
    </footer>
  )
}
