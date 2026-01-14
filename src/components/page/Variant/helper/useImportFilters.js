import useSearchParamsFilters from "@/hook/useSearchParamsFilters"
import { useEffect, useMemo } from "react"
import { useSearchParams } from "react-router"

export function useImportFilters() {
  const [searchParams] = useSearchParams()
  const { updateParams, setOrRemoveParam } = useSearchParamsFilters()

  const name = searchParams.get("name") ?? ""
  const page = searchParams.get("page") ?? "0"
  const limit = searchParams.get("limit") ?? "5"
  const sort = searchParams.get("sort") ?? "id-desc"
  const type = searchParams.get("type") ?? "ALL"
  const status = searchParams.get("status") ?? "ALL"

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
      sort,
      type,
      status,
    }),
    [page, limit, status, name, sort, type],
  )

  return {
    filters,
    pageNumber,
    limitNumber,
    name,
    sort,
    type,
    setOrRemoveParam,
    updateParams,
  }
}
