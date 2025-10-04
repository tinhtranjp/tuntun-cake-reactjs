import { useMutation } from "@tanstack/react-query"
import { productApi } from "./productApi"

export function useProductCreate() {
  return useMutation({
    mutationFn: (data) => productApi.add(data),
    onSuccess: () => {},
  })
}

export function useProductUpdate() {
  return useMutation({
    mutationFn: ({ data, id }) => productApi.update(data, id),
    onSuccess: () => {},
  })
}

export function useProductUploadFiles() {
  return useMutation({
    mutationFn: (files) => productApi.upLoad(files),
    onSuccess: () => {},
  })
}
