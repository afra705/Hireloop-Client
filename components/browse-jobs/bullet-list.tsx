type BulletListProps = {
  items: string[]
}

export function BulletList({ items }: BulletListProps) {
  if (items.length === 0) return null

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#7C7F87]"
          />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
