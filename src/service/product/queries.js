import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productApi } from "./productApi"

export const ProductKey = {
  SEARCH: "PRODUCT_SEARCH",
  SEARCH_ORDERS: "PRODUCT_SEARCH_ORDERS",
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

export const useProductGetById = (id) => {
  return useQuery({
    queryKey: [ProductKey.GET_BY_ID, id],
    queryFn: () => productApi.getById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useProductSearch = (params) => {
  return useQuery({
    queryKey: [ProductKey.SEARCH, params],
    queryFn: () => productApi.search(params),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const useProductSearchOrders = (params) => {
  return useQuery({
    queryKey: [ProductKey.SEARCH_ORDERS, params],
    queryFn: () => productApi.searchOrders(params),
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}
