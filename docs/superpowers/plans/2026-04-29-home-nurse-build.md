# home_nurse 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 訪問看護転職アフィリエイトサイトをNext.js 14 + MDX + Tailwind CSSで構築し、Vercelにデプロイできる状態にする

**Architecture:** `content/articles/` 配下のMDXファイルを `gray-matter` でfrontmatter解析、`next-mdx-remote/rsc` でサーバーサイドレンダリング。`output: 'export'` で静的HTML生成。

**Tech Stack:** Next.js 14 (App Router), MDX, Tailwind CSS, gray-matter, next-mdx-remote, @tailwindcss/typography, Vercel

---

## ファイルマップ

```
OtaSanpot/home_nurse/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # 共通レイアウト・メタデータ基底
│   │   ├── globals.css             # グローバルCSS
│   │   ├── page.tsx                # トップページ
│   │   ├── articles/
│   │   │   ├── page.tsx            # 記事一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # 記事詳細（generateStaticParams・generateMetadata）
│   │   ├── about/
│   │   │   └── page.tsx            # 運営者情報
│   │   └── privacy/
│   │       └── page.tsx            # プライバシーポリシー
│   ├── components/
│   │   ├── Header.tsx              # ナビゲーション
│   │   ├── Footer.tsx              # フッター・免責表記
│   │   ├── HeroSection.tsx         # トップCTAヒーロー
│   │   ├── ArticleCard.tsx         # 記事一覧カード
│   │   ├── AffiliateCTA.tsx        # アフィリCTAバナー（MDX内で使用可）
│   │   └── ArticleBody.tsx         # 記事本文ラッパー（typography styling）
│   └── lib/
│       └── articles.ts             # MDX読み込み・frontmatter解析ユーティリティ
├── content/
│   └── articles/
│       ├── hospital-to-home-nurse.mdx    # サンプル記事1
│       └── blank-nurse-return.mdx        # サンプル記事2
├── __tests__/
│   └── lib/
│       └── articles.test.ts        # articles.ts のユニットテスト
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Task 1: プロジェクト初期化

**Files:**
- Create: `OtaSanpot/home_nurse/` （Next.jsプロジェクトルート）

- [ ] **Step 1: create-next-app で初期化**

`/Users/nozaki/Desktop/CEO/OtaSanpot/` で実行：

```bash
cd /Users/nozaki/Desktop/CEO/OtaSanpot
npx create-next-app@latest home_nurse \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-import-alias
```

プロンプトが出たらすべてデフォルト（Enter）で進める。

- [ ] **Step 2: 追加パッケージをインストール**

```bash
cd /Users/nozaki/Desktop/CEO/OtaSanpot/home_nurse
npm install gray-matter next-mdx-remote @tailwindcss/typography
npm install -D @types/mdx jest jest-environment-node ts-jest @types/jest
```

- [ ] **Step 3: Jest 設定ファイルを作成**

`jest.config.ts` を作成：

```typescript
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
```

- [ ] **Step 4: package.json に test スクリプトを確認**

`package.json` の `scripts` に以下があることを確認（なければ追加）：

```json
"test": "jest"
```

- [ ] **Step 5: 初回ビルド確認**

```bash
npm run dev
```

`http://localhost:3000` でNext.jsデフォルトページが表示されることを確認。`Ctrl+C` で停止。

- [ ] **Step 6: コミット**

```bash
cd /Users/nozaki/Desktop/CEO/OtaSanpot/home_nurse
git init
git add -A
git commit -m "feat: initialize Next.js 14 project with Tailwind and MDX deps"
```

---

## Task 2: Tailwind カラー設定・グローバルCSS

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: tailwind.config.ts にくすみローズカラーを追加**

`tailwind.config.ts` を以下に書き換え：

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          primary: '#b08d94',
          dark: '#8a6b72',
          accent: '#c9a7ae',
          bg: '#f9f4f5',
          text: '#5c4347',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

- [ ] **Step 2: globals.css を設定**

`src/app/globals.css` を以下に書き換え：

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f9f4f5;
  color: #5c4347;
  font-family: 'Noto Sans JP', sans-serif;
}
```

- [ ] **Step 3: ビルド確認**

```bash
npm run build
```

エラーがないことを確認。

- [ ] **Step 4: コミット**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure Tailwind with kusumi rose color palette"
```

---

## Task 3: MDX・記事ユーティリティの実装

**Files:**
- Modify: `next.config.ts`
- Create: `src/lib/articles.ts`
- Create: `content/articles/hospital-to-home-nurse.mdx`
- Create: `content/articles/blank-nurse-return.mdx`
- Create: `__tests__/lib/articles.test.ts`

- [ ] **Step 1: テストを先に書く**

`__tests__/lib/articles.test.ts` を作成：

```typescript
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import path from 'path'

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
```

- [ ] **Step 2: テストが失敗することを確認**

```bash
npm test
```

Expected: FAIL（`@/lib/articles` が存在しないため）

- [ ] **Step 3: サンプルMDXファイルを作成**

`content/articles/hospital-to-home-nurse.mdx` を作成：

```mdx
---
title: "病院から訪問看護に転職する方法｜失敗しないための5つのポイント"
description: "病院勤務の看護師が訪問看護に転職する際の流れ・注意点・おすすめ転職サービスを解説します。"
category: "病院からの転職"
date: "2026-04-29"
---

訪問看護への転職を考えていませんか？本記事では、病院から訪問看護に転職した経験をもとに、失敗しないためのポイントを解説します。

## 訪問看護と病院の違い

病院と訪問看護の最大の違いは「働く場所」です。病院では多職種チームに囲まれて働きますが、訪問看護では基本的に1人で利用者様のご自宅へ伺います。

## 転職成功の5つのポイント

1. **訪問看護の業務内容を事前に理解する**
2. **転職専門サービスを活用する**
3. **見学・面接で職場の雰囲気を確認する**
4. **給与・休日条件をしっかり交渉する**
5. **ブランクへの不安を正直に伝える**

<AffiliateCTA
  title="訪問看護の求人を無料でチェックしよう"
  description="訪問看護専門の転職サービスで、あなたに合った求人を探してみましょう。"
  href="https://affiliate-link.example.com"
  buttonText="無料で求人を見る →"
/>

## まとめ

訪問看護への転職は、正しい情報と準備があれば怖くありません。まずは転職サービスに登録して、求人情報を見てみましょう。
```

`content/articles/blank-nurse-return.mdx` を作成：

```mdx
---
title: "ブランク明けの看護師が訪問看護を選ぶ理由｜復職に最適な理由を解説"
description: "育児・家庭の都合でブランクがある看護師に、訪問看護が復職先として選ばれる理由を解説します。"
category: "ブランク明け"
date: "2026-04-28"
---

「ブランクがあって復職できるか不安…」そんな看護師さんに、訪問看護はとてもおすすめです。

## なぜブランク明けに訪問看護が選ばれるのか

訪問看護ステーションは、慢性的な看護師不足のため、ブランクがある方でも積極的に採用しています。また、夜勤がない事業所が多く、家庭と仕事を両立しやすい環境が整っています。

## ブランク明けでも安心な理由

- **夜勤なし**の事業所が多い
- **研修制度**が充実している事業所を選べる
- **1対1のケア**でスキルを着実に取り戻せる

<AffiliateCTA
  title="ブランク歓迎の訪問看護求人を探す"
  description="ブランクOKの求人に特化して探せる転職サービスを活用しましょう。"
  href="https://affiliate-link.example.com"
  buttonText="ブランクOK求人を見る →"
/>

## まとめ

ブランクがあっても、訪問看護なら安心して復職できます。まずは求人情報を見てみましょう。
```

- [ ] **Step 4: `lib/articles.ts` を実装**

`src/lib/articles.ts` を作成：

```typescript
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
```

- [ ] **Step 5: テストが通ることを確認**

```bash
npm test
```

Expected: PASS（全テスト通過）

- [ ] **Step 6: next.config.ts を更新**

`next.config.ts` を以下に書き換え：

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 7: コミット**

```bash
git add content/ src/lib/articles.ts __tests__/ next.config.ts
git commit -m "feat: add MDX article utility with gray-matter and sample articles"
```

---

## Task 4: 共通レイアウト（Header・Footer）

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Header コンポーネントを作成**

`src/components/Header.tsx` を作成：

```tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-rose-accent shadow-sm">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
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
```

- [ ] **Step 2: Footer コンポーネントを作成**

`src/components/Footer.tsx` を作成：

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-accent mt-16">
      <div className="max-w-3xl mx-auto px-4 py-8 text-sm text-rose-text">
        <p className="mb-3 text-xs text-gray-400">
          当サイトはアフィリエイト広告（Amazonアソシエイト等）を掲載しています。
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
```

- [ ] **Step 3: layout.tsx を更新**

`src/app/layout.tsx` を以下に書き換え：

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: '訪問看護転職ナビ｜看護師の転職をやさしくサポート',
    template: '%s｜訪問看護転職ナビ',
  },
  description: '訪問看護への転職を考える看護師のための情報サイト。病院からの転職・ブランク明けの復職を徹底サポートします。',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: 開発サーバーで表示確認**

```bash
npm run dev
```

`http://localhost:3000` でヘッダー・フッターが表示されることを確認。

- [ ] **Step 5: コミット**

```bash
git add src/components/Header.tsx src/components/Footer.tsx src/app/layout.tsx
git commit -m "feat: add Header, Footer and root layout"
```

---

## Task 5: AffiliateCTA コンポーネント

**Files:**
- Create: `src/components/AffiliateCTA.tsx`

- [ ] **Step 1: AffiliateCTA コンポーネントを作成**

`src/components/AffiliateCTA.tsx` を作成：

```tsx
type Props = {
  title: string
  description: string
  href: string
  buttonText: string
}

export default function AffiliateCTA({ title, description, href, buttonText }: Props) {
  return (
    <div className="my-8 rounded-xl border border-rose-accent bg-rose-bg p-6 text-center not-prose">
      <p className="text-sm font-bold text-rose-primary mb-1">{title}</p>
      <p className="text-xs text-rose-text mb-4">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block bg-rose-primary hover:bg-rose-dark text-white text-sm font-bold px-6 py-3 rounded-full transition-colors"
      >
        {buttonText}
      </a>
    </div>
  )
}
```

- [ ] **Step 2: コミット**

```bash
git add src/components/AffiliateCTA.tsx
git commit -m "feat: add AffiliateCTA component"
```

---

## Task 6: トップページ

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/ArticleCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: HeroSection コンポーネントを作成**

`src/components/HeroSection.tsx` を作成：

```tsx
export default function HeroSection() {
  return (
    <section className="bg-rose-primary text-white py-14 px-4 text-center">
      <h1 className="text-2xl font-bold leading-snug mb-3">
        訪問看護への転職を、<br className="sm:hidden" />
        やさしくサポート
      </h1>
      <p className="text-sm opacity-90 mb-6">
        病院からの転職・ブランク明けの復職を<br />
        経験者の情報で後押しします
      </p>
      <a
        href="https://affiliate-link.example.com"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block bg-white text-rose-primary font-bold text-sm px-7 py-3 rounded-full hover:bg-rose-bg transition-colors"
      >
        訪問看護の求人を見る →
      </a>
    </section>
  )
}
```

- [ ] **Step 2: ArticleCard コンポーネントを作成**

`src/components/ArticleCard.tsx` を作成：

```tsx
import Link from 'next/link'
import type { ArticleMeta } from '@/lib/articles'

type Props = {
  article: ArticleMeta
}

export default function ArticleCard({ article }: Props) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="block bg-white border border-rose-accent rounded-xl p-5 hover:shadow-md transition-shadow"
    >
      <span className="text-xs text-rose-primary font-medium border border-rose-accent rounded-full px-2 py-0.5">
        {article.category}
      </span>
      <h2 className="mt-2 text-sm font-bold text-rose-text leading-snug line-clamp-2">
        {article.title}
      </h2>
      <p className="mt-1 text-xs text-gray-400 line-clamp-2">{article.description}</p>
      <p className="mt-2 text-xs text-gray-300">{article.date}</p>
    </Link>
  )
}
```

- [ ] **Step 3: トップページ `page.tsx` を実装**

`src/app/page.tsx` を以下に書き換え：

```tsx
import HeroSection from '@/components/HeroSection'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export default async function HomePage() {
  const articles = await getAllArticles()

  return (
    <>
      <HeroSection />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-base font-bold text-rose-text mb-5">注目記事</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: 開発サーバーで表示確認**

```bash
npm run dev
```

`http://localhost:3000` でヒーローセクション・記事グリッドが表示されることを確認。

- [ ] **Step 5: コミット**

```bash
git add src/components/HeroSection.tsx src/components/ArticleCard.tsx src/app/page.tsx
git commit -m "feat: add top page with hero section and article grid"
```

---

## Task 7: 記事一覧ページ

**Files:**
- Create: `src/app/articles/page.tsx`

- [ ] **Step 1: 記事一覧ページを実装**

`src/app/articles/page.tsx` を作成：

```tsx
import type { Metadata } from 'next'
import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: '記事一覧',
  description: '訪問看護転職に関するすべての記事をご覧いただけます。',
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-xl font-bold text-rose-text mb-6">記事一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 開発サーバーで確認**

```bash
npm run dev
```

`http://localhost:3000/articles` で記事一覧が表示されることを確認。

- [ ] **Step 3: コミット**

```bash
git add src/app/articles/page.tsx
git commit -m "feat: add articles list page"
```

---

## Task 8: 記事詳細ページ

**Files:**
- Create: `src/components/ArticleBody.tsx`
- Create: `src/app/articles/[slug]/page.tsx`

- [ ] **Step 1: ArticleBody コンポーネントを作成**

`src/components/ArticleBody.tsx` を作成：

```tsx
type Props = {
  children: React.ReactNode
}

export default function ArticleBody({ children }: Props) {
  return (
    <div className="prose prose-sm max-w-none text-rose-text
      prose-headings:text-rose-text prose-headings:font-bold
      prose-a:text-rose-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-rose-text
      prose-hr:border-rose-accent">
      {children}
    </div>
  )
}
```

- [ ] **Step 2: 記事詳細ページを実装**

`src/app/articles/[slug]/page.tsx` を作成：

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AffiliateCTA from '@/components/AffiliateCTA'
import ArticleBody from '@/components/ArticleBody'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const { frontmatter, content } = article

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-xs text-rose-primary font-medium border border-rose-accent rounded-full px-2 py-0.5">
        {frontmatter.category}
      </span>
      <h1 className="mt-3 text-xl font-bold text-rose-text leading-snug">{frontmatter.title}</h1>
      <p className="mt-1 text-xs text-gray-400">{frontmatter.date}</p>

      <div className="mt-8">
        <ArticleBody>
          <MDXRemote
            source={content}
            components={{ AffiliateCTA }}
          />
        </ArticleBody>
      </div>

      <AffiliateCTA
        title="訪問看護の求人を無料でチェックしよう"
        description="あなたに合った訪問看護の求人を、無料で探してみましょう。"
        href="https://affiliate-link.example.com"
        buttonText="無料で求人を見る →"
      />
    </div>
  )
}
```

- [ ] **Step 3: 開発サーバーで確認**

```bash
npm run dev
```

`http://localhost:3000/articles/hospital-to-home-nurse` で記事が表示され、AffiliateCTAバナーが本文中・末尾に表示されることを確認。

- [ ] **Step 4: コミット**

```bash
git add src/components/ArticleBody.tsx src/app/articles/[slug]/page.tsx
git commit -m "feat: add article detail page with MDX rendering and affiliate CTA"
```

---

## Task 9: About・Privacy ページ

**Files:**
- Create: `src/app/about/page.tsx`
- Create: `src/app/privacy/page.tsx`

- [ ] **Step 1: 運営者情報ページを作成**

`src/app/about/page.tsx` を作成：

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '運営者情報',
  description: '訪問看護転職ナビの運営者情報をご覧いただけます。',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
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
          <p>info@tech-village.co.jp</p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: プライバシーポリシーページを作成**

`src/app/privacy/page.tsx` を作成：

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '訪問看護転職ナビのプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
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
```

- [ ] **Step 3: 開発サーバーで確認**

```bash
npm run dev
```

`http://localhost:3000/about` と `http://localhost:3000/privacy` が正しく表示されることを確認。

- [ ] **Step 4: コミット**

```bash
git add src/app/about/page.tsx src/app/privacy/page.tsx
git commit -m "feat: add about and privacy policy pages"
```

---

## Task 10: 静的ビルド確認・.gitignore 整備

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: .gitignore に `.superpowers/` を追加**

`.gitignore` を開き、末尾に以下を追加：

```
# Superpowers brainstorm session files
.superpowers/
```

- [ ] **Step 2: 本番ビルドを実行**

```bash
npm run build
```

Expected: `out/` ディレクトリが生成され、エラーなし。

- [ ] **Step 3: 静的ファイルをローカルで確認**

```bash
npx serve out
```

`http://localhost:3000` （または表示されたポート）で全ページが表示されることを確認：
- `/` — トップページ（ヒーロー＋記事グリッド）
- `/articles` — 記事一覧
- `/articles/hospital-to-home-nurse` — 記事詳細
- `/articles/blank-nurse-return` — 記事詳細
- `/about` — 運営者情報
- `/privacy` — プライバシーポリシー

- [ ] **Step 4: 最終コミット**

```bash
git add .gitignore
git commit -m "chore: add .gitignore entry for superpowers session files"
```

---

## 完成後のVercelデプロイ手順（参考）

1. GitHubに `home_nurse` リポジトリを作成してプッシュ
2. [vercel.com](https://vercel.com) でリポジトリを連携
3. Framework Preset: **Next.js** を選択
4. デプロイボタンを押す（設定変更不要）
5. 以降、`main` ブランチにプッシュするたびに自動デプロイ

---

## 記事追加方法（運用開始後）

1. `content/articles/` に `.mdx` ファイルを追加
2. frontmatter（title・description・category・date）を記入
3. 本文中にアフィリリンクを入れたい箇所で `<AffiliateCTA ... />` を使用
4. `git push` → Vercelが自動ビルド・デプロイ
