type Props = {
  children: React.ReactNode
}

export default function ArticleBody({ children }: Props) {
  return (
    <div className="prose prose-sm max-w-none text-rose-text
      prose-headings:text-rose-text prose-headings:font-bold
      prose-a:text-rose-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-rose-text
      prose-hr:border-rose-accent
      prose-table:w-full prose-table:border-collapse
      prose-th:bg-rose-accent/30 prose-th:text-rose-text prose-th:font-bold prose-th:px-3 prose-th:py-2 prose-th:border prose-th:border-rose-accent
      prose-td:px-3 prose-td:py-2 prose-td:border prose-td:border-rose-accent">
      {children}
    </div>
  )
}
