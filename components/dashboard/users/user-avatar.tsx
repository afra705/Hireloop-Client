import { cn, getInitials } from "@/lib/utils"

type UserAvatarProps = {
  name: string
  image?: string | null
  className?: string
}

export function UserAvatar({ name, image, className }: UserAvatarProps) {
  return (
    <span
      role="img"
      aria-label={`${name} avatar`}
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#232327] bg-cover bg-center text-[11px] font-semibold text-[#D4D4D8] ring-1 ring-white/10",
        className
      )}
      style={image ? { backgroundImage: `url("${image}")` } : undefined}
    >
      {image ? null : getInitials(name) || "?"}
    </span>
  )
}
