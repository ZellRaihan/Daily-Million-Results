'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { PaginationComponent } from "@/components/ui/pagination"

interface ClientPaginationProps {
  totalPages: number
  currentPage: number
}

export function ClientPagination({ totalPages, currentPage }: ClientPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  )
} 