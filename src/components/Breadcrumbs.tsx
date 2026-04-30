import Link from 'next/link'

type BreadcrumbItem = {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-1 text-xs text-gray-400 mb-5">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-300">›</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-rose-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-rose-text line-clamp-1 max-w-[240px]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
