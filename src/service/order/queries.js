import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { orderApi } from "./orderApi"

export const OrderKey = {
  SEARCH: "ORDER_SEARCH",
  STATUS_COUNTS: "ORDER_STATUS_COUNTS",
}

export const useSearchOrders = (params) => {
  return useQuery({
    queryKey: [OrderKey.SEARCH, params],
    queryFn: () => orderApi.search(params),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}

export const useOrderStatusCounts = (params) => {
  return useQuery({
    queryKey: [OrderKey.STATUS_COUNTS, params],
    queryFn: () => orderApi.getCountStatus(params),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}
