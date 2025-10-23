import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { purchaseApi } from "./purchaseApi"
import { PurchaseHistoryKey } from "./queries"

export function usePurchaseCreate() {
  return useMutation({
    mutationFn: (data) => purchaseApi.add(data),

    onSuccess: () => {
      toast.success("Nhập đơn hàng thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function usePurchaseUpdateNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => purchaseApi.updateNote(data, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PurchaseHistoryKey.SEARCH] })
      toast.success("Cập nhật note thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function usePurchaseUpdateDetailNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => purchaseApi.updateDetailNote(data, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PurchaseHistoryKey.SEARCH] })
      toast.success("Cập nhật detail note thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}
