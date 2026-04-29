import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ota-sanpot.github.io/home_nurse'),
  title: {
    default: '訪問看護転職ナビ｜看護師の転職をやさしくサポート',
    template: '%s｜訪問看護転職ナビ',
  },
  description: '訪問看護への転職を考える看護師のための情報サイト。病院からの転職・ブランク明けの復職を徹底サポートします。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '訪問看護転職ナビ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
