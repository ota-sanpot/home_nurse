import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '訪問看護転職ナビのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-rose-text mb-6">プライバシーポリシー</h1>
      <div className="bg-white border border-rose-accent rounded-xl p-6 text-sm text-rose-text space-y-6">
        <section>
          <h2 className="font-bold mb-2">アフィリエイトについて</h2>
          <p>
            当サイトはアフィリエイトプログラムに参加しています。当サイト経由で商品・サービスを申し込んだ場合、
            当サイトに紹介料が支払われることがありますが、読者の方への費用負担は一切ありません。
          </p>
        </section>
        <section>
          <h2 className="font-bold mb-2">Cookieの使用</h2>
          <p>
            当サイトはアクセス解析のためCookieを使用することがあります。
            Cookieはブラウザの設定から無効にすることができます。
          </p>
        </section>
        <section>
          <h2 className="font-bold mb-2">免責事項</h2>
          <p>
            当サイトに掲載している情報は、できる限り正確な情報を提供するよう努めていますが、
            内容の正確性・完全性を保証するものではありません。
            当サイトの情報を利用して生じたいかなる損害についても、運営者は責任を負いません。
          </p>
        </section>
        <section>
          <h2 className="font-bold mb-2">改定</h2>
          <p>本ポリシーは予告なく変更することがあります。最新の内容はこのページでご確認ください。</p>
        </section>
      </div>
    </div>
  )
}
