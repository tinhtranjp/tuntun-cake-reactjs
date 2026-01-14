import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productOptionApi } from "./productOptionApi"
import { ProductOptionKey } from "./queries"
import { handleApiError } from "@/helper/api"
import { toast } from "sonner"

export function usePOCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (options) => productOptionApi.add(options),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS] })
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS_ORDER_INDEX] })
      toast.success("Thêm tùy chọn sản phẩm thành công.")
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function usePOToggle() {
  return useMutation({
    mutationFn: (id) => productOptionApi.toggleSoftDelete(id),

    onError: (error) => {
      handleApiError(error)
    },
  })
}
export function usePOToggleValue() {
  return useMutation({
    mutationFn: (id) => productOptionApi.toggleValueSoftDelete(id),

    onError: (error) => {
      handleApiError(error)
    },
  })
}
export function usePOReorder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => productOptionApi.reorderIndex(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS] })
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS_ORDER_INDEX] })
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function usePOReorderValue() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => productOptionApi.reorderValueIndex(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS] })
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS_ORDER_INDEX] })
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS_VALUE_INDEX] })
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function usePOAddValue() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (options) => productOptionApi.addValues(options),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS] })
      queryClient.invalidateQueries({ queryKey: [ProductOptionKey.GET_OPTIONS_ORDER_INDEX] })
      toast.success("Thêm value vào option thành công.")
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}
