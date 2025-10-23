import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { purchaseApi } from "./purchaseApi"

export const PurchaseHistoryKey = {
  SEARCH: "PURCHASE_HISTORY_SEARCH",
  COUNT_TYPE: "PURCHASE_COUNT_TYPE",
  LASTED_DETAILS: "PURCHASE_LASTED_DETAILS",
}

export const useSearchPurchaseOrders = (params) => {
  return useQuery({
    queryKey: [PurchaseHistoryKey.SEARCH, params],
    queryFn: () => purchaseApi.search(params),
    placeholderData: keepPreviousData,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  })
}
export const usePruchaseOrderTypeCounts = (params) => {
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
