import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { purchaseApi } from "./purchaseApi"

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
