import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productApi } from "./productApi"
import { ProductKey } from "./queries"
import { toast } from "sonner"
import { handleApiError } from "@/helper/api"

export function useProductCreate() {
  return useMutation({
    mutationFn: (data) => productApi.add(data),
    onSuccess: () => {
      toast.success("Tạo sản phẩm thành công")
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function useProductUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ data, id }) => productApi.update(data, id),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ProductKey.GET_BY_ID, id })
      queryClient.invalidateQueries({ queryKey: ProductKey.SEARCH })
    },
  })
}

export function useProductUploadFiles() {
  return useMutation({
    mutationFn: (files) => productApi.upLoad(files),
    onSuccess: () => {},
  })
}
