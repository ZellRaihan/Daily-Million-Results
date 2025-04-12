import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

type BreadcrumbItem = {
  label: string
  href?: string
  isCurrentPage?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs">
        <li className="flex items-center">
          <Link href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-3 w-3 text-gray-400 mx-1" />
            {item.isCurrentPage || !item.href ? (
              <span className="font-medium text-gray-700" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-gray-500 hover:text-blue-600 transition-colors">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
