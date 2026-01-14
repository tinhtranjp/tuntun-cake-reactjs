import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { purchaseApi } from "./purchaseApi"
import { formatDate } from "@/helper/common"

export const PurchaseHistoryKey = {
  SEARCH: "PURCHASE_HISTORY_SEARCH",
  COUNT_TYPE: "PURCHASE_COUNT_TYPE",
  LASTED_DETAILS: "PURCHASE_LASTED_DETAILS",
}

export const useSearchPurchaseOrders = (params) => {
  const payload = {
    ...params,
    type: params.type?.toUpperCase(),
  }

  if (payload.type === "ALL") {
    delete payload.type
  }
  // ✅ format date
  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate

  return useQuery({
    queryKey: [PurchaseHistoryKey.SEARCH, payload],
    queryFn: () => purchaseApi.search(payload),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}
export const usePruchaseOrderTypeCounts = (params) => {
  const payload = { ...params }
  // ✅ format date
  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate
  return useQuery({
    queryKey: [PurchaseHistoryKey.PURCHASE_COUNT_TYPE, params],
    queryFn: () => purchaseApi.getCountType(params),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}

export const usePurchaseOrderLastedDetails = (params) => {
  return useQuery({
    queryKey: [PurchaseHistoryKey.LASTED_DETAILS, params],
    queryFn: () => purchaseApi.getDetailsLasted(params),
  })
}
