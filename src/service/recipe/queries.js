import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { recipeApi } from "./recipeApi"

export const RecipeKey = {
  SEARCH: "RECIPE_SEARCH",
  GET_BY_ID: "RECIPE_GET_BY_ID",
}

export const useRecipeSearch = (params) => {
  return useQuery({
    queryKey: [RecipeKey.SEARCH, params],
    queryFn: () => recipeApi.search(params),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}

export const useRecipeGetById = (id) => {
  return useQuery({
    queryKey: [RecipeKey.GET_BY_ID, id],
    queryFn: () => recipeApi.getById(id),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}
