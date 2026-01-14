import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import dayjs from "dayjs"

export function usePurchaseFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const code = searchParams.get("code") ?? ""
  const page = Number(searchParams.get("page") ?? 0)
  const limit = Number(searchParams.get("limit") ?? 10)
  const sort = searchParams.get("sort") ?? null
  const type = searchParams.get("type") ?? "ALL"
  const minPrice = searchParams.get("minPrice") ?? ""
  const maxPrice = searchParams.get("maxPrice") ?? ""

  const startDateParam = searchParams.get("startDate")
  const endDateParam = searchParams.get("endDate")

  const startDate = startDateParam ? dayjs(startDateParam) : null
  const endDate = endDateParam ? dayjs(endDateParam) : null

  const initialSortModel = sort ? [{ field: sort.split("-")[0], sort: sort.split(",")[1] }] : []
  const [sortModel, setSortModel] = useState(initialSortModel)

  const filters = useMemo(
    () => ({
      page,
      limit,
      sort,
      code,
      type,
      minPrice,
      maxPrice,
      startDate,
      endDate,
    }),
    [page, limit, sort, code, type, minPrice, maxPrice, startDate, endDate],
  )

  return {
    filters,
    page,
    limit,
    sort,
    code,
    type,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    sortModel,
    setSortModel,
    searchParams,
    setSearchParams,
  }
}
