import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '運営者情報',
  description: '訪問看護転職ナビの運営者情報をご覧いただけます。',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-rose-text mb-6">運営者情報</h1>
      <div className="bg-white border border-rose-accent rounded-xl p-6 text-sm text-rose-text space-y-4">
        <div>
          <p className="font-bold mb-1">サイト名</p>
          <p>訪問看護転職ナビ</p>
        </div>
        <div>
          <p className="font-bold mb-1">運営者</p>
          <p>大田区サンポット（OtaSanpot）</p>
        </div>
        <div>
          <p className="font-bold mb-1">サイトの目的</p>
          <p>
            訪問看護への転職を検討している看護師の方に、正確で役立つ情報をお届けすることを目的としています。
            当サイトはアフィリエイトプログラムを利用しており、紹介する求人サービスを通じて収益を得ることがあります。
          </p>
        </div>
        <div>
          <p className="font-bold mb-1">お問い合わせ</p>
          <a href="mailto:info@tech-village.co.jp" className="hover:text-rose-primary transition-colors">
            info@tech-village.co.jp
          </a>
        </div>
      </div>
    </div>
  )
}
