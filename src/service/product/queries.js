import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { productApi } from "./productApi"
import { formatDate } from "@/helper/common"

export const ProductKey = {
  SEARCH: "PRODUCT_SEARCH",
  SEARCH_ORDERS: "PRODUCT_SEARCH_ORDERS",
  GET_BY_ID: "PRODUCT_GET_BY_ID",
  GET_STATUS: "PRODUCT_GET_STATUS",
  GET_TYPES: "PRODUCT_GET_TYPES",
  GET_DETAILS: "PRODUCT_GET_DETAILS",
  GET_BEFORE_UPDATE: "PRODUCT_GET_BEFORE_UPDATE",
  DASHBOARD: "PRODUCT_DASHBOARD",
}

export const useDashBoard = (params) => {
  const payload = { ...params }

  // ✅ format date
  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate
  return useQuery({
    queryKey: [ProductKey.DASHBOARD, payload],
    queryFn: () => productApi.getDashBoard(payload),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
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

export const useProductGetDetail = (id) => {
  return useQuery({
    queryKey: [ProductKey.GET_DETAILS, id],
    queryFn: () => productApi.getDetails(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useProductGetBeforeUpdate = (id) => {
  return useQuery({
    queryKey: [ProductKey.GET_BEFORE_UPDATE, id],
    queryFn: () => productApi.finByIdBeforeUpdate(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useProductSearch = (params) => {
  // Tạo payload copy để không mutate original
  const payload = { ...params }

  // Nếu status hoặc type là 'ALL', bỏ đi
  if (payload.status === "ALL") delete payload.status
  if (payload.type === "ALL") delete payload.type

  return useQuery({
    queryKey: [ProductKey.SEARCH, payload],
    queryFn: () => productApi.search(payload),
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
