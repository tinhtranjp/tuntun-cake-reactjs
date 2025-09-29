import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { categoryApi } from "./categoryApi"
import { CateKey } from "./queries"

export function useCategoryCreate() {
  return useMutation({
    mutationFn: (categoryRQ) => categoryApi.add(categoryRQ),

    onSuccess: () => {
      toast.success("Thêm thể loại thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useCategoryToggle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => categoryApi.toggleCategories(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CateKey.GET_ALL] })
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useCategoryUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => categoryApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [CateKey.GET_ALL] })
      queryClient.invalidateQueries({ queryKey: [CateKey.GET_BY_ID, variables.id] })
      toast.success("Cập nhật thể loại thành công.")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useCategoryReorder() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (categoryIds) => categoryApi.reorder(categoryIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CateKey.GET_ALL] })
      toast.success("Sắp xếp thành công.")
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}
