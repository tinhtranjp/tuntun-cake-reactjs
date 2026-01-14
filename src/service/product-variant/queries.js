import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { pvApi } from "./pvApi"
import { formatDate } from "@/helper/common"

export const ProductVariantKey = {
  PV_IMAGES: "PV_IMAGES",
  PV_DETAILS: "PV_DETAILS",
  PV_SEARCH: "PV_SEARCH",
}

export const usePvGetImages = (id) => {
  return useQuery({
    queryKey: [ProductVariantKey.PV_IMAGES, id],
    queryFn: () => pvApi.getImages(id),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const usePvGetDetails = (id) => {
  return useQuery({
    queryKey: [ProductVariantKey.PV_DETAILS, id],
    queryFn: () => pvApi.getDetails(id),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const usePVSearch = (params) => {
  const payload = { ...params }
  if (payload.status === "ALL") delete payload.status
  if (payload.type === "ALL") delete payload.type

  // ✅ format date
  payload.startDate = formatDate(payload.startDate)
  payload.endDate = formatDate(payload.endDate)

  // nếu rỗng thì bỏ
  if (!payload.startDate) delete payload.startDate
  if (!payload.endDate) delete payload.endDate

  return useQuery({
    queryKey: [ProductVariantKey.PV_SEARCH, payload],
    queryFn: () => pvApi.search(payload),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}
