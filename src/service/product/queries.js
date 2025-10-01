import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productApi } from "./productApi"

export const ProductKey = {
  SEARCH: "PRODUCT_SEARCH",
  GET_BY_ID: "PRODUCT_GET_BY_ID",
  GET_STATUS: "PRODUCT_GET_STATUS",
  GET_TYPES: "PRODUCT_GET_TYPES",
}

export const useProductGetStatus = () => {
  return useQuery({
    queryKey: [ProductKey.GET_STATUS],
    queryFn: () => productApi.getStatus(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const useProductGetType = () => {
  return useQuery({
    queryKey: [ProductKey.GET_TYPES],
    queryFn: () => productApi.getTypes(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}
