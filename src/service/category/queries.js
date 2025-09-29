import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "./categoryApi"

export const CateKey = {
  GET_ALL: "CATE_GET_ALL",
  GET_BY_ID: "CATE_GET_BY_ID",
}

export const useCategoryGetAll = () => {
  return useQuery({
    queryKey: [CateKey.GET_ALL],
    queryFn: () => categoryApi.getAll(),
  })
}

export const useCategoryGetById = (id) => {
  return useQuery({
    queryKey: [CateKey.GET_BY_ID, id],
    queryFn: () => categoryApi.getById(id),
  })
}
