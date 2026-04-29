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
