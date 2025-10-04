import { useMutation, useQueryClient } from "@tanstack/react-query"
import { variantApi } from "./variantApi"
import { ProductKey } from "../product/queries"

export function useVariantToggle() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => variantApi.toggle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ProductKey.SEARCH] })
    },
  })
}
