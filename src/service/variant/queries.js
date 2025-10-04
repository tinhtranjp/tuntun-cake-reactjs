import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { variantApi } from "./variantApi"

export const Variant = {
  SEARCH: "Variant_SEARCH",
  GET_BY_ID: "Variant_GET_BY_ID",
}

export const useVariantSearch = (params) => {
  return useQuery({
    queryKey: [Variant.SEARCH, params],
    queryFn: () => variantApi.search(params),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}
