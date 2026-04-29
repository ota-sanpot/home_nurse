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
