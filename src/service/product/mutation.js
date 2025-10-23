import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productApi } from "./productApi"
import { ProductKey } from "./queries"

export function useProductCreate() {
  return useMutation({
    mutationFn: (data) => productApi.add(data),
    onSuccess: () => {},
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
