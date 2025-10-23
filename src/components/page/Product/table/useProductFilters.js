import useSearchParamsFilters from "@/hook/useSearchParamsFilters"
import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router"

export function useProductFilters() {
  const [searchParams] = useSearchParams()
  const { updateParams, setOrRemoveParam } = useSearchParamsFilters()

  const name = searchParams.get("name") ?? ""
  const page = searchParams.get("page") ?? "0"
  const limit = searchParams.get("limit") ?? "5"
  const sort = searchParams.get("sort") ?? "id-desc"
  const status = searchParams.get("status") ?? "all"
  const type = searchParams.get("type") ?? "all"
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""
  const variantDeleted = searchParams.get("variantDeleted") ?? "false"

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
      variantDeleted,
    }),
    [page, limit, name, status, sort, type, minPrice, maxPrice, variantDeleted],
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
    variantDeleted,
    setOrRemoveParam,
    updateParams,
  }
}
