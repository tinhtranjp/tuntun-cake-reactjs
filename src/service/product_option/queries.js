import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productOptionApi } from "./productOptionApi"

export const ProductOptionKey = {
  GET_OPTIONS: "PRODUCT_GET_OPTIONS",
  GET_OPTIONS_ORDER_INDEX: "GET_OPTIONS_ORDER_INDEX",
  GET_OPTIONS_VALUE_INDEX: "GET_OPTIONS_VALUE_INDEX",
}

export const usePOGetOptions = () => {
  return useQuery({
    queryKey: [ProductOptionKey.GET_OPTIONS],
    queryFn: () => productOptionApi.getOptions(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const usePOGetOrderByIndex = () => {
  return useQuery({
    queryKey: [ProductOptionKey.GET_OPTIONS_ORDER_INDEX],
    queryFn: () => productOptionApi.getOptionsOrderByIndex(),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const usePOGetValueByIndex = (id) => {
  return useQuery({
    queryKey: [ProductOptionKey.GET_OPTIONS_VALUE_INDEX, id],
    queryFn: () => productOptionApi.getOptionValueOrderByIndex(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    placeholderData: keepPreviousData,
  })
}
