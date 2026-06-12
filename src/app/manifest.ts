import type { MetadataRoute } from 'next'

// output: export では静的ルート指定が必須
export const dynamic = 'force-static'

// next.config.ts の basePath と同じ判定（本番のみ /home_nurse 配下）
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/home_nurse' : ''

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '訪問看護転職ナビ',
    short_name: '転職ナビ',
    description: '訪問看護への転職を、やさしくサポート',
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#f9f4f5',
    theme_color: '#b08d94',
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
