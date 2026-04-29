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
