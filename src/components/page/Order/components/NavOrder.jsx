import { useCategoryGetAll } from "@/service/category/queries"
import { Box, Button, Stack } from "@mui/material"
import { useEffect } from "react"
import { useSearchParams } from "react-router"

function NavOrder({ ...props }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories } = useCategoryGetAll()

  useEffect(() => {
    if (categories && categories.length > 0 && !searchParams.get("categoryIds")) {
      // Nếu chưa có category nào được chọn thì chọn cái đầu tiên
      const firstId = categories[0].id
      const currentParams = Object.fromEntries(searchParams.entries())
      setSearchParams({ ...currentParams, categoryIds: firstId.toString() })
    }
  }, [categories, searchParams, setSearchParams])

  const handleChangeCategory = (categoryId) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({ ...currentParams, categoryIds: categoryId.toString() })
  }

  return (
    <Box {...props}>
      <Stack
        flexDirection={"row"}
        gap={1}
      >
        {categories &&
          categories
            .filter((c) => c.name.toLowerCase() !== "material")
            .map((c) => (
              <Button
                key={c.id}
                variant={c.id == searchParams.get("categoryIds") ? "contained" : "outlined"}
                size="small"
                onClick={() => handleChangeCategory(c.id)}
              >
                {c.name}
              </Button>
            ))}
      </Stack>
    </Box>
  )
}

export default NavOrder
