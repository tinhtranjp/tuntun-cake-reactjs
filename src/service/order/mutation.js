import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orderApi } from "./orderApi"
import { OrderKey } from "./queries"
import { handleApiError } from "@/helper/api"
import { toast } from "sonner"

export function useOrderCreate() {
  return useMutation({
    mutationFn: (orderRQ) => orderApi.add(orderRQ),

    onSuccess: () => {},

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useOrderUpdateNote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => orderApi.updateNote(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OrderKey.SEARCH] })
      queryClient.invalidateQueries({ queryKey: [OrderKey.STATUS_COUNTS] })
      toast.success("Cập nhật thành công.")
    },

    onError: (error) => {
      handleApiError(error)
    },
  })
}

export function useOrderChangeStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ data, id }) => orderApi.changeStatus(data, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OrderKey.SEARCH] })
      queryClient.invalidateQueries({ queryKey: [OrderKey.STATUS_COUNTS] })
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useOrderTogglePreOrder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => orderApi.togglePreOrder(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [OrderKey.SEARCH] })
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}
