import useSearchParamsFilters from "@/hook/useSearchParamsFilters"
import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export function useProductFilters() {
  const [searchParams] = useSearchParams()
  const { updateParams, setOrRemoveParam } = useSearchParamsFilters()

  const name = searchParams.get("name") ?? ""
  const page = searchParams.get("page") ?? "0"
  const limit = searchParams.get("limit") ?? "5"
  const sort = searchParams.get("sort") ?? "id-desc"
  const status = searchParams.get("status") ?? "ALL"
  const type = searchParams.get("type") ?? "ALL"
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""

  useEffect(() => {
    // Chỉ set default 1 lần nếu thiếu page hoặc limit
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      updateParams({ page: "0", limit: "5" })
    }
  }, [])

  const pageNumber = parseInt(page)
  const limitNumber = parseInt(limit)

  const filters = useMemo(
    () => ({
      page,
      limit,
      name,
      status,
      sort,
      type,
      minPrice,
      maxPrice,
    }),
    [page, limit, name, status, sort, type, minPrice, maxPrice],
  )

  return {
    filters,
    pageNumber,
    limitNumber,
    name,
    status,
    sort,
    type,
    minPrice,
    maxPrice,
    setOrRemoveParam,
    updateParams,
  }
}
