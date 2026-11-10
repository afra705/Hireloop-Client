import { Fragment, type ReactNode } from "react"
import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type BreadcrumbItem = {
  label: string
  href?: string
}

type PageHeaderProps = {
  breadcrumb?: BreadcrumbItem[]
  title: string
  description?: string
  action?: ReactNode
  className?: string
  breadcrumbClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  action,
  className,
  breadcrumbClassName,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              "flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#7C7F87]",
              breadcrumbClassName
            )}
          >
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1

              return (
                <Fragment key={`${item.label}-${index}`}>
                  {index > 0 ? (
                    <ChevronRightIcon className="size-3 shrink-0" />
                  ) : null}

                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#F4F4F5]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn(isLast && "text-[#A1A4AA]")}>
                      {item.label}
                    </span>
                  )}
                </Fragment>
              )
            })}
          </nav>
        ) : null}

        <h1
          className={cn(
            "mt-4 text-2xl leading-8 font-semibold tracking-[-0.02em] text-white",
            titleClassName
          )}
        >
          {title}
        </h1>

        {description ? (
          <p
            className={cn("mt-1 text-xs text-[#7C7F87]", descriptionClassName)}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div className="shrink-0 sm:self-start">{action}</div>
      ) : null}
    </div>
  )
}
