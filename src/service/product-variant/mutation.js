import { useMutation, useQueryClient } from "@tanstack/react-query"
import { pvApi } from "./pvApi"
import { toast } from "sonner"
import { handleApiError } from "@/helper/api"
import { ProductVariantKey } from "./queries"
import { ProductKey } from "../product/queries"

export function usePVCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => pvApi.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKey.GET_DETAILS] })
      toast.success("Tạo sản phẩm con thành công")
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function usePVUpdateImages() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, id }) => pvApi.updateImages(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKey.GET_DETAILS] })
      queryClient.invalidateQueries({ queryKey: ProductVariantKey.PV_DETAILS })
      queryClient.invalidateQueries({ queryKey: ProductVariantKey.PV_IMAGES })
    },
    onError: (error) => {
      handleApiError(error)
    },
  })
}
export function usePVUpdateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, id }) => pvApi.updateStatus(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKey.GET_DETAILS] })
      queryClient.invalidateQueries({ queryKey: ProductVariantKey.PV_DETAILS })
      queryClient.invalidateQueries({ queryKey: ProductVariantKey.PV_IMAGES })
    },
    onError: (error) => {
      handleApiError(error)
    },
  })
}
