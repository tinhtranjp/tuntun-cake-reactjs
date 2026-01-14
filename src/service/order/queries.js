import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { orderApi } from "./orderApi"
import { formatDate } from "@/helper/common"

export const OrderKey = {
  SEARCH: "ORDER_SEARCH",
  STATUS_COUNTS: "ORDER_STATUS_COUNTS",
  ORDER_TOTAL_SAMMARY: "ORDER_TOTAL_SAMMARY",
}

export const useSearchOrders = (params) => {
  const payload = { ...params }

  if (payload.type === "ALL") delete payload.type

  // ✅ format date
  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate

  return useQuery({
    queryKey: [OrderKey.SEARCH, payload],
    queryFn: () => orderApi.search(payload),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}

export const useOrderStatusCounts = (params) => {
  const payload = { ...params }

  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate
  return useQuery({
    queryKey: [OrderKey.STATUS_COUNTS, payload],
    queryFn: () => orderApi.getCountStatus(payload),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}

export const useOrderGetSummary = () => {
  return useQuery({
    queryKey: [OrderKey.ORDER_TOTAL_SAMMARY],
    queryFn: () => orderApi.orderSummary(),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}
