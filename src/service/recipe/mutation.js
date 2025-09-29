import { useMutation, useQueryClient } from "@tanstack/react-query"
import { recipeApi } from "./recipeApi"
import { toast } from "sonner"
import { RecipeKey } from "./queries"

export function useRecipeCreate() {
  return useMutation({
    mutationFn: (recipeRQ) => recipeApi.add(recipeRQ),

    onSuccess: () => {
      toast.success("Thêm công thức mới thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useRecipeSoftDeletes() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids) => recipeApi.softDeletes(ids),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RecipeKey.SEARCH] })
      toast.success("Xóa thành công.")
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useRecipeToggle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => recipeApi.toggle(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RecipeKey.SEARCH] })
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || error.message)
    },
  })
}

export function useRepiceUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => recipeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RecipeKey.SEARCH],
      })
      toast.success("Cập nhật công thức thành công.")
    },
  })
}
